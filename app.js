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
    ctx.scale(canvas.width/680,canvas.width/680);
    var loop = setInterval(update,5);
}

var parts=[];

function addPart(x,y){
    parts.push(new sparks(x,y,(Math.random()*2-1)/2,(Math.random()*2-1)/2));
}

const PlainText = document.getElementById("PlainText");
const Bomb = document.getElementById("Bomb");

const changeX = 190;
const changeY = 190;

function update(){
    clear();
    if(Bomb.selected){
        canvas.style.display = "block";
        outJumbo.style.display = "none";
        bombRender();
        if(progress>0&&progress!=undefined){
            ctx.fillStyle = "black";
            ctx.font = "60px Arial";
            ctx.textAlign = "center";
            ctx.fillText(timerState,680/2,550-changeY);
        } 
        for(var i = 0;i!=parts.length;i++){
            if(parts[i].frames<=45){
                parts[i].update();
            }else{
                parts.splice(i, 1);
                i--;
            }
        }
    }else{
        $(document).ready(function(){
            $("#outJumbo").slideDown();
        });
    }
}
//add bomb exploading
//scale canvas
const outJumbo = document.getElementById("outJumbo");
var bomb = new Image();
bomb.src = "fuse-bomb.png";
var fire = new Image();
fire.src = "fire.jpg";
var size = 200;

function bombRender(){
    if(progress<0){
        size+=50;
    }
    if(progress>0)
        ctx.drawImage(bomb,200-changeX,200-changeY);
    else if(progress<=0&&size<1000)
        ctx.drawImage(fire,350-size-changeX/2,350-size/2-changeY,size,size);
    ctx.beginPath();
    ctx.lineWidth=5;
    ctx.moveTo(453-changeX, 225-changeY);
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
        ctx.lineTo(linex-changeX,liney-changeY);
    }
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.stroke();
    ctx.lineWidth=1;
    addPart(linex-changeX,liney-changeY);
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

    const soundMenu = document.getElementById("soundMenu");
    const Alarm = document.getElementById("Alarm");
    const Explosion = document.getElementById("Explosion");
    const Mute = document.getElementById("Mute");
    const sound = document.createElement("audio");
    //sound.src = "gentleAlarm.mp3";
    var soundSource= "gentleAlarm.mp3";

    soundMenu.addEventListener("change", function(){
        if(Explosion.selected){
            soundSource = "explosion.mp3";
        }else if(Mute.selected){
            soundSource = "";
        }else{
            soundSource = "gentleAlarm.mp3";
        }
    });

    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);

function endTime(){
    console.log(sound.currentTime);
    sound.pause();
    output.innerHTML = "";
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
        size = 200;
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
var alarmRung = true;
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
            sound.src = soundSource;
            if(soundSource!=""){
                sound.currentTime = 0;
                sound.play();
            }
            clearInterval(timerLoop);
            alarmRung = false;
        }
        if(PlainText.selected){
            output.innerHTML = timerState;
        }
    }
}

sound.addEventListener("ended", function(){
    if(soundSource!=""){
        sound.src=soundSource;
        sound.currentTime = 0;
        sound.play();
    }
});



const codeNumber = document.getElementById("codeNumber");
var code;
var codeFound = false;
checkCode();
function checkCode(){
    code =
""+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
    codeNumber.innerHTML=code;
    firebase.database().ref().child(code).once("value",function(snap){
        console.log(snap.val());
        if(snap.val()!=null){
            checkCode();
        }else{
            codeFound = true;
            firebase.database().ref().child(code).set({
                duration:0
            });
            firebase.database().ref("/"+code/*getCode()*/).on("value",function(snap){
                console.log(snap.child("duration").val());
                if(snap.child("duration").val()>0){
                    countDownDate=snap.child("duration").val();
                }
            });
        }
    });
}

function getCode(){
    while(!codeFound){
        console.log("waiting");
    }
    return code;
}
