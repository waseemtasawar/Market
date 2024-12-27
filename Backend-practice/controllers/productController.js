import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const total = await Product.countDocuments(); // Total number of products in the database
    const products = await Product.find().skip(skip).limit(limit); // Fetch paginated products

    res.status(200).json({
      status: "success",
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
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


export const updateProduct = async (req, res)=>{
  try {

      const product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true,
      })
      res.status(200).json({
        status:"success",
        data:{
          product
        }
      })
   
  } catch (error) {
    res.status(404).json({
      status:"error",
      message:error.message
    })
  }
}
export const deleteProduct = async (req, res)=>{
  try {

      const product = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({
        status:"success",
        data:null
      })
   
  } catch (error) {
    res.status(404).json({
      status:"error",
      message:error.message
    })
  }
}