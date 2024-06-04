import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token

    if(!token){
        return next(createError(401,"Unautherize"))
   }
   jwt.verify(token, process.env.JWT, (err,user)=>{
    if(err)  return next(createError(403, "Token is not valid"));
    req.user = user; 
    next();
   });
};

export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){ // nếu trùng id thì user đc phép xóa || admin có quyền xóa
            next();
        } else{
            return next(createError(401,"You are not Logged in"))

        }
    });
};

export const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next, () =>{
        if(req.user.isAdmin){ //isAdmin == true
            next();
        } else{
            return next(createError(401,"You are not autherized"))

        }
    });
};