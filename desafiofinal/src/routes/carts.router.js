import { Router } from 'express';
//import CartManager from '../manager/CartMger.js';
import cartModel from '../models/cart.model.js';

const router = Router();
//const cartManager = new CartManager('cart.json');

router.get('/', async (req, res)=>{
    const carts = await cartModel.find().lean().exec();
    
    return res.json({ carts });
})

router.get('/:cid', async (req, res)=>{
    const cid = parseInt(req.params.cid);
    const cart = await cartModel.findOne({id: cid}).lean().exec();
    return res.json({...cart.products});
})

router.post('/', async (req, res)=>{
    const createCart = await cartModel.create();
    res.send({status: 'successful', createCart});
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cartID = parseInt(req.params.cid);
    const prodID = parseInt(req.params.pid);

    const cart = await cartModel.findOne({id: prodID}).lean().exec();

    const idx = cart.products.findIndex(prod => prod.id === prodID);

    if(idx != -1){
        cart.products[idx].quantity++;
    }else{
        cart.products.push({id: prodID, quantity: 1})
    }
    const result = await cartModel.updateOne({id: cartID}, cart);
    res.send({status: 'successful', result})
})

router.delete('/:cid', async (req, res)=>{
    const pid = parseInt(req.params.cid);
    const result = await cartModel.deleteOne({id:cid});
    res.send({status: 'update successful', result});
})

router.delete('/:cid/products/:pid', async (req, res)=>{
    const cartID = parseInt(req.params.cid);
    const prodID = parseInt(req.params.pid);

    const cart = await cartModel.findOne({id: prodID}).lean().exec();

    const idx = cart.products.findIndex(prod => prod.id === prodID);
    let newcart;
    if(idx != -1){
        cart.products.slice(idx, 1);
    }
    const result = await cartModel.updateOne({id: cartID}, cart);
    res.send({status: 'successful', result})
})

export default router;