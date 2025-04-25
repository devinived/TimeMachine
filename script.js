let actionButton = document.querySelector("#actionButton");
let resetButton = document.querySelector("#resetButton");
let state="notStarted";

let body = document.querySelector("body")
let timerDisplay = document.querySelector("#timerDisplay");
let timerLabels = document.querySelector("#timerLabels");

let inputs = document.querySelector("#timerInputs");
let h1 = document.querySelector("h1");

let hourDisplay = document.querySelector("div#HH.countdown");
let minuteDisplay = document.querySelector("div#MM.countdown");
let secondDisplay = document.querySelector("div#SS.countdown");

let title = document.querySelector("head > title");
let footer = document.querySelector("#footer");

function toggleButton(reset=false) {
    //the logic part
    if (reset === false) {
        if (actionButton.textContent === "Start") {
            actionButton.textContent = "Pause";
            state="started";
        } else {
            actionButton.textContent = "Start";
            state="paused";
        } 
    } else {
        actionButton.textContent = "Start";
    }
    updateVisuals();
};
function updateVisuals() {
    //updating the visuals

    if (state==="notStarted") {
        body.style.backgroundColor = "#ffffff";
        body.style.transition = "background-color 0.5s ease-in-out";
        timerDisplay.style.fontSize = "10vw";
        timerDisplay.style.width = "40%";

        timerLabels.style.fontSize = "1.6vw";
        timerLabels.style.display = "none";

        inputs.style.fontSize = "100%";
        inputs.style.display = "flex";
        h1.style.fontSize = "200%";
        h1.style.marginTop = "4vh";
        actionButton.style.width = "15vw";
        resetButton.style.display = "none";

        footer.style.fontSize = "100%";
    } else {
        body.style.backgroundColor = "#cfd6f2";

        timerDisplay.style.fontSize = "15vw";
        timerDisplay.style.width = "70%";
        timerLabels.style.fontSize = "3vw";
        h1.style.marginTop = "4vh";
        timerLabels.style.display = "flex";
        inputs.style.display = "none";
        h1.style.fontSize = "150%";
        actionButton.style.width = "30vw";
        resetButton.style.display = "block";

        footer.style.fontSize = "70%";

    }
};

//this updates the display of the timer once a second, and zeroes out negative numbers
function updateDisplay(hours, minutes, seconds) {
    //gets rid of negative numbers and if a number is negative it counts as 0
    if (hours < 0) {
        hours = 0;
    } else if (minutes < 0) {
        minutes = 0;
    } else if (seconds < 0) {
        seconds = 0;
    }
    //updating the countdown display
    hourDisplay.textContent = String(hours).padStart(2, '0');
    minuteDisplay.textContent = String(minutes).padStart(2, '0');
    secondDisplay.textContent = String(seconds).padStart(2, '0');

    timerDisplay.style.color = "#c11212";
    setTimeout(() => {
        timerDisplay.style.color = "#124fc1";
        }, 500);


};

resetButton.addEventListener("click", () => {
    //reset the timer
    clearInterval(timer);
    updateDisplay(0, 0, 0);
    console.log("Reset Timer");
    title.textContent = `the time machine`;
    state="notStarted";
    updateVisuals();

    //if the action button still says pause, change it to say start
    if (actionButton.textContent === "Pause") {
        toggleButton(reset=true);
    }


});

actionButton.addEventListener("click", () => {
    if (state==="notStarted") {
        toggleButton();

        let hourInput = document.querySelector("input#hours");
        let minuteInput = document.querySelector("input#minutes");
        let secondInput = document.querySelector("input#seconds");

        let hours = parseInt(hourInput.value) || 0;
        let minutes = parseInt(minuteInput.value) || 0;
        let seconds = parseInt(secondInput.value) || 0;
    
    console.log(`Began Timer | Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
    startTimer(hours, minutes, seconds);
    } else if (state==="paused") {
        toggleButton();
        let hours = document.querySelector("div#HH.countdown").textContent;
        let minutes = document.querySelector("div#MM.countdown").textContent;
        let seconds = document.querySelector("div#SS.countdown").textContent;
        console.log(`Resumed Timer | Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
    startTimer(hours, minutes, seconds);
    } else {
        state="notStarted"
        clearInterval(timer);
        toggleButton();
        console.log("Paused Timer");
    }
});

function startTimer(hours, minutes, seconds, firstrun=true) {

    // this gets around the issue of setInterval running after the interval plays out once, since i want the timer to start immediately and not after a second
    if (firstrun) {
        updateDisplay(hours, minutes, seconds);
        title.textContent = `the time machine | ${hours}h ${minutes}m ${seconds}s`;

        if (seconds > 0) {
            seconds=seconds-1;
        } else if (minutes > 0) {
            minutes=minutes-1;
            seconds = 59;
        } else if (hours > 0) {
            hours=hours-1;
            minutes = 59;
            seconds = 59;
        } else {
    }

    startTimer(hours, minutes, seconds, false);
    //now the timer can run like normal with setInterval
    timer = setInterval(() => {
        updateDisplay(hours, minutes, seconds);
        title.textContent = `the time machine | ${hours}h ${minutes}m ${seconds}s`;

        if (seconds > 0) {
            seconds=seconds-1;

        } else if (minutes > 0) {
            minutes=minutes-1;
            seconds = 59;

        } else if (hours > 0) {
            hours=hours-1;
            minutes = 59;
            seconds = 59;


        } else {
            clearInterval(timer);
            title.textContent = `time's up!`;

            console.log("Timer finished");
            toggleButton();
            state="notStarted";
            updateDisplay(0, 0, 0);

            let alarm = document.getElementById("alarmSound");
            alarm.loop = true;
            alarm.play();

            alert("time's up!");

            alarm.pause();
            alarm.currentTime = 0;
            updateVisuals();
            title.textContent = `the time machine`;

        }
    }, 1000);
}};
