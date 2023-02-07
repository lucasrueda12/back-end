import { Router } from 'express';
import userModel from '../dao/models/user.model.js';

const router = Router();

//vista para registrar users
router.get('/register', (req, res) =>{
    res.render('sessions/register');
});


//api para generar usuarios
router.post('/register', async (req, res)=>{
    const userNew = {
        first_name: req.body.first_name || '',
        last_name: req.body.last_name || '',
        email: req.body.email || '',
        age: req.body.age || 18,
        password: req.body.password || ''
    };

    userNew.role = (req.body.email == 'adminCoder@coder.com' && req.body.password == 'coderAdmin')? 'admin' : 'user';
    
    console.log(userNew);

    const user = new userModel(userNew);
    await user.save();
    
    console.log(user);

    res.redirect('/session/login');
});

//vista de login
router.get('/login', (req, res) =>{
    res.render('sessions/login');
})

//api para login
router.post('/login', async (req, res) =>{
    const { email, password } = req.body

    const user = await userModel.find({ email: email, password: password }).lean().exec();

    if(!user) return res.status(401).render('errors/base', {
        error: 'email or password invalid'
    })

    req.session.user = user;

    res.redirect('/products');
})

// cerrar session
router.get('/logout', (req, res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).render('errors/base', {error: err})
        res.redirect('/sessions/login');
    })
})


export default router;