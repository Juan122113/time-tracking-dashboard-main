// const dayBtn = document.getElementById("daily");
// const weekBtn = document.getElementById("weekly");
// const monthBtn = document.getElementById("monthly");

// const currDivWork = document.getElementById("current-work");
// const pastDivWork = document.getElementById("past-work");
// const currDivPlay = document.getElementById("current-play");
// const pastDivPlay = document.getElementById("past-play");
// const currDivStudy = document.getElementById("current-study");
// const pastDivStudy = document.getElementById("past-study");
// const currDivExercise = document.getElementById("current-exercise");
// const pastDivExercise = document.getElementById("past-exercise");
// const currDivSocial = document.getElementById("current-social");
// const pastDivSocial = document.getElementById("past-social");
// const currDivSelfCare = document.getElementById("current-self-care");
// const pastDivSelfCare = document.getElementById("past-self-care");

// const requestURL = "./data.json";
// const request = new XMLHttpRequest();
// request.open("GET", requestURL);
// request.responseType = "json";
// request.send();
// request.onload = function () {
//     const times = request.response;

//     dayBtn.addEventListener("click", (e) => {
//         const myH5 = document.createElement("h5");
//         myH5.textContent = times[0].title;
//         const myH1 = document.createElement("h1");
//         myH1.textContent = times[0].timeframes.daily.current + " hs";
//         // myH5.setAttribute();
//         myH1.setAttribute("class", "daily time");
//         currDivWork.innerHTML = '';

//         if (currDivWork.childElementCount < 2) {
//             currDivWork.appendChild(myH5);
//             currDivWork.appendChild(myH1);
//             if (currDivWork.querySelector('.daily time') !== null) {
//                 dayBtn.style.color = "white";
//                 dayBtn.style.opacity = "1";
//             } else if (currDivWork.querySelector('.daily time' === null)) {
//                 dayBtn.style.color = "hsl(236, 100%, 87%)";
//                 dayBtn.style.opacity = "0.5";
//             }
//         }

        
//         // weekBtn.style.color = "hsl(236, 100%, 87%)";
//         // weekBtn.style.opacity = "0.5";
//         // monthBtn.style.color = "hsl(236, 100%, 87%)";
//         // monthBtn.style.opacity = "0.5";
        
//     })

//     weekBtn.addEventListener("click", (e) => {
//         const myH5 = document.createElement("h5");
//         myH5.textContent = times[0].title;
//         const myH1 = document.createElement("h1");
//         myH1.textContent = times[0].timeframes.weekly.current + " hs";
//         // myH5.setAttribute();
//         myH1.setAttribute("class", "daily time");

//         currDivWork.innerHTML = '';

//         if (currDivWork.childElementCount < 2) {
            
//             currDivWork.appendChild(myH5);
//             currDivWork.appendChild(myH1);
//         }

//         weekBtn.style.color = "white";
//         weekBtn.style.opacity = "1";
//         // weekBtn.style.color = "hsl(236, 100%, 87%)";
//         // weekBtn.style.opacity = "0.5";
//         // monthBtn.style.color = "hsl(236, 100%, 87%)";
//         // monthBtn.style.opacity = "0.5";
        
//     })
// }



// // fetch("./data.json")
// //     .then(response => response.json())
// //     .then(data => console.log(data))


// Selección de elementos
const dayBtn = document.getElementById("daily");
const weekBtn = document.getElementById("weekly");
const monthBtn = document.getElementById("monthly");
const currDivWork = document.getElementById("current-work");
const pastDivWork = document.getElementById("past-work");
const currDivPlay = document.getElementById("current-play");
const pastDivPlay = document.getElementById("past-play");
const currDivStudy = document.getElementById("current-study");
const pastDivStudy = document.getElementById("past-study");
const currDivExercise = document.getElementById("current-exercise");
const pastDivExercise = document.getElementById("past-exercise");
const currDivSocial = document.getElementById("current-social");
const pastDivSocial = document.getElementById("past-social");
const currDivSelfCare = document.getElementById("current-self-care");
const pastDivSelfCare = document.getElementById("past-self-care");
const svg = document.querySelectorAll(".svg");
const section = document.querySelectorAll(".section");

const buttons = [dayBtn, weekBtn, monthBtn];
const currDivs = [currDivWork, currDivPlay, currDivStudy, currDivExercise, currDivSocial, currDivSelfCare];
const pastDivs = [pastDivWork, pastDivPlay, pastDivStudy, pastDivExercise, pastDivSocial, pastDivSelfCare];

const inactiveColor = "hsl(236, 100%, 87%)";
const activeColor = "white";

let times = [];
let estáEnHover = false;

function updateButtonStates(activeButton) {
    buttons.forEach(button => {
        if (button === activeButton) {
            button.style.color = activeColor;
            button.style.opacity = "1";
        } else {
            button.style.color = inactiveColor;
            button.style.opacity = "0.5";
        }
    });
}

function handleButtonClick(button, timeframe) {
    return function(e) {
        updateButtonStates(button);
        updateContent(timeframe);
    }
}

dayBtn.addEventListener("click", handleButtonClick(dayBtn, "daily"));
weekBtn.addEventListener("click", handleButtonClick(weekBtn, "weekly"));
monthBtn.addEventListener("click", handleButtonClick(monthBtn, "monthly"));

function updateContent(timeframe) {
    times.forEach((activity, index) => {
        const currDiv = currDivs[index];
        const pastDiv = pastDivs[index];

        if (currDiv && pastDiv) {
            const current = activity.timeframes[timeframe].current;
            const previous = activity.timeframes[timeframe].previous;

            currDiv.innerHTML = `<h5>${activity.title}</h5><h1>${current}hrs</h1>`;
            pastDiv.textContent = `Last ${getPastLabel(timeframe)} - ${previous}hrs`;
            pastDiv.setAttribute("class", "prev");
        }
    });
}

function getPastLabel(timeframe) {
    switch(timeframe) {
        case 'daily': return 'Day';
        case 'weekly': return 'Week';
        case 'monthly': return 'Month';
        default: return '';
    }
}

// function alEntrar() {
//     estáEnHover = true;
//     section.style.backgroundColor = "hsl(235, 46%, 20%)";
    
// }

// function alSalir() {
//     estáEnHover = false;
//     section.style.backgroundColor = "hsl(238, 31%, 37%)";
// }

// svg.addEventListener('mouseenter', alEntrar);
// svg.addEventListener('mouseleave', alSalir);

function alEntrar() {
    const elemento = event.target;
    section.forEach(elemento => {
        elemento.style.backgroundColor = "hsl(238, 31%, 37%)"});
}

function alSalir() {
    const elemento = event.target;
    section.style.backgroundColor = "hsl(235, 46%, 20%)"
}

svg.forEach(elemento => {
    elemento.addEventListener('mouseenter', alEntrar);
    elemento.addEventListener('mouseleave', alSalir);
});

// Fetch data
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        times = data;
        updateButtonStates(dayBtn);
        updateContent("daily");
    })
    .catch(error => console.error('Error:', error));