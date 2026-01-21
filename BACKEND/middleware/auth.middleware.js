// this will check before every request that the user is authenticated or not?

import { findUserById } from "../src/dao/user.dao";
import { verifyToken } from "../src/utils/helper";

export const middleware= async(req,res,next)=>{
    const token= req.cookies.accesToken
    if(!token){
       return  res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decode= verifyToken(token)
        const user=await findUserById(decode)
        if(!user)
            return res.status(401).json({message:"Unauthorized"})
    }
    catch(e){
        console.log(e);
        
    }
} 