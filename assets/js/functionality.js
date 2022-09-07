// Global Variables needed
var timer = 75;
var timeInterval;

// DOM Elements
var timerElement = document.getElementById("time");
var startButton = document.getElementById("start-quiz");
var introElement = document.getElementById("intro-content");

function quizStart() {
    // start timer, hide intro elements, and show the quiz content
    // decrement the timer down by 1 second starting at 75 and display it on page, and if the timer gets to 0, then call the endGame function and stop counting down
    timeInterval = setInterval(
        function timeDecrease() {
            timer--;
            timerElement.textContent = timer;
            if (timer <= 0) {
                endGame();
            }
        }
        , 1000)

    //to show the timer start at 75 instead of 74
    timerElement.textContent = timer;

    //hiding element that had any introduction elements
    introElement.setAttribute("class", "hide");

    // getting the element that will store the actual quiz questions and remove it from .hide class
    var quizContentElement = document.getElementById("quiz-content");
    quizContentElement.removeAttribute("class");

    //run the fuction below that actually displays the questions
    displayQuestion();
}

// connects start button on intro page to the timer function
startButton.onclick = quizStart;