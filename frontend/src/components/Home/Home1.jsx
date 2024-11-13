import {Route,Routes} from 'react-router-dom'
import Library from '../../pages/Library/Library'
import Dashboard from '../../pages/Dashboard/Dashboard'
import Clients from '../../pages/Clients/Clients'
import Estimation from '../../pages/Estimation/Estimation'
import Reports from '../../pages/Reports/Reports'
import Nav from '../Navbar/NavBar'
import Projects from '../../pages/Projects/Projects'
import './Home.css'

import EditProjectPage from '../../pages/Projects/projectPages/EditProjectPage'
import PopupTransaction from '../../pages/Projects/projectPages/PopupTransaction'
import EditTransactionPage from '../../pages/Estimation/EditTransactionPage'
import PopupTabContainer from '../../pages/Estimation/popupTabContainer'
import Employee from '../../pages/Employee/Employee'
import Party from '../../pages/Parties/Party'
import Configuration from '../../pages/Configuration/Configuration'
import ForgotPass from '../../pages/ForgotPass'

const Home1 = () => {
  return (
    <div className='  root-component'>
    <div className='left'><Nav /></div>
    <div className='bg-white m-5 right'>
    <Routes> 
        <Route path="/projects" element={<Projects/>} />
        <Route path="/library" element={<Library />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estimation" element={<Estimation/>} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/reports" element={<Reports />} />  
        <Route path="/employee" element={<Employee/>} />   
        <Route path="/party" element={<Party />} />  
        <Route path="/configuration" element={<Configuration/>} /> 
        <Route path="/projects/view/:projectId" element={<PopupTransaction />}/>
        <Route path="/projects/edit/:projectId" element={<PopupTransaction />}/> 
        <Route path="/projects/create" element={<EditProjectPage />} />
        <Route path="/transaction/create" element={<EditTransactionPage />} /> 
        <Route path="/transaction/view/:transactionId" element={<PopupTabContainer />}/>
        <Route path="/transaction/edit/:transactionId" element={<PopupTabContainer />}/> 
        <Route path="/logout" element={<ForgotPass />} />  
      </Routes>
      </div>
    </div>
  )
}

export default Home1