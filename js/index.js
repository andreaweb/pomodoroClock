$(document).ready(function(){
  
  var beep = new Audio('https://notificationsounds.com/soundfiles/07563a3fe3bbe7e3ba84431ad9d055af/file-sounds-946-capisci.mp3');
  
  $(".minutes").click(function(){
    $(this).parent().append("<input type='number' min=0 class='customize' autofocus>");
    $(this).hide();
    return false;
  });

  var Clock = { 
   
    start: function () {
      var pomodoro = eval($("span.pomodoro-time").html())*60+1;
      var chill = eval($("span.chill-time").html())*60;
      
      var self = this;
      $('selector').click(false);
      
      this.interval = setInterval(function () {
        self.totalSeconds -= 1;

        if(self.totalSeconds < 0 && self.pomodoro == true){
          Clock.totalSeconds = chill;//needs to be chill after pomodoro
          Clock.pomodoro = false;  
          beep.play();
          $(".pomodoro").parent().removeClass("highlighted"); 
          $(".chill").parent().addClass("highlighted");
        }else if(self.totalSeconds < 0 && self.pomodoro == false){
          Clock.totalSeconds = pomodoro-1;
          Clock.pomodoro = true;//needs to be pomodoro after chill
          beep.play();
          $(".pomodoro").parent().addClass("highlighted");
          $(".chill").parent().removeClass("highlighted");
        }

        $(".highlighted .minutes").text(Math.floor(self.totalSeconds / 60 % 60));

        var sec = parseInt(self.totalSeconds % 60);

        if(sec < 10){
          sec = "0" + sec.toString();
        }

        $(".highlighted .seconds").text(sec);

      }, 1000);
    },

    pause: function () {
      clearInterval(this.interval);
      delete this.interval;
    },

    resume: function () {
      if (!this.interval) this.start();
    }
  };
  
  function pauseAndResume(check){
    console.log(check);
    if(check == "Pause"){
      Clock.pause();   
      $('.playing').attr("value", "Resume");
    }else{ 
      Clock.resume(); 
      $(".playing").attr("value", "Pause");
    }
  }
  
  $('.go').on("click", function(){
   var check = $(this).attr("value");
   if(check == "Go"){
       var chillInput = $("h4.chill").siblings(".customize").val();
       var pomodoroInput = $("h4.pomodoro").siblings(".customize").val() 

       if(chillInput){
         $("span.chill-time").html(chillInput);
       }

       if(pomodoroInput){
          $("span.pomodoro-time").html(pomodoroInput);
       }

        var pomodoro = eval($("span.pomodoro-time").html())*60+1;
        //var chill = eval($("span.chill-time").html())*60;
        
        $(this).attr("value", "Pause");
        $(this).removeClass("go");
        $(this).addClass("playing");
        $(".customize").hide();
        Clock.start(Clock.totalSeconds = pomodoro, Clock.pomodoro = true);
        $(".minutes").show().css("cursor", "default");
      }else{
        pauseAndResume(check);
      }
  });
  
  
});
