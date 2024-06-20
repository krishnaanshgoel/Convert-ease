import { useState ,useEffect } from "react"

export const Inputbox2=({label,placeholder,onChange1,name,id,onChange2})=> {
  const [curr,setCurr]=useState("USD")
  const [amount,setAmount]=useState(0);

  useEffect(()=>{
  if(onChange1){ onChange1(amount)}
  if(onChange2){ onChange2(curr)}
},[amount,curr,onChange1,onChange2])


  return (

    <div>
      <div className="font-normal text-md px-1 py-2 text-left">
        {label}
      </div>
      <div className="flex justify-between">
        <input className="border border-slate-300 rounded-xl px-2 py-1 w-full mr-4" onChange={(e)=>{setAmount(e.target.value)}} placeholder={placeholder} type="number" min={0}></input>
        <select name={name} id={id} className="border rounded-xl border-slate-300 px-1 py-1" onChange={(e)=>{setCurr(e.target.value)}}>
            <option value="USD" onClick={()=>{}}>USD</option>
            <option value="INR" onClick={()=>{}}>INR</option>
            <option value="Pound" onClick={()=>{}}>Pound</option>
            <option value="AED" onClick={()=>{}}>AED</option>
        </select>
      </div>

    </div>
  )
}
