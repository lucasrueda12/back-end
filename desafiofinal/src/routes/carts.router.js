import { Router } from 'express';
import { addProduct, clearCart, create, deleteCart, deleteOneProduct, getAll, getOne, update, updateProduct } from '../dao/controllers/cart.controller.js';
//import CartManager from '../manager/CartMger.js';

const router = Router();
//const cartManager = new CartManager('cart.json');

router.get('/', getAll);

router.get('/:cid', getOne);

router.post('/', create);

router.post('/:cid/products/:pid', addProduct);

router.put('/:cid', update);

router.put('/:cid/products/:pid', updateProduct);

router.delete('/:cid', deleteCart)

router.delete('/:cid', clearCart);

router.delete('/:cid/products/:pid', deleteOneProduct)

export default router;