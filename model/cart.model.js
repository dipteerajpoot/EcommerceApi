import mongoose  from "mongoose";
let cartSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        cartItems:[{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        }]

    }
)

export const Cart = mongoose.model("cart",cartSchema)