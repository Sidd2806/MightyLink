// Silently attach the logged-in user to req.user if a valid token exists.
// Does not block the request if the user is not logged in or token is invalid.
import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.dao.js";

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accesToken;
    if (!token) return next();
    try {
        const decoded = verifyToken(token); // `verifyToken` returns the id
        const user = await findUserById(decoded);
        if (!user) return next();
        req.user = user;
        
        return next();
    } catch (err) {
        return next();
    }
};