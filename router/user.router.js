import express from "express";
import {body} from "express-validator";
import {signUp,verification,login} from "../controller/user.controller.js";
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
export default router;
