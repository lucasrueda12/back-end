import { DB } from "../dao/factory.js";
import DBRepository from "./db.repository.js";

export const userService = new DBRepository(new DB.user());
export const cartService = new DBRepository(new DB.cart());
export const productService = new DBRepository(new DB.products());
export const messageService = new DBRepository(new DB.message());
