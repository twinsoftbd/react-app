import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import httpInstance from "../http-client";
import Cookies from "universal-cookie";
import Swal from 'sweetalert2';
import './Login.css';

const cookies = new Cookies();

const Register = () => {

    const [name, setName] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await httpInstance.post(`auth/register`, loginData);
            if (response) {
                Swal.fire({
                    title: "Success",
                    text: response.data.message ? response.data.message : 'Registration Successfully',
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                navigate("/login");
                return;
            }
            throw new Error(response.data.message);
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message ? err.response.data.message : 'Registration Failed',
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
                            <h2 className="p-3">Registration</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter name"/>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email"/>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password"/>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn text-light main-bg">Sign Up</button>
                                </div>
                            </form>
                            <div className="text-center">
                                <p>Or</p>
                                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
