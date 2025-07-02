import express from "express";
import {body} from "express-validator";
import multer from "multer";
const upload = multer({dest:"public/profile"});
import {auth} from "../middleware/auth.js";
import {signUp,verification,login,list,createProfile,fetchProfile,logout} from "../controller/user.controller.js";
const router = express.Router();

router.post("/",
   body("name","name is required").notEmpty(),
    body("email", "email required").notEmpty(),
    body("email", "Unvalid email").isEmail(),
    body("password", "password required").notEmpty(),
    body("contact","Invalid contact").notEmpty(),
    signUp);
router.post("/verification",verification);
router.post("/login",login);
router.get("/list",list);
router.patch("/profile/:id",upload.single("imageName"),createProfile);
router.get("/:userId",fetchProfile);
router.post("/logout",logout);


export default router;
