let stompClient


const connect = (event) => {
    if (userFrom){
        const socket = new SockJS("/chat-example")
        stompClient = Stomp.over(socket)

        stompClient.connect({}, onConnected, onError)
    }
    // event.preventDefault()
}

const sendMessage = (event) => {
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
        renderMessage(chatMessage)
    }
    event.preventDefault()
}

const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body)
    renderMessage(message)
}

const onConnected = () => {
    if (userFrom.id < userTo.id)
        stompClient.subscribe('/topic' + userFrom.id + '/' + userTo.id, onMessageReceived)
    else
        stompClient.subscribe('/topic' + userTo.id + '/' + userFrom.id, onMessageReceived)
}

const onError = () => {
    console.log("ERROR DURING CONNECTION...")
}

// const sendMessageButton = document.getElementById('send_message_button')
// sendMessageButton.addEventListener('onclick', sendMessage, true)