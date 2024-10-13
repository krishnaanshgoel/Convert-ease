import React from 'react'
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import Inputbox from '../components/Inputbox'
import Warning from "../components/Warning"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Signin() {
  const navigate=useNavigate();
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/home")
    }
  },[])
  return (
    <div className="h-screen bg-amber-200 flex justify-center">
      <div className="flex flex-col justify-center w-96">
        <div className="bg-amber-400 h-max p-2 px-4 pb-4 rounded-lg">
          <Heading label={"Signin"} />
          <SubHeading label={"Welcome back to ConvertEase!"}/>
          <Inputbox label={"UserName"}placeholder={"UserName"} onChange={(e)=>{setUsername(e.target.value)}} />
          <Inputbox label={"Password"}placeholder={"Password"} onChange={(e)=>{setPassword(e.target.value)}} />
          <Button label={"Signin"} onClick={async ()=>{
            try{
              const response=await axios.post("https://k5stgbsn-3000.inc1.devtunnels.ms/person/signin",{
                username,
                password,
              })
              localStorage.setItem("token",response.data.token);
              navigate("/home");
            }
            catch(err){
              alert("SignIn failed")
              console.log(err);
            }
          }}></Button>
          <Warning label={"Already have an account?"} buttontext={"Signup"} to={"/signup"} />
          
        </div>
      </div>
    </div>
  )
}

