import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-5">
      <h1>This is faculty Dashboard</h1>
      <button
        className="btn btn-success mt-2"
        onClick={() => navigate("/qrdisplay")}
      >
        Share QR
      </button>
    </div>
  );
};

export default Dashboard;
