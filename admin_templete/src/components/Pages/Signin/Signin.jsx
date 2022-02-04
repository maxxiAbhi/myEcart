import React, { useState,useEffect } from 'react';
import './style.css';
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../../../action/auth'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
export default function Signin() {
    const dispatch = useDispatch()
    const [user, setUser] = useState({ email: '', password: '' });
    const auth=useSelector(state => state.auth)
    const navigate = useNavigate();
    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const userLogin = (e) => {
        e.preventDefault();
        const userdata = {
            email: user.email,
            password: user.password
        }
        dispatch(login(userdata))
        console.log(auth)


    }
    useEffect(() => {
        if(auth.status===400){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: auth.message
              })
        }  
    }, [auth])
    if(auth.autenticate && auth.status===200){
        navigate('/dashboard');
    }
  
    return (
        <>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block">
                        <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" alt='asd' className="img-fluid" style={{ minheight: "100%" }} />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <h3 className="pb-3">Login Form</h3>
                        <div className="form-style">
                            <form onSubmit={userLogin}>
                                <div className="form-group pb-3">
                                    <input type="email" placeholder="Email" className="form-control" name='email' value={user.email} onChange={handelInputs} />
                                </div>
                                <div className="form-group pb-3">
                                    <input type="password" placeholder="Password" className="form-control" name='password' value={user.password} onChange={handelInputs} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center"><input name="" type="checkbox" value="" /> <span className="pl-2 font-weight-bold">Remember Me</span></div>
                                    <div><a href="#">Forget Password?</a></div>
                                </div>
                                <div className="pb-2">
                                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                                </div>
                            </form>
                            <div className="sideline">OR</div>
                            <div>
                                <button type="submit" className="btn btn-primary w-100 font-weight-bold mt-2"><i className="fa fa-facebook" aria-hidden="true"></i> Login With Facebook</button>
                            </div>
                            <div className="pt-4 text-center">
                                Get Members Benefit. <a href="#">Sign Up</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
