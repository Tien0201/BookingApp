import User from '../models/User.js'

export const updateUser = async(req,res,next) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body} , {new: true})
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

export const deleteUser = async(req,res,next) =>{
    try{
        const foundUser = await User.findByIdAndDelete(req.params.id)
        if(!foundUser){
            res.status(400).json(`User with id ${req.params.id} can not be found `);
        }else{
            res.status(200).json(`User with id ${req.params.id} deleted `);
        }
    }catch(err){
        next(err);
    }
};

export const getUser = async(req,res,next) =>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
};

export const getAllUser = async(req,res,next) =>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
};