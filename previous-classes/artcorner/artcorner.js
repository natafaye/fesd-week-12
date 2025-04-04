
// STATE
let productList = []
// When your app connects to a database your data should start empty

// FETCHING
async function doMagic() {
    // this will be a default request, which fetch defaults to a GET request with no body
    const response = await fetch("http://localhost:3000/products") // sends a request
    const data = await response.json() // parse the JSON body into nice normal javascript objects and arrays and such
    // Save the data from the database in state (cache)
    productList = data
    // Render based on the state
    renderArtProducts()
}
// READ: Make sure we're loading in the data when the page loads in
doMagic() // will NOT wait for doMagic to finish, doMagic will just run in the background


async function addProduct() {
    const newProduct = {
        name: "Pencils",
        brand: "Very Good",
        price: 3
    }
    // Update on backend
    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct)
    })
    const newProductWithId = await response.json()
    // Update on frontend
    productList.push(newProductWithId)
    // Update the UI
    renderArtProducts()
}


// RENDERING
const tBody = document.getElementById("art-supplies-table-body")

function renderArtProducts() {
    // LISTENING
    const deleteProduct = async (idToDelete) => {
        console.log("Please delete this one:" + idToDelete)
        // Change the database on the backend
        await fetch("http://localhost:3000/products/" + idToDelete, {
            method: "DELETE"
        })
        // Change the state on the frontend
        productList = productList.filter(product => product.id !== idToDelete) // really common code pattern
        // Re-render based on the change state data
        renderArtProducts()
    }

    tBody.innerHTML = productList.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.price}</td>
            <td><button class="btn btn-danger product-delete-button" data-id="${product.id}">Delete</button></td>
        </tr>
    `).join("")

    // Go find all the buttons and make sure when they're clicked on they call deleteProduct
    // with the id of the product that that button goes to
    tBody.querySelectorAll(".product-delete-button").forEach(button =>
        button.addEventListener("click", () => deleteProduct(parseInt(button.dataset.id)))
    )

    // This works but ruins my day
    // for(let i = 0; i < list.length; i++) {
    //     const tr = document.createElement("tr")
    //     tBody.appendChild(tr)
    // }
}


// Front End sends
// HTTP Requests
// to a URL
// method
// headers (optional) (content-type, sometimes authentication)
// body (optional)

// Back End responds with
// HTTP Responses
// status code
// body (optional)