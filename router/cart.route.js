import express from "express" ;
import { addToCart,fetchCart } from "../controller/cart.controller.js";
const router = express.Router();
router.post("/addTocart",addToCart);
router.get("/:userId",fetchCart);
export default router;
