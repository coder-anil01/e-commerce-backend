import productModel from "../models/productModel.js";

//*************  CREATE   *************//
export const productCreateController = async (req, res) => {
    try {
       const { title, description,image, images, category, price, countInStock, rating, numReviews, isFeatured } = req.body
       if( !title || !description || !image || !images || !category || !price || !countInStock || !rating ){
        return res.status(404).send({error: "Plese fill the required field"})
       }
       const createProduct = await new productModel({title, description, image, images, category, price, countInStock, rating, numReviews, isFeatured}).save()
       res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        createProduct,
       })
    
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Internal server error",
        error,
    })
   }
}

//*************  FETCH   *************//
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            message: "All Product",
            counTotal: products.length,
            products,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message:"Internal server error",
            error,
        })
    }
}

//*************  FETCH   *************//
export const getSingleProductController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(404).send({message: "Product Not Found"})
        }
        const product = await productModel.findById(id).populate('category')
        if(!product){
            return res.status(200).send({message: "Product Not Found"})
        }
        res.status(200).send({
            success: true,
            message: "Single Product",
            product,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message:"Internal server error",
            error,
        })
    }
}

//*************  UPDATE   *************//
export const updateProductController = async(req, res)=> {
    try {
        const{ id } = req.params
        const {title, description, image, images, price, category, countInStock, rating, numReviews, isFeatured} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(id, {title, description, image, images, price, category, countInStock, rating, numReviews, isFeatured},
            {new: true})
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            updateProduct,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        })
    }
}

//*************  DELETE   *************//
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productModel.findByIdAndDelete(id)
        if(!deleteProduct){
            return res.status(404).send({error: "Product not found"})
        }
        res.status(200).send({
            success:true,
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal server error",
            error,
        })
    }
}

//*************  FILTER   *************//
export const filterProductConteroller = async(req, res) =>{
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message:"filtered Product",
            products,
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal server error",
            error,
        })
    }
}

//*************  SEARCH   *************//
export const searchProductController = async(req, res) => {
    try {
        const {keyword} = req.params;
        const products = await productModel.find({
            $or:[
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        });
        res.status(200).send({
            success: true,
            total: products.length,
            products,
        });    
        } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal server error",
            error,
        })
    }
}

//*************  SEARCH   *************//
export const reletedProductController = async(req, res) => {
    try {
        const {pid, cid} = req.params;
        const reletedProduct = await productModel.find({
            category: cid,
            _id: {$ne: pid} //note include
        }).populate("category");
        res.status(200).send({
            success: true,
            total: reletedProduct.length,
            reletedProduct,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal server error",
            error,
        })
    }
}
//*************  Product By Category   *************//
export const productByCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.find({category: id,}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            total: product.length,
            product,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal server error",
            error,
        })
    }
}