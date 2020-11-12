import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async(req,res) =>{
    const {username,email,password,roles} = req.body;

    const newUser = new User({
        username,
        email,
        password:await User.encryptPassword(password)
    });

    if (roles) {
        const founRoles = await Role.find({name:{$in:roles}});
        newUser.roles = founRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name:"user"});
        newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();
    const token = jwt.sign({id: saveUser._id},config.SECRET,{
        expiresIn:86400// 24 hours
    });

    console.log(saveUser);
    res.status(200).json(token);
};

export const signIn = async(req,res) =>{

    // console.log(req.body);
    const {email, password} = req.body;

    const userFound = await User.findOne({email}).populate("roles");

    if(!userFound) return res.status(400).json({message:"user not found"})

    const matchPassword = await User.comparePassword(password,userFound.password);
    if(!matchPassword) return res.json({message:'Invalid Password'})
    
    const token = jwt.sign({id:userFound._id},config.SECRET,{
        expiresIn:86400 
    });

    res.json({token})
};