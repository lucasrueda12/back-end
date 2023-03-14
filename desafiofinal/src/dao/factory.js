import config from "../config/config.js";
import mongoose from "mongoose";

export let DB

switch (config.persistence) {
    case 'MONGO':
        console.log('Mongo connecte');    

        const connection = mongoose.connect('mongodb://127.0.0.1:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "MyDB_28"
        })
        const DBMongo = {
                user: await import('./mongo/user.mongo.js'),
                products: await import('./mongo/products.mongo.js'),
                cart: await import('./mongo/cart.mongo.js'),
                message: await import('./mongo/message.mongo.js')
            };
        DB = DBMongo;

        break;
    case 'MEMORY':
        console.log('Persistence with Memory')
        const DBMemory = {
            user: await import('./memory/user.memory.js'),
            products: await import('./memory/products.memory.js'),
            cart: await import('./memory/cart.memory.js'),
            message: await import('./memory/message.memory.js')
        };
        DB = DBMemory; 
        break;
    default:
        break;
}