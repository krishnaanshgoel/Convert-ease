import { useState ,useEffect} from "react"

export default function Inputbox3({placeholder,label,onChange,value}) {
  const [newvalue,setValue]=useState(value)
  useEffect(() => {
    setValue(value);
  }, [value]);
  useEffect(()=>{
    if(onChange){ onChange(newvalue)}
  },[newvalue])
  return (
    <div>
      <div className="font-normal text-md px-1 py-2 text-left">
        {label}
      </div>
      <div>
        <input className="border w-full border-slate-300 rounded-xl  px-2 py-1" placeholder={placeholder} onChange={(e)=>{setValue(e.target.value)}} value={newvalue}></input>
      </div>
    </div>
  )
}
