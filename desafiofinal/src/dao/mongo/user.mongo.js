import userModel from "./models/user.model.js";

export default class User{
    constructor(){}

    getAll = async()=>{
        try {
            const users = await userModel.find().lean().exec();
            return users;
        } catch (error) {
            console.log('Error to have users: ' + error);
        }
    }

    getOne = async(id) =>{
        try {
            const user = await userModel.findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log('Error to have user: User not found');
        }
    }

    create = async(newUser)=>{
        try {
            const user = await userModel.findOne({name: newUser.name});
            const result = await userModel.create(newUser);
            return result;
        } catch (error) {
            console.log('Error to create user: ' + error);
        }
    }

    update = async(id, updUser)=>{
        try {
            const user = await userModel.findById(id);
            const result = await userModel.updateOne({name: user.name}, updUser);
            return result;
        } catch (error) {
            console.log('Error in update mongo: ' + error);
        }
    }
}
