import Button from "../components/Button"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import {useEffect,useState,useMemo} from "react"
import axios from "axios"

export default function Profile() {
  const [totalbalance,setTotalbalance]=useState(0);
  const[totalcurr,setTotalcurr]=useState("USD")
  const[visbal,setVisbal]=useState(totalbalance);
  const [USD,setUSD]=useState(0);
  const [INR,setINR]=useState(0);
  const [AED,setAED]=useState(0);
  const [Pound,setPound]=useState(0);
  const [Firstname,setFirstname]=useState("")
  const [Lastname,setLastname]=useState("")
  const [Username,setUsername]=useState("")
  const navigate=useNavigate();
  useEffect(()=>{
    async function func(){
      if(!localStorage.getItem("token")){
        navigate("/signin")
      }
      const token = localStorage.getItem("token");
      const response= await axios.get("/balance/",{
        headers: { authorization: `Bearer ${token}` }
      });      
      setTotalbalance(response.data.balance)
      if(totalcurr==="USD"){
        const ans=response.data.balance/83.62
        setVisbal(parseFloat(ans.toFixed(5)))
      }
      if(totalcurr==="INR"){
        const ans=response.data.balance
        setVisbal()
        setVisbal(parseFloat(ans.toFixed(5)))
      }
      if(totalcurr==="Pound"){
        const ans=response.data.balance/106.21
        setVisbal(parseFloat(ans.toFixed(5)))
      }
      if(totalcurr==="AED"){
        const ans=response.data.balance/22.77
        setVisbal(parseFloat(ans.toFixed(5)))
      }
      setUSD(response.data.USD)
      setAED(response.data.AED)
      setPound(response.data.Pound)
      setINR(response.data.INR)
      setFirstname(response.data.Firstname)
      setUsername(response.data.username)
      setLastname(response.data.Lastname)
    }
    
    func()
    
  },[totalbalance,USD,INR,AED,Pound,totalcurr])
  return (
    <div className="bg-amber-200 h-screen">
      <Navbar />
      <div className="flex justify-center pt-4">
      <div className="text-black text-4xl font-bold ">Total Balance:</div>
      <select className="border rounded-2xl border-slate-300 px-1 py-1 ml-2 mt-2 bg-amber-400 " onChange={(e)=>{setTotalcurr(e.target.value)}}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="AED">AED</option>
        <option value="Pound">Pound</option>
      </select>
      <div className="text-black text-4xl font-bold ml-2">{visbal}</div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="grid grid-cols-2 gap-4">
             <div className="col-span-1 place-items-end"><Button label={"Deposit"} onClick={()=>{navigate("/deposit")}} /></div>
            <div className="col-span-1 place-items-start"><Button label={"Withdraw"} onClick={()=>{navigate("/withdraw")}} /></div>
        </div>
      </div>
      <div className="text-black font-bold text-4xl text-left pl-2 px-2 py-2 mt-4">
         Details:
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-12 grid-rows-2 2xl:grid-rows-3 text-black">
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">FirstName:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{Firstname}</div>
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">LastName:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{Lastname}</div>
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">UserName:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{Username}</div>

      </div>



      <div className="text-black font-bold text-4xl text-left pl-2 px-2 py-2 mt-4">
         Currencies:
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-12 grid-rows-2 2xl:grid-rows-3 text-black">
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">USD:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{USD}</div>
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">INR:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{INR}</div>
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">Pound:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{Pound}</div>
        <div className="hidden lg:block lg:col-span-1 lg:row-span-1"></div>
        <div className="col-span-1 row-span-1 place-items-start text-2xl font-bold">AED:</div>
        <div className=" col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 2xl:col-span-10 row-span-1 place-items-start text-2xl font-bold">{AED}</div>

      </div>
      <div className="flex justify-center mt-2 lg:mt-8">
        <Button label={"Update profile"} onClick={()=>{navigate("/changeprofile")}} />
      </div>
    </div>
  )
}
