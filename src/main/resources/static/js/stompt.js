let stompClient


function connect() {
    if (userFrom){
        console.log(userFrom)
        var socket = new SockJS('/chat-example')
        stompClient = Stomp.over(socket)

        stompClient.connect({}, onConnected, onError)
    }
}

function sendMessage(event) {
    const messageInput = document.getElementById('message_input')
    const messageContent = messageInput.value.trim()

    if (messageContent && stompClient){
        const chatMessage = {
            sender: userFrom,
            receiver: userTo,
            message: messageContent,
            time: new Date()
        }
        if (userFrom.id < userTo.id)
            stompClient.send("/app/chat.send/" + userFrom.id + "/" + userTo.id, {}, JSON.stringify(chatMessage))
        else
            stompClient.send("/app/chat.send/" + userTo.id + "/" + userFrom.id, {}, JSON.stringify(chatMessage))

        messageInput.value = ''
    }
    event.preventDefault()
}

function onMessageReceived (payload) {
    const message = JSON.parse(payload.body)
    renderMessage(message)
}

function onConnected() {
    if (userFrom.id < userTo.id)
        stompClient.subscribe('/topic/' + userFrom.id + '/' + userTo.id, onMessageReceived)
    else
        stompClient.subscribe('/topic/' + userTo.id + '/' + userFrom.id, onMessageReceived)
}

const onError = () => {
    console.log("ERROR DURING CONNECTION...")
}
