import Button from "./Button";
import Heading from "./Heading";
import Inputbox from "./Inputbox";
import {Inputbox2} from "./Inputbox2";
import Outputbox from "./Outputbox";
import SubHeading from "./SubHeading";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const exchangeRates = {
  "USD": { "USD": 1, "INR": 83.62, "AED": 3.67, "Pound": 0.79 },
  "INR": { "USD": 0.012, "INR": 1, "AED": 0.044, "Pound": 0.0094 },
  "AED": { "USD": 0.27, "INR": 22.77, "AED": 1, "Pound": 0.21 },
  "Pound": { "USD": 1.27, "INR": 106.21, "AED": 4.67, "Pound": 1 }
};

export default function Table() {
  const [icurr,setICurr]=useState("USD");
  const [ocurr,setOCurr]=useState("USD");
  const [amount,setAmount]=useState(0);
  const [finalamount,setFinalamount]=useState(0);
  // const[xyz,setXyz]=useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    setAmount(0);
    setFinalamount(0);
  }, [])

  useEffect(()=>{const func=()=>{
    const a=amount*exchangeRates[icurr][ocurr]
    setFinalamount(a)
  }  
  func()},[icurr,ocurr,amount])

  const incurrchange=(newc)=>{
    setICurr(newc)
  }
  const amountchange=(newc)=>{
    setAmount(Number(newc))
  }
  const ocurrchange=(newc)=>{
    setOCurr(newc)
  }
  const pressed=async ()=>{
    const token=localStorage.getItem("token")
try{    const res1=await axios.put("/balance/withdraw",{
      curr:icurr,
      amount:amount
    },
  {
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  const res2=await axios.put("/balance/deposit",{
    curr:ocurr,
    amount:finalamount
  },
{
  headers:{
    authorization:`Bearer ${token}`
  }
})
  if(res1.status===200 && res2.status===200){
    alert("conversion successfull");
    navigate("/signup")
    // setXyz(xyz+1)
  }
}
  catch(err){
   console.log("error converting",err)
   alert("error converting")
  }

  }
  return (
    <div className="flex justify-center mt-12 sm:mt-20">
        <div className="flex flex-col justify-top sm:justify-center sm:w-96" >
            <div className="bg-amber-400 sm:h-max  p-2 px-4 pb-4 rounded-lg ">
                 <Heading label={"Converter"} />
                 <SubHeading label={"Convert your currency with very ease"} />
                 <Inputbox2 label={"From"} placeholder={"Enter amount"} name={"From"} id={"From"} onChange1={amountchange} onChange2={incurrchange} externalamount={amount}/>
                 <div className="flex justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mt-6 mb-1 mr-3 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
</svg> 
</div>

                 <Outputbox label={"To"}  name={"To"} id={"To"} value={finalamount} onChange={ocurrchange} />
                 <Button label={"Convert"} onClick={pressed} />
                 
            </div>
        </div>
    </div>
  )
}
