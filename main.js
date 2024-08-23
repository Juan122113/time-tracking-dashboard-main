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

const requestURL = "./data.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
    const times = request.response;

    dayBtn.addEventListener("click", (e) => {
        const myH5 = document.createElement("h5");
        myH5.textContent = times[0].title;
        const myH1 = document.createElement("h1");
        myH1.textContent = times[0].timeframes.daily.current + " hs";
        // myH5.setAttribute();
        myH1.setAttribute("class", "daily time");
        currDivWork.innerHTML = '';

        if (currDivWork.childElementCount < 2) {
            currDivWork.appendChild(myH5);
            currDivWork.appendChild(myH1);
        }

        dayBtn.style.color = "white";
        dayBtn.style.opacity = "1";
        // weekBtn.style.color = "hsl(236, 100%, 87%)";
        // weekBtn.style.opacity = "0.5";
        // monthBtn.style.color = "hsl(236, 100%, 87%)";
        // monthBtn.style.opacity = "0.5";
        
    })

    weekBtn.addEventListener("click", (e) => {
        const myH5 = document.createElement("h5");
        myH5.textContent = times[0].title;
        const myH1 = document.createElement("h1");
        myH1.textContent = times[0].timeframes.weekly.current + " hs";
        // myH5.setAttribute();
        myH1.setAttribute("class", "daily time");

        currDivWork.innerHTML = '';

        if (currDivWork.childElementCount < 2) {
            
            currDivWork.appendChild(myH5);
            currDivWork.appendChild(myH1);
        }

        weekBtn.style.color = "white";
        weekBtn.style.opacity = "1";
        // weekBtn.style.color = "hsl(236, 100%, 87%)";
        // weekBtn.style.opacity = "0.5";
        // monthBtn.style.color = "hsl(236, 100%, 87%)";
        // monthBtn.style.opacity = "0.5";
        
    })
}



// fetch("./data.json")
//     .then(response => response.json())
//     .then(data => console.log(data))