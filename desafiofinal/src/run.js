//routes
import prodRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';

const run = (io, app)=>{
    // middleware
    // enviamos el socket por peticion
    app.use((req, res, next) =>{
        req.io = io;
        next();
    })
    
    // routes

    app.get('/', (req, res)=> res.render('home', {style: 'home.css'}))
    
    app.use('/api/products', prodRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/chat', chatRouter);
    
    //socket
}

export default run;

