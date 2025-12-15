import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, where, serverTimestamp, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// --- PASTE YOUR FIREBASE CONFIG HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyBJh8GWWjZS3q53_GOqp7XFq4rpo3YC0Uc",
  authDomain: "chitta-dhara.firebaseapp.com",
  projectId: "chitta-dhara",
  storageBucket: "chitta-dhara.firebasestorage.app",
  messagingSenderId: "292664240448",
  appId: "1:292664240448:web:549416ad8d846787cbb2a5",
  measurementId: "G-6PF2NDHQHY"
};
// ----------------------------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const feed = document.getElementById('feed');

// Current User State
let currentUser = null;
let unsubscribeStream = null; // To stop listening when logged out

// --- AUTHENTICATION LOGIC ---

// 1. Login
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
});

// 2. Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// 3. Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        currentUser = user;
        loginScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        loadThoughts(user.uid); // Load ONLY this user's data
    } else {
        // User is signed out
        currentUser = null;
        loginScreen.classList.remove('hidden');
        appScreen.classList.add('hidden');
        if(unsubscribeStream) unsubscribeStream(); // Stop reading DB
    }
});

// --- APP LOGIC ---

// 4. Helper: Simple "AI" Advice Generator
function getInstantAdvice(text, emotion) {
    const t = text.toLowerCase();
    
    // Advice based on Emotion
    if (emotion === "😟") return "Take a deep breath. Focus on what you can control right now.";
    if (emotion === "😤") return "Do not react immediately. Let the anger sit for 10 minutes.";
    if (emotion === "😊") return "Capture this energy! What caused this joy?";
    
    // Advice based on Keywords
    if (t.includes("deadline") || t.includes("exam") || t.includes("study")) return "Break it down into 20-minute chunks. Just start one.";
    if (t.includes("tired") || t.includes("sleep")) return "Your brain needs rest to function. Go take a nap.";
    if (t.includes("money") || t.includes("cost")) return "Review your expenses. Clarity cures financial anxiety.";
    if (t.includes("code") || t.includes("error")) return "Rubber duck debugging: Explain the code line by line to an imaginary duck.";
    
    // Default fallback
    return "Observe this thought. Does it serve you, or is it just noise?";
}

// 5. Save Thought
document.getElementById('saveBtn').addEventListener('click', async () => {
    const text = document.getElementById('thoughtInput').value.trim();
    const reason = document.getElementById('reasonInput').value.trim();
    const emotion = document.getElementById('emotionSelect').value;

    if (text === "") return;

    // Generate Advice instantly
    const advice = getInstantAdvice(text, emotion);

    try {
        await addDoc(collection(db, "thoughts"), {
            uid: currentUser.uid, // CRITICAL: Save User ID so we know whose thought this is
            content: text,
            reason: reason,
            emotion: emotion,
            advice: advice,
            timestamp: serverTimestamp()
        });
        
        // Clear inputs
        document.getElementById('thoughtInput').value = "";
        document.getElementById('reasonInput').value = "";
    } catch (e) {
        console.error(e);
        alert("Error saving.");
    }
});

// 6. Load Thoughts (Real-time)
function loadThoughts(uid) {
    // Query: Give me thoughts from "thoughts" collection WHERE uid == current User
    const q = query(
        collection(db, "thoughts"), 
        where("uid", "==", uid), 
        orderBy("timestamp", "desc")
    );

    unsubscribeStream = onSnapshot(q, (snapshot) => {
        feed.innerHTML = "";
        
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;
            const time = data.timestamp ? data.timestamp.toDate().toLocaleString() : "Just now";
            const reasonDisplay = data.reason ? `Reason: "${data.reason}"` : "No specific reason logged.";

            const html = `
                <div class="card" onclick="toggleDetails(this)">
                    <div class="card-header">
                        <span class="emoji">${data.emotion || "😐"}</span>
                        <span class="thought-text">${data.content}</span>
                        <button class="delete-btn" onclick="deleteThought(event, '${id}')">×</button>
                    </div>
                    <span class="time">${time}</span>
                    
                    <div class="details-box">
                        <div class="reason-text">${reasonDisplay}</div>
                        <div class="advice-box">💡 <b>Advice:</b> ${data.advice}</div>
                    </div>
                </div>
            `;
            feed.innerHTML += html;
        });
    });
}

// 7. Toggle visibility of Reason/Advice
window.toggleDetails = (cardElement) => {
    cardElement.classList.toggle('expanded');
};

// 8. Delete Function
window.deleteThought = async (event, id) => {
    event.stopPropagation(); // Stop the card from clicking/expanding when we hit delete
    if(confirm("Delete this thought?")) {
        await deleteDoc(doc(db, "thoughts", id));
    }
};