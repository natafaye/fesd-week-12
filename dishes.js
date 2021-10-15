
// Render when the page loads in using the jquery ready function
$(function() {
    renderDishList();
})

function createDish() {
    // grab the stuff from the form and use that to create a new object
    const dish = {
        title: $("#title-input").val(),
    }
    dishes.push(dish);
    // Rerender that part of the page
    renderDishList();
}

function deleteDish(dish) {
    // make your changes to the data (the array)
    // Rerender that part of the page
    renderDishList();
}

// Render the whole list of dishes
function renderDishList() {
    dishes.forEach(dish => {
        $("#dishes-container").append( renderDish(dish) )
    })
}

// Return the HTML for just one dish
function renderDish(dish) {
    return `
        <tr>
            <td>${dish.title}</td>
        </tr>
    `
}
















// could do
class Dish {
    constructor() {
        this.title = "fdsfds"
    }

    render() {
        return `
            <tr>
                <td>${this.title}</td>
            </tr>
        `
    }
}