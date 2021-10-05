import { AppBar } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import "./Sidenav.modules.css";
export default function Sidenav(props) {
  return (
    <div className="sidenav">
      <div>
        <DashboardIcon />
        <h3>Dashboard</h3>
      </div>

      <div>
        <SettingsApplicationsIcon />
        <h3>Configuration</h3>
      </div>

      <div>
        <HelpIcon />
        <h3>Help</h3>
      </div>
    </div>
  );
}
