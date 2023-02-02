import { Router } from 'express';
//import CartManager from '../manager/CartMger.js';
import cartModel from '../dao/models/cart.model.js';

const router = Router();
//const cartManager = new CartManager('cart.json');

router.get('/', async (req, res)=>{
    const carts = await cartModel.find().lean().exec();
    //res.send(carts);
    return res.render('carts',
    { 
        titlePage: 'Carts',
        style: 'cart.css',
        carts
    });
})

router.get('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const cart = await cartModel.findById(cid).populate('products.id').lean().exec();
    const carts = cart
    return res.render('carts', {
        titlePage: 'Cart',
        style: 'cart.css',
        carts: [carts]
    });
})

router.post('/', async (req, res)=>{
    const createCart = await cartModel.create({});
    res.send({status: 'successful', createCart});
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cartID = req.params.cid;
    const prodID = req.params.pid;
    console.log(prodID);
    const quantity = req.body?.quantity || 1;
    const cart = await cartModel.findById(cartID);

    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});

    const idx = cart.products.findIndex(prod => prod.id == prodID);

    if(idx != -1){
        cart.products[idx].quantity = quantity;
    }else{
        cart.products.push( {id: prodID, quantity: quantity })
    }

    await cart.save();
    //res.json({status: 'successful', cart})
    res.redirect(`/api/carts/${cartID}`);
})

router.put('/:cid', async (req, res)=>{
    const newProducts= req.body;
    const cid = req.params.cid;
    log
    const cart = await cartModel.findById(cid);
    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});
    
    cart.products = newProducts;
    
    await cart.save();

    res.json({status: 'successful', cart})

});

router.put('/:cid/products/:pid', async (req, res) =>{
    const cartID = req.params.cid;
    const prodID = req.params.pid;
    const quantity = req.body?.quantity || 1;
    const cart = await cartModel.findById(cartID);
    const idx = cart.products.findIndex(prod => prod.id == prodID);
    if(idx != -1){
        cart.products[idx].quantity = quantity;
    }else{
        return res.status(404).json({status: 'ERROR', error: 'Product not found'})
    }
    await cart.save();
    res.json({status: 'successful', cart})
});

router.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const result = await cartModel.findByIdAndDelete(cid);

    if(!result) return res.status(404).json({status: 'ERROR', error: 'cart not found'})
    res.json({status: 'update successful', result});
})

router.delete('/:cid', async (req, res) =>{
    const cid = req.params.cid;
    const cart = await cartModel.findById(cid);

    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});

    cart.products = [];
    
    await cart.save();
    
    res.json({status: 'successful', cart})
});

router.delete('/:cid/products/:pid', async (req, res)=>{
    const cartID = req.params.cid;
    const prodID = req.params.pid;

    const cart = await cartModel.findById(cartID);

    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});

    const idx = cart.products.findIndex(p => p.id == prodID);
    console.log(idx);
    if(idx < 0) return res.status(404).json({status: 'Error', error: 'product not found'});
    if(idx == 0 && cart.products.length == 1){
        cart.products = [];
    }else{
        cart.products = cart.products.slice(idx, 1);
    }

    await cart.save();
    res.json({status: 'successful', cart})
})

export default router;