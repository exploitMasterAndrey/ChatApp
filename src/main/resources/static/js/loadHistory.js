async function loadHistory() {
    const res = await fetch('http://localhost:8080/getHistory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'myName': userFrom.username,
            'friendName': userTo.username
        },
    })
    const history = await res.json()

    if (history.length > 0) {
        const chat_history_div = document.getElementById('chat_history_div')

        chat_history_div.innerHTML = ''
        chat_history_div.insertAdjacentHTML('beforeend', `
    <ul id="chat_history_ul" class="m-b-0"></ul>
    `)

        history.forEach(message => renderMessage(message))
    }
}

function renderMessage({id, sender, message, time}) {
    const chat_history_ul = document.getElementById('chat_history_ul')

    if (sender.username !== userTo.username) {
        chat_history_ul.insertAdjacentHTML('beforeend', `
        <li id="${id}" class="clearfix">
                            <div class="message-data text-right">
                                <span class="message-data-time"><button type="button" class="btn btn-warning" onclick="deleteMessage(${id})"><i class="bi bi-trash"></i></button> <button type="button" class="btn btn-primary" onclick="updateMessage(${id})"><i class="bi bi-pen"></i></button> ${time}</span>
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">
                            </div>
                            <div class="message other-message float-right"> ${message} </div>
                        </li>       
    `)
    } else {
        chat_history_ul.insertAdjacentHTML('beforeend', `
        <li id="${id}" class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">${time}</span>
                            </div>
                            <div class="message my-message">${message}</div>
                        </li>
        `)
    }

}

const myModal = new bootstrap.Modal(document.getElementById('modal'))

let chosenMessageId = -1;

async function deleteMessage(id) {
    const res = await fetch('http://localhost:8080/deleteMessage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'id': id
        },
    })

    loadHistory()
}

async function updateMessage(id) {
    myModal.show()
    chosenMessageId = id
    const res = await fetch('http://localhost:8080/getMessage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'id': id
        },
    })

    const messageObject = await res.json()

    const input = document.getElementById('updateMessageInput')
    input.value = messageObject.message

}

async function confirmUpdate() {
    const input = document.getElementById('updateMessageInput')
    const modifiedText = input.value

    // const res = await fetch('http://localhost:8080/updateMessage', {
    //     method: 'PUT',
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'id': chosenMessageId,
    //         'text': modifiedText
    //     },
    // })

    var updateQuery = {
        "url": "http://localhost:8080/updateMessage" ,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "id": chosenMessageId,
            "text": modifiedText
        },
    };
    console.log()

    $.ajax(updateQuery).done(function (response) {
        console.log(response)
        chosenMessageId = -1
        closeModal()
        loadHistory()
    });
}

function closeModal() {
    myModal.hide()
}

