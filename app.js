
//Arrays to save the heading texts
const contentLineOne = ['Modern', 'Enterprise'];
const contentLineTwo = ['web apps', 'e-commerce'];

//Array of the dashboards
const list = document.querySelectorAll('.dashboard');
const dashboards = Array.from(list);

//Array of color css variables
const contentColor = ['var(--color-green)', 'var(--color-purple)']

//Variables that references the two heading lines
const headingLineOne = document.querySelector('.heading-line-one');
const headingLineTwo = document.querySelector('.heading-line-two');

//Variables that refrences the elements that changes color
const h1 = document.querySelector('h1');
const btnOne = document.querySelector('.btn-one');
const btnTwo = document.querySelector('.btn-two');


let n = 0;

function toggleDasboards () {

    dashboards.forEach(dash => {
        dash.classList.remove('animate-dashboard')
    })

    n++;
    dashboards[n].classList.add('animate-dashboard');

    if(n === 1) {
        n = -1;
    }
}

let i = 0;

function changeHeading () {
    i++;
    headingLineOne.innerHTML = contentLineOne[i];
    headingLineTwo.innerHTML = contentLineTwo[i];
    h1.style.color = contentColor[i];
    btnOne.style.backgroundColor = contentColor[i];
    btnTwo.style.color = contentColor[i];

    if (i === 1) {
        i = -1;
    }
}

/* tl = gsap.timeline({
repeat: -1
});

tl.from(".first-heading", {
duration: 0.5,
opacity: 0,
y: 50
}).to(".first-heading", {
duration: 0.5,
opacity: 0,
y: 70,
onComplete: function () {
   changeHeading()
   toggleDasboards ()
}
}, 7)

gsap.to(".animate-dashboard .default-animation", { //helt fel timing och bara one way
    delay: 8,
    opacity: 1,
    duration: 2
}) */

//Mobile nav

const toggle = document.querySelector('.mobile-nav-toggle');
const overlay = document.querySelector('.mobile-nav-overlay');
const hamburger = document.querySelector('.hamburger');


toggle.addEventListener('click', () => {
    overlay.classList.toggle('nav-open');
    toggle.classList.toggle('nav-open');
    hamburger.classList.toggle('nav-open');
    tl.play();
})

/* const navOpen = document.querySelector('.nav-toggle.nav-open'); */

document.addEventListener('click', navIsOpen);

function navIsOpen (event) {
    const openNav = event.target
/*     console.log(openNav.className) */
        if (openNav.className == "mobile-nav-toggle") {
            console.log('nav clicked')
            tl.reverse()
        }

    }
    

const tl = gsap.timeline({
    duration: 0.3
})
tl.pause()

tl.to('.mobile-nav-list li', {
    opacity: 1,
    y: 0,
    stagger: -0.05
})

 
// COUNTDOWN TIMER

const weeks = document.getElementById('weeks');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');

let countDownToDate; 
let interval;

const startCountDown = document.getElementById('btn-start-countdown')
//Starts countdown when button is clicked
startCountDown.addEventListener('click', runCountDownTimer)
startCountDown.addEventListener('click', closeCountDownOverLay)

//Save input values and build date string on button click
function saveNewDate() {

    //Input values
    const getInputYear = document.getElementById('input-year').value;
    const getInputMonth = document.getElementById('input-month').value;
    const getInputDay = document.getElementById('input-day').value;
    
    //Build the date string and return for global access
    const saveDate = `${getInputMonth} ${getInputDay}, ${getInputYear} 23:59:59`;
    return countDownToDate = new Date(saveDate).getTime(); 
}  

function runCountDownTimer() {
    return interval = setInterval(function() {
        CalcTimerOutput()
    }, 1000)
}

function stopCountDownTimer() {
    clearInterval(interval) 
}

