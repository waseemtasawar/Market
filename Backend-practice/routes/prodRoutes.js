import express from 'express'
import { getAllProducts, getProduct,addProduct,updateProduct ,deleteProduct} from '../controllers/productController.js';

const router = express.Router()


router.route('/').get(getAllProducts)
.post(addProduct)


router.route('/:id').get(getProduct)
.patch(updateProduct)
.delete(deleteProduct)



export default router


