import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'products',
              require: true,
            },
        price:{
            type: Number,
            require: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        status:{
            type:String,
            default: "Processing",
        },
        payment:{
            type: String,
            default: "Cash On Delivery",
        }
        
    },{timestamps: true}
)

export default mongoose.model('order', orderSchema)