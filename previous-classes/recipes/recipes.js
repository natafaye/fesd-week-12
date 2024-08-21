/*** STATE ***/
// When we're connecting an app to a backend, the state starts out empty
let recipeList = []


/*** FETCHING ***/
// Communicate with the Back-End (get data, send data)

async function fetchRecipeList() {
    // Fetch the recipes from the Back-End API
    const response = await fetch("http://localhost:3005/recipes")
    const fetchedRecipes = await response.json() // parses and unsmooshes the data
    // Put the recipes into state
    recipeList = fetchedRecipes
    // Re-render based on the state
    renderRecipeList()
}

fetchRecipeList()

/*** RENDERING ***/
// Make the User Interface match what the state (data) says it should show

const recipesContainer = document.getElementById("recipes-container")

// Alfred the Butler
function renderRecipeList() {
    // Clear out whatever we rendered last time
    recipesContainer.innerHTML = ""
    // show each recipe in the recipes container
    for (let i = 0; i < recipeList.length; i++) {

        /*** LISTENING ***/
        const deleteRecipe = async () => {
            // update the API on the backend
            await fetch("http://localhost:3005/recipes/" + recipeList[i].id, {
                method: "DELETE"
            })
            // update the state on the frontend
            recipeList.splice(i, 1)
            // Re-render (call the rendering function again)
            // ALFRED, make our page match our state!
            renderRecipeList()

        }

        // add divs and cool bootstrap classes
        const div = document.createElement("div")
        div.className = "border bg-light p-3 m-3"
        div.innerHTML = `
            <h3>${recipeList[i].title}</h3>
            <p>${recipeList[i].category}</p>
            <button class="btn btn-danger">Delete</button>
        `
        div.querySelector("button").addEventListener("click", deleteRecipe)
        recipesContainer.append(div)
    }
}


/*** LISTENING ***/

const titleInput = document.getElementById("title-input")
const categoryInput = document.getElementById("category-input")

async function createRecipe(event) {
    event.preventDefault() // don't refresh the page
    
    // grab the data from the form and make the new recipe
    const newRecipeData = {
        title: titleInput.value,
        category: categoryInput.value
    }

    // clear out the inputs
    titleInput.value = ""
    categoryInput.value = ""

    // update backend
    const response = await fetch("http://localhost:3005/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipeData) // smooshify AKA stringify it into JSON
    })
    const createdRecipeWithId = await response.json()

    // update frontend state
    recipeList.push(createdRecipeWithId)

    // re-render
    // YELL FOR ALFRED TO DO IT
    renderRecipeList()
}