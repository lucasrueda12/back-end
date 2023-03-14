// express
import express from "express";
// DB
import mongoose from "mongoose";
// socket
//vista
import handlebars from "express-handlebars"
// cookie
import cookieParser from "cookie-parser";
//sessions
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//utils
import config from "./config/config.js";
import __dirname from './utils.js';
import MongoSingleton from "./mongoSingleton.js";

const app = express();

// config engine templates
//handlebars 
/*
    llamamos a .engine('template', template.engine());
    esto define el motor/engine de plantillas/templates 
    para que utilice la que nosotros querramos en este caso handlebars
    que es bastante simple y sensillo
 */
app.engine('handlebars', handlebars.engine());
// seteamos la carpeta donde va a capturar los recursos el motor
app.set('views', __dirname + '/views');
// terminamos de definir la vista
app.set('view engine', 'handlebars');

// especificamos la carpeta public para la pagina
app.use(express.static(__dirname + '/public'));

// transforma la informacion recibida en json por 
// medio de un middleware
app.use(express.json());
// permite recibir indormacion desde la url por medio del body como json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('WSPcookieToken'))

// mongoose
// uri para la app del servidor mongo atlas



app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo_uri,
        dbName: config.mongo_db_name,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: '123456',
    resave: true, // mantiene la session activa
    saveUninitialized: true // guarda cualquier cosa asi sea vacio
}));
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

/**
 * query / consulta
 * una strictquery es una consulta estricta que mediante unos 
 * filtros no deja pasar la informacion o no permite recibirla toda
 */
mongoose.set('strictQuery', false);

/**
 * primer parametro la MONGO_URI del servidor,
 * el segundo parametro es el nombre de la base de datos a conectar,
 * por ultimo un middleware para capturar errores, si aparece un error podemos
 * atajarlo y sino podemos hacer correr el server sin problema,
 * esto sirve para evitar mensajes de errores en consolay afectar al server
 */
const env = () => {
    MongoSingleton.getInstance(app);
}

env();
