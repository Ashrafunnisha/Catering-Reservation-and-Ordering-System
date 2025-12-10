/**
 * Firebase Configuration
 * IMPORTANT: Replace the placeholders below with your actual Firebase project details.
 */
const firebaseConfig = {
    apiKey: "AIzaSyDo2hjGqesL1Q-K_MINAGhpX3yEgeU0Kjc",
    authDomain: "catering-and-ordering-system.firebaseapp.com",
    projectId: "catering-and-ordering-system",
    storageBucket: "catering-and-ordering-system.firebasestorage.app",
    messagingSenderId: "183960309168",
    appId: "1:183960309168:web:ee67a3d29afda51ed11a75",
    measurementId: "G-DRZ14MK5H7"
};

// Initialize Firebase
// Note: We will import firebase via CDN in the HTML files, so 'firebase' global will be available.
// We'll add a check to ensure it's loaded.

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.error("Firebase SDK not loaded!");
        return;
    }
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);

        try {
            const db = firebase.firestore();
            db.settings({ experimentalForceLongPolling: true });
        } catch (e) {
            console.warn("Firestore settings error", e);
        }

        console.log("Firebase initialized successfully.");
    } else {
        firebase.app(); // if already initialized, use that one
    }
}
