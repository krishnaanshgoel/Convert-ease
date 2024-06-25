import Button from "./Button";
import Heading from "./Heading";
import Inputbox from "./Inputbox";
import {Inputbox2} from "./Inputbox2";

import SubHeading from "./SubHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Table() {
    const navigate=useNavigate()
    const [curr,setCurr]=useState("USD")
    const [amount,setAmount]=useState(0);
    const handleCurrChange = (newCurr) => {
        setCurr(newCurr);
      };
    
      const handleAmountChange = (newAmount) => {
        setAmount(Number(newAmount));
      };
      const handleDeposit = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.put(
            "https://n5f6bxmd-3000.inc1.devtunnels.ms/balance/deposit",
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
            alert("Deposited successfully");
            navigate("/profile");
          } else {
            alert("Deposit failed");
          }
        } catch (error) {
          console.error("Error depositing funds:", error);
          alert("Deposit failed");
        }
      };

  return (
    <div className="flex justify-center mt-20">
        <div className="flex flex-col justify-center w-96" >
            <div className="bg-amber-400 h-max p-2 px-4 pb-4 rounded-lg ">
                 <Heading label={"ADD FUNDS"} />
                 <SubHeading label={"Add your currency with very ease"} />
                 <Inputbox2  placeholder={"Enter amount"} name={"From"} id={"From"} onChange1={handleAmountChange} onChange2={handleCurrChange}/>

                 <Button label={"Deposit"} onClick={handleDeposit} />
                 
            </div>
        </div>
    </div>
  )
}

