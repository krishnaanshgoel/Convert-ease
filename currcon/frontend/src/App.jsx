import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Deposit from "./pages/Deposit"
import Withdraw from "./pages/Withdraw"
import Changeprofile from "./pages/Changeprofile"
function App() {


  return (
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/deposit" element={<Deposit />}></Route>
      <Route path="/withdraw" element={<Withdraw />}></Route>
      <Route path="/changeprofile" element={<Changeprofile/>}></Route>
     </Routes>
  </BrowserRouter>
  )
}

export default App
