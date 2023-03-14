import cartModel from "./models/cart.model.js";

export default class Cart {
    constructor() {}

    getAll = async () => {
        try {
            const carts = await cartModel.find().lean().exec();
            return carts;
        } catch (error) {
            console.log('Error to get carts: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            const cart = await cartModel.findById(id).populate('products.id').lean().exec();
            return cart;
        } catch (error) {
            console.log('cart not found');
        }
    }

    create = async (cart) => {
        try {
            const result = await cartModel.create(cart);
            return result;
        } catch (error) {
            console.log('Error to create product: ' + error);
        }
    }

    addProduct = async (id, pid, quantity) => {
        try {
            const cart = await cartModel.findById(id);
            const idx = cart.products.findIndex(prod => prod.id == pid);
            if (idx != -1) {
                cart.products[idx].quantity = quantity;
            } else {
                cart.products.push({ id: prodID, quantity: quantity })
            }
            return await cart.save();
        } catch (error) {
            console.log('Error cart not found');
        }
    }

    update = async (id, newProducts) => {
        try {
            const cart = await cartModel.findById(id);
            cart.products = newProducts;
            return await cart.save();
        } catch (error) {
            console.log('Error mongo: Cart not found');
        }
    }

    updateProduct = async (id, pid, quantity) => {
        try {
            const cart = await cartModel.findById(id);
            const idx = cart.products.findIndex(prod => prod.id == pid);
            if (idx != -1) {
                cart.products[idx].quantity = quantity;
            } else {
                return { status: 'ERROR', error: 'mongo: Product not found' }
            }
            return await cart.save();
        } catch (error) {
            console.log('Error to update product in mongo: ' + error);
        }
    }

    delete = async (id) => {
        try {
            const result = await cartModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    clearCart = async (id) => {
        try {
            const cart = await cartModel.findById(id);
            cart.products = [];
            return await cart.save();
        } catch (error) {
            console.log('cart not found');
        }
    }

    deleteOneProduct = async (id, pid) => {
        try {
            const cart = await cartModel.findById(id);
            const idx = cart.products.findIndex(p => p.id == pid);
            if (idx < 0) return { status: 'Error', error: 'product not found' };
            if (idx == 0 && cart.products.length == 1) {
                cart.products = [];
            } else {
                cart.products = cart.products.slice(idx, 1);
            }
            return await cart.save();
        } catch (error) {
            console.log('Error delete one product in mongo: ' + error);
        }
    }
}