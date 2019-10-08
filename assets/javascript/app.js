$(document).ready(function(){


    // Variables to hold the game questions, possible answers and correct answers
    var questions = [
        "What is the main ingredient of Bombay Duck?",
        "How long is New Zealand's Ninety Mile Beach?",
        "Which country was the Caesar salad invented in?",
        "How many months have 28 days in them?",
        "What color are aircraft black boxes?",
        "What kind of animal is a prairie dog?",
        "After which animal are the Canary Islands named?",
        "How long did the 100 years war last?",
        "In which country are Panama hats made?",
        "From which country do French fries originate?"
    ];

    var answers = [
        ["Fish","Duck","Beef","Pork"],
        ["99 miles","100 miles"," 55 miles","110 miles"],
        ["Italy","USA","France","Mexico"],
        ["1","12","3","5"],
        ["Black","Orange","Purple","Metallic (No color)"],
        ["Rodent","Canine","Feline","Bird"],
        ["Canary","Dog","Cat","Tiger"],
        ["99 years","100 years","105 years","116 years"],
        ["Ecuador","Panama","Colombia","Venezuela"],
        ["Belgium","France","USA","China"],
    ];

    var correctAnswers = [0,2,3,2,2,0,1,3,1,0];
    var score = 0;
    var currentQuestion = 0;

    // variables and functions to manage clock logic
    var time = 10;
    var clockRunning = false;
    var intervalId;

    function count(){
        time -= 1;
        var curTime = timeConverter(time);
        $("#time").text(curTime);
    }

    function start(){
        if (!clockRunning) {
            intervalId = setInterval(count,1000);
            clockRunning = true;
        }
    }
    function stop(){
        clearInterval(intervalId);
        time = 10;
        clockRunning = false;
    }

    function timeConverter(t) {

        //((  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        // slightly modified to handle time limit
        if(t === 0){
          timeEnded();
        }else{

          var minutes = Math.floor(t / 60);
          var seconds = t - (minutes * 60);
        
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
        
          if (minutes === 0) {
            minutes = "00";
          }
        
          else if (minutes < 10) {
            minutes = "0" + minutes;
          }
        
          return minutes + ":" + seconds;
        }
      }

      //Function to start the actual game
      $("#start").on("click", function(){
        start();
        populateGame(currentQuestion);
      });

      // this function has most of the game's logic.
      function populateGame(index){
          if(index <= 9){
            $("#questionDiv").text(questions[index]);
            for(var i = 0; i < 4; i++){
                $("#option"+(i+1)).text(answers[index][i]);
                $("#option"+(i+1)).attr("val",i);
            }
            start();
          }else{
            finishGame();
          }
      }

      // function that handles the user input
      $(".option").on("click", function(){
        var selectedAnswer = parseInt($(this).attr("val"));
        console.log(selectedAnswer);
        if(selectedAnswer === -1){
          checkAnswer("time");
          currentQuestion += 1;
          stop(); 
          populateGame(currentQuestion);
        }else{
          checkAnswer(selectedAnswer);
          currentQuestion += 1;
          stop(); 
          populateGame(currentQuestion);
        }
      });

      // function that validates the selected answer
      function checkAnswer(answer){
        console.log(answer);
        if(answer === "time"){
          createModal("time");
        }else{
          if(answer === correctAnswers[currentQuestion]){
            score += 1;
            createModal("correct");
          }else{
            createModal("incorrect")
          }
        }
      }

      // function to show the user the result of the response
      function createModal(option){
        switch(option){
          case "correct":
            $(".modal-title").text("Correct!");
            $(".modal-body").text("That's right! your current score is:" + score);
            break;
          case "incorrect":
            $(".modal-title").text("Inorrect!");
            $(".modal-body").text("Awww! Better luck next time");
            break;
          case "time":
            $(".modal-title").text("Time's Up!");
            $(".modal-body").text("You better hurry next time");
            break;
        }
      }

      // function to finish the game logic and present results
      function finishGame(){
        $(".card-body").empty();
        var finalResult = $("<div>");
        finalResult.html("<h2>That's it! your final score is: " + score + "</h2>");
        $(".card-body").append(finalResult);
      }

      // function to mock a user's click. Only used when the user runs out of time
      function timeEnded(){
        $("#btnTrigger").click();
      }

})