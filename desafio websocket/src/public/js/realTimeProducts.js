let socket = io();
const prodBox = document.getElementById('products');
const deleteForm = document.getElementById('delete');
const addForm = document.getElementById('add');


deleteForm.onclick() = () => {
    if (document.delete.id.value.trim().length > 0) {
        console.log('id:' + document.delete.id.value);
        socket.emit('delete', {
            del: document.delete.id.value
        })
        deleteForm.value = '';
    }
}

addForm.onclick() = () => {
    if (addForm.value.trim().length > 0) {
        socket.emit('post', {
            add: addForm.value
        })
        addForm.value = '';
    }
}


//recibir messages

socket.on('prod', data => {
    const divprods = document.getElementById('products')
    let products = ''

    data.forEach(prod => {
        products += `<div><i>${prod.title}</i></div>`
    });
    divprods.innerHTML = products
})