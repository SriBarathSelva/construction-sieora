
import './App.css'
import Dashboard from './pages/Dashboard'
import Home1 from './components/Home/Home1'
import Login from './pages/Login'
import Register from './pages/Register'
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Verifyemail from './pages/Verifyemail'
function App() {


  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<PublicRoutes><Home/></PublicRoutes>} />
        <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register/></PublicRoutes>} />
        <Route path="/*" element={<ProtectedRoutes><Home1/></ProtectedRoutes>} />
        <Route path="/verify/:token" element={<PublicRoutes><Verifyemail/></PublicRoutes>} />      
      </Routes>
      </div>
    </>
  )
}

export default App

export function ProtectedRoutes({children}){
  const auth = localStorage.getItem('data');
  if(auth){
    return children
  }
  else{
    return <Navigate to="/"/>
  }
}

export function PublicRoutes({children}){
  const auth = localStorage.getItem('data');
  if(auth)
{
  return <Navigate to="/*"/>
}
else{
  return children;
}

}