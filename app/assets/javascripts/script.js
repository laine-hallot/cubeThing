var isclosed = false;
var milSec = 0;
var sec = 0;
var t;
var timerRunning = false;

//sidebar
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
var isclosed = false;

function toggleNav() {

	isclosed = !isclosed;
	if (isclosed) {

		TimesHeight();
		document.getElementById("mySidenav").style.width = "250px";

	} else {

		document.getElementById("mySidenav").style.width = "0";

	}

}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function TimesHeight() {
	var tiHeight = document.getElementById("AboveAll").scrollHeight;
	var siHeight = document.getElementById("mySidenav").scrollHeight;

	document.getElementById("Scroll").style.height = siHeight - tiHeight - 135 + "px";

}

function ao(){
	
	
}
//timer=====================================================================================

function spacePress(e) {
	console.log(e.keyCode);
	if (e.keyCode == 32) {
		if (!timerRunning) {
			timer();
		} else {
			timerStop(t);
		}
	} else {
		if (timerRunning) {
			timerStop(t);
		}
	}
}

function timer() {
	timerRunning = true;
	milSec = 0;
	sec = 0;
	t = setInterval(add, 10);
}

function timerStop(interToStop) {
	timerRunning = false;
	clearInterval(interToStop);
}

function add(time) {
	milSec++;
	if (milSec == 100) {
		sec++;
		milSec = 0;
	}
	if (milSec < 10) {
		document.getElementById("jtime").innerHTML = sec + ".0" + milSec;
		//console.log(sec+"."+milSec);
	} else {
		document.getElementById("jtime").innerHTML = sec + "." + milSec;
	}
}
window.addEventListener("keydown", spacePress, false);
//graph ====================================================================================

function graph() {

	document.getElementById("div1").style.opacity = "1";
}

var sampleData = [51, 52, 61, 68, 69, 73, 74, 80, 81, 83, 86, 87, 91, 96, 98, 99, 102, 104, 107, 110, 115, 121, 124, 127, 129, 130, 131, 132, 133, 134, 138, 140, 151, 152, 154, 164, 165, 170, 171, 180, 185, 186, 187, 190, 191, 192, 193, 194, 198, 199];

function _div(id) {
	return document.getElementById(id);
}

function drawBarChart(dataset, idOfContainer) {

	var chartContainer = _div(idOfContainer);

	if (typeof(dataset) != "object") {
		return;
	}
	/*
		var heightOfContainer = chartContainer.scrollWidth;

		var widthOfContainer = chartContainer.scrollHeight;

		var widthOfBar = parseInt(widthOfContainer * 2 / dataset.length) - 2;

		for (var i = 0; i < dataset.length; i++) {

			var divElement = document.createElement("div");

			divElement.setAttribute("class", "div2");
			divElement.style.backgroundColor = "#333";
			divElement.style.zIndex = "3";
			divElement.style.marginLeft = parseInt(i * 1 + i * widthOfBar - 100) + "px";
			divElement.style.height = parseInt(dataset[i]) + "px";
			divElement.style.width = parseInt(widthOfBar) + "px";
			divElement.style.top = (heightOfContainer - parseInt(dataset[i]) - "400") + "px";
			chartContainer.appendChild(divElement);

		}*/
	return false;
}

drawBarChart(sampleData, "div1");
console.log("");

//ctx.fillStyle = "#999";
//ctx.fillRect(0, 0, canvas.width, canvas.height);



var data = new Data(sampleData, ctx, canvas);
var percent = 0;
var iteration = 0;
var FPS = 30
var time = 2 * FPS //time in seconds
var m = (time * time) / 100;
setInterval(function() {
	if (percent < 100) {
		iteration++;
		//percent = -102 / (iteration / 2) + 102

		percent = (-1/m) * ((iteration - time) * (iteration - time)) + 100
		
		if (percent > 100) {
			percent = 100;
		}
	
	data.heightPerc = percent;
	var code = 0
	var color = "#222";
	var codeinc = 360 / sampleData.length;

	for (var q = 0; q < data.data.length; q++) {
		data.barColor = color;
		data.drawBar(q);

		code += codeinc;
	}
	}
}, 1000 / FPS);
data.drawLines();
data.drawText();

canvas.addEventListener('mousemove', function(evt) {
	//console.log(evt.x + ", " + evt.y);
	data.hover(evt.offsetX, evt.offsetY);
}, false);


console.log();

