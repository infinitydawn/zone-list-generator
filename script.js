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

    saveLocalStorage(clipObjects, smokeHeatObjects, "nameOfProject")





    //Get the modal
    let modal = document.querySelector("#myModal");

    // Get the button that opens the modal
    let btn = document.querySelector("#projects-btn");

    // Get the <span> element that closes the modal
    let span = document.querySelectorAll(".close")[0];
    let projectsFeed = document.querySelector(".modal-feed");



    let addBtn = document.querySelector(".add-zone");
    let addProjBtn = document.querySelector(".add-new-project");
    let smokeBtn = document.querySelector("#smk-btn");
    let dualBtn = document.querySelector("#dual-btn");
    let exportBtn = document.querySelector("#export-btn");

    let selectedProject = document.querySelector(".current-project");



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
        displayArray(smokeContainer, smokeHeatObjects, 1);
    })

    // listen to clicks on clip button
    dualBtn.addEventListener("click", () => {
        ClipContainer.classList.remove("disabled");
        smokeContainer.classList.add("disabled");
        displayArray(ClipContainer, clipObjects, 1);
    })

    // listen to clicks on clip button
    exportBtn.addEventListener("click", () => {
        generateCsv(clipObjects, smokeHeatObjects);
    })


    //MODAL CODE --------------------------------------------------------------


    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    btn.addEventListener("click", () => {

        let projectsList = "";

        Object.keys(localStorage).forEach((key) => {
            projectsList += `<div><p class="project-list-item">${key}</p></div>`
        })
        projectsFeed.innerHTML = projectsList;
        console.log(Object.keys(localStorage));
    })

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    addProjBtn.addEventListener("click", () => {
        //handle add project click
        console.log("Add new project")
    })

    projectsFeed.addEventListener("click", (event) => {
        if (event.target.classList.contains("project-list-item")) {
            console.log(event.target.textContent);
            saveLocalStorage(clipObjects, smokeHeatObjects, selectedProject.textContent)
            setCurrentProject(selectedProject, event.target.textContent);
            modal.style.display = "none";
            fetchLocalStorage(selectedProject.textContent)
            let currentContainer = document.querySelectorAll(".container")
            
            currentContainer = Array.apply(null, currentContainer);
            console.log(currentContainer)
            currentContainer = currentContainer.find(container => !container.classList.contains("disabled"));
            console.log(currentContainer)
            displayArray(currentContainer, decideContext(currentContainer), 1);
        }
    })

    function decideContext(container){
        if(container.classList.contains("clip")){
            console.log("Current context clip");
            return clipObjects;
        }
        if(container.classList.contains("smokes")){
            console.log("smoke");
            return smokeHeatObjects;
        }
    }

    //-------------------------------------------------------------------------

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
    let scrollTargetElem = zoneNumberFields.find(elem => elem.value == nextClip) ?? zoneNumberFields[zoneNumberFields.length - 1];

    scrollTargetElem.scrollIntoView();
} // end displayArray()




// handle input changes in the containers
function listenInputChange(container) {
    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('input-field')) {
            // // TODO 
            // // block if zone number too high
            // // add webstorage
            // // add projects system
            // // add popup system

            categorizeRowChange(event.target);
        }

    });
} // end listenInputChange()






// decide what type of zone is changed (ZC1)
function categorizeRowChange(target) {
    let container = target.closest(".container")
    let type = Array.from(container.classList).filter(className => className !== "container")[0];




    switch (type) {
        case "clip":
            categorizeChangeTarget(target, clipObjects)
            break;

        case "smokes":
            categorizeChangeTarget(target, smokeHeatObjects)
            break;
    }


} //end routeZoneChange()


// (ZC2)
function categorizeChangeTarget(target, zoneArray) {


    if (target.classList.contains("zone-number")) {
        handleZoneChange(target, zoneArray);
    }
    if (target.classList.contains("input-tag")) {
        handleTagChange(target, zoneArray);
    }

}



// depending on type of change, select appropriate action (ZC3-A)
function handleZoneChange(target, zoneArray) {
    let rowElement = target.closest(".row");

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
        // swap zones

        let indexAtOrigin = zoneArray.findIndex(zone => zone.zoneNumber === oldZoneNumber);
        let indexAtTarget = zoneArray.findIndex(zone => zone.zoneNumber === targetZone.zoneNumber);
        let tempZoneNumber = zoneArray[indexAtOrigin].zoneNumber;

        zoneArray[indexAtOrigin].zoneNumber = zoneArray[indexAtTarget].zoneNumber;

        zoneArray[indexAtTarget].zoneNumber = tempZoneNumber;

        window.alert(`Zones ${zoneArray[indexAtOrigin].zoneNumber} and ${zoneArray[indexAtTarget].zoneNumber} were swapped!`);
    }

    bubbleSort(zoneArray);
    displayArray(rowElement.closest(".container"), zoneArray, 1);
} //end handleZoneChange()




// depending on type of change, select appropriate action (ZC3-B)
function handleTagChange(target, zoneArray) {
    let rowElement = target.closest(".row");
    let currentTag = target.classList[0];
    let targetZoneNum = parseInt(rowElement.querySelector(".zone-number").value);

    console.log(`Zone Number Is: ${currentTag}`)

    let zoneIndex = zoneArray.findIndex(objInArr => objInArr.zoneNumber === targetZoneNum);

    if (currentTag === "tag1") {
        zoneArray[zoneIndex].tag1 = rowElement.querySelector(`.${currentTag}`).value;
    }

    if (currentTag === "tag2") {
        zoneArray[zoneIndex].tag2 = rowElement.querySelector(`.${currentTag}`).value;
    }

    console.log(zoneArray);
} // end handletagchange






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

    let someString = `avcd	123
    bnm,	456
    `;

    let rowsCLIP = arrayCLIP.map(obj => [obj.zoneNumber, obj.tag1, obj.tag2])
    let rowsSmokeHeat = arraySmokeHeat.map(obj => [obj.zoneNumber, obj.tag1, obj.tag2])

    let csvContent = "data:text/csv;charset=utf-8,"
        + rowsCLIP.map(e => e.join(",")).join("\n")
        + "\n"
        + rowsSmokeHeat.map(e => e.join(",")).join("\n");

    let emailBody =
        rowsCLIP.map(e => e.join(` | `)).join(`%0D%0A`)
        + `%0D%0A`
        + rowsSmokeHeat.map(e => e.join(` | `)).join(`%0D%0A`);

    let encodedUri = encodeURI(csvContent);
    window.location.href = `mailto:mnikulin@sherlocksecuritysystems.com?body=${emailBody}&subject=New Zone List`;
    // DOWNLOAD FILE - window.open(encodedUri);
} // end generateCSV()





function saveLocalStorage(arr1, arr2, name) {
    let project = {
        array1: arr1,
        array2: arr2,
        name: name
    }

    projectString = JSON.stringify(project);

    localStorage.setItem(name, projectString)

}


function fetchLocalStorage(name) {
    let project = localStorage.getItem(name);
    let projectFormatted = JSON.parse(project);
    let selectedProject = document.querySelector(".current-project");

    console.log("fetching");

    smokeHeatObjects = projectFormatted.array2;
    clipObjects = projectFormatted.array1;
    setCurrentProject(selectedProject, name)
}



function setCurrentProject(domElement, currentProject) {
    domElement.textContent = currentProject;
}
