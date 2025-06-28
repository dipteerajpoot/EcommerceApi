import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import nodeMailer from "nodemailer"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { request, response } from "express";
dotenv.config();

export const fetchProfile = async(request,response)=>{
    try {
        let user = await User.findById({_id:request.user.userId});
        user.profile.imageName = "http://localhost:3000/"+user.profile.imageName;
        return response.status(201).json({user});

    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Internel server error"});
    }
}


export const createProfile = async(request,response)=>{
    try {
       let user = await User.findById(request.user.userId);
        user.profile.imageName = request.file.filename;
        user.profile.address = request.body.address;
        user.name = request.body.name??user.name;
        user.contact = request.body.contact??user.contact;
        user.save();

        //logik - 2
        // let user = await User.updateOne({_id:request.user.userId},{$set:{profile:{imageName:request.file.fileName,address:request.body.address},name:request.body.name,contact:request.body.contact}});

        return response.status(201).json({message:"Prfile Updated"})

    } catch (error) {
          console.log(error);
        return response.status(500).json({error:"Internel server error"});
    }
}

export const list = async(request,response)=> {
    try {
        let user = await User.find();
        if(!user)
            return response.status(404).json({message:"No user availabale"});

            return response.status(200).json({message:"Here is user list ",user});


    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Internel server error"});
    }
}

export const login =async(request, response) => {
    try {
        let{email,password} = request.body;
        let user = await User.findOne({email})
        if(!user)
            return response.status(400).json("Unauthorized User ||Email is not valid");
        
        if(!user.isVerified)
            return response.status(401).json("Account not verified|| please verify your account")
        
        let isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
          return response.status(401).json("Rong password||unauthorized user ")
        
        
        isMatch && response.cookie("token",genrateToken(user.email,user._id));
        isMatch? response.status(200).json({ message: "Login successfully || authorized" }):response.status(401).json({error : "Login failed"});
    } 
    catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internel server err" })
    }

}

//signUp-------------
export const signUp = async(request, response) => {
    try {
        let validationErr = validationResult(request);
        if (!validationErr.isEmpty()) {
            return response.status(401).json({ error: "Bad reques|| Invalid Data", errorMassage: validationErr });
        }
        let { name, email, password, contact } = request.body;
        let saltKey = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password,saltKey);
        
       let user =  await User.create({name,email,password,contact});
        await sendMail(name,email);
        return response.status(201).json({message:"User created successfully | please verify your account",user_Id:user._id});
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internel server err" })
    }
}

const sendMail = (name,email) =>{
    return new Promise((resolve , reject) =>{
        let transporter = nodeMailer.createTransport({
            service :"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASSWORD
            }
    })
    let  mailOption ={
        from:process.env.EMAIL,
        to:email,
        subject:"Accounte verification",
        html:`<h1>Dear ${name}</h1>
        <P>Thenk you for ragistration,please click below bottlon for Account verification<P>
        <form method="post", action="http://localhost:3000/user/verification">
        <input type="hidden" name="email" value="${email}"/> <br><br>
        <button type="submit" style= "background-color:lightpink; color:black; border:none; border-radius:8px; width:150px; padding:5px">verify</button>

        </form>
        <p>
        <h6>Thank you</h6>
        Ecomeseweb Team
        </p>
        `
    }
    transporter.sendMail(mailOption, function(error,info){
        if(error){
            reject(error);

        }
        else{
            resolve("verification mail is sent")
        }
    });
    });
}

//varificattion code for user
export const verification   = async(request, response,next) =>{
    try{
        let {email}= request.body;
        let isMatch = await User.updateOne({email},{$set:{isVerified:true}});
        if(isMatch.modifiedCount>0){
        return response.status(200).json({ message: "Account Verified" })
        }
        else{
            return response.status(400).json({ message: "Varification failed" })
        }
    }
    catch(err){
         console.log(err);
        return response.status(500).json({ message: "Internal Server Error" })
    }


}

const genrateToken = (email,userId,userPassword)=>{
    let payload = ({"emailId":email, "userId":userId})
    return jwt.sign(payload,process.env.SECRET_KEY);
}