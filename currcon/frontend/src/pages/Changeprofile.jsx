import React from 'react'
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import Inputbox3 from '../components/Inputbox3'
import Warning from "../components/Warning"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import { useEffect ,useState} from 'react'
import axios from 'axios'

export default function Changeprofile() {
  const navigate=useNavigate();
  const [Firstname,setFirstname]=useState("")
  const [Lastname,setLastname]=useState("")
  const [Username,setUsername]=useState("")
  const[Password,setPassword]=useState("")

  useEffect(()=>{
    async function func(){
       const token=localStorage.getItem("token")
       const res=await axios.get("https://n5f6bxmd-3000.inc1.devtunnels.ms/person/details",{
        headers:{
          authorization:`Bearer ${token}`
        }
       })
       if(res.status===200){
        setFirstname(res.data.Firstname)
        setLastname(res.data.Lastname)
        setUsername(res.data.username)
        setPassword(res.data.password)
       }
    }
    func()
  },[])
  const  firstnameh=(newname)=>{
    setFirstname(newname)
 }
 const  lastnameh=(newname)=>{
  setLastname(newname)
}
const  usernameh=(newname)=>{
  setUsername(newname)
}
const  passwordh=(newname)=>{
  setPassword(newname)
}

const pressed=async()=>{
  const token=localStorage.getItem("token")
  try{
  const resp=await axios.put("http://localhost:3000/person/update",{
    username:Username,
    Firstname:Firstname,
    Lastname:Lastname,
    password:Password
  },{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  if(resp.status===200){
    alert("updated successfully")
    navigate("/profile")
  }
  else{
    alert("error updating")
  }
}
catch(err){
  console.log("error",err)
  alert("error")
}
}


  return (
    <div className="h-screen bg-amber-200 flex justify-center">
      <div className="flex flex-col justify-center w-96">
        <div className="bg-amber-400 h-max p-2 px-4 pb-4 rounded-lg">
          <Heading label={"Update "} />
          <SubHeading label={"Change your details"}/>
          <Inputbox3 label={"FirstName"} value={Firstname} onChange={firstnameh} />
          <Inputbox3 label={"LastName"} value={Lastname} onChange={lastnameh} />
          <Inputbox3 label={"UserName"} value={Username} onChange={usernameh} />
          <Inputbox3 label={"Password"} value={Password} onChange={passwordh} />
          <Button label={"Save"} onClick={pressed}></Button>
          
        </div>
      </div>
    </div>
  )
}
