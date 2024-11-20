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
// const handleHover = ["handleButtonHover", "handleButtonNoHover"];

let times = [];
let activeButton = null;

// console.log(section);
// console.log(svg);
console.log(currDivs);

function elseFor(buttonStyles, inactiveColor, button) {
    for (let k = 0; k < buttonStyles.length; k++) {
        button.style[buttonStyles[k]] = inactiveColor[k];
        // console.log(inactiveColor[i]);
    }
}

function ifFor(buttonStyles, activeColor, button) {
    for (let i = 0; i < buttonStyles.length; i++) {
        button.style[buttonStyles[i]] = activeColor[i];
    }
}

function separatingActiveButtonAndInactive(buttonStyles, activeColor, inactiveColor, button) {
    if (button === activeButton) {
        ifFor(buttonStyles, activeColor, button);
        // button.style.color = activeColor;
        // button.style.opacity = "1";
       
            // console.log(activeColor[i]);
        // console.log(activeColor);
    } else {
        elseFor(buttonStyles, inactiveColor, button);
        // button.style.color = inactiveColor;
        // button.style.opacity = "0.5";
        
        // console.log(inactiveColor);
    }
    // console.log(activeColor);
}

function buttonsForEach(buttonStyles, activeColor, inactiveColor, buttons) {
    buttons.forEach(button => {
        separatingActiveButtonAndInactive(buttonStyles, activeColor, inactiveColor, button);
    });
}

function updateButtonStates(clickedButton, buttonStyles, activeColor, inactiveColor, buttons) {
    activeButton = clickedButton;
    buttonsForEach(buttonStyles, activeColor, inactiveColor, buttons);
    
    // console.log(activeColor);
}

// console.log(activeColor);

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
            // button.style.color = activeColor;
            // button.style.opacity = "1";
            return validations[mouseState](button);
        }
    }
}

// function handleButtonHover(button, mouseState) {
//     return function() {
//         if (button !== activeButton) {
//             // button.style.color = activeColor;
//             // button.style.opacity = "1";
//             if (mouseState === 'mouseenter') {
//                 for (let i = 0; i < buttonStyles.length; i++) {
//                     button.style[buttonStyles[i]] = activeColor[i];
//                 }
//             } else {
//                 for (let i = 0; i < buttonStyles.length; i++) {
//                     button.style[buttonStyles[i]] = inactiveColor[i];
//                 }
//             }
//         }
//     }
// }

// function handleButtonHover(button) {
//     return function() {
//         if (button !== activeButton) {
//             // button.style.color = activeColor;
//             // button.style.opacity = "1";
//             for (let i = 0; i < buttonStyles.length; i++) {
//                 button.style[buttonStyles[i]] = activeColor[i];
//             }
//         }
//     }
// }

// function handleButtonNoHover(button) {
//     return function() {
//         if (button !== activeButton) {
//             // button.style.color = inactiveColor;
//             // button.style.opacity = "0.5";
//             for (let i = 0; i < buttonStyles.length; i++) {
//                 button.style[buttonStyles[i]] = inactiveColor[i];
//             }
//         }
//     }
// }

function handleButtonClick(button, timeframe) {
    return function(e) {
        updateButtonStates(button, buttonStyles, activeColor, inactiveColor, buttons);
        updateContent(timeframe, times);
    }
}

mouseStates.forEach(mouseState => {
    buttons.forEach(button => {
        button.addEventListener(mouseState, handleButtonHover(button, mouseState, validations));
        // button.addEventListener('mouseleave', handleButtonNoHover(button));
    })
})

// for (let k = 0; k < mouseStates.length; k++) {
//     buttons.forEach(button => {
//                     button.addEventListener(mouseStates[k], handleHover[k](button));
//                     // button.addEventListener('mouseleave', handleButtonNoHover(button));
//                 })
// }

// handleHover.forEach(hover => {
//     mouseStates.forEach(mouseState => {
//         buttons.forEach(button => {
//             button.addEventListener(mouseState, hover(button));
//             // button.addEventListener('mouseleave', handleButtonNoHover(button));
//         })
//     });
// });

