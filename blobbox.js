
/***** TEST DATA *****/

const files = [
    {
        id: 0,
        filename: "therebecca.jpg",
        tags: "chair, beautiful, something"
    },
    {
        id: 1,
        filename: "chair.jpg",
        tags: "chair"
    },
    {
        id: 2,
        filename: "thewinston.jpg",
        tags: "elegant, beautiful"
    }
]

let editFileId = null


/***** RENDERING *****/

window.addEventListener("load", () => {
    renderAllFiles()
})

const filesContainer = document.getElementById("files-container")

function renderAllFiles() {
    while(filesContainer.hasChildNodes()) {
        filesContainer.removeChild(filesContainer.firstChild)
    }

    // for(let i = 0; i < files.length; i++) {
    //     const file = files[i]
    //     const fileDiv = renderFile(file)
    //     filesContainer.appendChild(fileDiv)
    // }

    // for(const file of files) {
    //     const fileDiv = renderFile(file)
    //     filesContainer.appendChild(fileDiv)
    // }

    const fileDivs = files.map(file => renderFile(file))
    fileDivs.forEach(fileDiv => filesContainer.appendChild(fileDiv))
}

function renderFile(file) {
    const div = document.createElement("div")
    div.classList.add("col-3")
    div.classList.add("border")
    div.classList.add("p-2")
    
    const image = document.createElement("img")
    image.src = "images/" + file.filename
    image.classList.add("w-100")
    div.appendChild(image)

    const p = document.createElement("p")
    p.classList.add("text-center")
    p.classList.add("p-3")
    p.classList.add("pb-0")
    p.textContent = file.tags
    div.appendChild(p)

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("btn")
    deleteButton.classList.add("btn-danger")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => deleteFile(file.id))
    div.appendChild(deleteButton)

    const editButton = document.createElement("button")
    editButton.classList.add("btn")
    editButton.classList.add("btn-primary")
    editButton.classList.add("ms-2")
    editButton.textContent = "Edit"
    editButton.addEventListener("click", () => startEditFile(file.id))
    div.appendChild(editButton)

    return div
}


/***** EVENT LISTENERS *****/

function deleteFile(fileId) {
    const index = files.findIndex( file => file.id === fileId )
    files.splice(index, 1)
    renderAllFiles()
}

let nextId = 20

const filenameInput = document.getElementById("new-filename-input")
const tagsInput = document.getElementById("new-tags-input")
const fileModal = new bootstrap.Modal('#file-modal')
const fileSaveButton = document.getElementById("file-modal-save-button")

function startEditFile(id) {
    const fileToUpdate = files.find( file => file.id === id )
    editFileId = id

    // Get the form ready
    filenameInput.value = fileToUpdate.filename
    tagsInput.value = fileToUpdate.tags
    
    // open the modal
    fileModal.show()
}

function finishEditFile() {
    const fileToUpdate = files.find( file => file.id === editFileId )
    
    fileToUpdate.filename = filenameInput.value
    fileToUpdate.tags = tagsInput.value

    editFileId = null

    filenameInput.value = ""
    tagsInput.value = ""

    renderAllFiles()
}

function uploadFile() {
    const newFile = {
        id: nextId++,
        filename: filenameInput.value,
        tags: tagsInput.value
    }
    files.push(newFile)
    renderAllFiles()

    filenameInput.value = ""
    tagsInput.value = ""
}

function saveFile() {
    if(editFileId === null) {
        uploadFile()
    } else {
        finishEditFile()
    }
    fileModal.hide()
}