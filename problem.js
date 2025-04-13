const firebaseConfig = {
  apiKey: "AIzaSyDbL-tpjg6_GBCn2GRLAXFhM5sGcL44MQs",
  authDomain: "otp-app-e00d3.firebaseapp.com",
  projectId: "otp-app-e00d3",
  storageBucket: "otp-app-e00d3.firebasestorage.app",
  messagingSenderId: "55547113700",
  appId: "1:55547113700:web:583ebb009915248ad9bcf1",
  measurementId: "G-Q3J8S8153M"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const phone = localStorage.getItem("phone");
let latitude = "Unavailable";
let longitude = "Unavailable";
const locationBox = document.getElementById("location");

let map;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      locationBox.textContent = `Phone: ${phone} | Location: Lat: ${latitude}, Long: ${longitude}`;

      map = L.map('map').setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location')
        .openPopup();
    },
    (error) => {
      console.error("Location error:", error);
      locationBox.textContent = `Phone: ${phone} | Location: Not available`;
      document.getElementById("map").textContent = "Map unavailable";
    }
  );
} else {
  locationBox.textContent = "Geolocation is not supported by this browser.";
}

function submitProblem() {
 
  const problem = document.getElementById("problem").value.trim();

  if (!problem) {
    alert("Please describe your problem.");
    return;
  }

  const report = {
    phone: phone || "Unknown",
    latitude: latitude,
    longitude: longitude,
    location: `Lat: ${latitude}, Long: ${longitude}`,
    problem,
    timestamp: new Date().toISOString()
  };

  db.collection("disaster_reports").add(report)
  .then(() => {
    alert("Problem submitted successfully!");
    document.getElementById("problem").value = "";
    window.location.href = "emergency.html";
  })
  .catch((error) => {
    console.error("Error submitting problem:", error);
    alert("Failed to submit problem.");
  });

    
}