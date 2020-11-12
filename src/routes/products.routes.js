import {Router} from 'express';
const router = Router();

import * as productsController from '../controllers/products.controller';
import {authjwt } from '../middlewares'

router.post('/',[authjwt.verifyToken,authjwt.isModerator], productsController.createProduct);

router.get('/',productsController.getProducts);

router.get('/:productId',authjwt.verifyToken, productsController.getProductById);

router.put('/:productId',authjwt.verifyToken ,productsController.updateProductById);

router.get('/:productId',authjwt.verifyToken ,productsController.deleteProductById);
    

export default router;