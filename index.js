const itemsContainer = document.querySelector("#list-items");
const CLAVE = "colors_list";

function addItem(item) {
    const colourCard = document.createElement("section");
    colourCard.className = "card w-75";
    itemsContainer.append(colourCard);

    const colourCardBody = document.createElement("article");
    colourCardBody.className = "card-body";
    colourCard.append(colourCardBody);

    const colourCardTitle = document.createElement("h5");
    colourCardTitle.className = "card-title";
    colourCardTitle.innerText = item.name;
    colourCardBody.append(colourCardTitle);

    const colourCardText = document.createElement("p");
    colourCardText.className = "card-text";
    colourCardText.innerText = item.pantone_value;
    colourCardBody.append(colourCardText);

    const colourCardColour = document.createElement("figure");
    colourCardColour.style = "background-color: " + item.color + ";";
    colourCardColour.innerText = item.color;
    colourCardBody.append(colourCardColour);

    const colourCardBreak = document.createElement("br");
    itemsContainer.append(colourCardBreak);
}

async function fetchColorsList() {
    try {
        const res = await fetch("https://reqres.in/api/unknown");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const colors = await res.json();
        const dataString = JSON.stringify(colors.data);
        const dataObject = JSON.parse(dataString);
        localStorage.setItem(CLAVE, JSON.stringify(dataObject));

        const guardado = localStorage.getItem(CLAVE);
        const dataObject1 = JSON.parse(guardado);

        for (let i = 0; i <= dataObject1.length - 1; i++) {
            addItem(dataObject1[i]);
        }
    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

function loadColorsFromStorage() {
    const guardado1 = localStorage.getItem(CLAVE);
    const dataObject2 = JSON.parse(guardado1);
    console.log(dataObject2);
}

function deleteItems() {
    localStorage.removeItem(CLAVE);
    const check_delete = localStorage.getItem(CLAVE);
    console.log(check_delete);
}

fetchColorsList();
loadColorsFromStorage();