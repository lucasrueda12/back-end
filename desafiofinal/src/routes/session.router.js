import { Router } from 'express';
import passport from 'passport';

const router = Router();

//vista para registrar users
router.get('/register', (req, res) => {
    res.render('sessions/register');
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
    res.render('sessions/login');
})

//api para login
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }

    res.redirect('/products');
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
        res.redirect('/products');
    }
)


// cerrar session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('errors/base', { error: err })
        res.redirect('/sessions/login');
    })
})


export default router;