import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const httpInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
});

httpInstance.interceptors.request.use((config) => {
    const token = cookies.get("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

httpInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
        const {response} = error;
        if (response.status === 401) {
            cookies.remove("token", {path: "/"});
        }
    } catch (e) {
        console.log(e);
    }
    throw error;
});

export default httpInstance;
