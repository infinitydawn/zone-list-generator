let smokeHeatZones = [];
let smokeHeatObjects = [];

let zoneObj = {
    tag1: "tag1",
    tag2: "tag2",
    zoneNumber: 0
}


window.addEventListener("load", () => {
    console.log("page loaded");
    let addBtn = document.querySelector(".add-zone");
    let smokeBtn = document.querySelector("#smk-btn");
    let dualBtn = document.querySelector("#dual-btn");
    let smokeContainer = document.querySelector(".smokes");
    let ClipContainer = document.querySelector(".clip");
    let zonesContainer;
    let smokeCounter = 0;
    let ClipCounter = 100;



    addBtn.addEventListener("click", () => {
        zonesContainer = document.querySelector(".container:not(.disabled)");
        if (zonesContainer.classList.contains("clip") && ClipCounter < 200) {
            ClipCounter++;
            addZone(zonesContainer, ClipCounter, addBtn);
        }
        if (zonesContainer.classList.contains("smokes") && smokeCounter < 100) {
            smokeCounter++;
            addZone(zonesContainer, smokeCounter, addBtn);
        }

        console.log(`clip:${ClipCounter}\nsmoke: ${smokeCounter}`);

    })





    smokeBtn.addEventListener("click", () => {
        smokeContainer.classList.remove("disabled");
        ClipContainer.classList.add("disabled");

    })

    dualBtn.addEventListener("click", () => {

        ClipContainer.classList.remove("disabled");
        smokeContainer.classList.add("disabled");

    })

})


function generateCsv() {

    const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

function addZone(container, counter, btnToScrollTo) {
    container.insertAdjacentHTML("beforeend",
        `<div class="row">
        <label for="zone">Zone <input maxlength="3" size="1" class="zone-number" value="${counter}"></input></label>
        <input maxlength="20" type="text" class="tag1 input">
        <input maxlength="20" type="text" class="tag2 input">
    </div>`)
    btnToScrollTo.scrollIntoView()

}



// return zone number if it exists, else return null
function getZone(objArray, newZone) {
    let matchedZone = null;
    objArray.forEach(obj => {
        if (obj.zoneNumber === newZone) {
            matchedZone = obj;

        }
    });

    return matchedZone;

}




//return next available zone address in the array
function getNextAvailableZone(objArray) {

}

// let testArr = [{
//     tag1: "",
//     tag2: "",
//     zoneNumber : 1},
// {
//     tag1: "",
//     tag2: "",
//     zoneNumber: 5
// }, {
//     tag1: "",
//     tag2: "",
//     zoneNumber: 23
// }, {
//     tag1: "",
//     tag2: "",
//     zoneNumber: 4
// }, {
//     tag1: "",
//     tag2: "",
//     zoneNumber: 18
// }]

// sort zone objects in ascending order by zone number
function bubbleSort(arr) {
    let i, j;
    let len = arr.length;

    let isSwapped = false;

    for (i = 0; i < len; i++) {

        isSwapped = false;

        for (j = 0; j < (len - i - 1); j++) {
            if (arr[j].zoneNumber > arr[j + 1].zoneNumber) {
                let temp = arr[j]
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSwapped = true;
            }
        }


        if (!isSwapped) {
            break;
        }
    }

}


