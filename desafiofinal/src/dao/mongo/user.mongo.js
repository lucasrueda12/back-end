import userModel from "./models/user.model.js";

export default class User {
    constructor() { }

    getAll = async () => {
        try {
            const users = await userModel.find().lean().exec();
            return users;
        } catch (error) {
            console.log('Error to have users: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            const user = await userModel.findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log('Error to have user: User not found');
        }
    }

    getByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email }).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    create = async (newUser) => {
        try {
            const user = await userModel.findOne({ name: newUser.name });
            if (user) return user;
            const result = await userModel.create(newUser);
            return result;
        } catch (error) {
            console.log('Error to create user: ' + error);
        }
    }

    update = async (id, updUser) => {
        try {
            const result = await userModel.findOneAndUpdate(
                { _id: id }, // Busca el usuario con este email
                { password: updUser.password }, // Actualiza el campo "name" con este valor
                { new: true } // Devuelve el documento actualizado en lugar del original
            )
                .then(updatedUser => {
                    console.log('Usuario actualizado:', updatedUser);
                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
            return result;
        } catch (error) {
            console.log('Error in update mongo: ' + error);
        }
    }
}
