'use strict'

const socket = io()

// Send a message to say that I've connected
socket.emit('newuser', {user: 'Grace Hopper'})

// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (data) => console.log(`${data.user} has connected!`))


// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userName = document.getElementById('userName') // to get message input
var newUser

// -----To do-----------
// sendButton.addEventListener('click', function(){
// 	 if(message.value.length > 0 ){
// 	socket.emit('chat', {
// 		message: message.value,
// 	});
//   }
//   //once the message is sent, reset the innerHTML of the message div to an empty string
// 	message.value = "";
//   });

//   socket.on("chat",function(data){
//     io.sockets.emit("chat",data)
//   });
  


$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const message = messageInput.value    // get the value from the message     
	socket.emit('send-chat-message', message)   // send info from client to server
	messageInput.vlaue = ''      // empty out message each time we sent it

	socket.emit('chatmsg', {msg: event.currentTarget.txt.value})
	event.currentTarget.txt.value = ''
})

