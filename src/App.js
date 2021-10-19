import "./App.css";
// import Button from "@mui/material/Button";
import { Redirect } from "react-router-dom";
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
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Modelstatuslist from "./Model/Modelstatuslist";
import Login from "./login/Login";
import Helper from "./Components/Helper"
import {useState,useEffect} from 'react'
const useStyles = makeStyles({
  searchStyles: {
    border: "1px solid #E2E0E1",
    borderRadius: "10px",
    backgroundColor: "#FAF8FF",
    width: "20vw",
    height: "48px",
    padding: "0 30px",
  },
  IconStyles: {
    border: "2px solid #E2E0E1 ",
    borderRadius: "40px",
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const isLogedHandler = (val)=>{
    setIsLoggedIn(val)
  }
 const x = isLoggedIn?<><Grid container className="App" spacing={2}>
 <Grid item xs={12} sx={{ border: "2px solid black", height: "100px" }}>
   <AppBar className="top-grid">
     <div className="logos">
       <img
         src={appsteklogo}
         alt="appstek-logo"
         className="appstek-logo"
       />
       <img src={nfpc} alt="logo" className="nfpc-logo" />
     </div>
     <div className="search-icons">
       <SearchIcon />
       <InputBase
         className={classes.searchStyles}
         placeholder="Search…"
       ></InputBase>
       <NotificationsOutlinedIcon
         className={classes.IconStyles + ` icon-not`}
       />
       <PersonOutlineOutlinedIcon
         className={classes.IconStyles + ` icon-not`}
       />
       <PowerSettingsNewOutlinedIcon
         className={classes.IconStyles + ` icon-not`}
       />
     </div>
   </AppBar>
 </Grid>
 <Router>
 <Grid xs={1} className="nav-tab">
   <Sidenav />
 </Grid>
 <Grid xs={11} className="nav-content">
 <Route exact={true} path="/">
   <Dashboard />
   </Route>
   <Route path="/Configuration">
   <Modelstatuslist/>
   </Route>
   <Route path="/help">
   <Login logIn={isLogedHandler}/>
   </Route>
 </Grid>
 </Router>
</Grid></>:<Login logIn={isLogedHandler}/>
  return(
    x
  );
}

export default App;
