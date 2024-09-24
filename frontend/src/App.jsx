import { Routes, Route} from "react-router-dom"
import Home from './components/Home/Home'
import Footer from "./components/Footer/footer"
import Intro from "./components/intro/intro"
import Login from "./components/Login/login"
import Signup from "./components/Signup/signup"
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute"
import Profile from "./components/Profile/profile"


function App ()  {


  return (
    <>

    
    <Routes>
      <Route path="/" element={<Intro/>}/>
    <Route path="/intro" element={<Intro />} />
 <Route path="/home" element={<Home />} />
 <Route path="/login" element={<Login/>}/>
 <Route path="/signup" element={<Signup/>}/>
 <Route  path="/home"  element={  <ProtectedRoute><Home /></ProtectedRoute>}  />
 <Route path="/profile"   element={ <ProtectedRoute>  <Profile /> </ProtectedRoute>} />

<Route path="/footer" element={<Footer/>}/>
</Routes>
    
   
    </>
  )
}

export default App
