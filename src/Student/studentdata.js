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
    const studentData = [
      { empno: "1234", password: "password1" },
      { empno: "1235", password: "password2" },
      { empno: "1236", password: "password3" },
      { empno: "1237", password: "password4" },
      { empno: "1238", password: "password5" },
    ];

    // Add each faculty record to Firestore
    for (const [index, student] of studentData.entries()) {
      await setDoc(doc(db, "student", `student${index + 1}`), {
        empno: student.empno,
        password: student.password, // Store hashed passwords in production
      });
      console.log(`Data for student${index + 1} added successfully!`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

populateData();
