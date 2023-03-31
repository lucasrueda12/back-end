//routes
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import cartRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import prodRouter from './routes/products.router.js';
import sessionRouter from './routes/session.router.js';
import mockRouter from './routes/mock.router.js';
import { authorization, passportCall } from './utils.js';
import ErrorHandler from './middleware/error.js'

const run = (io, app)=>{
    // middleware
    // enviamos el socket por peticion
    app.use((req, res, next) =>{
        req.io = io;
        next();
    });
    
    // routes
    app.use('/products', passportCall('jwt'), prodRouter);
    app.use('/api/realtimeproducts', passportCall('jwt'), realTimeProductsRouter);
    app.use('/api/carts', passportCall('jwt'), cartRouter);
    app.use('/api/chat', passportCall('jwt'), chatRouter);
    app.use('/session', sessionRouter);
    app.use('/mockingproducts', mockRouter);

    app.use(ErrorHandler);
    app.get('/', (req, res) => {
        res.redirect('/session/register');
    });
    //socket
}

export default run;

