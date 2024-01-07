// Test Data
let clipObjects = [{
    tag1: "Pull Station",
    tag2: "Cellar Mech Rm",
    zoneNumber: 10
},
{
    tag1: "Waterflow",
    tag2: "Cellar Stairs A",
    zoneNumber: 1
}, {
    tag1: "Valve Tamper",
    tag2: "Cellar Trash Rm",
    zoneNumber: 3
}, {
    tag1: "Pull Station",
    tag2: "1FL Main Entrance",
    zoneNumber: 4
}, {
    tag1: "Generator Running",
    tag2: "1FL Electric Rm",
    zoneNumber: 6
}];

let smokeHeatObjects = [
    {
        tag1: "Smoke Detector",
        tag2: "Cellar Electric Rm",
        zoneNumber: 49
    },
    {
        tag1: "Heat Detector",
        tag2: "Cellar Kitchen",
        zoneNumber: 1
    }, {
        tag1: "Heat Detector",
        tag2: "Cellar Laundry Rm",
        zoneNumber: 3
    }, {
        tag1: "Duct Detector",
        tag2: "Roof Supply",
        zoneNumber: 4
    }, {
        tag1: "Smoke Detector",
        tag2: "Elevator Lobby",
        zoneNumber: 6
    }
];



//Code entry point
window.addEventListener("load", () => {

    let addBtn = document.querySelector(".add-zone");
    let smokeBtn = document.querySelector("#smk-btn");
    let dualBtn = document.querySelector("#dual-btn");
    let exportBtn = document.querySelector("#export-btn");

    let smokeContainer = document.querySelector(".smokes");
    let ClipContainer = document.querySelector(".clip");
    let zonesContainer;

    listenInputChange(smokeContainer.querySelector(".zones-list"));
    listenInputChange(ClipContainer.querySelector(".zones-list"));

    bubbleSort(clipObjects);
    bubbleSort(smokeHeatObjects);


    displayArray(smokeContainer, smokeHeatObjects, 1);
    displayArray(ClipContainer, clipObjects, 1);



    // listen to click on "add" button
    addBtn.addEventListener("click", () => {
        zonesContainer = document.querySelector(".container:not(.disabled)");

        if (zonesContainer.classList.contains("clip") && clipObjects.length < 99) {
            let nextClip = getNextAvailableZone(clipObjects);
            //addZone(zonesContainer, nextClip, addBtn);
            populateArray(nextClip, clipObjects);
            bubbleSort(clipObjects);
            displayArray(ClipContainer, clipObjects, nextClip);

        } else if (zonesContainer.classList.contains("clip")) { window.alert("No more available CLIP zones!") }

        if (zonesContainer.classList.contains("smokes") && smokeHeatObjects.length < 99) {
            let nextSmokeHeat = getNextAvailableZone(smokeHeatObjects);
            //addZone(zonesContainer, nextSmokeHeat, addBtn);
            populateArray(nextSmokeHeat, smokeHeatObjects);
            bubbleSort(smokeHeatObjects);
            displayArray(smokeContainer, smokeHeatObjects, nextSmokeHeat);

        } else if (zonesContainer.classList.contains("smokes")) { window.alert("No more available smoke zones!") }

    })

    // Listen to click on smokes button
    smokeBtn.addEventListener("click", () => {
        smokeContainer.classList.remove("disabled");
        ClipContainer.classList.add("disabled");

    })

    // listen to clicks on clip button
    dualBtn.addEventListener("click", () => {
        ClipContainer.classList.remove("disabled");
        smokeContainer.classList.add("disabled");
    })

    // listen to clicks on clip button
    exportBtn.addEventListener("click", () => {
        generateCsv(clipObjects, smokeHeatObjects);
    })
})








//return next available zone address in the array
function getNextAvailableZone(objArray) {
    let missing = objArray.length + 1; // Default to the next number after the last index

    for (let i = 0; i < objArray.length; i++) {
        if (objArray[i].zoneNumber !== i + 1) {
            missing = i + 1;
            break;
        }
    }
    return missing;
}







// Insert A New Object into array
function populateArray(index, objArray) {
    objArray.splice(index, 0, {
        tag1: "",
        tag2: "",
        zoneNumber: index
    })
} // end populateArray()







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
} //end bubble sort




function setOldValue(element) {
    element.setAttribute("oldvalue", element.value);
}






