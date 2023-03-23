import { User, Product, Cart, Message, Ticket } from "../dao/factory.js";

import ProductRepository from "./prod.repository.js";
import CartRepository from './cart.repository.js';
import UserRepository from "./user.repository.js";
import MessageRepository from "./msg.repository.js";
import TicketRepository from "./ticket.repository.js";

export const TicketService = new TicketRepository( Ticket);
export const UserService = new UserRepository( User);
export const CartService = new CartRepository( Cart);
export const ProductService = new ProductRepository( Product);
export const MessageService = new MessageRepository( Message);
