import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Button from "./Button";
export default function Navbar() {
  return (
<div className="">
    <div className="bg-black h-24 sm:h-20 grid grid-cols-3 sm:grid-cols-5 text-white  px-8 py-2">
        <div className="flex  text-2xl col-span-1 sm:col-span-2 justify-center place-items-center ">
          <img src="/images.png" alt="nothing" className="w-10 h-10 rounded-full flex flex-col justify-center mr-2"></img>
          <div className="flex flex-col justify-center " >
          ConvertEase
          </div>
        </div >
        <div className="flex flex-col justify-center hover:underline hover:cursor-pointer  text-2xl col-span-1 place-items-end ">
        <div className="flex justify-between gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 flex flex-col justify-center">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <Link to="/home">
            Home
        </Link>
        </div>

        

        </div>
        <div className="flex flex-col justify-center hover:underline hover:cursor-pointer  text-2xl col-span-1 place-items-end">
         <Link to="/profile">
          Profile
          </Link> 
        </div>
        <Link className="flex flex-col justify-center hover:underline hover:cursor-pointer  text-2xl col-span-1 place-items-start sm:place-items-end active" to="/signup" onClick={()=>{
          localStorage.removeItem("token");
        }}>
           Logout
        </Link>
      
    </div>
 </div>
  )
}
