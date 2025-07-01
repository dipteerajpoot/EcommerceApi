import { response } from "express";
import { Product } from "../model/product.model.js";


export const saveInBulk = async(request,response,next) =>{
    try{
        let result = await Product.insertMany(request.body);
        return response.status(200).json({message: "Product added"});
    }
    catch(error){
        return response.status(500).json({error:"Internel server error"});
        console.log(error);
    }
}
