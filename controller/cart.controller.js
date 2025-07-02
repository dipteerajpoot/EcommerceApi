import { Cart } from "../model/cart.model.js"
export const addToCart = async (request, response, next) => {
    try {
        let { userId, productId } = request.body;
        let cart = await Cart.findOne({ userId });
        if (cart) {
            let status = await cart.cartItems.some((item) => { return item.productId == productId })
            if (status)
                return response.status(200).json({ message: "Item is allready exist in card" });
            cart.cartItems.push({ productId });
            await cart.save();
            return response.status(201).json({ message: "Item added successfully in cart" })
        }
        else {
            await Cart.create({ userId, cartItems: [{ productId }] });
            return response.status(201).json({ message: "Item added successfully" });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}

//It is optimize and sort cord which working same as above
// export const addToCart = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;
//         await Cart.updateOne({ userId },{ $addToSet: { cartItems: { productId } } },{ upsert: true });
//         return res.status(201).json({ message: "Item added" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }


export const fetchCart = async (request, response, next) => {
    try {
        let { userId } = request.params;
        let cart = await Cart.findOne({ userId }).populate("cartItems.productId").populate("userId");
        return response.status(200).json({ "cart_details": cart })
    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}

export const deleteCart = async (request, response, next) => {
    try {
            let {userId,productId} = request.params;
            let cart = await Cart.findOne({userId});
            if(!cart)
            return response.status(404).json({ message: "Cart not found" });
               
            let status = await cart.cartItems.some((item)=>{return item.productId.toString() === productId});
            if(!status)
                return response.status(403).json({message:"item is not available in card"});
            
            await Cart.updateOne({userId},{$pull:{cartItems:{productId}}});
            
            return response.status(200).json({message:"item removed from cart"})

    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}

