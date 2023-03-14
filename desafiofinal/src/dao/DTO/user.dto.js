import { createHash } from "../../utils.js";
import cartModel from "../mongo/models/cart.model.js";

export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = createHash(user.password);
        this.cart = cartModel.create({});
        this.role = "";
    }
}