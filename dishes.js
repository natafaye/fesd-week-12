
const dishes = [
    {
        id: 3,
        name: "Twinkie Soup",
        type: "Main",
        price: 2
    }
];

$(() => {
    renderDishes();
})

// READ

function renderDishes() {
    $("#dishes-container").empty().append(
        dishes.map(d => renderDish(d))
    );
}

function renderDish(dish) {
    return (
        `<tr>
            <td>${dish.name}</td>
            <td>${dish.type}</td>
            <td>$${dish.price}</td>
            <td class="text-end">
                <button class="btn btn-primary btn-sm" onclick="openEditDishModal(${dish.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDish(${dish.id})">Delete</button>
            </td>
        </tr>`
    )
}

// CREATE AND UPDATE

const editDishModal = new bootstrap.Modal(document.getElementById('edit-dish-modal'))
let currentEditDishId = -1;
let nextDishId = 0;

function openEditDishModal(id) {
    let dish = dishes.find(d => d.id === id);

    if(!dish) {
        dish = {
            id: nextDishId,
            name: "New Dish",
            type: "Main",
            price: 10
        }
        nextDishId++;
    }

    currentEditDishId = dish.id;

    $("#edit-dish-modal-title").text(`Edit ${dish.name}`)
    $("#dish-name-input").val(dish.name);
    $("#dish-type-input").val(dish.type);
    $("#dish-price-input").val(dish.price);

    editDishModal.show();
}

function saveEditDishModal() {
    let dish = dishes.find(d => d.id === currentEditDishId);

    if(!dish) {
        dish = { id: currentEditDishId };
        dishes.push(dish);
    }

    dish.name = $("#dish-name-input").val();
    dish.type = $("#dish-type-input").val();
    dish.price = $("#dish-price-input").val();

    editDishModal.hide();

    renderDishes();
}

// DELETE

function deleteDish(id) {
    const dishIndex = dishes.findIndex(d => d.id === id);
    dishes.splice(dishIndex, 1);
    renderDishes();
}