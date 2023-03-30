import { MockService } from "../../repository/index.js";

export const getAll = async (req, res)=>{
    try {
        const products = MockService.getAll();
        
        const user = req.user?.user || {};

        return res.render('home', {
            user,
            role: (user?.role == 'admin'),
            style: 'home.css',
            data: products
        });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

