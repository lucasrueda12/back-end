import { Router } from 'express';
import passport from 'passport';
import { JWT_COOKIE_NAME } from '../config/credentials.js';
import { passportCall, generateToken, authToken, authorization } from '../utils.js';

const router = Router();

//vista para registrar users
router.get('/', (req, res) => {
    res.redirect('/session/register');
});

router.get('/register', (req, res) => {
    res.render('session/register');
});


//api para generar usuarios
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login');
});

router.get('/failregister', (req, res) => {
    console.log('Fail Strategy');
    res.send({ error: 'Failed' });
})

//vista de login
router.get('/login', (req, res) => {
    res.render('session/login');
})

//api para login con jwt
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    //cookie del token
    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
})

router.get('/faillogin', (req, res) => {
    console.log('Fail Strategy');
    res.send({ error: 'Fail login' });
})

router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email']}),
    async(req, res) => {}
);

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    async(req, res)=>{
        console.log('callback', req.user);

        req.session.user = req.user
        console.log('user session: ', req.session.user);
        //jwt cookie con el github
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
    }
);


// cerrar session
router.get('/logout', (req, res) => {
    // borra la cookie
    res.clearCookie(JWT_COOKIE_NAME).redirect('home');
});

router.get('/private', passportCall('jwt'), authorization('user'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'user'});
});

router.get('/secret', passportCall('jwt'), authorization('admin'), (req, res)=>{
    res.send({status: 'success', payload: req.user, role: 'ADMIN'});
});

router.get('/current', passportCall('jwt'), authorization('user'), (req, res)=>{
    console.log('get: ', UserDTO(req.user.user).getCurrent());
    res.render('session/profile', {
        user: UserDTO(req.user.user).getCurrent()
    })
})

export default router;