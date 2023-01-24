import { Router } from 'express';
import msgModel from '../models/messages.model.js';

const router = Router();

router.get('/', async (req, res) => {
    messages = await msgModel.find().lean().exec();

    res.render('chat', {
        style: 'chat.css'
    })
})

io.on('connection', socket => {
    console.log('new cliente connected');

    socket.on('message', async data => {
        const messageGenerated = new msgModel(data)
        await messageGenerated.save();
        console.log(messageGenerated);

        messages.push(data)
        io.emit('logs', messages)
    })
})

export default router;