// buttons.forEach(button => {
//     button.addEventListener('mouseenter', handleButtonHover(button));
//     button.addEventListener('mouseleave', handleButtonNoHover(button));
// });

// dayBtn.addEventListener("click", handleButtonClick(dayBtn, "daily"));
// weekBtn.addEventListener("click", handleButtonClick(weekBtn, "weekly"));
// monthBtn.addEventListener("click", handleButtonClick(monthBtn, "monthly"));

// buttons.forEach(button => {
//     timeFrames.forEach(timeframe => {
//         button.addEventListener('click', handleButtonClick(button, timeframe));
//     })
// })

// let i = 0;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick(buttons[i], timeFrames[i]));
}

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

function assigningPreviousVar(timeframe, activity, currDiv, pastDiv, current) {
    const previous = activity.timeframes[timeframe].previous;
    assigningCurrDivInnerHTML(timeframe, activity, currDiv, pastDiv, current, previous);
}

function assigningCurrentVar(timeframe, activity, currDiv, pastDiv) {
    const current = activity.timeframes[timeframe].current;
    assigningPreviousVar(timeframe, activity, currDiv, pastDiv, current);
            
}

function assigningPastDiv(timeframe, activity, index, currDiv) {
    const pastDiv = pastDivs[index];
    assigningCurrentVar(timeframe, activity, currDiv, pastDiv);

        // if (currDiv && pastDiv) {
            
        // }
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

// function updateContent(timeframe, times) {
//     times.forEach((activity, index) => {
//         const currDiv = currDivs[index];
//         const pastDiv = pastDivs[index];

//         if (currDiv && pastDiv) {
//             const current = activity.timeframes[timeframe].current;
//             const previous = activity.timeframes[timeframe].previous;

//             currDiv.innerHTML = `<h5>${activity.title}</h5><h1>${current}hrs</h1>`;
//             pastDiv.textContent = `Last ${getPastLabel(timeframe)} - ${previous}hrs`;
//             pastDiv.setAttribute("class", "prev");
//         }
//     });
// }

const getLabel = {
    'daily': 'Day',
    'weekly': 'Week',
    'monthly': 'Month'
}

function getPastLabel(timeframe) {
    return getLabel[timeframe];
    // switch(timeframe) {
    //     case 'daily': return 'Day';
    //     case 'weekly': return 'Week';
    //     case 'monthly': return 'Month';
    //     // default: return '';
    // }
}

/// 3 dots hover
console.log(section);

// function assigningStyleElementoAlEntrar(section, j) {
//     section[j].style.backgroundColor = "hsl(235, 46%, 20%)";
// }

// function alEntrar(section) {
//     for (let j = 0; j < section.length; j++) {
//     assigningStyleElementoAlEntrar(section, j)};
// }

function assigningStyleElementoAlEntrar(elemento) {
    elemento.style.backgroundColor = "hsl(235, 46%, 20%)";
}

function alEntrar() {
    section.forEach(elemento => {
        assigningStyleElementoAlEntrar(elemento);});
}

function assigningStyleElementoAlSalir(elemento) {
    elemento.style.backgroundColor = "";
}

function alSalir() {
    section.forEach(elemento => {
        assigningStyleElementoAlSalir(elemento);});
}

// function alEntrar(section) {
//     section.forEach(elemento => {
//         assigningStyleElementoAlEntrar(elemento)});
// }

// function assigningStyleElementoAlSalir(section, i) {
//     section[i].style.backgroundColor = "";
// }

// function alSalir(section) {
//     for (let i = 0; i < section.length; i++) {
//     assigningStyleElementoAlSalir(section, i)};
// }

// function alSalir(section) {
//     section.forEach(elemento => {
//     assigningStyleElementoAlSalir(elemento)});
// }

svg.forEach(elemento => {
    elemento.addEventListener('mouseenter', alEntrar);
    elemento.addEventListener('mouseleave', alSalir);
});

// console.log(activeButton);

// Fetch data
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        times = data;
        updateButtonStates(weekBtn, buttonStyles, activeColor, inactiveColor, buttons);
        updateContent("weekly", times, currDivs);
    })
    .catch(error => console.error('Error:', error));