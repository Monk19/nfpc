import "./App.css";
// import Button from "@mui/material/Button";
import { Grid, Button, InputBase, Appbar, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import nfpc from "./Assets/Images/nfpc.png";
import appsteklogo from "./Assets/Images/appsteklogo.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Sidenav from "./Components/Sidenav/Sidenav";
import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "../src/Components/Dashboard/Dashboard";
import DefectLogTables from "./Components/DefectLogTables";
import SecuredRoute from "./Components/SecuredRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Modelstatuslist from "./Model/Modelstatuslist";
import Login from "./login/Login";
import Helper from "./Components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHome from "./Components/DashboardHome";

function App() {
  const [x, settingx] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLogedHandler = (val) => {
    setIsLoggedIn(val);
    console.log(val);
  };
  return (
    <Router>
      <Switch>
        <SecuredRoute
          path="/homeDashboard"
          component={DashboardHome}
          auth={isLoggedIn}
        />
        <Route to="/">
          {!isLoggedIn ? (
            <Login logIn={isLogedHandler} />
          ) : (
            <Redirect to="/homeDashboard" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
