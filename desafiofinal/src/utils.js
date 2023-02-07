import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt, { hashSync } from 'bcrypt';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname


export const createHash = password =>{
    return bcrypt,hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password);
}