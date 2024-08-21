/*** STATE ***/

let surveyList = []
let responseList = []

/*** FETCHING ***/

async function fetchAllSurveysAndRender() {
    const response = await fetch("http://localhost:3005/surveys")
    const data = await response.json()
    // Put this data in the state
    surveyList = data
    // Render that survey list
    renderSurveyList()
}

// When the app first loads in, get all the surveys from the API
fetchAllSurveysAndRender()


async function fetchAllResponsesAndRender() {
    const response = await fetch("http://localhost:3005/responses")
    const data = await response.json()
    responseList = data
    renderResponses()
}

fetchAllResponsesAndRender()

/*** RENDERING ***/

const root = document.getElementById("root")

function renderSurveyList() {
    // make sure it starts out empty, no leftover stuff from last time rendered
    root.innerHTML = ""
    // render all the surveys
    for (const survey of surveyList) {
        root.appendChild(renderSurvey(survey))
    }
}

async function handleResponseClick(responseIndex, surveyId) {
    const newResponse = {
        surveyId: surveyId,
        response: responseIndex
    }
    // update on the backend
    const response = await fetch("http://localhost:3005/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResponse)
    })
    const createdItemWithId = await response.json()
    // update on the frontend
    responseList.push(createdItemWithId)
    // render based on the state
    renderResponses()
}

function renderSurvey(survey) {
    const div = document.createElement("div")
    div.className = "bg-light p-3 m-3"
    div.innerHTML = `
        <p>${survey.title}</p>
        ${survey.options.map((option, index) => `
            <button onclick="handleResponseClick(${index}, ${survey.id})" class="btn btn-primary">${option}</button>
        `).join("")}
    `
    return div
}

const responsesContainer = document.getElementById("responses-container")

function renderResponses() {
    // clear it out from last time
    responsesContainer.innerHTML = ""
    for (let i = 0; i < responseList.length; i++) {
        // add a div
        const div = document.createElement("div")
        // bring content in
        div.textContent = responseList[i].surveyId + " - " + responseList[i].response
        // move it into the page
        responsesContainer.appendChild(div)
    }
}

renderResponses()