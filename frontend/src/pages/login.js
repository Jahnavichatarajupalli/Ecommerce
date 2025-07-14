import React from 'react'
import './login.css'
import {useState} from 'react'

const Login = () => {
  const [state,setState]=useState("Login")
  const [details,setdetails]=useState({
    username:"hii",
    email:"",
    password:""
  })
  const adddetails=(e)=>{
    setdetails({...details,[e.target.name]:e.target.value})
  }
  const register=async()=>{
    let sendingdata;
    console.log(details)
    await fetch("https://ecommerce-f04h.onrender.com/signup",{
      method:"POST",
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(details),


    }).then((res)=>res.json()).then((data)=>sendingdata=data)
      if(sendingdata.success){
        localStorage.setItem('auth-token',sendingdata.token);
        window.location.replace("/")
        console.log("register successfull")

      }
      else{
        alert(sendingdata.error)
      }

  }
  const Login=async()=>{
    console.log("login")
    let result;
    let sendingdata={email:details.email,password:details.password}
    await fetch("https://ecommerce-f04h.onrender.com/login",{
      method:"POST",
      headers:{
          Accept:'application/json',
          'content-type':'application/json'
      },
      body:JSON.stringify(sendingdata),


    }).then((res)=>res.json()).then((data)=>result=data)
      if(result.success){
        localStorage.setItem('auth-token',result.token);
        window.location.replace("/")
        
        console.log("loginsuccessfull")

      }
      else{
        alert("problem in login")
      }
    }

  
  return (
    <div className="login">
      <div className="loginform">
        <div className="up">
          <h1>{state}</h1>
          <div className="fields">
            {state==="Sign Up"? <input value={details.username} onChange={(e)=>{adddetails(e)}}type="name" name="username" placeholder="Your Name" />:<></>}
            <input  value={details.email} onChange={(e)=>{adddetails(e)}}type="email" placeholder="Email Address" name="email"/>
            <input value={details.password} onChange={(e)=>{adddetails(e)}} type="password" placeholder="Password" name="password"/>
          </div>
        </div>
        <button onClick={()=>{state==="Login" ? Login():register()}}>Continue</button>
        {state === "Sign Up" ? <p className="loginsign">Already Have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:
        <p className="loginsign">Create an account? <span onClick={()=>{setState("Sign Up")}}>SignUp here</span></p>}
        <div className="agree">
          <input type="checkbox" />
          <p>By continuing i agree to the terms of use & privacy policy</p>
        </div>




      </div>

    </div>
  )
}

export default Login
