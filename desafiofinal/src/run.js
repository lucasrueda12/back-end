//routes
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import cartRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import prodRouter from './routes/products.router.js';
import sessionRouter from './routes/session.router.js';
import { passportCall } from './utils.js';

const run = (io, app)=>{
    // middleware
    // enviamos el socket por peticion
    app.use((req, res, next) =>{
        req.io = io;
        next();
    })
    
    // routes

    
    app.use('/products', passportCall('jwt'), prodRouter);
    app.use('/api/realtimeproducts', realTimeProductsRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/chat', chatRouter);
    app.use('/session', sessionRouter);
    
    app.get('/', (req, res)=> res.render('home', {style: 'home.css'}))
    //socket
}

export default run;