function CalcTimerOutput() {
    let now = new Date().getTime()

    //Get the distance in time
    let distance = countDownToDate - now;

    //Calc time left and save to variables
    const weeksLeft = Math.floor(distance / (1000*60*60*24*7));
    const daysLeft = Math.floor((distance % (1000*60*60*24*7)) / (1000*60*60*24));
    const hoursLeft = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutesLeft = Math.floor((distance % (1000*60*60)) / (1000*60));

    //Display the time left
    weeks.innerHTML = weeksLeft;
    days.innerHTML = daysLeft;
    hours.innerHTML = hoursLeft;
    minutes.innerHTML = minutesLeft;
}
/* END COUNTDOWN TIMER */

//OPEN OVERLAY
const popUp = document.getElementById('set-time')
const countDownOverLay = document.getElementById('countdown-overlay')
popUp.addEventListener('click', () => {
    /* countDownOverLay.classList.add('open-countdown-overlay') */
    openCountDownOverLay()
})

function openCountDownOverLay() {
    document.querySelector('body').classList.add('prevent-scroll')
    gsap.to("#countdown-overlay", {
        opacity: 1, 
        zIndex: 10, 
        duration: 0.3
        });
}

function closeCountDownOverLay() {
    document.querySelector('body').classList.remove('prevent-scroll')
    gsap.to("#countdown-overlay", {
        opacity: 0, 
        zIndex: -1, 
        duration: 0.2
        });
}

/* INPUT MICRO INTERACTIONS */

const userInput = document.querySelectorAll('.input-box');
const arrayFromUserInput = Array.from(userInput)

arrayFromUserInput.forEach(input => {
    input.addEventListener('focusout', maxClipPath)
    input.addEventListener('focusin', minClipPath)
})

// Correct input formats
const checkYearFormat = /^[0-9]{4}$/
const checkMonthFormat = /^(January|February|March|April|May|June|July|August|September|October|November|December)$/
const checkDayFormat = /^[0-9]{2}$/


function maxClipPath(event) {
    const inputBoxInteractedWith = event.target
    const inputBoxId = event.target.getAttribute("id")
    const btnStartCountDown = document.getElementById("btn-start-countdown")
    
    //Check based on the input Id if the format entered is correct - if yes -> 
    //update with new colors and data attribute
    if(inputBoxId === 'input-year' && !inputBoxInteractedWith.value.match(checkYearFormat)) {
        console.log('wrong format ' + inputBoxId)
    } else if (inputBoxId === 'input-month' && !inputBoxInteractedWith.value.match(checkMonthFormat)) {
        console.log('wrong format ' + inputBoxId)
    } else if (inputBoxId === 'input-day' && !inputBoxInteractedWith.value.match(checkDayFormat)){
        console.log('wrong format ' + inputBoxId)
    } else {
        inputBoxInteractedWith.style.backgroundColor = "#b032a3"
        inputBoxInteractedWith.style.color = "#ffffff"
        const inputDataAttr = event.target.setAttribute("data-input-correct", "true")
    }

    const dataInputAttr = document.querySelectorAll('[data-input-correct="true"]')

    //If each of the inputs have a data attribute of true ->
    //change color and pointer event
    if(dataInputAttr.length === 3) {    
        saveNewDate()
        btnStartCountDown.style.backgroundColor = "#b032a3"
        btnStartCountDown.style.color = "#ffffff"
        btnStartCountDown.style.pointerEvents = "auto"
    } else {
        btnStartCountDown.style.backgroundColor = "#ffffff"
        btnStartCountDown.style.color = "#000000" 
        btnStartCountDown.style.pointerEvents = "none"
    }
}

function minClipPath(event) {
    //Stops the timer when an input is 'focusin'
    stopCountDownTimer()
    
    const inputBoxInteractedWith = event.target
    inputBoxInteractedWith.style.backgroundColor = "#ffffff"
    inputBoxInteractedWith.style.color = "#000000"
    const inputDataAttr = event.target.setAttribute("data-input-correct", "false")
}




