import Navbar from "../components/Navbar"
import Table3 from "../components/Table3"
import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Withdraw() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/signin")
    }
  },[])
  return (
    <div >
      <div className="bg-amber-200 h-screen">
      <Navbar />
      <Table3  />
      </div>
    </div>
  )
}
