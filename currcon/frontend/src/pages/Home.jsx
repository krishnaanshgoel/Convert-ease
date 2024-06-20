import Navbar from "../components/Navbar"
import Table from "../components/Table"
import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
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
      <Table  />
      </div>
    </div>
  )
}
