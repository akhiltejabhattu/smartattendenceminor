import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

function Qrdisplay() {
  const [domain, setDomain] = useState(null); // State for the QR code value
  const [attendees, setAttendees] = useState([]); // State for attendees
  const [isFetching, setIsFetching] = useState(false); // State for loading indicator

  useEffect(() => {
    const generateRandomString = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return (
        "http://localhost:3000/smartattendenceminor/stdauthenticate?" + result
      );
    };

    const generateQRCode = async () => {
      const newRandomString = generateRandomString();
      setDomain(newRandomString);
      console.log(newRandomString);

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
      const intervalId = setInterval(generateQRCode, 500000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    };

    // Start QR code generation
    const cleanup = startQRCodeGeneration();

    // Cleanup function to clear the interval when the component unmounts
    return cleanup;
  }, []);

  const handleViewAttendees = async () => {
    setIsFetching(true);
    try {
      // Fetch the list of roll numbers from Firestore
      const facultyId = localStorage.getItem("empno");; 
      //  const empno = // Replace with the actual faculty ID
      const docRef = doc(db, "attendance", facultyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAttendees(docSnap.data().students || []);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching attendees: ", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Scan here to mark your attendance</h1>
      {domain && (
        <>
          <QRCode value={domain} size={300} level="H" className="mt-5" />
          <p>{domain}</p>
        </>
      )}
      <button
        className="text-center btn btn-success"
        onClick={handleViewAttendees}
      >
        View attendees
      </button>
      {isFetching && <p>Loading...</p>}
      {attendees.length > 0 && (
        <div className="resCon">
          <ol className="prsenteesCon text-center">
            <h1>Presentees Roll Numbers:</h1>
            <hr />
            {attendees.map((rollNo, index) => (
              <>
                <li>{rollNo}</li>
                <hr />
              </>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Qrdisplay;
