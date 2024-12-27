import express from 'express'
import { getAllProducts, getProduct,addProduct } from '../controllers/productController.js';

const router = express.Router()


router.route('/').get(getAllProducts)
.post(addProduct)


router.route('/:id').get(getProduct)



export default router


