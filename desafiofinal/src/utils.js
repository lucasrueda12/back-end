import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { PRIVATE_KEY, JWT_COOKIE_NAME } from './config/credentials.js';
import UserDTO from './dao/DTO/user.dto.js';
import { faker } from '@faker-js/faker'

faker.locale = 'es'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//genera el jwt Token
export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    console.log(token);
    return token;
}

// recoje el token de la cookie y ve si existe y si esta autorizado
export const authToken = (req, res, next) => {
    const token = req.cookies[JWT_COOKIE_NAME];

    if (!token) return res.status(401).render('errors/base', { error: "Not Auth" });

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).render('errors/base', { error: "Not authorizad" })

        req.user = credentials.user;
        next();
    })
}

//extrae la cookie
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null;
}

// Crea una password
export const createHash = password => {
    return bcrypt, hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

// PASSPORT CALL
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).render('errors/base', { error: info.messages ? info.messages : info.toString() })
            };
            req.user = user;
            next();
        })(req, res, next)
    }
}

// VALIDATE AUTHORIZATION
export const authorization = (role) => {
    return async (req, res, next) => {
        const user = req.user.user;
        if (!user) return res.status(401).send({ error: "Unauthorized" });
        if (user.role != role) return res.status(403).send({ error: 'No Permission' })
        next();
    }
}

export const productsMock = (cant) =>{
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(generateProduct());
    }
    return products;
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: true,
        stock: faker.random.numeric(1),
        category: faker.commerce.productMaterial(),
        thumbnails: [faker.image.imageUrl()],
    }
}