//Get and initialize data
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
const numberOfQuestions = 5;
const apiUrl = 'https://opentdb.com/api.php?amount=15&category=25&type=multiple';
const answerBtn = document.querySelectorAll('.answer-btn');
const scoreValue = document.getElementById('score-value');
const restartBtn = document.getElementById('restart-btn')


function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results.slice(0, numberOfQuestions);
            showQuestion();
        });
};

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const questionDisplay = document.getElementById('question');
        const resultElement = document.getElementById('result');
        
        questionDisplay.innerText = currentQuestion.question;

        resultElement.style.display = 'none';
        const answers = [...currentQuestion.incorrect_answers];
        answers.splice(Math.floor(Math.random() * 4), 0, currentQuestion.correct_answer);

        answerBtn.forEach((button, index) => {
            button.innerText = answers[index];
            button.addEventListener('click', () => checkAnswer(button.innerText));
        });

        document.getElementById('next-btn').style.display = 'none';
        restartBtn.style.display = 'none';
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const resultElement = document.getElementById('result');

    if (selectedAnswer === currentQuestion.correct_answer) {
        resultElement.style.display = 'block';
        resultElement.innerText = 'Correct!';
        resultElement.style.backgroundColor = 'green';
        score++;
    } else {
        resultElement.style.display = 'block';
        resultElement.innerText = 'Wrong:('
        resultElement.style.backgroundColor = 'red';
    }

    document.getElementById('next-btn').style.display = 'block';
    
    const answerBtn = document.querySelectorAll('.answer-btn');
    answerBtn.forEach(button => button.disabled = true);
};

// Save Score
function saveScore() {
    localStorage.setItem('quizeScore', score);
}

function endQuiz() {
    const questionDisplay = document.getElementById('question');
    const answerBtn = document.querySelectorAll('.answer-btn');
    const resultElement = document.getElementById('result');
    const nextBtn = document.getElementById('next-btn');

    questionDisplay.innerText = 'Completed! Your socore is' + ' ' + score;
    answerBtn.forEach(button => button.style.display = 'none');
    resultElement.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'block';
};

// Load Score
function loadScore() {
    const savedScore = localStorage.getItem('quizScore');
    if (savedScore !== null) {
        score = parseInt(savedScore);
    }
}

// Update Score
function updateScoreDisplay() {
    scoreValue.textContent = score;
}

document.getElementById('next-btn').addEventListener('click', () => {
    // Enable Answer Btn
    answerBtn.forEach(button => button.disabled = false);
    currentQuestionIndex++;
    showQuestion();
    saveScore();
    updateScoreDisplay()
});

restartBtn.addEventListener('click', () => {
    score = 0;
    updateScoreDisplay();
    currentQuestionIndex = 0;
    showQuestion();
    restartBtn.style.display = 'none';
    answerBtn.forEach(button => button.style.display = 'inline');
});

fetchData();


  