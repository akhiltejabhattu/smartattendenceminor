// populateData.js
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC8oZPrsCi3N43Dol9Gw06ABBk6l0uHEgA",
  authDomain: "smart-attendance-3b7cb.firebaseapp.com",
  projectId: "smart-attendance-3b7cb",
  storageBucket: "smart-attendance-3b7cb.appspot.com",
  messagingSenderId: "929770978031",
  appId: "1:929770978031:web:0bcdd11ea4d3c9fd88791a",
  measurementId: "G-5H2X64MDWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to populate data
const populateData = async () => {
  try {
    // Define an array of faculty data
    const facultyData = [
      { empno: "12345", password: "password1" },
      { empno: "12346", password: "password2" },
      { empno: "12347", password: "password3" },
      { empno: "12348", password: "password4" },
      { empno: "12349", password: "password5" },
    ];

    // Add each faculty record to Firestore
    for (const [index, faculty] of facultyData.entries()) {
      await setDoc(doc(db, "faculty", `faculty${index + 1}`), {
        empno: faculty.empno,
        password: faculty.password, // Store hashed passwords in production
      });
      console.log(`Data for faculty${index + 1} added successfully!`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

populateData();
