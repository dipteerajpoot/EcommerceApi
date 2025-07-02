import mongoose from "mongoose";
import UserRouter from "./router/user.router.js";
import ProductRouter from "./router/product.router.js";
import cartRouter from "./router/cart.route.js"
import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import cookiParse from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.use(cors());
        app.use(express.static("public"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookiParse());
        app.use("/user", UserRouter);
        app.use("/product",ProductRouter);
        app.use("/cart",cartRouter);
        app.listen(process.env.PORT, () => {
            console.log("server started...");
        });
    })
    .catch(err => {
        console.log("Database not connected", err);
    })
