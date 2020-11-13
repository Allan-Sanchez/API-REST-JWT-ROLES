import {Roles} from '../models/Role';
import User from '../models/User';

export const checkRolesExisted = (req,res,next) =>{
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            
            if (!Roles.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message:`Role ${req.body.roles[i]} does not exists`
                })
            }
            
        }
    }
    next();
}

export const checkDuplicateUserOrEmail = async (req,res,next) =>{
    const {username,email} = req.body;
 
    const userExist = await User.findOne({username});
    if(userExist) return res.status(400).json({message:"The user already exists"});

    const emailExist = await User.findOne({email});
    if(emailExist) return res.status(400).json({message:"The email already exists"});

    next();
}