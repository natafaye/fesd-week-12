// Data (State)
let flights = []
let passengers = []

async function fetchAndRender() {
    // fetch the flights data from the json-server API
    const response = await fetch("http://localhost:3000/flights")
    const flightsData = await response.json()
    // saving the data in state
    flights = flightsData
    // rendering based on the state
    renderFlights()

    // fetch the flights data from the json-server API
    const passengersResponse = await fetch("http://localhost:3000/passengers")
    const passengersData = await passengersResponse.json()
    // saving the data in state
    passengers = passengersData
    // rendering based on the state
    renderPassengers()

    const mockResponse = await fetch("https://6621c5cb27fcd16fa6c7e701.mockapi.io/tasks")
    const tasksData = await mockResponse.json()
    console.log(tasksData)

    const omdbResponse = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=Anyone`)
    const moviesData = await omdbResponse.json()
    console.log(moviesData)
}

async function addNewPassenger(flightId) {
    const newPassenger = {
        flightId: flightId,
        name: "Jane Doe"
    }
    // create the new passenger on the backend database
    const response = await fetch("http://localhost:3000/passengers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassenger)
    })
    const createdPassengerWithId = await response.json()
    // create the new passenger on the frontend state
    passengers.push(createdPassengerWithId)
    // re-render because the state (frontend data) has updated
    renderPassengers()
}

async function deletePassenger(passengerId) {
    // delete the passenger on the backend database
    await fetch("http://localhost:3000/passengers/" + passengerId, {
        method: "DELETE",
    })
    // delete the passenger on the frontend state
    const indexToDelete = passengers.findIndex(passenger => passenger.id === passengerId)
    passengers.splice(indexToDelete, 1)
    // re-render because the state (frontend data) has updated
    renderPassengers()
}

const flightsContainer = document.getElementById("flight-container")

// Render = render pased on the state
function renderFlights() {
    // clear it out
    flightsContainer.innerHTML = ""
    // put it all in
    for (const flight of flights) {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${flight.name}</td>
            <td>${flight.departureTime}:00pm</td>
            <td><button id="book-button" class="btn btn-primary">Book flight</button></td>
        `
        // grab the button inside the tr and connect the event listsner
        tr.querySelector("#book-button").addEventListener("click", () => {
            addNewPassenger(flight.id)
        })
        flightsContainer.appendChild(tr)
    }
}

const passengersContainer = document.getElementById("passengers-container")

function renderPassengers() {
    passengersContainer.innerHTML = ""
    for (const passenger of passengers) {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${passenger.name}</td>
            <td>${passenger.flightId}</td>
            <td><button id="delete-button" class="btn btn-danger">Delete</button></td>
        `
        // grab the button inside the tr and connect the event listsner
        tr.querySelector("#delete-button").addEventListener("click", () => {
            deletePassenger(passenger.id)
        })
        passengersContainer.appendChild(tr)
    }
}

fetchAndRender()

/* <tr>
    <td>FN3434</td>
    <td>3:00pm</td>
    <td><button>Book flight</button></td>
</tr> */