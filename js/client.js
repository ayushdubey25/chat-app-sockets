
const socket=io('http://localhost:3000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".container") //jab bhi message aayega koi to wo container me jayega
var audio = new Audio('level-up-191997.mp3');
const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();}
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})

const username= prompt("Enter your username to join");
socket.emit('new-user-joined', username);
socket.on('user-joined', username=>{
    append(`${username} joined the chat`,'right')
    

})

socket.on('receive', data=>{
    append(`${data.username}:${data.message}`,'left')
})
socket.on('left', username=>{
    append(`${username} left the chat`,'left')
})