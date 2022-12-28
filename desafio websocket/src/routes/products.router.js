const express = require('express');

const router = express.Router();
const ProductManager = require('../manager/ProdMger.js')

const productManager = new ProductManager('products.json');

router.get('/', async (req, res)=>{
    let limit = req.query.limit;
    const products = await productManager.get();
    if(!limit){
        res.render('index', {
            style: 'index.css',
            arr: products
        });
        req.io.emit('prod', products);
    }else{
        limit = limit < products.length ? limit : products.length;
        const arr = [];
        for(let i=0; i<limit; i++){
            arr.push(products[i]);
        }
        res.render('index', {
            style: 'index.css',
            arr
        });
        req.io.emit('prod', arr);
    }
})

router.get('/realtimeproducts', async (req, res) =>{
    const products = await productManager.get();
    res.render('realTimeProducts', 
    {
        title: "Lista de Productos",
        products: products
    })
})

router.get('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const prod = await productManager.getbyId(pid);
    if(prod == -1) return res.status(404).send(`product not found`);
    req.io.emit('prod', prod);
    return res.json(prod);
})

router.post('/', async (req, res)=>{
    const prod = req.body;
    const prodAdd = await productManager.add(prod);
    req.io.emit('prod', await productManager.get());
    res.send({status: 'successful', prodAdd})
})

router.put('/:pid', async (req, res) =>{
    const pid = parseInt(req.params.pid);
    const update = req.body;

    const prod = await productManager.getbyId(pid);
    
    if(prod == -1) return res.status(404).send(`product not found`);
    
    for(const prop in update){
        prod[prop] = update[prop];
    }
    
    await productManager.update(pid, prod);
    req.io.emit('prod', await productManager.get());
    res.send({status: 'update successful', prod});
})

router.delete('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const nlist = await productManager.delete(pid);
    if(!nlist) return res.status(404).send(`product not found`);
    req.io.emit('prod', await productManager.get());
    res.send({status: 'update successful', nlist});
})

module.exports = router;

