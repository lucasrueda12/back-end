//routes
import prodRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';

// middleware

app.use((req, res, next) =>{
    req.io = io;
    next();
})

// routes

app.use('/api/products', prodRouter);
app.use('/api/realTimeProducts', prodRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

//socket