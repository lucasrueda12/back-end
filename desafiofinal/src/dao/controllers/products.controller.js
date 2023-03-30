import { ProductService } from "../../repository/index.js";

export const getAll = async (req, res) => {
    try {
        let limit = req.query?.limit ?? 10;
        let page = req.query?.page ?? 1;
        let filter = req.query?.filter ?? '';
        let sortQuery = req.query?.sort ?? '';
        let sortQueryOrder = req.query?.sortOrder ?? 'desc';

        const products = await ProductService.getAll(limit, page, filter, sortQuery, sortQueryOrder);
        
        const user = req.user.user || {};

        return res.render('home', {
            user,
            role: (user?.role == 'admin'),
            style: 'home.css',
            data: products.docs
        });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

export const getOne = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const prod = await ProductService.getOne(pid);
        res.send({ status: 'successful', payload: prod })
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

export const create = async(req, res)=>{
    try {
        const product = req.body;
        const productAdded = await ProductService.create(product);
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
}

export const update = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const update = req.body;
        const result = await ProductService.update(pid, update);
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

export const deleteProd = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const result = await ProductService.delete(pid);
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}