// display html DOM
function displayArray(container, objArray, nextClip) {
    let newElements = '';

    objArray.forEach(element => {
        newElements += `
        <div class="row">
            <label for="zone">Zone 
                <input maxlength="3" class="zone-number input-field" value="${element.zoneNumber}" oldValue ="" onfocus="setOldValue(this)"></input>
            </label>
            <input maxlength="20" type="text" class="tag1 input-tag input-field" value="${element.tag1}">
            <input maxlength="20" type="text" class="tag2 input-tag input-field" value="${element.tag2}">
        </div>`;


    });

    container.querySelector(".zones-list").innerHTML = newElements;


    let zoneNumberFields = Array.apply(null, document.querySelectorAll(".zone-number"));
    let scrollTargetElem = zoneNumberFields.find(elem => elem.value == nextClip) ?? zoneNumberFields[zoneNumberFields.length-1];

    scrollTargetElem.scrollIntoView();
} // end displayArray()




// handle input changes in the containers
function listenInputChange(container) {
    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('input-field')) {

            if (event.target.classList.contains('zone-number')) {
                routeZoneChange(event.target.closest(".row"));
            }
            if (event.target.classList.contains('tag1')) {
                // TODO 
                console.log("tag 1 change registered")
            }
            if (event.target.classList.contains('tag2')) {
                // TODO 
                console.log("tag 2 change registered")
            }
            // TODO 
            // block if zone number too hugh
        }

    });
} // end listenInputChange()





// decide what type of zone is changed (ZC1)
function routeZoneChange(rowElement) {
    let container = rowElement.closest(".container")
    let type = Array.from(container.classList).filter(className => className !== "container")[0];
    



    switch (type) {
        case "clip":
            handleZoneChange(rowElement, clipObjects)
            break;

        case "smokes":
            handleZoneChange(rowElement, smokeHeatObjects)
            break;
    }

    
} //end routeZoneChange()



// depending on type of change, select appropriate action (ZC2)
function handleZoneChange(rowElement, zoneArray) {
    let newZoneNumber = rowElement.querySelector(".zone-number").value;
    let oldZoneNumber = parseInt(rowElement.querySelector(".zone-number").getAttribute("oldvalue"));

    let targetZone = zoneArray.find(zone => zone.zoneNumber === parseInt(newZoneNumber));
    if (targetZone === undefined) {
        // make a new zone 

        let newTag1 = rowElement.querySelector(".tag1").value;
        let newTag2 = rowElement.querySelector(".tag2").value;
        

        let oldZoneObject = zoneArray.findIndex(obj => obj.zoneNumber == oldZoneNumber)

        zoneArray.splice(oldZoneObject, 1);


        zoneArray.push({
            tag1: newTag1,
            tag2: newTag2,
            zoneNumber: parseInt(newZoneNumber)
        })

    }
    else {

        let indexAtOrigin = zoneArray.findIndex(zone => zone.zoneNumber === oldZoneNumber);
        let indexAtTarget = zoneArray.findIndex(zone => zone.zoneNumber === targetZone.zoneNumber);
        let tempZoneNumber = zoneArray[indexAtOrigin].zoneNumber;

        zoneArray[indexAtOrigin].zoneNumber = zoneArray[indexAtTarget].zoneNumber;

        zoneArray[indexAtTarget].zoneNumber = tempZoneNumber;
    }

    bubbleSort(zoneArray);
    displayArray(rowElement.closest(".container"), zoneArray, 1);
} //end handleZoneChange()










// display single zone
function addZone(container, zoneNumber, btnToScrollTo) {
    container.insertAdjacentHTML("beforeend",
        `<div class="row">
        <label for="zone">Zone 
            <input maxlength="3" size ="3" class="zone-number" value="${zoneNumber}"></input>
        </label>
        <input maxlength="20" type="text" class="tag1 input">
        <input maxlength="20" type="text" class="tag2 input">
    </div>`)
    btnToScrollTo.scrollIntoView()
} // end addZone()




// generate csv file using objects array
function generateCsv(arrayCLIP, arraySmokeHeat) {
    const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];

    let rowsCLIP = arrayCLIP.map(obj => [obj.zoneNumber, obj.tag1, obj.tag2])
    let rowsSmokeHeat = arraySmokeHeat.map(obj => [obj.zoneNumber, obj.tag1, obj.tag2])

    let csvContent = "data:text/csv;charset=utf-8,"
        + rowsCLIP.map(e => e.join(",")).join("\n") 
        + "\n"
        + rowsSmokeHeat.map(e => e.join(",")).join("\n");

    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
} // end generateCSV()
