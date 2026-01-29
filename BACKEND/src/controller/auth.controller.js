import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const {token,user} = await registerUser(name, email, password);
  res.cookie("accesToken", token, cookieOptions);
  res.status(200).json({ message: "Registration success" });
});
export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const {token,user} = await loginUser(email, password);
  req.user = user;
  res.cookie("accesToken", token, cookieOptions);
  res.status(200).json({user:user, message: "Suceesfully logged in" });
});
export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("accesToken",cookieOptions)
  res.status(200).json({message:"Suceesfully logged out"});
});

export const  get_current_user= wrapAsync(async (req,res)=>{
  res.status(200).json({user:req.user})
})