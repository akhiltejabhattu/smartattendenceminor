import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

function Qrdisplay() {
  const [domain, setDomain] = useState(null); // State for the QR code value
  useEffect(() => {
    const generateRandomString = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return "http://localhost:3000/stdauthenticate?" + result;
    };

    const generateQRCode = async () => {
      const newRandomString = generateRandomString();
      // setRandomString(newRandomString); // Store random string in separate state
      setDomain(newRandomString);
      console.log(newRandomString)

      // Store the QR code value in Firestore
      try {
        await setDoc(doc(db, "qrCodes", "currentQRCode"), {
          qrCodeValue: newRandomString,
          timestamp: new Date().toISOString(),
        });
        console.log("QR code stored successfully");
      } catch (error) {
        console.error("Error storing QR code: ", error);
      }
    };

    const startQRCodeGeneration = () => {
      generateQRCode(); // Generate initial QR code

      // Set a timeout to generate a new QR code every 30 seconds
      const intervalId = setInterval(generateQRCode, 100000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    };

    // Start QR code generation
    const cleanup = startQRCodeGeneration();

    // Cleanup function to clear the interval when the component unmounts
    return cleanup;
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Scan here to mark your attendance</h1>
      {domain && ( // Render only if domain has a value
        <>
          <QRCode value={domain} size={300} level="H" className="mt-5" />
          <p>{domain}</p>
        </>
      )}
    </div>
  );
}

export default Qrdisplay;
export {db}