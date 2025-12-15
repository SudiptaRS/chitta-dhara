# Chitta-Dhara (चित्त-धारा) 🌊

> *Vichara Pravahatu* (Let the thoughts flow).

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=google-chrome)](https://chitta-dhara.web.app)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue?style=for-the-badge&logo=pwa)](https://chitta-dhara.web.app)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Chitta-Dhara** is a minimalist, cloud-based **Stream of Consciousness** journal designed for mental clarity. Unlike standard note-taking apps, it focuses on the *flow* of thoughts, allowing users to capture fleeting ideas, track real-time emotions, and receive instant stoic guidance in a distraction-free environment.

Built as a **Progressive Web App (PWA)**, it offers a native-like experience on mobile devices with offline capabilities, custom installability, and secure cloud synchronization.

---

## 📸 Preview

![App Screenshot](https://via.placeholder.com/800x400/0f2027/ffffff?text=Chitta-Dhara+Dashboard+Preview)
*(A secure, glassmorphism-inspired interface for distraction-free writing)*

---

## 🚀 Key Features

* **🔐 Secure Authentication:** Seamless and private login via **Google Identity Platform** (Firebase Auth).
* **☁️ Real-time Cloud Sync:** Thoughts are saved instantly to **Cloud Firestore** and synced across all devices live.
* **📱 Progressive Web App (PWA):**
    * Fully installable on Android & iOS.
    * Custom `manifest.json` for native app look and feel.
    * **Offline Support** via Service Workers (`sw.js`) and asset caching.
* **🧠 Sentiment Tracking:** Smart tagging system for emotions (Happy, Anxious, Angry, Idea) to track mental patterns.
* **💡 Instant Stoic Advice:** Context-aware logic provides grounding advice based on the user's current emotional state.
* **🎨 Glassmorphism UI:** A modern aesthetic featuring dynamic blurred backgrounds, CSS variables, and smooth animations.
* **🛡️ Enterprise Security:** Custom Firestore Security Rules (`firestore.rules`) ensure strict data privacy (User A cannot access User B's data).

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, CSS3 |
| **Styling** | CSS Variables, Flexbox/Grid, Glassmorphism Effects |
| **Backend (BaaS)** | Google Firebase |
| **Database** | Cloud Firestore (NoSQL) |
| **Auth** | Firebase Authentication (Google Provider) |
| **Hosting** | Firebase Hosting (Global CDN) |
| **PWA Features** | Service Workers, Web Manifest, Cache API |

---

## 🏗️ Local Development Setup

If you want to clone and run this project locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/SudiptaRS/chitta-dhara.git](https://github.com/SudiptaRS/chitta-dhara.git)
    cd chitta-dhara
    ```

2.  **Configure Firebase**
    * Create a project at [Firebase Console](https://console.firebase.google.com).
    * Enable **Authentication** (Google Sign-in).
    * Enable **Firestore Database**.
    * Copy your web app configuration keys.

3.  **Update Configuration**
    * Open `app.js`.
    * Replace the `firebaseConfig` object with your own credentials.

4.  **Run Locally**
    * Open `index.html` using a local server (e.g., Live Server in VS Code).


### 👤 Author

**Sudipta Ranjan Sahoo**
* **GitHub:** [@SudiptaRS](https://github.com/SudiptaRS)
