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
    var selectedAnswers = [];
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
        clockRunning = false;
    }

    function timeConverter(t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
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

      //Function to start the actual game
      $("#start").on("click", function(){
        start();
        populateGame(currentQuestion);
      });

      function populateGame(index){
          $("#questionDiv").text(questions[index]);
          for(var i = 0; i < 4; i++){
              $("#option"+(i+1)).text(answers[index][i]);
              $("#option"+(i+1)).attr("val",i);
          }
      }

      $(".option").on("click", function(){
        console.log("Clicked val " + $(this).attr("val"));
        var selectedAnswer = $(this).attr("val");
        selectedAnswers.push[selectedAnswer];
        if(selectedAnswers.indexOf(selectedAnswer)){
            score++;
            console.log(score);
        }
        currentQuestion += 1;
        populateGame(currentQuestion);
      });

})