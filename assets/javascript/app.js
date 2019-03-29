
//create a few questions and answers
var questions = [{
    question: "What is the name of the secret fourth size on the Starbucks menu?",
    choices: ["Poco", "Mini", "Small", "Short"],
    correctAnswer: "Short",
    correctImage: "assets/images/starbucks-size.jpg"
},

{
    question: "Where did the size names for the drinks come from?",
    choices: ["They just made them up", "They're Italian", "They were inspired by a coffee house one of the founders visited as a child", "They were originally a joke"],
    correctAnswer: "They just made them up",
    correctImage: "assets/images/startbucks-name-origins.gif"
},
{
    question: "Starbucks has its own record label, Hear Music. Which of these famous musicians did it manage to sign early on in 2007?",
    choices: ["Vampire Weekend", "Bob Dylan", "Paul McCartney", "Eric Clapton"],
    correctAnswer: "Paul McCartney",
    correctImage: "assets/images/paul-mccartney.jpg"
},
{
    question: "Starbucks started in North America but it's spread across the world. What was its first location outside of North America?",
    choices: ["Oslo, Norway", "London, England", "Paris, France", "Tokyo, Japan"],
    correctAnswer: "Tokyo, Japan",
    correctImage: "assets/images/starbucks-tokyo.jpg"
},
{
    question: "Who were the founders of Starbucks?",
    choices: ["Jerry Baldwin, Howard Schultz, and Orin Smith", "Kevin Johnson and Howard Schultz", "Gordon Bowker, Jerry Baldwin, and Zev Siegl", "Orin Smith, Kevin Johnson, and Zev Siegl"],
    correctAnswer: "Gordon Bowker, Jerry Baldwin, and Zev Siegl",
    correctImage: "assets/images/starbucks-founders.jpg"
}]

var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var intervalID


$(document).ready(function () {
    //create a strat button for the game
    var startButton = $("<button>");
    startButton.attr("id", "startStartButton")
    startButton.text("Start");
    $("#startButton").append(startButton);
    $("#questions").hide();
    $("#choices").hide();
    $("#correct-mode").hide();
    $("#wrong-mode").hide();
    $("#no-answer-mode").hide();
    $("#result").hide();


    //when the user clicks the start button, the coundown timer runs, shows one question and its choices
    $("#startButton").on("click", function () {
        $("#startButton").hide();
        $("#questions").show();
        $("#choices").show();


        var countDownTimer;

        //shows one question and its choices
        displayCurrentQuestion();


        //The function displays the countdown timer, the current question and its choices
        function displayCurrentQuestion() {
            //the countdown timer runs
            var time = 10;
            $("#timer").text("Time Remaining: " + time + " Seconds");

            countDownTimer = setInterval(function () {
                if (time > 0) {
                    time--;
                    $("#timer").text("Time Remaining: " + time + " Seconds");
                }
                else if (time == 0) {
                    unanswered++;
                    $("#timer").text("Time Remaining: " + 0 + " Seconds");
                    clearInterval(countDownTimer);
                    showResultPerQuestion(undefined);
                    currentQuestion++;
                }

            }, 1000)

            //display current question
            var questionDisplay = questions[currentQuestion].question;
            var numChoices = questions[currentQuestion].choices.length;
            $("#questions").text(questionDisplay);
            var choicesPlace = $("<ul>");
            for (i = 0; i < numChoices; i++) {
                var choice = questions[currentQuestion].choices[i];
                choicesPlace.append(`<li><input type = "radio" value = "${choice}" name = "dynradio" />${choice}</li>`);
                $("#choices").html(choicesPlace);
            }

            //user click the radio button and make a choice
            $("input[name='dynradio']").on("click", function () {
                var value = $("input[name = 'dynradio']:checked").val();
                //if user doesn't choose the right answer
                if (value == questions[currentQuestion].correctAnswer) {
                    currentQuestion++;
                    correctAnswers++;
                    showResultPerQuestion(true);
                    //if user chooses the wrong answer
                } else {
                    wrongAnswers++;
                    showResultPerQuestion(false);
                    currentQuestion++;
                }

            })
        }

        $(startOverButton).on("click", function () {
            currentQuestion = 0;
            correctAnswers = 0;
            wrongAnswers = 0;
            unanswered = 0;
            $("#result").hide();
            $("#startOverButton").hide();
            $("#question-mode").show();
            displayCurrentQuestion();
        })

        function showResultPerQuestion(result) {
            $("#question-mode").hide();
            if (result === true) {
                $("#correct-mode").show();
            }
            else if (result === false) {
                $("#wrong-mode").show();
                var correctAnswerDisplay = questions[currentQuestion].correctAnswer;
                $("#correct-answer-for-wrong").html("<p>The Correct Answer Was: " + correctAnswerDisplay + "</p>");
                $("#correct-image-for-wrong").attr('src', questions[currentQuestion].correctImage);

            }
            else {
                $("#no-answer-mode").show();
                var correctAnswerDisplay = questions[currentQuestion].correctAnswer;
                $("#correct-answer-for-no").html("<p>The Correct Answer Was: " + correctAnswerDisplay + "</p>");
                $("#correct-image-for-no").attr('src', questions[currentQuestion].correctImage);
            }
            setTimeout(function () {
                $("#question-mode").show();
                $("#correct-mode").hide();
                $("#wrong-mode").hide();
                $("#no-answer-mode").hide();
                checkGame();
            }, 3000);
        }

        function checkGame() {
            //if there are more questions to answer
            if (currentQuestion < questions.length) {
                clearInterval(countDownTimer);
                displayCurrentQuestion();
                //if there is no more question to answer
            } else if (currentQuestion >= questions.length) {
                displayResult();
                //if user click the startOverButton, the game resets                    
            }
        }

        //display the result
        function displayResult() {
            clearInterval(countDownTimer);
            $("#question-mode").hide();
            //$("#result").append("<p>All done, here is how you did!</p>");
            $("#correct-result").html("<p>Correct Answers: " + correctAnswers + "</p>");
            $("#wrong-result").html("<p>Incorrect Answers: " + wrongAnswers + "</p>");
            $("#unanswered-result").html("<p>Unanswered: " + unanswered + "</p>");
            var startOverButton = $("<button>");
            startOverButton.text("Start Over");
            startOverButton.attr("id", "startOver");

            $("#startOverButton").html(startOverButton);
            $("#result").show();
            $("#startOverButton").show();
        }
    })







    //user can only select one answer

    //if user clicks the wrong answer, the timer stoped, the screen displayed "Nope", the correct answer and related image.

    //with no user input, it will move on to the next question automatically

    //if user clicks the correct answer, the timer stoped, the screen display "Congratulations", the correct answer and related image.

    //with no user input, it will move on to the next question automatically

    //if time is up (time=0), the screen shows "out of time", the correct answer, and related image.

    //with no user input, it will move on to the next question automatically

    //After complete all questions, the timer reset to its original value, the screen displayed "all done", the number of correct answers, the number of wrong answers, and the number of unanswered question.
    //The screen also displays "start over" button
    //if the user click "start over", the game reset (not reload the whole page)
})
