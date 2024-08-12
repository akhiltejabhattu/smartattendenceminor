import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Faculty/Qrdisplay" // Adjust the import path as needed

const fetchQRCode = async () => {
  try {
    const qrDoc = await getDoc(doc(db, "qrCodes", "currentQRCode"));
    if (qrDoc.exists()) {
      return qrDoc.data().qrCodeValue;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching QR code: ", error);
    return null;
  }
};

const Authenticate = () => {
  const [errMsg, setErrMsg] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getQRCodeValue = async () => {
      const value = await fetchQRCode();
      setQRCodeValue(value);
    };

    getQRCodeValue();
  }, []);

  const validate = () => {
    const url = window.location.href;
    console.log(url,1);

    console.log(qrCodeValue)
    if (url === qrCodeValue) {
      navigate("/studentlogin");
    } else {
      
      setErrMsg("Scan Again..");
      navigate();
    }
  };

  return (
    <div className="text-center mt-5">
      <p>Press Enter</p>
      <button className="btn btn-primary" onClick={validate}>
        Enter
      </button>
      <p className="text-danger">{errMsg}</p>
    </div>
  );
};

export default Authenticate;
