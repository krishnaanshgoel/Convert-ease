import Navbar from "../components/Navbar"
import Table2 from "../components/Table2"
import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Deposit() {
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
      <Table2  />
      </div>
    </div>
  )
}
