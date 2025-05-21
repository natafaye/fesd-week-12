
// STATE
let messageList = []

// If you don't need the results on the next few lines, then a Promise is fine, no need to wait
// If you need the results on the next linse, then you don't want a Promise, you need to await the async function
// fetch is async

async function loadMessagesData() {
    // Get the data from the backend
    const response = await fetch("http://localhost:3000/messages")
    const fetchedData = await response.json()
    // Save the data in state
    messageList = fetchedData
    // Show the data in the page
    renderMessageList()
}
loadMessagesData()

const messagesListDiv = document.getElementById("messages-list")
const newMessageTextarea = document.getElementById("new-message-text")

function renderMessageList() {
    // Clear it out so we never get duplicates
    messagesListDiv.innerHTML = ""
    // loop over messageList and put HTML in messagesList div
    for (const message of messageList) {
        const div = document.createElement("div")
        div.textContent = `${message.username}: ${message.text} sent at ${message.sent}`
        messagesListDiv.appendChild(div)
    }
}


async function handleSend() {
    const newMessage = {
        username: "natalie",
        sent: Date.now().toString(),
        read: false,
        text: newMessageTextarea.value
    }
    newMessageTextarea.value = ""

    // create on backend
    const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage)
    })
    const newlyCreatedMessage = await response.json()
    console.log(newlyCreatedMessage)

    // create on frontend = add to state, re-render
    messageList.push(newlyCreatedMessage)
    renderMessageList()

    
}
