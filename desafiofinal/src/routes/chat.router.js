import { Router } from 'express';
import msgModel from '../dao/mongo/models/messages.model.js';

const router = Router();


router.get('/', async (req, res) => {
    const messages = await msgModel.find().lean().exec();

    req.io.on('connection', socket => {
        console.log('new cliente connected');
    
        socket.on('messagein', async data => {
            const messageGenerated = await msgModel.create(data);
            console.log(messageGenerated);
    
            messages.push(data)
            req.io.emit('messageout', messages)
        })
    })

    res.render('chat', {
        style: 'chat.css'
    })
})


export default router;