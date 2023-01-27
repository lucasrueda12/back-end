import mongoose from 'mongoose';

const msgCollections = "messages";

const messagesSchema = new mongoose.Schema({
    email: String,
    user: String,
    message: String,
    date: String
});

mongoose.set("strictQuery", false)
const msgModel = mongoose.model(msgCollections, messagesSchema);

export default msgModel;