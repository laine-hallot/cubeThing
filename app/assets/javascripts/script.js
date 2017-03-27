var isclosed = false;
var milSec = 0;
var sec = 0;
var t;
var timerRunning = false;

//sidebar
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
//canvas.style.display = "none";
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

function ao() {


}
//timer=====================================================================================

function spacePress(e) {
	//console.log(e.keyCode);
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
	data.data.push(sec + milSec / 100)

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

var sampleData = [];

function _div(id) {
	return document.getElementById(id);
}

function drawBarChart(dataset, idOfContainer) {

	var chartContainer = _div(idOfContainer);

	if (typeof(dataset) != "object") {
		return;
	}
	return false;
}

drawBarChart(sampleData, "div1");
//console.log("");



var data = new Data(sampleData, ctx, canvas);
var percent = 0;
var iteration = 0;
var FPS = 30
var time = 2 * FPS //time in seconds
var m = (time * time) / 100;
setInterval(function() {
	graphData();
}, 1000 / FPS);

function graphData() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	data.drawLines();
	data.drawText();
	if (percent < 100) {
		iteration++;
		//percent = -102 / (iteration / 2) + 102

		percent = (-1 / m) * ((iteration - time) * (iteration - time)) + 100

		if (percent > 100) {
			percent = 100;
		}
	}

	data.heightPerc = percent;
	var code = 0
	var color = "#222";

	for (var q = 0; q < data.data.length; q++) {
		data.barColor = color;
		data.drawBar(q);
	}
	if (data.hovered) {
		data.ctx.fillStyle = "#999"
		var width = 120
		var height = 50
		var radius = 25
		var xOff = 0
		var yOff = 30
		if (data.x + width / 2 > canvas.width) {
			xOff = (data.x + width / 2) - canvas.width
		}
		if (data.x - width / 2 < 0) {
			xOff = data.x - width / 2
		}
		if ((data.y - yOff) + height / 2 > canvas.height) {
			yOff = (data.y + height / 2) - canvas.height;
		}
		if ((data.y - yOff) - height / 2 < 0) {
			yOff = data.y - height / 2;
		}
		ctx.fillStyle = "rgba(121,121,121,0.5)"
		roundRect(ctx, (data.x - xOff) - width / 2, (data.y - yOff) - height / 2, width, height, radius, true, false);
		data.ctx.fillStyle = "rgb(255, 255, 255)";
		data.ctx.font = "24px Nirmala UI";
		data.ctx.textAlign = "center";
		data.ctx.textBaseline = "middle";
		var output = secToTime(Math.round(data.data[data.newHover] * 100) / 100);
		data.ctx.fillText(output, data.x - xOff, data.y - yOff);
		secToTime(Math.round(data.data[data.newHover] * 100) / 100);
	}

}

canvas.addEventListener('mousemove', function(evt) {
	data.hover(evt.offsetX, evt.offsetY);
}, false);

function addData(num) {
	data.data.push(num)
}

function secToTime(sec){
	var min = Math.floor(sec / 60);
	sec = Math.round((sec % 60) * 100)/100;
	var hour = Math.floor(min / 60);
	min = Math.round((min % 60) * 100)/100
	var str;
	if (sec < 10){
		str = min + ":0" + sec;
	} else {
		str = min + ":" + sec; 
	}
	
	if (min < 10){
		str = hour + ":0" + str
	} else {
		str = hour + ":" + str
	}
	return str
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {
			tl: radius,
			tr: radius,
			br: radius,
			bl: radius
		};
	} else {
		var defaultRadius = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}

function toggleCanvas(){
	if (canvas.style.display === "none"){
		canvas.style.displaye = "block";
		iteration = 0;
		percent = 0;
	} else {
		canvas.style.display = "none";
	}
}

console.log();