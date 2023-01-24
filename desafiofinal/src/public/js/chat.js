const socket = io();
let user = '';
let chatBox = document.getElementById('chatbox');

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username for the kratos chat',
    inputValidator: value => {
        return !value.trim() && 'Please. Write a username!'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value;
    document.getElementById('username').innerHTML = user
})

chatBox.addEventListener('keyup', event =>{
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {
                user,
                message: chatBox.value,
                date: `${new Date().getHours()}:${new Date().getMinutes()}`
            })

            chatBox.value = '';
        }
    }
})

//recibir messages

socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<div class='bubble'><i class='bubble-user'>${message.user}</i><p class='bubble-message'>${message.message}<span class='hour'>${message.date}</span></p></div>`
    });

    divLog.innerHTML = messages
})