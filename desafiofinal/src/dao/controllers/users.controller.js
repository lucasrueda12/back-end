import { UserService } from "../../repository";

export const getAll = (req, res) =>{
    res.json(UserService.getAll());
}

export const getOne = (req, res) =>{
    const uid = req.params.uid;
    res.json(UserService.getOne(uid));
}

export const create = (req, res) =>{
    const data = req.body;
    res.json(UserService.create(data));
}

export const update = (req, res) =>{
    const uid = req.params.uid;
    const data = req.body;
    res.json(UserService.update(uid, data));
}