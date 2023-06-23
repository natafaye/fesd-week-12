
// Data (State)

const contacts = [
    {
        id: 0,
        firstName: "Natalie",
        lastName: "Childs",
        phone: "123456789"
    },
    {
        id: 1,
        firstName: "Eleanor",
        lastName: "Shellstrop",
        phone: "473829432"
    },
    {
        id: 2,
        firstName: "Chidi",
        lastName: "Anagonye",
        phone: "349859453"
    }
]

let searchTerm = ""

let isFormOpen = false // VERY REACTY

let editContactId = null // null means creating, a number means editing that contact

let formValues = { firstName: "", lastName: "", phone: "" }

// Rendering Functions (Components)

function makeItSo() {
    const root = $("#root")

    // Clears out root div, put whatever app says in the root div
    root.empty()
    root.append(renderApp())
}

makeItSo()

function renderApp() {
    const onCreateClick = () => {
        editContactId = null
        isFormOpen = true // NOT REACTY: Open the modal right here
        makeItSo()
    }

    return $("<div/>").addClass("p-4").append(
        $("<div/>").addClass("d-flex justify-content-between").append(
            $("<h2/>").text("Contacts"),
            $("<button/>").text("Create").addClass("btn btn-success").on("click", onCreateClick)
        ),
        renderSearchArea(),
        renderContactList(),
        renderForm()
    )
}

function renderSearchArea() {

    const onSearchInputChange = (event) => {
        searchTerm = event.target.value // event.target = the input
        makeItSo()
    }

    return $("<div/>").addClass("mt-3").append(
        $("<input/>")
            .attr("type", "text")
            .attr("placeholder", "Search")
            .addClass("form-control")
            .val(searchTerm)
            .on("keyup", onSearchInputChange)
    )
}

function renderContactList() {
    const filteredContacts = contacts.filter(
        c => c.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            || c.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return $("<div/>").addClass("mt-3").append(
        filteredContacts.map(contact => renderContact(contact))
    )
}

function renderContact(contact) {

    // Start the edit
    const onEditClick = () => {
        editContactId = contact.id
        isFormOpen = true // NON REACTY = open the modal/show the form

        // NON REACTY: get all the inputs (by id) fill them in with the contact's data

        // REACTY
        makeItSo()
    }

    return $("<div/>")
        .addClass("border my-2 rounded p-3 d-flex justify-content-between")
        .append(
            $("<p/>").text(`${contact.firstName} ${contact.lastName}`),
            $("<button/>").text("Edit").addClass("btn btn-outline-secondary")
                .on("click", onEditClick)
        )
}

let nextId = 10

function renderForm() {

    // Set up our form values
    let editContact = contacts.find(c => c.id === editContactId)
    if (editContact === undefined) {
        editContact = {
            firstName: "",
            lastName: "",
            phone: ""
        }
    }

    // Put all our inputs in variables, so they'll be in the closure of onSaveClick
    const firstNameInput = $("<input/>")
        .attr("type", "text")
        .attr("placeholder", "First")
        .addClass("form-control")
        .val(editContact.firstName)
    const lastNameInput = $("<input/>")
        .attr("type", "text")
        .attr("placeholder", "Last")
        .addClass("form-control")
        .val(editContact.lastName)
    const phoneInput = $("<input/>")
        .attr("type", "tel")
        .attr("placeholder", "Phone")
        .addClass("form-control")
        .val(editContact.phone)

    // Finish the edit
    const onSaveClick = () => {
        // either save the edit or the create
        if (editContact) {
            editContact.firstName = firstNameInput.val()
            editContact.lastName = lastNameInput.val()
            editContact.phone = phoneInput.val()
        } else {
            const newContact = {
                id: nextId++,
                firstName: firstNameInput.val(),
                lastName: lastNameInput.val(),
                phone: phoneInput.val()
            }
            contacts.push(newContact)
        }

        isFormOpen = false
        makeItSo()
    }

    if (!isFormOpen) return $("<div/>")
    // use editContactId to render the form correctly with the right info
    return $("<div/>").append(
        $("<form/>").append(
            firstNameInput,
            lastNameInput,
            phoneInput,
            $("<button/>").text("Save").addClass("btn btn-success")
                .on("click", onSaveClick)
        )
    )
}




//     formValues = {
    //         firstName: editContact.firstName,
    //         lastName: editContact.lastName,
    //         phone: editContact.phone
    //     }
    // }



    // const onFirstNameChange = (event) => {
    //     formValues.firstName = event.target.value
    //     makeItSo()
    // }

    // const onLastNameChange = (event) => {
    //     formValues.lastName = event.target.value
    //     makeItSo()
    // }

    // const onPhoneChange = (event) => {
    //     formValues.phone = event.target.value
    //     makeItSo()
    // }