let smokeHeatZones = [];


window.addEventListener("load", () => {
    console.log("page loaded");
    let addBtns = document.querySelectorAll(".add-zone");
    let smokeBtn = document.querySelector("#smk-btn");
    let dualBtn = document.querySelector("#dual-btn");
    let smokeContainer = document.querySelector(".smokes");
    let ClipContainer = document.querySelector(".clip");
    let zonesContainer;
    let smokeCounter = 0;
    let ClipCounter = 100;


    addBtns.forEach(addBtn => {
        addBtn.addEventListener("click", () => {
            zonesContainer = addBtn.parentElement.parentElement.querySelector(".zones-list");

            
            let zoneIndex;

            if (zonesContainer.parentElement.classList.contains("clip") && ClipCounter < 200) {
                ClipCounter++;
                addZone(zonesContainer, ClipCounter, addBtn);
            }
            if (zonesContainer.parentElement.classList.contains("smokes") && smokeCounter < 100) {
                smokeCounter++;
                addZone(zonesContainer, smokeCounter, addBtn);
            }

            console.log(`clip:${ClipCounter}\nsmoke: ${smokeCounter}`);

        })

    });



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
        <label for="zone">Zone ${counter}:</label>
        <input maxlength="20" type="text" class="tag1">
        <input maxlength="20" type="text" class="tag2">
    </div>`)
    btnToScrollTo.scrollIntoView()
    
}