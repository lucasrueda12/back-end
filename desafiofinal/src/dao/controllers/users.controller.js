import UserService from "../services/user.service.js";

const userService = new UserService();

export const getAll = (req, res) =>{
    res.json(userService.getAll());
}


export const getOne = (req, res) =>{
    const uid = req.params.uid;
    res.json(userService.getOne(uid));
}


export const create = (req, res) =>{
    const data = req.body;
    res.json(userService.create(data));
}


export const update = (req, res) =>{
    const uid = req.params.uid;
    const data = req.body;
    res.json(userService.update(uid, data));
}