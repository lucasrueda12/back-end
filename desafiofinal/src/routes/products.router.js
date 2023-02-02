import { Router } from 'express';
//import ProductManager from '../manager/ProdMger.js';
import prodModel from '../dao/models/products.model.js';

const router = Router();
//const productManager = new ProductManager('products.json');

router.get('/', async (req, res) => {
    try {
        let limit = req.query?.limit ?? 10;
        let page = req.query?.page ?? 1;
        let filter = req.query?.filter ?? '';
        let sortQuery = req.query?.sort ?? '';
        let sortQueryOrder = req.query?.sortOrder ?? 'desc';
        const search = {}
        if(filter){
            search.title = filter
        }

        const sort = {}
        if(sortQuery){
            sort.sortQuery = sortQueryOrder;
        }

        const options ={
            limit,
            page,
            sort,
            lean: true
        }

        const products = await prodModel.paginate(search, options);

        return res.render('home', {
            style: 'home.css',
            data: products.docs
        });
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        console.log(pid);
        const prod = await prodModel.findById(pid);
        res.send({ status: 'successful', payload: prod })
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        console.log(product.thumbnails);

        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = new prodModel(product);
        await productAdded.save();
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

router.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const update = req.body;
        const prod = await prodModel.findById(pid).lean().exec();
        const result = await prodModel.updateOne({ title: prod.title }, update);

        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('ERROR: ', error);
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await prodModel.deleteOne({ id: pid });
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('ERROR: ', error);
    }

})

export default router;
