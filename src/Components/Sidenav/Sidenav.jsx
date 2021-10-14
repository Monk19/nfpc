import { AppBar } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import "./Sidenav.modules.css";
import {Link} from 'react-router-dom'
export default function Sidenav(props) {
  return (
    <div className="sidenav">
      <div>
        <DashboardIcon className="nav-icont-c" />
        <Link to="/"><h3>Dashboard</h3></Link>
      </div>

      <div>
        <SettingsApplicationsIcon />
        <Link to="/Configuration"><h3>Configuration</h3></Link>
      </div>

      <div>
        <HelpIcon />
        <Link to="/help"><h3>Help</h3></Link>
        
      </div>
    </div>
  );
}
