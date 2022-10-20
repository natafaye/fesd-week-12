
/*** TEST DATA ***/
const userList = [
    {
        id: 0,
        name: "Mom"
    },
    {
        id: 1,
        name: "Sister"
    }
]

let chatList = []

const loggedInUser = "Natalie";

let chatEditId = null;

// const arrayOfDivs = [
//     <div class="border p-3 m-3">
//         <p>Natalie - How are you?</p>
//         <button class="btn btn-primary">Edit</button>
//         <button class="btn btn-danger ms-2">X</button>
//     </div>,
//     <div class="border p-3 m-3">
//         <p>Mom - Great!</p>
//         <button class="btn btn-primary">Edit</button>
//         <button class="btn btn-danger ms-2">X</button>
//     </div>
// ]

/*** RENDERING ***/

window.addEventListener("load", async () => {
    renderChatList();

    // GET DATA FROM THE API
    const response = await fetch("https://63508d463e9fa1244e48885a.mockapi.io/chats")
    const data = await response.json()
    // Save it in the chatList variable
    chatList = data;
    // render again
    renderChatList();
})

const chatContainer = document.getElementById("chat-container");
const chatTextarea = document.getElementById("chat-textarea");

function renderChatList() {
    // empty out the chat container
    while (chatContainer.firstChild) {
        chatContainer.removeChild(chatContainer.firstChild)
    }

    const arrayOfDivs = chatList.map(chat => renderChat(chat))
    arrayOfDivs.forEach(div => chatContainer.append(div))
}

function renderChat(chatData) {
    const div = document.createElement("div");
    div.classList.add("border")
    div.classList.add("p-3")
    div.classList.add("m-3")

    const p = document.createElement("p");
    p.textContent = chatData.author + " - " + chatData.text;
    div.appendChild(p);

    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.classList.add("btn-primary");
    editButton.textContent = "Edit"
    editButton.addEventListener("click", () => onStartEdit(chatData.id))
    div.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("ms-2");
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", () => onDelete(chatData.id))
    div.appendChild(deleteButton);

    return div;
}

/*** DATA UPDATING ***/

function onStartEdit(idToEdit) {
    chatEditId = idToEdit;

    const chatToEdit = chatList.find(chat => chat.id === idToEdit)

    chatTextarea.value = chatToEdit.text;
}

function onDelete(idToDelete) {
    // Update the data on the front end
    const indexToDelete = chatList.findIndex(chat => chat.id === idToDelete)
    chatList.splice(indexToDelete, 1)

    // TELL THE API
    fetch("https://63508d463e9fa1244e48885a.mockapi.io/chats/" + idToDelete, { method: "DELETE" })

    // Rerender based on the data
    renderChatList();
}

function onSend() {
    // Update the data

    // conditional to check if we should update or make a new one
    if (chatEditId === null) {
        // Make a new chat
        const newChat = {
            id: chatList[chatList.length - 1].id + 1, // little hack
            author: loggedInUser,
            to: "Sister",
            text: chatTextarea.value
        }
        chatList.push(newChat)

        // TELL THE API
        fetch("https://63508d463e9fa1244e48885a.mockapi.io/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChat)
        })
    }
    else {
        // Update the one we're editing
        const chatToUpdate = chatList.find(chat => chat.id === chatEditId)
        chatToUpdate.text = chatTextarea.value

        // TELL THE API
        fetch("https://63508d463e9fa1244e48885a.mockapi.io/chats/" + chatEditId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chatToUpdate)
        })

        // Say we're done editing
        chatEditId = null;
    }

    chatTextarea.value = "";

    // Rerender based on the data
    renderChatList();
}

function onKeypress() {
    if (event.keyCode === 13) {
        onSend();
    }
}
