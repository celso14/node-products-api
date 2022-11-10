import { Router, Request, Response } from 'express';
import * as ProductController from '../controllers/product.controller';
import * as ProviderController from '../controllers/provider.controller';



const router = Router();


//Test Endpoint
router.get('/', (req:Request, res:Response) => {
    res.send("hello World");
});

//Products Endpoints
router.get('/product/all', ProductController.allProducts);
router.post('/product/add', ProductController.addProduct);
router.delete('/product/remove', ProductController.removeProduct);
router.put('/product/update', ProductController.updateProduct);


//Providers Endpoints
router.get('/provider/all', ProviderController.allProviders);
router.post('/provider/add', ProviderController.addProvider);
router.delete('/provider/remove', ProviderController.removeProvider);
router.put('/provider/update', ProviderController.updateProvider);



export default router;