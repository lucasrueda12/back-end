import config from "../config/config.js";
import mongoose from "mongoose";

export default {};
export let Cart;
export let Message;
export let Product;
export let User;
export let Ticket;

console.log(`PERSISTENCE: ${config.persistence}`);
switch (config.persistence) {
    case 'MONGO':
        console.log('MONGO: ');
        mongoose.connect(config.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongo_db_name
        }, () => console.log('Mongo connected'));
        
        const { default: UserMongo } = import('./mongo/user.mongo.js')
        const { default: ProductMongo } = import('./mongo/product.mongo.js')
        const { default: CartMongo } = import('./mongo/cart.mongo.js')
        const { default: MessageMongo } = import('./mongo/message.mongo.js')
        const { default: TicketMongo } = import('./mongo/ticket.mongo.js');

        Ticket = TicketMongo;
        Product = ProductMongo;
        Message = MessageMongo;
        Cart = CartMongo;
        User = UserMongo;

        break;
    case 'MEMORY':
        console.log('Persistence with Memory');
        const { default: UserFile } = import('./memory/user.memory.js')
        const { default: ProductFile } = import('./memory/products.memory.js')
        const { default: CartFile } = import('./memory/cart.memory.js')
        const { default: MessageFile } = import('./memory/message.memory.js')
        const { default: TicketFile } = import('./memory/ticket.memory.js');
        
        Ticket = TicketFile;
        Product = ProductFile;
        Message = MessageFile;
        Cart = CartFile;
        User = UserFile;
        break;
    default:
        break;
}