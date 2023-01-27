import { Router } from 'express';
//import ProductManager from '../manager/ProdMger.js';
import prodModel from '../dao/models/products.model.js';

const router = Router();
//const productManager = new ProductManager('products.json');

router.get('/', async (req, res)=>{
    try {
        let limit = req.query.limit;
        const products = await prodModel.find().lean().exec();
        if(!limit){
            return res.render('home',{ products });
        }
        limit = limit < products.length ? limit : products.length;
        const arr = [];
        for(let i=0; i<limit; i++){
            arr.push(products[i]);
        }
        return res.render('home', { arr });
        
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.get('/realtimeproducts', async (req, res)=>{
    try {
        const products = await prodModel.find().lean().exec();
        res.render('realTimeProducts', {
            data: products
        })
    } catch (error) {
        console.log("Error: ", error);
    }
})

router.get('/:pid', async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const prod = await prodModel.findOne({id: pid}).lean().exec();
        res.send({status: 'successful', payload: prod})
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.post("/", async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await prodModel.create(product)
        req.io.emit('updatedProducts', await prodModel.find().lean().exec());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
})

router.put('/:pid', async (req, res) =>{
    try {
        const pid = parseInt(req.params.pid);
        const update = req.body;

        const result = await prodModel.find({id: pid}, update);
        req.io.emit('updatedProducts', await prodModelModel.find().lean().exec());

        res.send({status: 'successful', payload: result});
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.delete('/:pid', async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const result = await prodModel.deleteOne({id: pid});
        req.io.emit('updatedProducts', await prodModel.find().lean().exec());
        res.send({status: 'successful', payload: result});
    } catch (error) {
        console.log('ERROR: ', error);
    }

})


/* io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('post', async data =>{
        try {
            const generatedProd = new prodModel(data);
            await generatedProd.save();
    
            io.emit('post', prodModel.find().lean().exec())
        } catch (error) {
            console.log('ERROR: ', error);
        }
    })
    socket.on('delete', async data =>{
        try {

            const result = await prodModel.deleteOne({id: data})
            io.emit('delete', await prodModel.find().lean().exec())
        } catch (error) {
            console.log('ERROR: ', error);
        }
    })
}) */

export default router;
