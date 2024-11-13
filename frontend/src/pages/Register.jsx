import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
  } = useForm();

  const registerSubmit = async(data) => {
    if(data.password === data.cpassword) {
      const userData = {
        user : data.user,
        email : data.email,
        password : data.password
      }
      
      try {
        const response = await axios.post('auth/register', userData);
        
        if(response.data.success) {
          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const password = watch("password");

  return (
    <div className="row bg-color py-4">
      <h2 className="text-white text-center font-bold mt-5">Register Page</h2>
      <div className="col-md-8 py-5 mt-3 position-absolute top-50 start-50 translate-middle">
        <div className="card p-3 bg-white bg-opacity-25">
          <h2 className="font-bold m-2">Register Here</h2>
          <form onSubmit={handleSubmit(registerSubmit)} className="mt-5 mx-4">
            <div className="form-group">
              <h5 className="mb-2">User Name</h5>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your Name" 
                {...register("user", { required: true, minLength: 6 })} 
              />
              {errors.user && <p className="text-danger mt-1">Name should be at least 6 characters</p>}
            </div>
            <div className="form-group mt-4">
              <h5 className="mb-2" >Email id</h5>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })} 
              />
              {errors.email && <p className="text-danger mt-1">Enter a valid email</p>}
            </div>
            <div className="form-group mt-4">
              <h5 className="mb-2">Password</h5>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your password" 
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
                })} 
              />
              {errors.password && <div> <p className="text-danger mt-1">Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character</p>
            </div>}
            </div>
            <div className="form-group mt-4">
              <h5 className="mb-2">Confirm Password</h5>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your password again" 
                {...register("cpassword", {
                  required: true,
                  validate: value => value === password || "Passwords do not match"
                })} 
              />
              {errors.cpassword && <p className="text-danger mt-1">{errors.cpassword.message}</p>}
            </div>
            <div className="text-center">
              <button type="submit" className="mt-5 submit-btn">Submit</button>
            </div>
          </form>
          <Link className="text-primary text-center" to="/login">Already Registered? Login here</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
