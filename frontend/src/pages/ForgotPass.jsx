import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPass = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();
  const [name, setName] = useState({ user: '', email: '' });
  const navigate = useNavigate();

  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: name.email,
        password: data.password,
        cupassword: data.cupassword,
      };
      axios.post('/auth/update', { updateUser })
        .then(res => {
          if (res.data.success) {
            toast.success(res.data.msg, {
              position: "top-right",
              autoClose: 2500,
              theme: "colored",
            });
            localStorage.removeItem('data');
            setTimeout(() => {
              window.location.href = "/";
            }, 3500);
          } else {
            toast.error(res.data.msg, {
              position: "top-right",
              autoClose: 2500,
              theme: "colored",
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('data');
    navigate('/');
  };

  const loadData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('data'));
      if (!token) {
        navigate('/');
        return;
      }
      const res = await axios.get('/auth/userdata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
        <div className="container">
      <div className=" p-3">
        <button className="btn mt-3 btn-danger float-end" onClick={logout}>Logout</button>
        <br />
        <h2 className="mt-5">Hello {name.user}!</h2>
        <h2>{name.email}</h2>
      </div>
      <div className="mt-4">
        <div className="col-md-5 mx-auto mt-3 py-5 p-5">
          <div className="card p-3 bg-white">
            <h2 className="pt-2 px-4 text-center">Update Details</h2>
            <form onSubmit={handleSubmit(updateSubmit)} className="mt-5 mx-4">
              <div className="form-group">
                <h5>Name</h5>
                <input type="text" value={name.user} className="form-control" readOnly />
              </div>
              <div className="form-group mt-4">
                <h5>Email</h5>
                <input type="text" value={name.email} className="form-control" readOnly />
              </div>
              <div className="form-group mt-4">
                <h5>Password</h5>
                <input type="password" className="form-control" placeholder="Enter the password" {...register("cupassword", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                })} />
                {errors.cupassword && <span>This field is required and must follow the password pattern</span>}
              </div>
              <div className="form-group mt-4">
                <h5>New Password</h5>
                <input type="password" className="form-control" placeholder="Enter the new password" {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                })} />
                {errors.password && <span>This field is required and must follow the password pattern</span>}
              </div>
              <div className="form-group mt-4">
                <h5>Confirm New Password</h5>
                <input type="password" className="form-control" placeholder="Confirm the new password" {...register("cpassword", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                })} />
                {errors.cpassword && <span>This field is required and must follow the password pattern</span>}
              </div>
              <div className="text-center">
                <button className="submit-btn mt-5">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default ForgotPass