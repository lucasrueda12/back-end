import { Router } from 'express';
import { create, deleteProd, getAll, getOne, update } from '../dao/controllers/products.controller.js';
//import ProductManager from '../manager/ProdMger.js';
const router = Router();
//const productManager = new ProductManager('products.json');

router.get('/', getAll);

router.get('/:pid', getOne);

router.post("/", create);

router.put('/:pid', update);

router.delete('/:pid', deleteProd);

export default router;
