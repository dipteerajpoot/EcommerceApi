import express from "express";
import { saveInBulk,list,findProductById,findProdct,updateProduct,deleteProduct} from "../controller/product.controller.js";
    const router = express.Router();

router.use("/save_bulk",saveInBulk)
router.delete("/delete/:id",deleteProduct);
router.patch('/update/:id',updateProduct);
router.get("/search",findProdct)
router.get("/:id",findProductById);
router.get("/",list);
export default router;
