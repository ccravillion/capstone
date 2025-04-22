

const firebaseConfig = {
    apiKey: "AIzaSyBkMnkZ-mRIlp46RHXrSqo8TnZ5SEvaXlc",
    authDomain: "capstone-project-e5f48.firebaseapp.com",
    projectId: "capstone-project-e5f48",
    storageBucket: "capstone-project-e5f48.firebasestorage.app",
    messagingSenderId: "12165876087",
    appId: "1:12165876087:web:b8176ded4c048698ee7972"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();