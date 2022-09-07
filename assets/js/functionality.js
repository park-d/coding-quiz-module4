// Global Variables needed
var timer = 75;
var timeInterval;
var questionNum = 0;

// DOM Elements
var timerElement = document.getElementById("time");
var startButton = document.getElementById("start-quiz");
var introElement = document.getElementById("intro-content");
var questionElement = document.getElementById('quiz-question');
var quizOptionsElement = document.getElementById("quiz-options");
var outtroElement = document.getElementById("out-tro");
var playerElement = document.getElementById("player-initials")
var submitButton = document.getElementById("submit-scores");

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

function displayQuestion() {
    // display the quiz content questions, and generate buttons for answer options 
    //defining variables in local scope to use in dynamic question display
    var currentQuestionNum = quizContent[questionNum];

    // selecting the element for the question, then putting the text for the current question into the element based on the quizContent object
    questionElement.textContent = currentQuestionNum.question;

    // adding something to clear the previously made options, or else more buttons append to the option list
    quizOptionsElement.innerHTML = '';

    // creating a button for a question option, assigning the text from the object to a variable, then making the button display that text and give it the option class, then appending that button to the options div element
    for (var i = 0; i < 4; i++) {
        var optionButton = document.createElement("button");
        var option = currentQuestionNum.options[i];
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);

        optionButton.textContent = option;

        quizOptionsElement.appendChild(optionButton);
    }
}

// function that switches to next question, and gives comments if it is right or wrong
function nextQuestion(event) {
    var buttonElement = event.target;
    var allButtons = document.querySelectorAll(".option")
    console.log(allButtons);

    // handling for the case in which user misses the button and clicks behind it, and it throws an incorrect outcome
    if (!buttonElement.matches(".option")) {
        return;
    }

    // conditional for determining when the answer is right, and changing attributes
    if (buttonElement.value === quizContent[questionNum].answer) {
        buttonElement.setAttribute("style", "background-color: green");
        buttonElement.textContent = "Correct!";
        // setting all the other buttons attribute to disabled after clicking on the user answer choice
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].setAttribute('disabled', 'disabled');
        }

    // determining when the answer is wrong, subtracting the penalty, updating the time, and changing attributes
    } else {
        timer = timer - 15;
        timerElement.textContent = timer;

        if (timer <= 0) {
            timer = 0;
        }

        buttonElement.setAttribute("style", "background-color: red");
        buttonElement.textContent = "Incorrect!";
        // setting all the other buttons attribute to disabled after clicking on the user answer choice
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].setAttribute('disabled', 'disabled');
        }
    }

    // this sets a delay before moving on to the next question so you can see the response 
    setTimeout(function () {
        questionNum = questionNum + 1;
        
        if (timer <= 0 || questionNum === quizContent.length) {
            endGame();
        } else {
            displayQuestion();
        }

    }, 650);
}

//endGame function carries out everything to end the game, stop the timer, etc, change page, etc.
function endGame() {
    //stops timer
    clearInterval(timeInterval);
    timerElement.textContent = timer;
    // hides and unhides sections of the page based on the end of the game
    outtroElement.removeAttribute("class");
    questionElement.setAttribute("class", "hide");
    quizOptionsElement.setAttribute("class", "hide");
    //creating variable to save what score the player got
    var postedScore = document.getElementById("player-score")
    postedScore.textContent = timer + "."
}

// connects start button on intro page to the timer function
startButton.onclick = quizStart;

//connects buttons for answer options to switch to the next question function
quizOptionsElement.onclick = nextQuestion;