
const messages = [
    {
        from: "Natalie",
        text: "fdsjfkdslfjds"
    },
    {
        from: "Mike",
        text: "Hey there"
    }
];

const $messageContainer = $("#direct-message-container")

$(() => {
    renderAllMessages();
})

// window.addEventListener("load", () => {
//     renderAllMessages();
// })

function renderAllMessages() {
    for(const message of messages) {
        $messageContainer.append(renderMessage(message));
    }
}

function renderMessage(message) {
    // const messageDiv = document.createElement("div");
    // messageDiv.textContent = message.from + ": " + message.text;
    // return messageDiv;
    return $('<li class="list-group-item">' + message.from + ": " + message.text + "</li>");
}