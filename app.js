const units = document.getElementById("units");
const Milliseconds = document.getElementById("Milliseconds");
const Seconds = document.getElementById("Seconds");
const Minutes = document.getElementById("Minutes");
const Hours = document.getElementById("Hours");
const Days = document.getElementById("Days");
const Years = document.getElementById("Years");
const Centuries = document.getElementById("Centuries");

window.onload = function(){
        countDownDate = new Date().setHours(14, 25,0,0) ;
        timerLoop = setInterval(updateTimer, 1);
}

var parts=[];

const PlainText = document.getElementById("PlainText");


//add bomb exploading
//scale canvas



// Update the count down every 1 second
var timerState;
var alarmRung = true;
function updateTimer(){
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var centuries = Math.floor(distance/ (1000 * 60 * 60 * 24 * 365 * 100));
        var years = Math.floor((distance % (1000 * 60 * 60 * 24 * 365 * 100))/ (1000 * 60 * 60 * 24 * 365));
        var days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365))/ (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var milli = distance % 1000;
        timerState="";
        if (distance >= 0) {
            if(hours!=0)
                timerState += hours + "h ";
            if(minutes!=0)
                timerState += minutes + "m ";
            if(seconds!=0&&document.getElementById('seconds').checked)
                timerState += seconds + "s ";
            if(milli!=0&&document.getElementById('milliseconds').checked)
                timerState += milli + "ms ";
            alarmRung = true;
        }else{
            document.getElementById('checkboxs').style.display = "none";
            timerState = "CLASS IS OVER!!!";
            clearInterval(timerLoop);
        }
        output.innerHTML = timerState;
}