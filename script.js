let generatedOTP = "";
let userPhone = "";

function sendOTP() {
  const phone = document.getElementById("phone").value.trim();
  if (!phone.match(/^\d{10}$/)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  userPhone = phone;
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

  alert("Your OTP is: " + generatedOTP);

  document.getElementById("login-box").style.display = "none";
  document.getElementById("otp-box").style.display = "flex";
}

function verifyOTP() {
  const enteredOTP = document.getElementById("otp").value.trim();
  if (enteredOTP === generatedOTP) {
    localStorage.setItem("phone", userPhone);
    window.location.href = "problem.html";
  } else {
    alert("Invalid OTP. Try again.");
  }
}
