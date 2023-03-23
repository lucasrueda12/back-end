import ProductDTO from "../dao/DTO/products.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = async (limit, page, filter, sortQuery, sortQueryOrder) => {
        try {
            const search = {}
            if (filter) {
                search.title = filter
            }

            const sort = {}
            if (sortQuery) {
                sort.sortQuery = sortQueryOrder;
            }

            const options = {
                limit,
                page,
                sort,
                lean: true
            }
            return await this.dao.getAll(search, options);
        } catch (error) {
            console.log('Error in getting service: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            return await this.dao.getOne(id);
        } catch (error) {
            console.log('Product not found');
        }
    }

    create = async (prod) => {
        try {
            const prodToInsert = new ProductDTO(prod);
            const result = await this.dao.create(prodToInsert);
            return result;
        } catch (error) {
            console.log('Error to create service: ' + error);
        }
    }

    update = async (id, newProd) => {
        try {
            const userToInsert = new ProductDTO(newProd);
            const result = await this.dao.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error in update service: ' + error);
        }
    }

    delete = async(pid)=>{
        try {
            return await this.dao.delete(pid);
        } catch (error) {
            console.log('Error to delete service: ' + error);
        }
    }
}