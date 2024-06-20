import { useState ,useEffect} from "react"


export default function Outputbox({label,name,id,onChange,value}) {
   const [ocurr,setOCurr]=useState("USD")
   const [newvalue,setValue]=useState(value)
   useEffect(()=>{
    if(onChange){onChange(ocurr)}
   },[ocurr,onChange])
   useEffect(()=>{
    setValue(value)
   },[value])  
    return (
      <div>
        <div className="font-normal text-md px-1 py-2 text-left">
          {label}
        </div>
        <div className="flex justify-between">
          <div className="border border-slate-800 bg-white rounded-xl px-2 py-1 w-full mr-4 "  >{newvalue}</div>
          <select name={name} id={id} className="border rounded-xl border-slate-300 px-1 py-1 " onChange={(e)=>{setOCurr(e.target.value)}}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="Pound">Pound</option>
              <option value="AED">AED</option>
          </select>
        </div>
  
      </div>
    )
  }
  