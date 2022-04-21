/* Recipes */

// CONTAINERS

const $recipeContainer = $("#recipe-container")

// DATA

const recipeList = [
    {
        id: 0,
        name: "Taco Soup",
        description: "It's freaking delicious",
        ingredients: [
            {
                id: 0,
                type: "tacos",
                quantity: 10
            },
            {
                id: 1,
                type: "soup",
                quantity: 1
            }
        ]
    },
    {
        id: 1,
        name: "Burrito Soup",
        description: "It's kinda weird",
        ingredients: [
            {
                id: 0,
                type: "burritos",
                quantity: 10
            }
        ]
    }
]

// LOADING

// jQuery document load thing
$(() => {
    renderRecipeList();
})

// RENDER RECIPES

function renderRecipeList() {
    $recipeContainer.empty()
    for(const recipe of recipeList) {
        renderRecipe(recipe).appendTo($recipeContainer);
    }
}

function renderRecipe(recipe) {
    // return the HTML/DOM stuff for this recipe
    return $("<div/>").addClass("card mt-4").append( 
                $("<div/>").addClass("card-body").append(
                    $("<h5/>").addClass("card-title").text(recipe.name)
                )
                .append(
                    $("<p/>").addClass("card-text").text(recipe.description)
                )
                .append(
                    $("<button/>").addClass("btn btn-danger").text("Delete").on("click", () => deleteRecipe(recipe.id))
                )
            )
}

// EVENT HANDLERS

function deleteRecipe(recipeId) {
    const index = recipeList.findIndex(recipe => recipe.id === recipeId)
    recipeList.splice(index, 1)
    renderRecipeList();
}

/* Shopping List */


// REMOVE THIS
/*<div class="card mt-4">
    <div class="card-body">
        <h5 class="card-title">RECIPE NAME</h5>
        <p class="card-text">RECIPE DESCRIPTION: Some quick example text to build on the card title and make up the bulk of
            the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Ingredient 1</li>
        <li class="list-group-item">Ingredient 2</li>
        <li class="list-group-item">Ingredient 3</li>
    </ul>
</div>*/