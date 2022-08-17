
// DATA

// IF YOU'RE USING AN API: have the data start out empty
let movieList = [];

// IF NOT: just hardcode some test data
// const movieList = [
//     {
//         id: 0,
//         name: "Star Wars"
//     },
//     {
//         id: 1,
//         name: "Star Trek"
//     }
// ]

// API STUFF

const fetchAllMovies = async () => {
    // make a GET request and get a response
    const response = await fetch("http://localhost:3001/products")
    // parse out the data from the response
    const data = await response.json();
    // save the data in the movieList variable
    movieList = data;
    // render the list of movies
    renderMovieList()
}

// RENDERING

$(() => {
    // IF YOU'RE USING AN API: get the data from the server and save it in our variable
    fetchAllMovies()

    // IF NOT: just render the array
    // renderMovieList()
})

const $moviesContainer = $("#movies-container")

function renderMovieList() {
    $moviesContainer.empty()
    $moviesContainer.append(movieList.map(movie => renderMovie(movie)))
}

function renderMovie(movie) {
    return $("<tr/>").append(
        $("<td/>").text(movie.name),
        $("<td/>").append(
            $("<button/>").addClass("btn btn-danger me-2").text("Delete").on("click", () => onDeleteButtonClick(movie.id)),
            $("<button>").addClass("btn btn-primary").text("Edit").on("click", () => onStartEditMovie(movie.id))
        )
    )
}

// function renderMovie(movie) {
//     return $("<div/>").addClass("card m-3").append(
//         $("<div/>").addClass("card-body").append(
//             $("<h5/>").addClass("card-title").text(movie.name),
//             $("<button/>").addClass("btn btn-danger me-2").text("Delete").on("click", () => onDeleteButtonClick(movie.id)),
//             $("<button>").addClass("btn btn-primary").text("Edit").on("click", () => onStartEditMovie(movie.id))
//         )
//     )
// }

// EVENT LISTENERS

const movieModal = new bootstrap.Modal('#movie-modal')
const $movieModalTitle = $("#movie-modal-title")
const $nameInput = $("#name-input")

let editMovieId = null;

function onStartCreateMovie() {
    // open the modal
    movieModal.show();
    // change the title of the modal
    $movieModalTitle.text("New Movie")
    // clear the form
    $nameInput.val("")
    // Say that we're creating
    editMovieId = null;
}

function onStartEditMovie(movieId) {
    // get the one that matches that id
    const movie = movieList.find(movie => movie.id === movieId);
    // open the modal
    movieModal.show();
    // change the title of the modal
    $movieModalTitle.text("Edit " + movie.name)
    // Put the movie's current data in the form
    $nameInput.val(movie.name)
    // Say that we're editing this one
    editMovieId = movie.id;
}

function onSaveMovie() {
    // check if we're saving a create or an edit
    if (editMovieId === null) {
        // get the name of the new movie
        // create a new movie and add it to the list
        movieList.push({
            id: movieList[movieList.length - 1].id + 1, // hack
            name: $nameInput.val()
        })
    }
    else {
        // Find the movie we're editing
        const movie = movieList.find(movie => movie.id === editMovieId);
        // Update it with any edited info
        movie.name = $nameInput.val();
    }

    // rerender the list of movies
    renderMovieList();
    // close the modal
    movieModal.hide();
}

function onDeleteButtonClick(movieId) {
    const indexToDelete = movieList.findIndex(movie => movie.id === movieId)
    movieList.splice(indexToDelete, 1);
    renderMovieList();
    // IF YOU'RE USING AN API: also let the backend know
    fetch("http://localhost:3001/products/" + movieId, { method: "DELETE" })
}