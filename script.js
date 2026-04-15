import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Paste YOUR Firebase config here
  const firebaseConfig = {
  apiKey: "AIzaSyARwYyLEgzK7bRytv5GjGF9wjOPJpTpHY4",
  authDomain: "email-16.firebaseapp.com",
  projectId: "email-16",
  storageBucket: "email-16.firebasestorage.app",
  messagingSenderId: "539785360821",
  appId: "1:539785360821:web:1bba221a01f80660c455fc",
  measurementId: "G-4ERC88MRGT"
};

  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Settings for email link
const actionCodeSettings = {
  url: window.location.href,
  handleCodeInApp: true,
};

// Send login link
document.getElementById("sendBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter email first");
    return;
  }

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  localStorage.setItem("emailForSignIn", email);

  document.getElementById("message").innerText = "Login link sent to your email 📩";
});

// Complete login when user clicks email link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = localStorage.getItem("emailForSignIn");

  if (!email) {
    email = prompt("Enter your email again");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
      document.getElementById("message").innerText = "Login Successful 🎉";
    })
    .catch((error) => {
      console.error(error);
    });
}
