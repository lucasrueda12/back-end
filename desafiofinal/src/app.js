import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import handlebars from "express-handlebars"

//utils
import __dirname from './utils.js';
import run from './run.js';

const app = express();

// config engine templates
//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// especificamos la carpeta public para la pagina
app.use(express.static(__dirname + '/public'));

// recibimos json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose

const uri = 'mongodb+srv://Lucasrueda12:Lucascapo12@cluster0.mthrpne.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect( uri , 
    { dbName: 'ecommerce' },
    (error) =>{
        if(error){
            console.log('No se pudo conectar a la DB');
            return
        }
        // run server
        console.log('DB connected');
        const httpServer = app.listen(8080, ()=> console.log('listening'));
        httpServer.on('error', ()=> console.log('Error'));
        const io = new Server(httpServer);

        run(io, app);
    }
    )
