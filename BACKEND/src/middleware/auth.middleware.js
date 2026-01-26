// this will check before every request that the user is authenticated or not?
import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";
export const authMiddleware= async(req,res,next)=>{
    const token= req.cookies.accesToken
    if(!token){
       return  res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded= verifyToken(token)
        const user=await findUserById(decoded)
        if(!user)
            return res.status(401).json({message:"Unauthorized"})
        req.user=user  
        // we saving it into req so all the next middleware and controllers need not to extract the user data again and again from the database they can directly fetch from the req
        next()
    }
    catch{
        return res.status(401).json({message:"Unauthorized"})
        
    }
} 