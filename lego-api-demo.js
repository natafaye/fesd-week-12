
const setIdInput = document.getElementById("set-id-input")
const setInfoContainer = document.getElementById("set-info-container")

const fetchLegoSetData = async (setId) => {
    const response = await fetch("https://rebrickable.com/api/v3/lego/sets/" + setId, {
        headers: {
            Authorization: "key " + API_KEY
        }
    })
    return await response.json();
    // return $.ajax({
    //     url: "https://rebrickable.com/api/v3/lego/sets/" + setId,
    //     dataType: "json",
    //     headers: { Authorization: "key " + API_KEY }
    // })
}

const showSet = async () => {
    const setData = await fetchLegoSetData(setIdInput.value)
    if(!setData) alert("Error!")
    while(setInfoContainer.firstChild) {
        setInfoContainer.firstChild.remove()
    }
    setInfoContainer.appendChild(renderLegoSet(setData));
}

const renderLegoSet = (setData) => {
    const setContainer = document.createElement("div");
    const setImg = document.createElement("img")
    setImg.src = setData.set_img_url
    setImg.classList.add("w-50")
    setImg.classList.add("mt-3")
    const title = document.createElement("h3")
    title.textContent = setData.name;
    setContainer.appendChild(title)
    setContainer.appendChild(setImg)
    return setContainer;
}