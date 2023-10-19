
// STATE (Data)

let movieList = [] // data starts as empty
let reviewList = []

// INITIAL LOADING

// render when the page first loads in
async function initialLoad() {
    // put that data into state (movieList variable)
    movieList = await fetchMovieList()
    reviewList = await fetchReviewList()
    renderMovieList()
    renderReviewList()
}
initialLoad()

// RENDERING

const moviesContainer = document.getElementById("movies-container")

function renderMovieList() {
    // Build a string of HTML, set it in the innerHTML property, which parses it into actual HTML
    moviesContainer.innerHTML = movieList.map(movie => `
        <div>
            <h4>${movie.title}</h4>
            <p>${movie.genreId}</p>
        </div>
    `).join("")

    // This does the same thing as the above code
    // const div = document.createElement("div")
    // const movieHeading = document.createElement("h4")
    // movieHeading.textContent = movie.title
    // div.appendChild(movieHeading)
    // const genreParagraph = document.createElement("p")
    // genreParagraph.textContent = movie.genreId
    // div.appendChild(genreParagraph)
    // moviesContainer.appendChild(div)
}

const reviewsContainer = document.getElementById("reviews-container")

function renderReviewList() {
    // Clear out any reviews from last time we rendered
    reviewsContainer.innerHTML = ""
    // Loop through all the reviews, call renderReview, get the div and append that div to the reviewsContainer
    reviewList.forEach(review => reviewsContainer.appendChild(renderReview(review)))
}

function renderReview(review) {
    const deleteReview = async () => {
        // updating the data on the backend
        await deleteReviewFromAPI(review.id)
        // updating the data on the frontend
        const indexToDelete = reviewList.indexOf(review)
        reviewList.splice(indexToDelete, 1)
        // updating the UI to match the data on the frontend
        renderReviewList()
    }

    const div = document.createElement("div")
    div.innerHTML = `
        <h6>${movieList.find(movie => movie.id === review.movieId).title}</h6>
        <p>${review.text}</p>
        <button class="btn btn-danger" id="delete-button">Delete</button>
    `
    // look inside the div for the button
    div.querySelector("#delete-button").addEventListener("click", deleteReview)

    return div
}

// FETCHING

async function fetchMovieList() {
    const response = await fetch("http://localhost:3000/movies")
    const data = await response.json()
    return data
}

async function fetchReviewList() {
    const response = await fetch("http://localhost:3000/reviews")
    const data = await response.json()
    return data
}

async function deleteReviewFromAPI(idToDelete) {
    const response = await fetch("http://localhost:3000/reviews/" + idToDelete, {
        method: "DELETE"
    })
}