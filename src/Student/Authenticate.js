import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase" // Adjust the import path as needed

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

function isPointInsideRectangle(point, rectCorners) {
  // rectCorners should be an array of 4 objects, each containing 'lat' and 'long' properties
  const [p1, p2, p3, p4] = rectCorners;

  // Calculate the cross product of vectors (p - p1) and (p2 - p1)
  function crossProduct(p, p1, p2) {
    return (
      (p.lat - p1.lat) * (p2.long - p1.long) -
      (p.long - p1.long) * (p2.lat - p1.lat)
    );
  }

  // Check if the point lies to the left of all edges
  const d1 = crossProduct(point, p1, p2);
  const d2 = crossProduct(point, p2, p3);
  const d3 = crossProduct(point, p3, p4);
  const d4 = crossProduct(point, p4, p1);

  return (
    (d1 >= 0 && d2 >= 0 && d3 >= 0 && d4 >= 0) ||
    (d1 <= 0 && d2 <= 0 && d3 <= 0 && d4 <= 0)
  );
}
//clg
//test 17.538315, 78.384855
// Example usage:
//17.538631, 78.384614
//17.538448, 78.385302
//17.537744, 78.385151
//17.537908, 78.384369

//Home
//17.513905, 78.430796
//17.514069, 78.431015
//17.513914, 78.431100
//17.513812, 78.430834
const homConrners = [
  {
    lat: 17.513905,
    long: 78.430796,
  },
  {
    lat: 17.514069,
    long: 78.431015,
  },
  {
    lat: 17.513914,
    long: 78.4311,
  },
  {
    lat: 17.513812,
    long: 78.430834,
  },
];
// const rectCorners = [
//   {
//     lat: 17.538631,
//     long: 78.384614,
//   }, // Corner 1
//   {
//     lat: 17.538448,
//     long: 78.385302,
//   }, // Corner 2
//   {
//     lat: 17.537744,
//     long: 78.385151,
//   }, // Corner 3
//   {
//     lat: 17.537908,
//     long: 78.384369,
//   }, // Corner 4
// ];
async function getLocationAsync() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

async function showPositionAsync() {
  try {
    const position = await getLocationAsync();
    const point = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    console.log(1);
    return point;
  } catch (error) {
    console.error(error.message);
  }
}
async function f() {
  const pointToCheck = await showPositionAsync();
  console.log(pointToCheck);
  const isInside = await isPointInsideRectangle(pointToCheck, homConrners);
  // document.write(`Is the point inside the rectangle? ${isInside}`);
  console.log(isInside);
  return isInside;
}

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

  const validate = async () => {
    const url = window.location.href;
    console.log(url,1);
    const value = await fetchQRCode();
    console.log(value)
    if (url === value) {
      // if(await f()){
      if(1){
      navigate("/studentlogin");
      }
      else{
        setErrMsg('You are not in a class..');
      }
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
