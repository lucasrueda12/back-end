export const generateUserErrorInfo = user => {
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatgories:
        - first_name: Must be a string. (${user.first_name})
        - last_name: Must be a string. (${user.last_name})
        - email: Must be a string. (${user.email})
    
    `
}

export const generateProductErrorInfo = product =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorias:
        - title: Must be a string. (${product.title})
        - price: Must be a number. (${product.price})
        - description: Must be a string. (${product.description})
        - category: Must be a string. (${product.category})
        - stock: Must be a number. (${product.stock})
        - thumbnails: Must be a array. (${product.thumbnails})
    `
}

export const generateTicketErrorInfo = ticket =>{
    return `
    Uno o mas properties estan incompletos o son invalidos.
    Lista de properties obligatorias:
        - code: Must be a string. (${ticket.code})
        - purchase_datetime: Must be a Date. (${ticket.purchase_datetime})
        - amount: Must be a Number. (${ticket.amount})
        - purchaser: Must be a String (${ticket.purchaser})
    `
}