import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async(req,res,next) =>{
    const {username , email} = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt); 

    try{
        const newUser = new User({
            ...req.body,
            password : hashedPassword,
        })

    const duplicateUsername = await User.findOne({username}).lean().exec();
    const duplicateEmail = await User.findOne({email}).lean().exec();
    
    if(duplicateUsername){
        return res.status(409).json({message : `duplicate username `})
    }else if (duplicateEmail)
    {
        return res.status(409).json({message : `duplicate email`})

    }else{
        await newUser.save();
        res.status(200).send(`User ${req.body.username} has been created`);
    }
    }catch(err){
        next(err)
    }
}

// export const login = async(req,res,next) =>{
//     try{
//         const foundUser = await User.findOne({username : req.body.username})
//         if(!foundUser)
//              return next(createError(404,`User ${req.body.username} not found`));    
//         const isPasswordCorrect = await bcryptjs.compare(req.body.password , foundUser.password)
//         if(!isPasswordCorrect) 
//             return next(createError(404,` Wrong password or username`));

//         //jwt
//         const token = jwt.sign({id : foundUser._id , isAdmin : foundUser.isAdmin}, process.env.JWT)
//         console.log("access_token" , token);
//         const {password , isAdmin , ...otherDetails} = foundUser._doc
//         res.cookie("access_token", token, {
//             httpOnly: true,
//         })
//         .status(200)
//         .json({ details: {...otherDetails}, isAdmin})
//     }catch(err){
//         next(err)
//     }   
// }

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ token: token, details: { ...otherDetails ,token}, isAdmin});
    } catch (err) {
      next(err);
    }
  };


