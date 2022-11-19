async function loadHistory(){
    const res = await fetch('http://localhost:8080/getHistory', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'myName': userFrom.username,
            'friendName': userTo.username
        },
    })
    const history = await res.json()

    if (history.length > 0){
        const chat_history_div = document.getElementById('chat_history_div')

        chat_history_div.innerHTML = ''
        chat_history_div.insertAdjacentHTML('beforeend', `
    <ul id="chat_history_ul" class="m-b-0"></ul>
    `)

        history.forEach(message => renderMessage(message))
    }
}

function renderMessage({sender, receiver, message, time}){
    const chat_history_ul = document.getElementById('chat_history_ul')

    if (sender.username !== userTo.username){
        chat_history_ul.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
                            <div class="message-data text-right">
                                <span class="message-data-time">${time}</span>
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">
                            </div>
                            <div class="message other-message float-right"> ${message} </div>
                        </li>       
    `)
    }
    else {
        chat_history_ul.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">${time}</span>
                            </div>
                            <div class="message my-message">${message}</div>
                        </li>
        `)
    }

}