import { response } from "express";
import { Product } from "../model/product.model.js";


export const saveInBulk = async(request,response,next) =>{
    try{
        let product = request.body;
    let p=   await Product.insertMany(product);
        return response.status(200).json({message: "Product added"});
    }
    catch(error){
                console.log(error);
        return response.status(500).json({error:"Internel server error"});
    }
}


export const list = async(request,response,next)=>{
   try {
    let product = await Product.find();
    if(!product){
        return response.status(403).json({error : "No product found"})
    }
     return response.status(200).json({message : "products : ",product})

   } catch (error) {
        console.log(error);
      return response.status(500).json({error:"Internel server error"});
   } 

}

export const findProductById = async(request,response,next)=>{
   try {
    let product = await Product.findById(request.params.id);
    if(!product){
        return response.status(403).json({error : "No product found",error})
    }
     return response.status(200).json({message : "products : ",product})

   } catch (error) {
     console.log(error);
      return response.status(500).json({error:"Internel server error"});
   } 

}

export const findProdct = async(request,response,next)=>{
    try {
        let {title,category,minPrice,maxPrice} = request.query;   
        let query ={};
        if(title)
            query.titel = {$regex :title,$option:'i'};
        if(category)
            query.category = {$regex:category , $option:'i'};
        if(minPrice || maxPrice)
            query.price ={};
        if(minPrice)
            query.price.$gte = minPrice;
        if(maxPrice)
            query.price.$lte = maxPrice;
        const result = await Product.find(query);
    return response.status(200).json({searchResult : result});
    } catch (error) {
                console.log(error);
         return response.status(500).json({error:"Internel server error"});
    }
}

export const deleteProduct  = async(request,response,next)=>{
    try {
        let result = await Product.deleteOne({_id:request.params.id});
        return response.status(200).json({message:"product deleted"});
    } catch (error) {
        console.log(error);
         return response.status(500).json({error:"Internel server error"});  
    }
}
export const updateProduct  = async(request,response,next)=>{
    try {
        let result = await Product.updateOne({_id:request.params.id});
        return response.status(200).json({message:"product updated"});
    } catch (error) {
        console.log(error);
         return response.status(500).json({error:"Internel server error"});  
    }
}



