
const chatContainer = document.getElementById("chat-container");
const chatTextarea = document.getElementById("chat-textarea");
const sendButton = document.getElementById("send-button");
const contactContainer = document.getElementById("contact-container");


/**** Data ****/

const contactList = [
    {
        id: 0,
        name: "Mom"
    },
    {
        id: 1,
        name: "Sister"
    }
]

const chatList = [
    {
        id: 5,
        author: "Natalie",
        to: "Mom",
        text: "How are you?"
    },
    {
        id: 7,
        author: "Mom",
        to: "Natalie",
        text: "Great!"
    },
    {
        id: 9,
        author: "Sister",
        to: "Natalie",
        text: "Are you here?"
    },
    {
        id: 10,
        author: "Natalie",
        to: "Sister",
        text: "Not yet"
    }
]

let currentContact = contactList[0];

let editChatId = null;


/**** Chat List Rendering ****/

window.addEventListener("load", () => {
    renderChatList();
    renderContactList();
})

function renderChatList() {
    // empty out the chat container
    while(chatContainer.firstChild) {
        chatContainer.removeChild(chatContainer.firstChild)
    }

    // FANCY ADD IN: filter to show only the chats for the current contact
    const currentContactChats = chatList.filter(chat => chat.author === currentContact.name || chat.to === currentContact.name)

    // fill it with one div for each chat object in the chat list array
    const arrayOfDivs = currentContactChats.map(chatData => renderChat(chatData))
    arrayOfDivs.forEach(div => chatContainer.appendChild(div))
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
    deleteButton.addEventListener("click", () => onDelete(chatData.id) )
    div.appendChild(deleteButton);

    return div;
}


/**** Contact List Rendering ******/

function renderContactList() {
    // empty out the chat container
    while(contactContainer.firstChild) {
        contactContainer.removeChild(contactContainer.firstChild)
    }
    // fill it with one div for each chat object in the chat list array
    const arrayOfButtons = contactList.map(contact => renderContact(contact))
    arrayOfButtons.forEach(button => contactContainer.appendChild(button))
}

function renderContact(contact) {
    const button = document.createElement("button");
    button.textContent = contact.name;
    button.classList.add("btn")
    button.classList.add("btn-secondary")
    button.addEventListener("click", () => switchCurrentContact(contact))
    return button;
}


/**** Event Listeners ****/

const onSend = () => {
    // TODO: handle saving the editing as well as the creating
    if(editChatId !== null) {
        const chat = chatList.find(chat => chat.id === editChatId);
        chat.text = chatTextarea.value
        // clean up since we're finished editing
        editChatId = null;
        sendButton.textContent = "Send"
    }
    else {
        // make a new chat object and push it into our list of chats
        chatList.push({
            id: chatList[chatList.length - 1].id + 1, // little hack
            text: chatTextarea.value,
            to: currentContact.name,
            author: "Natalie"
        })
    }
    
    // rerender our chat list
    renderChatList();
    // clear out the textarea
    chatTextarea.value = ""
}

const onTextareaType = () => {
    if(event.keyCode === 13) {
        onSend()
    }
}

const onStartEdit = (idToEdit) => {
    const chat = chatList.find(chat => chat.id === idToEdit);
    // get the form ready for the user to edit the data in
    chatTextarea.value = chat.text;
    // For fun, change the text of the button
    sendButton.textContent = "Update"
    // Say which chat we're editing
    editChatId = idToEdit;
}

const onDelete = (idToDelete) => {
    const indexToDelete = chatList.findIndex(chat => chat.id === idToDelete);
    chatList.splice(indexToDelete, 1);
    renderChatList();
}

const switchCurrentContact = (contact) => {
    // Switch the current contact
    currentContact = contact;
    renderChatList();
}