let generatedOTP;

function sendOTP() {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    // Generate random OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000);

    console.log("OTP:", generatedOTP); // for testing

    document.getElementById("otp-section").classList.remove("hidden");
    document.getElementById("message").innerText = "OTP sent (check console for demo)";
}

function verifyOTP() {
    const userOTP = document.getElementById("otp").value;

    if (userOTP == generatedOTP) {
        document.getElementById("message").innerText = "Login Successful 🎉";
    } else {
        document.getElementById("message").innerText = "Invalid OTP ❌";
    }
}
