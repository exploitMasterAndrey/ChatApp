async function searchUser(){
    const userList = document.getElementById('contacts')
    userList.innerHTML = ''

    const userNameForSearchInput = document.getElementById('search_user')
    const userName = userNameForSearchInput.value

    const res = await fetch('http://localhost:8080/findUsersByName', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'input': userName
        },
    })
    const foundUsers = await res.json()
    foundUsers.forEach(foundUser => ChatsToHTML(foundUser))
}