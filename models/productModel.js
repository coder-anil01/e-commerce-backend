import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            require: true,
        },
        description:{
            type: String,
            require: true,
        },
        image:{
            type: String,
            require: true,
        },
        images:[{
            type: String,
            require: true,
        },],
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            require: true,
        },
        price:{
            type: Number,
            require: true,
        },
        countInStock:{
            type: String,
            require: true,
        },
        rating:{
            type: String,
            require: true,
        },
        numReviews:{
            type: String,
        },
        isFeatured:{
            type: String,
            default: "Male ,Female"
        },
    },{timestamps: true}
)

export default mongoose.model('products', productSchema)