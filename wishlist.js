// STATE
let ideas = []
let wishlist = []
// start as empty until we fill them in from the API


async function getIdeas() {
    // Give the query parameter stateCode the value of "NV"
    const URL = "https://developer.nps.gov/api/v1/thingstodo?stateCode=NV&limit=5&api_key=" + NPS_API_KEY

    // Get the response "envelope"
    // await = Don't give me a promise, I'll wait
    // Get the data out of the response "envelope"
    const response = await fetch(URL)
    const data = await response.json()
    // set the state to the list
    ideas = data.data
    // render based on that state
    renderIdeas()
}

const ideasContainer = document.querySelector("#ideas-container")

function renderIdeas() {
    // innerHTML or createElement & appendChild
    ideasContainer.innerHTML = `
        <div>
            ${ideas.map(idea => `
                <p>
                    ${idea.shortDescription}
                </p>
            ` ).join("")}
        </div>
    `
}

// ["<p>fdsfdsfdsfsd</p>", "<p>fdsfdsfds</p>"]

// MAP
//users.map(user => user.name)

// const users = [
//     {
//         id: 0,
//         name: "Natalie"
//     },
//     {
//         id: 1,
//         name: "Michele"
//     }
// ]

// ["Natalie", "Michele"]




async function getWishlist() {
    const response = await fetch("http://localhost:3000/wishlist")
    const data = await response.json()
    wishlist = data
    renderWishlist()
}

const wishlistContainer = document.querySelector("#list-container")

function renderWishlist() {
    wishlistContainer.innerHTML = `
        <ul class="list-group">
            ${wishlist.map(item => `
                <li class="list-group-item" onclick="deleteWishlistItem(${item.id})">${item.text}</li>
            `).join("")}
        </ul>
    `
}

async function deleteWishlistItem(idToDelete) {
    // delete from the backend
    // tradeoffs for waiting and tradeoffs for not waiting
    fetch("http://localhost:3000/wishlist/" + idToDelete, {
        method: "DELETE",
    })

    // delete from the frontend
    const indexToDelete = wishlist.findIndex(item => item.id === idToDelete)
    wishlist.splice(indexToDelete, 1)

    // update the UI based on the state
    renderWishlist()
}


getIdeas()
getWishlist()


const textbox = document.getElementById("textbox")
const select = document.getElementById("priority-select")

async function addToWishlist() {
    const newItemData = {
        text: textbox.value,
        priority: select.value
    }

    // Adding on the backend
    const response = await fetch("http://localhost:3000/wishlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": 
        },
        body: JSON.stringify(newItemData)
    })
    const createdItem = await response.json()

    // Adding on the frontend
    wishlist.push(createdItem)

    // Update the UI
    renderWishlist()
}