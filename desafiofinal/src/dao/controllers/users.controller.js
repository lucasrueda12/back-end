import { UserService } from "../../repository";
import CustomError from "../../services/errors/custom_error.js";
import EErrors from "../../services/errors/enumErrors.js";
import { generateUserErrorInfo, generateGetUsersErrorInfo } from "../../services/errors/info.js";

export const getAll = async (req, res) =>{
    const users = await UserService.getAll();
    if (!users){
        CustomError.createError({
            name: 'Get users error',
            cause: generateGetUsersErrorInfo(),
            message: 'Error trying to get users',
            code: EErrors.USER_NOT_FOUND_ERROR
        })
    }
    res.json({ status: 'Success', users});
}

export const getOne = async (req, res) =>{
    const uid = req.params.uid;
    const user = await UserService.getOne(uid);
    if (!user) {
        CustomError.createError({
            name: `Get user id:${uid} error`,
            cause: generateGetUsersErrorInfo(),
            message: 'Error trying to get user',
            code: EErrors.USER_NOT_FOUND_ERROR
        })
    }
    res.json({ status: 'Success', user});

}

export const create = async (req, res) =>{
    const data = req.body;
    const result = await UserService.create(data);
    if (!result) {
        CustomError.createError({
            name: `Create user error`,
            cause: generateUserErrorInfo(data),
            message: 'Error trying to create user',
            code: EErrors.CREATE_USER_ERROR
        })
    }
    res.json({ status: 'Success', result});

    
}

export const update = async(req, res) =>{
    const uid = req.params.uid;
    const data = req.body;
    const result = await UserService.update(uid, data);
    if (!result) {
        CustomError.createError({
            name: `Update user error`,
            cause: generateUserErrorInfo(data),
            message: 'Error trying to update user',
            code: EErrors.USER_NOT_FOUND_ERROR
        })
    }
    res.json({ status: 'Success', result});
}