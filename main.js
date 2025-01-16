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
const timeFrames = ["daily", "weekly", "monthly"];
const buttonStyles = ["color", "opacity"];
const inactiveColor = ["hsl(236, 100%, 87%)", "0.5"];
const activeColor = ["white", "1"];
const mouseStates = ['mouseenter', 'mouseleave'];
const svgFuncNames = [alEntrar, alSalir];

let times = [];
let activeButton = null;

function buttonStylesInactive(buttonStyles, inactiveColor, button, k) {
    button.style[buttonStyles[k]] = inactiveColor[k];
}

function buttonStylesActive(buttonStyles, activeColor, button, i) {
    button.style[buttonStyles[i]] = activeColor[i];
}

function elseFor(buttonStyles, inactiveColor, button) {
    for (let k = 0; k < buttonStyles.length; k++) {
        buttonStylesInactive(buttonStyles, inactiveColor, button, k);
    }
}

function ifFor(buttonStyles, activeColor, button) {
    for (let i = 0; i < buttonStyles.length; i++) {
        buttonStylesActive(buttonStyles, activeColor, button, i);
    }
}

function separatingActiveButtonAndInactive(buttonStyles, activeColor, inactiveColor, button) {
    if (button === activeButton) {
        ifFor(buttonStyles, activeColor, button);
    } else {
        elseFor(buttonStyles, inactiveColor, button);
    }
}

function buttonsForEach(buttonStyles, activeColor, inactiveColor, buttons) {
    buttons.forEach(button => {
        separatingActiveButtonAndInactive(buttonStyles, activeColor, inactiveColor, button);
    });
}

function updateButtonStates(clickedButton, buttonStyles, activeColor, inactiveColor, buttons) {
    activeButton = clickedButton;
    buttonsForEach(buttonStyles, activeColor, inactiveColor, buttons);
}

function handleButtonClick(button, timeframe) {
    return function(e) {
        updateButtonStates(button, buttonStyles, activeColor, inactiveColor, buttons);
        updateContent(timeframe, times);
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick(buttons[i], timeFrames[i]));
}

const validations = {
    'mouseenter': (button) => {for (let i = 0; i < buttonStyles.length; i++) {
        button.style[buttonStyles[i]] = activeColor[i];
    }},
    'mouseleave': (button) => {for (let i = 0; i < buttonStyles.length; i++) {
        button.style[buttonStyles[i]] = inactiveColor[i];
    }}
};

function handleButtonHover(button, mouseState, validations) {
    return function() {
        if (button !== activeButton) {
            return validations[mouseState](button);
        }
    }
}

mouseStates.forEach(mouseState => {
    buttons.forEach(button => {
        button.addEventListener(mouseState, handleButtonHover(button, mouseState, validations));
    });
})


function assigningPastDivSetAtt(pastDiv) {
    pastDiv.setAttribute("class", "prev");
}

function assigningPastDivTextCont(timeframe, pastDiv, previous) {
    pastDiv.textContent = `Last ${getPastLabel(timeframe)} - ${previous}hrs`;
    assigningPastDivSetAtt(pastDiv);
}

function assigningCurrDivInnerHTML(timeframe, activity, currDiv, pastDiv, current, previous) {
    currDiv.innerHTML = `<h5>${activity.title}</h5><h1>${current}hrs</h1>`;
    assigningPastDivTextCont(timeframe, pastDiv, previous);      
}

function assigningCurrentAndPreviousVar(timeframe, activity, currDiv, pastDiv){
    const {current, previous} = activity.timeframes[timeframe];
    assigningCurrDivInnerHTML(timeframe, activity, currDiv, pastDiv, current, previous);
}

function assigningPastDiv(timeframe, activity, index, currDiv) {
    const pastDiv = pastDivs[index];
    assigningCurrentAndPreviousVar(timeframe, activity, currDiv, pastDiv);
}

function assigningCurrDiv(timeframe, activity, index) {
    const currDiv = currDivs[index];
    assigningPastDiv(timeframe, activity, index, currDiv);
}

function updateContent(timeframe, times) {
    times.forEach((activity, index) => {
        assigningCurrDiv( timeframe, activity, index);
    });
}

const getLabel = {
    'daily': 'Day',
    'weekly': 'Week',
    'monthly': 'Month'
}

function getPastLabel(timeframe) {
    return getLabel[timeframe];
}

/// 3 dots hover
function assigningStyleElementoAlEntrar(eleme) {
    eleme.style.backgroundColor = "hsl(235, 46%, 20%)";
}

function alEntrar() {
    section.forEach(eleme => {
        assigningStyleElementoAlEntrar(eleme);});
}

function assigningStyleElementoAlSalir(eleme) {
    eleme.style.backgroundColor = "";
}

function alSalir() {
    section.forEach(eleme => {
        assigningStyleElementoAlSalir(eleme);});
}

svg.forEach(eleme => {
    for (let r = 0; r < mouseStates.length; r++) {
        eleme.addEventListener(mouseStates[r], svgFuncNames[r]);
    }
});

// Fetch data
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        times = data;
        updateButtonStates(weekBtn, buttonStyles, activeColor, inactiveColor, buttons);
        updateContent("weekly", times);
    })
    .catch(error => console.error('Error:', error));