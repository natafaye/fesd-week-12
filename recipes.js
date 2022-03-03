
const recipeContainer = document.getElementById("recipe-container");
const recipeTemplate = document.getElementById("recipe-template");

const recipes = [
    {
        title: "Spinach Soup",
        category: "Dinner",
        description: "fdjsfds fdsjfds fds fds jf dsjfdsklfds",
        ingredients: [
            {
                title: "spinach",
                amount: "2 cups"
            },
            {
                title: "soup",
                amount: "4 cups"
            }
        ]
    },
    {
        title: "Broccoli Soup",
        category: "Snack",
        description: "fdjsfds fdsjfds fds fds jf dsjfdsklfds",
        ingredients: [
            {
                title: "broccoli",
                amount: "2 cups"
            },
            {
                title: "soup",
                amount: "4 cups"
            }
        ]
    }
];

const recipeModal = new bootstrap.Modal(document.getElementById('recipe-modal'), {})

window.addEventListener("load", renderRecipes);

function renderRecipes() {
    // empty it out
    while(recipeContainer.firstChild) {
        recipeContainer.removeChild(recipeContainer.firstChild)
    }
    // add all the recipes in
    recipes.map( recipe => renderRecipe(recipe) ).forEach( recipeNode => recipeContainer.appendChild(recipeNode) )
}

function renderRecipe(recipe) {
    const recipeNode = recipeTemplate.cloneNode(true);
    recipeNode.querySelector("#recipe-title").textContent = recipe.title;
    recipeNode.querySelector("#recipe-category").textContent = recipe.category;
    recipeNode.querySelector("#recipe-description").textContent = recipe.description;

    recipeNode.querySelector("#recipe-edit-button").addEventListener("click", () => startEditingRecipe(recipe) );

    const ingredientsContainer = recipeNode.querySelector("#ingredients-container");
    renderIngredients(recipe.ingredients, ingredientsContainer);
    return recipeNode;
}

function renderIngredients(ingredients, ingredientsContainer) {
    ingredients.map( ingredient => renderIngredient(ingredient) ).forEach( ingredientNode => ingredientsContainer.appendChild(ingredientNode) )
}

function renderIngredient(ingredient) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = ingredient.amount + " - " + ingredient.title;
    return li;
}

/****** Event Listeners ******/

function startCreatingRecipe() {
    document.getElementById("recipe-modal-save-button").addEventListener("click", finishCreateRecipe)
    recipeModal.show();
}

function startEditingRecipe(recipe) {
    document.getElementById("recipe-modal-title").textContent = "Editing " + recipe.title;
    document.getElementById("recipe-title-input").value = recipe.title;
    document.getElementById("recipe-description-input").value = recipe.description;
    document.getElementById("recipe-modal-save-button").addEventListener("click", () => finishEditRecipe(recipe))
    recipeModal.show();
}

function finishCreateRecipe() {
    const title = document.getElementById("recipe-title-input").value;
    const description = document.getElementById("recipe-description-input").value;
    const recipe = {
        title: title,
        description: description,
        category: "Dinner",
        ingredients: []
    }
    recipes.push(recipe);
    renderRecipes();
    recipeModal.hide();
}

function finishEditRecipe(recipe) {
    recipe.title = document.getElementById("recipe-title-input").value;
    recipe.description = document.getElementById("recipe-description-input").value;
    renderRecipes();
    recipeModal.hide();
}