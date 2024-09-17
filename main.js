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
const svg = document.querySelectorAll("svg");
const section = document.querySelectorAll("section");

const buttons = [dayBtn, weekBtn, monthBtn];
const currDivs = [currDivWork, currDivPlay, currDivStudy, currDivExercise, currDivSocial, currDivSelfCare];
const pastDivs = [pastDivWork, pastDivPlay, pastDivStudy, pastDivExercise, pastDivSocial, pastDivSelfCare];

const inactiveColor = "hsl(236, 100%, 87%)";
const activeColor = "white";

let times = [];
let activeButton = null;

console.log(section);
console.log(svg);

function updateButtonStates(clickedButton) {
    activeButton = clickedButton;
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

function handleButtonHover(button) {
    return function() {
        if (button !== activeButton) {
            button.style.color = activeColor;
            button.style.opacity = "1";
        }
    }
}

function handleButtonNoHover(button) {
    return function() {
        if (button !== activeButton) {
            button.style.color = inactiveColor;
            button.style.opacity = "0.5";
        }
    }
}

function handleButtonClick(button, timeframe) {
    return function(e) {
        updateButtonStates(button);
        updateContent(timeframe);
    }
}

buttons.forEach(button => {
    button.addEventListener('mouseenter', handleButtonHover(button));
    button.addEventListener('mouseleave', handleButtonNoHover(button));
})

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

/// 3 dots hover
function alEntrar() {
    section.forEach(elemento => {
        elemento.style.backgroundColor = "hsl(235, 46%, 20%)"});
}

function alSalir() {
    section.forEach(elemento => {
    elemento.style.backgroundColor = ""});
}

svg.forEach(elemento => {
    elemento.addEventListener('mouseenter', alEntrar);
    elemento.addEventListener('mouseleave', alSalir);
});

console.log(activeButton);

// Fetch data
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        times = data;
        updateButtonStates(dayBtn);
        updateContent("daily");
    })
    .catch(error => console.error('Error:', error));