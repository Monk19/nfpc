import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import {ReactComponent as Logo} from '../../assets/instagram.svg'
import appsteklogo from "./appsteklogo.svg";
import nfpclogo from "./nfpclogo.png";
import axios from 'axios';
import "./Login.css";
const  Login  = (props) => {
  const [email, setemail] =useState("");
  const [pwd, setpwd] = useState("");
  const [isLogged,setisLogged] = useState(false)
   


  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setemail({ [name]: value });
  // };
  // useEffect(() => {
  //   fetchLogin()
  // }, [])


      // const handleSubmit = (e) => {
 
 
    //    // Send POST request to 'books/create' endpoint
    // axios
    //   .post('http://localhost:4001/login/all', {
    //     Username:email,
    //     password: pwd,
        
    //   })
    //   .then(res => {
    //     console.log(res.data)
        // e.preventDefault();
        // props.isLogin(true);
        // Fetch all books to refresh
        // the books on the bookshelf list
      
      // })
      // .catch(error => console.error(`invalid credentials`))
  // };
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

const sumbitAcessesHandler=(e)=>{
  e.preventDefault()
  axios
      .post('/Login', {
       Email:email,
      Password: pwd,
        
      },config)
      .then(res => {
        if(res.data){
          console.log(res)
          props.logIn(res.data)
        }
})
}
      
    //   .catch(error =>
    //     { console.error(`invalid credentials`)
    // });W
  
 
    return (
      
    <div className="body">
      <div className="div-login">
        <div className="div-login-logo">
        <a><img src={appsteklogo} style={{height: "8vh", width: "8vw"}}/></a>
         <a><img src={nfpclogo} style={{height: "8vh", width: "6vw"}}/></a>
         
        </div>
        <div>
          <form 
        >
            {/* <span>Username</span> */}
            <label className="label" for="uname">
              User Name
            </label>

            <input
              className="mail"
              type="email"
              name="email"
              placeholder="Enter User name"
              required
              onChange={(e) => setemail(e.target.value)}
              // onChange={this.handleChange}
            />

            {/* <span>Password</span> */}
            <label className="label" for="psw">
              Password
            </label>

            <input
              className="mail"
              type="password"
              name="pwd"
              placeholder="Enter password"
              required
              onChange={(e) => setpwd(e.target.value)}
              // onChange={this.handleChange}
            />

            {/* <div>
            <input type="
            checkbox" name="remember" /> Remember me
            
            <div class="container" style={{ backgroundColor: "#f1f1f1" }}>

              <span class="psw">
                
                <a href="#">Forgot password?</a>
              </span>
            </div>   */}
            {/* </div> */}
            <div className="remember">
              <a>
                <input className="checkbox" type="checkbox" name="remember" /><label for="checkbox" >Remember Me</label>
              </a>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" onClick={sumbitAcessesHandler} >LOGIN</button>
          </form>
        </div>
      </div>
    </div>
    );
 
};

export default Login;
