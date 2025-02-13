
// State
// when you're working wtih a backend, the data starts out empty
let tvShows = []

async function getShows() {
    const response = await fetch("http://localhost:3000/tvshows")
    const data = await response.json()
    // save the data into the state
    tvShows = data
    // re-render with the data
    renderTVShows()
}
// start the app out
getShows()

// Rendering
const showsTable = document.getElementById("shows-table")
function renderTVShows() {
    // clear it out first
    showsTable.innerHTML = ""
    // loop through the state list and show each one
    for(const show of tvShows) {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${show.title}</td>
            <td>${show.genre}</td>
            <td>${show.seasons}</td>
            <td>${show.rating}</td>
            <td><button id="delete-button">Delete</button></td>
        `
        row.querySelector("#delete-button").addEventListener("click", async () => {
            // Update the API (the long term memory)
            const response = await fetch("http://localhost:3000/tvshows/" + show.id, {
                method: "DELETE"
            })
            const data = await response.json()
            // Update the state (the short term memory)
            // this is just javascript unrelated to fetch
            const indexToDelete = tvShows.indexOf(show)
            tvShows.splice(indexToDelete, 1)
            // Re-render
            renderTVShows()
        })
        showsTable.appendChild(row)
    }
}









// async function getTasks() {
//     // I'd like to just wait for the fetch to finish
//     const response = await fetch("https://6621c5cb27fcd16fa6c7e701.mockapi.io/tasks")
//     const data = await response.json() // the .json() method unsmooshifies the data from the response
//     console.log(data)
// }