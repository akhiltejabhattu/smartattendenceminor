import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
      <BrowserRouter basename="/">
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route
            path="/smartattendenceminor/facultydashboard"
            element={<Dashboard />}
          />
          <Route
            path="/smartattendenceminor/qrdisplay"
            element={<Qrdisplay />}
          />
          <Route
            path="/smartattendenceminor/stdauthenticate"
            element={<Authenticate />}
          />
          <Route
            path="/smartattendenceminor/studentdashboard"
            element={<Stddashboard />}
          />
          <Route
            path="/smartattendenceminor/studentlogin"
            element={<Stdlogin />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// import React, { Component } from 'react';
// import { Route, Switch, BrowserRouter} from 'react-router-dom';
// import Agenda from './components/Agenda/Agenda';
// import Planning from './components/Planning/Planning';
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <BrowserRouter  basename="/">
//           <Switch>
//             <Route exact path="/"  component={Agenda} />
//             <Route path="/planning" component={Planning} />
//           </Switch>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default App;
export default App;
