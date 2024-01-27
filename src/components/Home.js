import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const cookies = new Cookies();

const Home = () => {
    const token = cookies.get("token");
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;

    const logout = () => {
        cookies.remove("token", {path: "/"});
        Swal.fire({
            title: "Success",
            text: 'Logout Successfully',
            icon: "success",
            confirmButtonText: 'Ok'
        });
        navigate("/");
    };
    return (
        <div>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                {token ?
                    <div className="text-center">
                        <button type="submit" className="btn btn-outline-danger" onClick={() => logout()}>Logout</button>
                        <br/>
                        <img src={base_url+'/mern.webp'} className="img-fluid rounded" width="600" alt="Nazmul"/>
                    </div>
                    :
                    <Link to="/login" className="btn btn-outline-primary">Login</Link>
                }
            </div>
        </div>
    );
};

export default Home;
