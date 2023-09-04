//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is the purpose of HTML?",
        options: ["For Object Oriented Programming", "For building Webpages", "For Coding Webpages", "For Styling Webpages"],
        correct: "For building Webpages",
    },
    {
        id: "1",
        question: "What is the purpose of CSS?",
        options: ["For Object Oriented Programming", "For building Webpages", "For Coding Webpages", "For Styling Webpages"],
        correct: "For Styling Webpages",
    },
    {
        id: "2",
        question: "What is the purpose of JavaScript?",
        options: ["For Object Oriented Programming", "For building Webpages", "For Coding Webpages", "For Styling Webpages"],
        correct: "For Coding Webpages",
    },
    {
        id: "3",
        question: "What does HTML stand for?",
        options: ["Hypertext Marked", "Hypertext Markup Language", "Hypertest Markup Language", "Hypertext Markup Longcode"],
        correct: "Hypertext Markup Language",
    },
    {
        id: "4",
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Colourful Style Sheets", "Cascading Stun Sheets", "Cascading Style Startups"],
        correct: "Cascading Style Sheets",
    },
    {
        id: "5",
        question: "What does href do",
        options: ["Create a heading", "Create a horizontal rule", "Create a hyperlink","Divides the page into two"],
        correct: "Create a hyperlink",
    }, {
        id: "6",
        question: "What colour is #FFFFFF?",
        options: ["White", "Blue", "Red", "Black"],
        correct: "White",
    },
    {
        id: "7",
        question: "How is the sourse code of a page viewed?",
        options: ["Ctrl U", "Ctrl W", "Ctrl Shift l", "Alt F4"],
        correct: "Ctrl U",
    },
    {
        id: "8",
        question: "How is a HTML file savwd?",
        options: ["Nothing", ".html", ".https", ".java"],
        correct: ".html",
    },
    {
        id: "9",
        question: "What does the <die> tag do?",
        options: ["Divides the page into two", "Separates code to make it easier to format", "Used to make subdivision of cfode","Cascading Style Sheets"],
        correct: "Separates code to make it easier to format",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};