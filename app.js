var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function spark(x,y,a,g){
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, "+g+", 0, "+a+")";//NOT WORKING!
        ctx.fill();
        ctx.strokeStyle = "rgba(255, "+g+", 0, "+a+")";
        ctx.stroke();
}

class sparks {
    constructor(x,y,VX,VY){
        this.x = x;
        this.y = y;
        this.VX = VX;
        this.VY = VY;
        this.frames = 0;
        this.g = Math.floor(Math.random()*256);
    }
    update(){
        spark(this.x,this.y,1-this.frames/45,this.g);
        this.x+=this.VX;
        this.y+=this.VY;
        this.frames+=1;
    }
}

const units = document.getElementById("units");
const Milliseconds = document.getElementById("Milliseconds");
const Seconds = document.getElementById("Seconds");
const Minutes = document.getElementById("Minutes");
const Hours = document.getElementById("Hours");
const Days = document.getElementById("Days");
const Years = document.getElementById("Years");
const Centuries = document.getElementById("Centuries");

window.onload = function(){
    Minutes.selected=true;
    canvas.width = document.body.clientWidth;
	canvas.height = window.innerHeight-document.getElementById("controlPanel").offsetHeight;;
    //var part = new sparks(50,50);
    //spark(50,50);
    var loop = setInterval(update,5);
}

var parts=[];

function addPart(x,y){
    parts.push(new sparks(x,y,(Math.random()*2-1)/2,(Math.random()*2-1)/2));
}

const PlainText = document.getElementById("PlainText");
const Bomb = document.getElementById("Bomb");

function update(){
    clear();
    if(Bomb.selected){
        bombRender();
    }else{
        $(document).ready(function(){
            $("#outJumbo").slideDown();
        });
    }
    for(var i = 0;i!=parts.length;i++){
        if(parts[i].frames<=45){
            parts[i].update();
        }else{
            parts.splice(i, 1);
            i--;
        }
    }
}
const outJumbo = document.getElementById("outJumbo");
var bomb = new Image();
bomb.src = "fuse-bomb.png";
function bombRender(){
    outJumbo.style.display = "none";
    ctx.drawImage(bomb,200,200,);
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.moveTo(453, 225);
    var linex;
    var liney;
    for(var t = 0; t<1000*progress; t++){
        if(t<190){
            linex = t+453;
            liney = 225+Math.sin(-t/50)*25;
            //ctx.lineTo(t+453,225+Math.sin(-t/50)*25);
        }else if(t<300){//643,22515.296447273567972
            linex = t+453;
            liney = 304.5+((t-430)*(t-430))/-900;
            //ctx.lineTo(t+453,304.5+((t-430)*(t-430))/-900);
        }else if(t<500){
            linex = 852+((t-400)*(t-400))/-100;
            liney = t-14.7;
            //ctx.lineTo(852+((t-400)*(t-400))/-100,t-14.7);
        }else{
            linex = 1250-t;
            liney = 500+((t-870)*(t-870))/-9000;
            //ctx.lineTo(1250-t,500+((t-870)*(t-870))/-9000);
        }
        ctx.lineTo(linex,liney);
    }
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.stroke();
    ctx.lineWidth=1;
    addPart(linex,liney);
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}



const start = document.getElementById("start");
const output = document.getElementById("output");
const stop = document.getElementById("stop");
const pause = document.getElementById("pause");

start.addEventListener("click", setTime);

stop.addEventListener("click", endTime);
var paused = false;
pause.addEventListener("click", pauseTime);
var pauseDate;
function pauseTime(){
    if(!paused){
        paused = true;
        pause.innerHTML="RESUME";
        pauseDate = new Date().getTime();
    }else{
        pause.innerHTML="PAUSE";
        countDownDate+=new Date().getTime()-pauseDate
        paused = false;
    }
}

    const sound = document.createElement("audio");
    sound.src = "gentleAlarm.mp3";
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);

function endTime(){
    console.log(sound.currentTime);
    sound.pause();
    stop.style.display = "none";
    start.innerHTML="START";
    $(document).ready(function(){
        $("#outJumbo").slideUp();
    });
}

var timerLoop;
var initalDistance;
function setTime(){
    var timerMilli = Number(tim.value);
    if(timerMilli<=0)
        timerMilli=NaN;
    if(!isNaN(timerMilli)){
        start.innerHTML="RESET";
        stop.style.display = "none";
        pause.style.display = "block";
        if(Seconds.selected)
            timerMilli=timerMilli*(1000);
        else if(Minutes.selected)
            timerMilli=timerMilli*(1000*60);
        else if(Hours.selected)
            timerMilli=timerMilli*(1000*60*60);
        else if(Days.selected)
            timerMilli=timerMilli*(1000*60*60*24);
        else if(Years.selected)
            timerMilli=timerMilli*(1000*60*60*24*365);
        else if(Centuries.selected)
            timerMilli=timerMilli*(1000*60*60*24*365*100);
        sound.pause();
        if(PlainText.selected){
            $(document).ready(function(){
                $("#outJumbo").slideDown();
            });
        }else{
            canvas.style.display = "block";
        }
        countDownDate = new Date().getTime() + timerMilli;
        initalDistance = timerMilli;
        timerLoop = setInterval(updateTimer, 1);
    }else{
       $(document).ready(function(){
           $("#notANumber").slideDown().delay("3000").slideUp();
		});
    }
}


// Update the count down every 1 second
var progress;
var timerState;
var alarmRung;
function updateTimer(){
    if(!paused){
        var now = new Date().getTime();
        var distance = countDownDate - now;
        progress = distance/initalDistance;
        var centuries = Math.floor(distance/ (1000 * 60 * 60 * 24 * 365 * 100));
        var years = Math.floor((distance % (1000 * 60 * 60 * 24 * 365 * 100))/ (1000 * 60 * 60 * 24 * 365));
        var days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365))/ (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var milli = distance % 1000;

        if (distance >= 0) {
            timerState = "";
            if(centuries!=0)
                timerState += centuries + "c ";
            if(years!=0)
                timerState += years + "y ";
            if(days!=0)
                timerState += days + "d ";
            if(hours!=0)
                timerState += hours + "h ";
            if(minutes!=0)
                timerState += minutes + "m ";
            if(seconds!=0)
                timerState += seconds + "s ";
            if(milli!=0)
                timerState += milli + "ms ";
            alarmRung = true;
        }else if(alarmRung){
            stop.style.display = "block";
            pause.style.display = "none";
            timerState = "DONE";
            stopAlarm = false;
            sound.play();
            clearInterval(timerLoop);
            alarmRung = false;
        }
        if(PlainText.selected){
            output.innerHTML = timerState;
        }
    }
}
var stopAlarm = true;

sound.addEventListener("ended", function(){
     sound.currentTime = 0;
     sound.play();
});