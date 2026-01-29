import AxiosInstance from "../utils/AxiosInstance"

export const loginUser= async (email,password)=>{
    const {data}= await AxiosInstance.post("/api/auth/login",{email,password})
    return data
}
export const registerUser= async (name,email,password)=>{
    const {data}= await AxiosInstance.post("/api/auth/register",{name,email,password})
    return data
}
export const logOutUser= async ()=>{
    const {data}= await AxiosInstance.post("/api/auth/logout")
    return data
}

export const getCurrentUser = async () => {
    const { data } = await AxiosInstance.get("/api/auth/me")
    return data
}

export const getAllUserUrls=async()=>{
    const {data}= await AxiosInstance.get("/api/user/urls")
    return data.urls
}