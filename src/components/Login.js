import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import httpInstance from "../http-client";
import Cookies from "universal-cookie";
import Swal from 'sweetalert2';
import './Login.css';

const cookies = new Cookies();

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = cookies.get("token");

    const checkLogin = () => {
        if (token) {
            navigate("/");
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            const accessToken = response.access_token;
            cookies.set("token", accessToken, {
                path: "/",
            });
            Swal.fire({
                title: "Success",
                text: 'Login Successfully',
                icon: "success",
                confirmButtonText: 'Ok'
            });
            navigate("/");
        },
        onError: error => console.log('Login Failed: ', error),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await httpInstance.post(`auth/login`, loginData);
            if (response) {
                cookies.set("token", response.data.token, {
                    path: "/",
                });
                Swal.fire({
                    title: "Success",
                    text: response.data.message ? response.data.message : 'Login Successfully',
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                navigate("/");
                return;
            }
            throw new Error(response.data.message);
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message ? err.response.data.message : 'Invalid email or password',
                icon: "error",
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-title text-center border-bottom">
                            <h2 className="p-3">Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <button className="btn btn-outline-success mb-3" onClick={() => googleLogin()}>Sign in with Google</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email"/>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password"/>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn text-light main-bg">Login</button>
                                </div>
                            </form>
                            <div className="text-center">
                                <p>Or</p>
                                <Link to="/register" className="btn btn-outline-primary">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
