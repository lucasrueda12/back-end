// importamos librerias
const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

// routes
const prodRouter = require('./routes/products.router.js');
const cartRouter = require('./routes/carts.router.js');

// configurar servidor
const app = express();
const httpServer = app.listen(8080, ()=> console.log('listening'));
httpServer.on('error', ()=> console.log('Error'));
const io = new Server(httpServer);

// config engine templates
//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
// especificamos la carpeta public para la pagina
app.use(express.static(__dirname + '/public'));

// traemos un route

app.use((req, res, next) =>{
    req.io = io;
    next();
})

app.use('/', prodRouter);
app.use('/api/carts', cartRouter);
/* app.use('/realTimeProducts', realTimeRouter); */

const messages = []

io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('post', data =>{
        prodRouter.post
        io.emit('logs', messages)
    })
    socket.on('delete', data =>{
        messages.push(data)
        io.emit('logs', messages)
    })
})