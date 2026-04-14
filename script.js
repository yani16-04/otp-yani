import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Paste YOUR Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
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
