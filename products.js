
// State stored in a global variable
let productList = []

// Run as soon as the page has loaded in

window.addEventListener("load", () => {
    // fetch data from backend
    $.get("http://localhost:3004/products").then((data) => {
        // store it in the state
        productList = data
        // render based on the state
        renderProducts()
    })
    
})


// Rendering function

const $productsContainer = $("#products-container")

function renderProducts() {
    $productsContainer.empty() // not efficient, we'll make this better with React
    $productsContainer.append(
        productList.map(product => {
            const $div = $(`
                <div>
                    <h5>${product.name}</h5>
                    <p>$${product.price}</p>
                    <button>Delete</button>
                </div>
            `)
            $div.find("button").on("click", () => deleteProduct(product.id))
            return $div
        })
    )
}

// React version of rendering functions

// function Products({ product }) {
//     return (
//         <div>
//             <h5>${product.name}</h5>
//             <p>$${product.price}</p>
//             <button onClick={() => deleteProduct(product.id)}>Delete</button>
//         </div>
//     )
// }


// Event listeners

function deleteProduct(id) {
    // delete it on the frontend (state)
    const indexToDelete = productList.findIndex(product => product.id === id)
    productList.splice(indexToDelete, 1)

    // delete it on the backend (database)
    $.ajax("http://localhost:3004/products/" + id, { method: "DELETE" })

    // render again
    renderProducts()
}