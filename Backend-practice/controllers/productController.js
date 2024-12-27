import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};


export const getProduct = async (req, res)=>{
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({
      status:"success",
      data:{
        product
      }
    }) 
    
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
}

export const addProduct = async(req,res)=>{
  try {

    const newProduct = await Product.create(req.body)

    res.status(200).json({
      status:'success',
      data:{
        products: newProduct
      }
    })

  } catch (error) {
    res.status(404).json({
      status:"error",
      message:error.message
    })
    
  }
}