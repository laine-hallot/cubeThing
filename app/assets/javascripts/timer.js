function openTimer() {
	canvas.style.display = "none";
	timeBox.style.display = "block";
	sbox.style.display = "block";
}

var isPressed = false;

var canStart = true;
var pressTime = 0;
var requireHold = 0.5;
var sec = 0;
var milSec = 0;

function keyPress(e) {
	//console.log(e.keyCode);
	if (timerRunning) {
		timerStop(t);
		canStart = false;
	}
	if (e.keyCode === 32 && !isPressed) {
		pressTime = new Date().getTime();
		isPressed = true;
	}

	if (e.keyCode === 32 && new Date().getTime() - (requireHold * 1000) >= pressTime && canStart) {
		var jtime = document.getElementById("jtime");
		jtime.style = "font-family: Nirmala UI; font-weight: bold; font-size: 300px; position: relative; color: #333; -webkit-transition-duration: 0.2s; transition-duration: 0.2s;";
	}
}

function keyRelease(e) {
	if (e.keyCode === 32) {
		isPressed = false;
	}

	if (canStart && new Date().getTime() - (requireHold * 1000) >= pressTime) {
		if (e.keyCode === 32) {
			jtime.style = "font-family: Nirmala UI; font-weight: bold; font-size: 300px; position: relative; color: #bbb;";
			timer();
		}
	} else {
		canStart = true;
	}
}

hideG();

function timer() {
	timerRunning = true;
	startTime = new Date().getTime();
	sec = 0;
	milSec = 0;
	t = setInterval(add, 5);
}

function timerStop(interToStop) {
	timerRunning = false;
	clearInterval(interToStop);
	data.data.push(sec + milSec / 1000);
	console.log(data.data);
}


function add(time) {
	var timeElapsed = new Date().getTime() - startTime;

	sec = (timeElapsed - (timeElapsed % 1000)) / 1000;
	milSec = timeElapsed - (sec * 1000);

	var inner = (milSec < 100 ? "0" : "") + milSec;
	//<span id="jtime1" class="time1" style="font-size:0.75em;">000</span>
	var jtime1 = document.createElement("SPAN");
	jtime1.innerHTML = inner;
	jtime1.style = "font-size:0.75em;";
	jtime1.className = "time1";
	jtime1.id = "jtime1";
	var jtime = document.getElementById("jtime");
	var tmp = document.createElement("div");
	tmp.appendChild(jtime1);
	jtime.innerHTML = sec + ". " + tmp.innerHTML;
}
window.addEventListener("keydown", keyPress, false);
window.addEventListener("keyup", keyRelease, false);


function jaxOff(){
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", , true);
}
