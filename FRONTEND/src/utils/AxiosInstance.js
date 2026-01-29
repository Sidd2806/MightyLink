import axios from "axios";

// console.log("=======", import.meta.env.VITE_API_URL)

const AxiosInstance= axios.create ({
    baseURL: import.meta.env.VITE_API_URL ,
    withCredentials:true
})

export default AxiosInstance