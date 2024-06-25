import React from 'react'
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import Inputbox from '../components/Inputbox'
import Warning from "../components/Warning"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import { useState,useEffect} from 'react'
import axios from "axios"
import Error from '../components/Error'

export default function Signup() {

  const navigate=useNavigate();
  const [Firstname,setFirstname]=useState("")
  const [Lastname,setLastname]=useState("")
  const [Username,setUsername]=useState("")
  const [Password,setPassword]=useState("")
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/home")
    }
  },[])
  return (
    <div className="h-screen bg-amber-200 flex justify-center">
      <div className="flex flex-col justify-center w-96">
        <div className="bg-amber-400 h-max p-2 px-4 pb-4 rounded-lg">
          <Heading label={"Signup"} />
          <SubHeading label={"Welcome to ConvertEase!"}/>
          <Inputbox label={"FirstName"}placeholder={"FirstName"} onChange={(e)=>{setFirstname(e.target.value)}} />
          <Inputbox label={"LastName"}placeholder={"LastName"} onChange={(e)=>{setLastname(e.target.value)}} />
          <Inputbox label={"UserName"}placeholder={"UserName"} onChange={(e)=>{setUsername(e.target.value)}} />
          <Inputbox label={"Password"}placeholder={"Password"} onChange={(e)=>{setPassword(e.target.value)}} />
          <Button label={"SignUp"} onClick={async ()=>{
            try{
              const response=await axios.post(`${process.env.URL}person/signup`,{
                username:Username,
                  password:Password,
                  Firstname:Firstname,
                  Lastname:Lastname,
                })
              localStorage.setItem("token",response.data.token);
              navigate("/home");
            }
            catch(err){
              alert("Signup Failed!")
              console.log(err);
            }


          }}></Button>
          <Warning label={"Already have an account?"} buttontext={"Signin"} to={"/signin"} />
          
        </div>
      </div>
    </div>
  )
}
