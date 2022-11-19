async function loadExistedChats(){
    await initLoggedUser()

    const res = await fetch('http://localhost:8080/getAllUserChats')
    const contacts = await res.json()
    contacts.forEach(contact => ChatsToHTML(contact))
}

async function initLoggedUser(){
    const res = await fetch('http://localhost:8080/getLoggedUserCredentials', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    userFrom = await res.json()
}

window.addEventListener('DOMContentLoaded', loadExistedChats)

function ChatsToHTML({id, username}){
    const contacts = document.getElementById('contacts')
    if (id === userFrom.id) return

    contacts.insertAdjacentHTML('beforeend', `
    <li class="clearfix" id="${id}" onclick="selectUser(${id})">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">
        <div class="about">
            <div class="name">${username}</div>
            <div class="status"> <i class="fa fa-circle online"></i> online </div>
        </div>
    </li>  
    `)
}

async function loadLoggedUserCredentials(){
    const res = await fetch('http://localhost:8080/getLoggedUserCredentials', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const user = await res.json()
    return user
}