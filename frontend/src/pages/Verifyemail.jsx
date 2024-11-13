import React,{useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Verifyemail = () => {
  const params = useParams()

  const tokenVerify= async()=>{
    try {
      const res = await axios.post('/auth/verify-mail',{token:params.token})
      //console.log(res.data)
      if(res.data.success){
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>{
        window.close();
      },5000)
    }else{
      
      toast.error(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    setTimeout(()=>{
      window.close();
    },5000)
  }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    tokenVerify()
  },[])

  return (
    <div className='mx-auto'>
      <Link className='btn btn-dark' to='/'>Go to Login page</Link>
      
      <ToastContainer/>
    </div>
  )
}

export default Verifyemail