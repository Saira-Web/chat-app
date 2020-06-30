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


// +++++Variable declaration for each element +++++
const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $userName = document.getElementById('userName') // to get message input
const $chatName = document.getElementById("chatName")
var newUser

// +++++Eventlistener for New user, execute whenever SUBMIT EVENT occurs+++++
$userName.addEventListener('submit',(event)=>{
	event.preventDefault();
	newUser=event.currentTarget.user.value;
	console.log(newUser)

	socket.emit('username', { name: event.currentTarget.user.value})
}
)

socket.on('username', (data) =>{
	console.log(`Welcome: ${data.name}`)
	$chatName.innerHTML = ` Welcome: ${data.name}`
})
//+++++ NEW USER functionality ends here +++++


// +++++ Event listener for incoming message +++++
$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
	 // get the value from the message     
 	// send info from client to server
	socket.emit('chatmsg', {msg: event.currentTarget.txt.value
	})
     // empty out message each time we sent it
	event.currentTarget.txt.value = ''
})

socket.on('chatmsg', (data)=> {
	console.log('${data.user} : ${data.msg}')
	const newMessage = document.createElement('p')
	$msgList.appendChild(newMessage)
	newMessage.textContent=data.msg
	
})
// +++++ Incoming MESSAGE functionality ends here +++++