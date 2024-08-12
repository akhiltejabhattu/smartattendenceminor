import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase config
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

const Stdlogin = () => {
  const navigate = useNavigate();
  const [rollno, setrollno] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Fetch student data from Firestore
      const querySnapshot = await getDocs(collection(db, "student"));
      let isValid = false;

      querySnapshot.forEach((doc) => {
        const student = doc.data();
        if (student.empno === rollno && student.password === password) {
          isValid = true;
        }
      });

      if (isValid) {
        setErrorMessage("");
        console.log("Student login successful!");
        navigate("/studentdashboard");
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } catch (error) {
      setErrorMessage("Error during login");
      console.error("Error fetching student data: ", error);
    }
  };

  return (
    <div className="con">
      <div className="login-con mt-5">
        <form onSubmit={handleLogin}>
          <div className="input-con">
            <label htmlFor="rollno">Roll no</label>
            <input
              type="text"
              name="roll"
              id="rollno"
              placeholder="Enter Roll Number"
              value={rollno}
              onChange={(e) => setrollno(e.target.value)}
            />
          </div>
          <div className="input-con">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Stdlogin;
