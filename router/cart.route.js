import express from "express" ;
import "../middleware/auth.js";
import { addToCart,fetchCart,deleteCart} from "../controller/cart.controller.js";

const router = express.Router();
router.delete("/:userId/:productId",deleteCart)
router.post("/addTocart",addToCart);
router.get("/:userId",fetchCart);
export default router;
