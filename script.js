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
    console.log("page loaded");
    
    let addBtn = document.querySelector(".add-zone");
    let smokeBtn = document.querySelector("#smk-btn");
    let dualBtn = document.querySelector("#dual-btn");
    let smokeContainer = document.querySelector(".smokes");
    let ClipContainer = document.querySelector(".clip");
    let zonesContainer;

    bubbleSort(clipObjects);
    bubbleSort(smokeHeatObjects);


    displayArray(smokeContainer,smokeHeatObjects,1);
    displayArray(ClipContainer,clipObjects,1);



    // listen to click on "add" button
    addBtn.addEventListener("click", () => {
        zonesContainer = document.querySelector(".container:not(.disabled)");

        if (zonesContainer.classList.contains("clip") && clipObjects.length < 100) {
            let nextClip = getNextAvailableZone(clipObjects);
            //addZone(zonesContainer, nextClip, addBtn);
            populateArray(nextClip,clipObjects);
            bubbleSort(clipObjects);
            displayArray(ClipContainer,clipObjects, nextClip);
            
        }

        if (zonesContainer.classList.contains("smokes") && smokeHeatObjects.length < 100) {
            let nextSmokeHeat = getNextAvailableZone(smokeHeatObjects);
            //addZone(zonesContainer, nextSmokeHeat, addBtn);
            populateArray(nextSmokeHeat,smokeHeatObjects);
            bubbleSort(smokeHeatObjects);
            displayArray(smokeContainer,smokeHeatObjects,nextSmokeHeat);
            
        }

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
function populateArray(index, objArray){
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











// display html DOM
function displayArray(container, objArray,nextClip) {
    let newElements = '';

    objArray.forEach(element => {
        newElements += `
        <div class="row">
            <label for="zone">Zone 
                <input maxlength="3" size="1" class="zone-number" value="${element.zoneNumber}"></input>
            </label>
            <input maxlength="20" type="text" class="tag1 input" value="${element.tag1}">
            <input maxlength="20" type="text" class="tag2 input" value="${element.tag2}">
        </div>`;
    });

    container.querySelector(".zones-list").innerHTML = newElements;

    
    let zoneNumberFields = Array.apply(null, document.querySelectorAll(".zone-number"));
    let scrollTargetElem = zoneNumberFields.find(elem=> elem.value == nextClip);//((elem) => elem.attributes.value.nodeValue === `${nextClip}`)

    console.log(`scroll target:${scrollTargetElem}`);
    console.log(`next clip:${nextClip}`);
    scrollTargetElem.scrollIntoView();
        
    
} // end displayArray()








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
function generateCsv() {
    const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
} // end generateCSV()
