import mongoose from "mongoose";
import { type } from "os";


const prodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"A product have nust name"],
        
        trim: true 
    },
    category:{
        type: String,
        required: [true,"A product have must category"]
    },
    price:{
        type:Number,
        required:[true, "A Product have must Price"]
    },
    quantity:{
        type: Number, 
    },
    brand:{
        type: String,
        required: [true,"A product have must Brand"]
    },
    rating:{
        type: Number,
        default:0 
    },
    warranty:{
        type: Number,
        default:0
    }

})


const Product = mongoose.model('Product', prodSchema)

export default Product