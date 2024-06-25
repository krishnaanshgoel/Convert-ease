import Button from "./Button";
import Heading from "./Heading";
import Inputbox from "./Inputbox";
import {Inputbox2} from "./Inputbox2";

import SubHeading from "./SubHeading";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Table() {
    const [curr,setCurr]=useState("USD")
    const [amount,setAmount]=useState(0)

    const amounthandler=(newamount)=>{
         setAmount(Number(newamount))
    }
    const currhandler=(newcurr)=>{
        setCurr(newcurr)
    }
    const navigate=useNavigate()
    const handleWithdraw = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.put(
            "/balance/withdraw",
            {
              curr:curr,
              amount:amount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            alert("Withdrawn successfully");
            navigate("/profile");
          } else {
            alert("Withdrawal failed");
          }
        } catch (error) {
          console.error("Error withdrawing funds:", error);
          alert("Withdraw failed");
        }
      };
  return (
    <div className="flex justify-center mt-20">
        <div className="flex flex-col justify-center w-100" >
            <div className="bg-amber-400 h-max p-2 px-4 pb-4 rounded-lg ">
                 <Heading label={"Withdraw Funds"} />
                 <SubHeading label={"Withdraw your currency with very ease"} />
                 <Inputbox2  placeholder={"Enter amount"} name={"From"} id={"From"} onChange1={amounthandler} onChange2={currhandler} />

                 <Button label={"Withdraw"} onClick={handleWithdraw} />
                 
            </div>
        </div>
    </div>
  )
}

