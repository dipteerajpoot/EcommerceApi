import express from "express";
import { saveInBulk } from "../controller/product.controller.js";
const router = express.Router();

router.use("/save_bulk",saveInBulk)

export default router;
