import mongoose from 'mongoose';

const msgCollections = "messages";

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String,
    date: String
});

const msgModel = mongoose.model(msgCollections, messagesSchema);

export default msgModel;