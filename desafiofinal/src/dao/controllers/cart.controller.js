import CartService from "../services/cart.service.js";

const cartService = new CartService();

export const getAll = async (req, res) =>{
    const carts = await cartService.getAll();
    res.render('carts',
    { 
        titlePage: 'Carts',
        style: 'cart.css',
        carts
    });
}

export const getOne = async (req, res) =>{
    const cid =  req.params.cid;
    const cart = await cartService.getOne(cid);
    return res.render('carts', {
        titlePage: 'Cart',
        style: 'cart.css',
        carts: [cart]
    });
}

export const create = async (req, res) =>{
    const createCart = await cartService.create();
    res.send({status: 'successful', createCart});
}

export const addProduct = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body?.quantity || 1;
    
    const result = await CartService.addProduct(cid, pid, quantity);

    if(!result) return res.status(404).json({status: 'ERROR', error: 'cart not found'})

    res.redirect(`/api/carts/${cid}`);

}
export const update = async (req, res) =>{
    const newProducts= req.body;
    const cid = req.params.cid;
    const cart = await cartService.update(cid, newProducts);
    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});
    res.json({status: 'successful', cart})
}
export const updateProduct = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body?.quantity || 1;

    const cart = await CartService.updateProduct(cid, pid, quantity);
    res.json({status: 'successful', cart})

}
export const deleteCart = async (req, res) =>{
    const cid = req.params.cid;

    const result = await CartService.deleteCart(cid);
    if(!result) return res.status(404).json({status: 'ERROR', error: 'cart not found'})

    res.json({status: 'delete successful', result});
}
export const clearCart = async (req, res) =>{
    const cid = req.params.cid;
    const cart = await CartService.clearCart(cid);
    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});
    res.json({status: 'successful', cart})

}
export const deleteOneProduct = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await CartService.deleteOneProduct(cid, pid);
    if(!cart) return res.status(404).json({status: 'Error', error: 'cart not found'});
    res.json({status: 'successful', cart})
}

