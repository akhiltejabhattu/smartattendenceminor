import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Faculty/Qrdisplay" 
const Login = () => {
  const navigate = useNavigate();
  const [empno, setempno] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const facultyCollection = collection(db, "faculty");
    const q = query(facultyCollection, where("empno", "==", empno));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setErrorMessage("Invalid Employee Number");
      return;
    }

    const doc = querySnapshot.docs[0].data();
    if (doc.password === password) {
      // Compare hashed passwords in production
      setErrorMessage("");
      console.log("Faculty login successful!");
      navigate("/facultydashboard");
    } else {
      setErrorMessage("Invalid login credentials");
    }
  };

  return (
    <div className="con">
      <div className="login-con mt-5">
        <form onSubmit={handleLogin}>
          <div className="input-con">
            <label htmlFor="empno">Emp no</label>
            <input
              required
              type="text"
              name="empno"
              id="empno"
              placeholder="Enter Employee Number"
              value={empno}
              onChange={(e) => setempno(e.target.value)}
            />
          </div>
          <div className="input-con">
            <label htmlFor="password">Password</label>
            <input
              required
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

export default Login;
