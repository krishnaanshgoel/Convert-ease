import {Link} from "react-router-dom"

export default function Warning({label,buttontext,to}) {
  return (
    <div className="flex justify-center pt-2">
      <div>
        {label}
      </div>
      <div className="pointer underline pl-1 cursor-pointer">
        <Link to={to}>{buttontext}</Link>
      </div>
    </div>
  )
}
