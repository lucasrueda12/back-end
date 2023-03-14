import UserDTO from "../dao/DTO/user.dto.js"

export default class DBRepository {
    constructor(dao) {
        this.dao = dao
    }

    getContacts = async() => {
        const result = await this.dao.get()
        return result
    }

    createContact = async(user) => {
        const userToInsert = new UserDTO(user)
        const result = await this.dao.create(userToInsert)

        return result
    }
}