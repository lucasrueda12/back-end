import msgModel from "./models/messages.model.js";

export default class Message{
    constructor(){}

    get = async()=>{
        try {
            const messages = await msgModel.find().lean().exec();
            return messages;
        } catch (error) {
            console.log('Error to have messages: ' + error);
        }
    }

    insert = async(data)=>{
        try {
            const result = await msgModel.create(data);
            return result;
        } catch (error) {
            console.log('Error to create message: ' + error);
        }
    }
}