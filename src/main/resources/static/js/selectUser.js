async function selectUser(id){
    const res = await fetch('http://localhost:8080/findUser', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'id': id
        },
    })
    const user = await res.json()
    userTo = user
    renderChat(user)

    connect()
}


function renderChat({username}){
    const chat = document.getElementById('chat')
    const chat_header = document.getElementById('chat_header')

    chat_header.innerHTML = ''

    let createMessageGroup = document.getElementById('createMessage')
    if (createMessageGroup != null) {
        chat.removeChild(createMessageGroup)
    }

    chat_header.insertAdjacentHTML('beforeend', `
        <a data-toggle="modal" data-target="#view_info">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">
        </a>
        <div class="chat-about">
            <h6 class="m-b-0">${username}</h6>
            <small>Online</small>
        </div>
    `)

    chat.insertAdjacentHTML('beforeend', `
        <div id="createMessage" class="chat-message clearfix">
                    <div class="input-group mb-0">
                        <div class="input-group-prepend">
                            <span id="send_message_button"  class="input-group-text"><i class="fa fa-send"></i></span>
                        </div>
                        <input id="message_input" type="text" class="form-control" placeholder="Enter text here...">                                    
                    </div>
                </div> 
    `)

    document.querySelector('#send_message_button').addEventListener('click', sendMessage)

    loadHistory()
}