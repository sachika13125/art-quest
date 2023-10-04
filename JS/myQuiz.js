$(document).ready(function() {
    const apiUrl = 'https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=10&difficulty=easy&tags=art';
    let currentQuestion = 0;
    let score = 0;
    let questions = [];

    // Load Data from Web API
    function loadQuizData() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                // Check if data can be get correctly
                if (data && data.length > 0) {
                    questions = data;
                    displayQuestion(currentQuestion);
                } else {
                    alert('Can not get quiz data');
                }
                
                console.log(data);
            },            
            error: function() {
                alert('Failed to load data');
            }
        });
    }

    // Display questions
    function displayQuestion(questionIndex) {
        if (questionIndex < questions.length) {
            const currentQuiz = questions[questionIndex];
            $("#question").text(currentQuiz.question);
            const answerButtons = $(".answer-btn");

            const answers = shuffleAnswers([
                currentQuiz.correctAnswer,
                ...currentQuiz.incorrectAnswers
            ]);

            for (let i = 0; i < 4; i++) {
                answerButtons.eq(i).text(answers[i]);
            }
        } else {
            showResult();
        }
    }

    // Shuffle answers
    function shuffleAnswers(answers) {
        for(let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    // Check correct answer and update score
    function checkAnswer(selectedAnswer) {
        const currentQuiz = questions[currentQuestion];
        if (selectedAnswer === currentQuiz.correctAnswer) {
            score++;
        }
        currentQuestion++;
        displayQuestion(currentQuestion);
    }

    // Show the result
    function showResult() {
        $("#question").text("Completed!");
        $(".answer-btn").hide();
        $("#result").text("Your score is " + score + "/" + questions.length);
        $("#next-btn").hide();
        $("#score-value").text(score);
        $("#score").show();
        $("#restart-btn").show();
    }

    // Start to load data
    loadQuizData();

    // Click handler of Answer button
    $(".answer-btn").click(function() {
        const selectedAnswer = $(this).text();
        checkAnswer(selectedAnswer);
    });

    // Click handler of Next button
    $("#next-btn").click(function() {
        displayQuestion(currentQuestion);
    });

    // Click handler of Restart button
    $("#restart-btn").click(function() {
        currentQuestion = 0;
        score = 0;
        $("#score-value").text(score);
        $("#score").hide();
        $("#restart-btn").hide();
        $(".answer-btn").show();
        $("#next-btn").show();
        displayQuestion(currentQuestion);
    });
});