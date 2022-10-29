import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
//import * as ProviderController from '../controllers/provider.controller;



const router = Router();


//Endpoints
router.get('/product', ProductController.all);



export default router;