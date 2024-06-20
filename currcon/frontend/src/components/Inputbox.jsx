import { useState ,useEffect} from "react"

export default function Inputbox({placeholder,label,onChange,value}) {

  return (
    <div>
      <div className="font-normal text-md px-1 py-2 text-left">
        {label}
      </div>
      <div>
        <input className="border w-full border-slate-300 rounded-xl  px-2 py-1" placeholder={placeholder} onChange={onChange} ></input>
      </div>
    </div>
  )
}
