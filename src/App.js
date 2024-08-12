import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Faculty/Login";
import Dashboard from "./Faculty/Dashboard";
import Qrdisplay from "./Faculty/Qrdisplay";
import Stdlogin from "./Student/Stdlogin";
import Stddashboard from "./Student/Stddashboard";
import Authenticate from "./Student/Authenticate";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/smartattendenceminor" element={<Login />} />
        <Route
          path="/smartattendenceminor/facultydashboard"
          element={<Dashboard />}
        />
        <Route path="/smartattendenceminor/qrdisplay" element={<Qrdisplay />} />
        <Route
          path="/smartattendenceminor/stdauthenticate"
          element={<Authenticate />}
        />
        <Route path="/studentdashboard" element={<Stddashboard />} />
        <Route path="/studentlogin" element={<Stdlogin />} />
      </Routes>
    </div>
  );
}

export default App;
