const songs = [
    {
        id: 0,
        name: "Song 1"
    },
    {
        id: 1,
        name: "Song 2"
    },
    {
        id: 2,
        name: "Song 3"
    },
    {
        id: 3,
        name: "Song 4"
    },
]

const playlistSongs = [
    {
        id: 0,
        name: "Song 4",
        order: 20
    },
    {
        id: 1,
        name: "Song 2",
        order: 10
    }
]

// READ

const playlistContainer = document.getElementById("playlistContainer")
const songsContainer = document.getElementById("songsContainer")

function renderPlaylist() {
    while (playlistContainer.firstChild) {
        playlistContainer.removeChild(playlistContainer.firstChild)
    }

    playlistSongs.sort((a, b) => a.order - b.order)
    for (const song of playlistSongs) {
        const div = document.createElement("div")
        div.textContent = song.name

        const upButton = document.createElement("button")
        upButton.textContent = "^"
        upButton.classList.add("btn")
        upButton.classList.add("btn-secondary")
        upButton.addEventListener("click", () => moveSongUp(song.id))
        div.appendChild(upButton)
        
        const removeButton = document.createElement("button")
        removeButton.textContent = "-"
        removeButton.classList.add("btn")
        removeButton.classList.add("btn-warning")
        removeButton.addEventListener("click", () => removeFromPlaylist(song.id))
        div.appendChild(removeButton)

        playlistContainer.appendChild(div)
    }
}

function renderSongs() {
    while (songsContainer.firstChild) {
        songsContainer.removeChild(songsContainer.firstChild)
    }

    for (const song of songs) {
        const div = document.createElement("div")
        div.textContent = song.name

        const addButton = document.createElement("button")
        addButton.textContent = "+"
        addButton.classList.add("btn")
        addButton.classList.add("btn-success")
        addButton.addEventListener("click", () => addToPlaylist(song.id))
        div.appendChild(addButton)

        songsContainer.appendChild(div)
    }
}

renderPlaylist()
renderSongs()

// CREATE

let nextId = 10;

function addToPlaylist(songId) {
    const song = songs.find(song => song.id === songId)


    let maxOrder = null
    for(const song of playlistSongs) {
        if(song.order > maxOrder) {
            maxOrder = song.order
        }
    }

    const newPlaylistSong = {
        id: nextId++,
        name: song.name,
        order: maxOrder + 10
    }
    playlistSongs.push(newPlaylistSong)
    renderPlaylist()
}

// DELETE

function removeFromPlaylist(songPlaylistId) {
    const index = playlistSongs.findIndex(
        song => song.id === songPlaylistId
    )
    playlistSongs.splice(index, 1)
    renderPlaylist()
}

// UPDATE

function moveSongUp(songPlaylistId) {
    const index = playlistSongs.findIndex(
        song => song.id === songPlaylistId
    )
    const previousSong = playlistSongs[index - 1]
    if(previousSong === undefined) {
        return;
    }
    const song = playlistSongs[index]
    song.order = previousSong.order - 1
    renderPlaylist()
}