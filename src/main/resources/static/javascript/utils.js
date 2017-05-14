canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
sbox = document.getElementsByClassName("scramblebox")[0];
var timeBox = document.getElementsByClassName("timebox")[0];


function hideG(on) {//if on is false it will show the graph and turn off the timer. and true is vice versa
	if (on === undefined) {
		if (canvas.style.display === "none") {
			canvas.style.display = "block";
			timeBox.style.display = "none";
			sbox.style.display = "none";

			iteration = 0;
			percent = 0;
			timeActive = true;
		} else {
			canvas.style.display = "none";
			timeBox.style.display = "block";
			sbox.style.display = "block";

			timeActive = false;
		}
	} else {
		if (on === false) {
			canvas.style.display = "block";
			timeBox.style.display = "none";
			sbox.style.display = "none";

			iteration = 0;
			percent = 0;
			timeActive = true;
		} else {
			canvas.style.display = "none";
			timeBox.style.display = "block";
			sbox.style.display = "block";

			timeActive = false;
		}
	}
}

function toggleCanvas(on) {//if on is true it will show the graph and turn off the timer. and false is vice versa
	if (on === undefined) {
		if (canvas.style.display === "none") {
			canvas.style.display = "block";
			timeBox.style.display = "none";
			sbox.style.display = "none";

			iteration = 0;
			percent = 0;
			timeActive = true;
		} else {
			canvas.style.display = "none";
			timeBox.style.display = "block";
			sbox.style.display = "block";

			timeActive = false;
		}
	} else {
		if (on) {
			canvas.style.display = "block";
			timeBox.style.display = "none";
			sbox.style.display = "none";

			iteration = 0;
			percent = 0;
			timeActive = true;
		} else {
			canvas.style.display = "none";
			timeBox.style.display = "block";
			sbox.style.display = "block";

			timeActive = false;
		}
	}
}

function average(data, buffer) { //if buffer is true it will remove the highest and lowest
	if (buffer) {
		if (data.length < 3) return -1;
		var highestIndex;
		var highest;
		var lowestIndex;
		var lowest;
		for (var p = 0; p < data.length; p++) {
			if (highest === undefined) {
				highest = data[p]
				highestIndex = p;
			} else if (data[p] > highest) {
				highest = data[p]
				highestIndex = p
			}
			if (lowest === undefined) {
				lowest = data[p]
				lowestIndex = p;
			} else if (data[p] > lowest) {
				lowest = data[p]
				lowestIndex = p
			}
		}
		data.splice(highestIndex, 1);
		data.splice(lowestIndex, 1);
	}
	var temp = 0;
	for (var i = 0; i < data.length; i++) {
		temp += data[i]
	}
	return temp / (i + 1) //not sure if the + 1 is right go back to this later, note to self
}

function aoBest(data, trials) { //trials = 5 or 12
	var out;
	if (data.length < trials) {
		return -1;
	}
	for (var i = 0; i < data.length - trials; i++) {
		var temp = [];

		for (var j; j < trials; j++) {
			temp.push(data[j])
		}
		var aver = average(temp, true);
		if (out === undefined) {
			out = {
				best: aver,
				index: i
			};
		} else {
			if (aver < out) {
				out = {
					best: aver,
					index: i
				}
			}
		}
	}
	return out;
}

function singleBest(data) { // finds the best in a data set
	var out;
	for (var i = 0; i < data.length; i++) {
		if (out === undefined) {
			out = {
				best: data[i],
				index: i
			}
		} else if (data[i] < out) {
			out = {
				best: data[i],
				index: i
			}
		}
	}
	return out;
}

function addData(num) {
	data.data.push(num)
}

function secToTime(time, full) { //full = true will give everything including 0 values, full = false will only give needed values
	var sec = time
	var min = Math.floor(sec / 60);
	sec = Math.round((sec % 60) * 100) / 100;
	var hour = Math.floor(min / 60);
	min = Math.round((min % 60) * 100) / 100
	var str;
	if (full) {
		if (sec < 10) {
			str = min + ":0" + sec;
		} else {
			str = min + ":" + sec;
		}

		if (min < 10) {
			str = hour + ":0" + str
		} else {
			str = hour + ":" + str
		}
	} else {
		if (time < 60) { //seconds
			str = sec;
		} else if (time < 3600) { //minutes
			if (sec < 10) {
				str = min + ":0" + sec;
			} else {
				str = min + ":" + sec;
			}
		} else {
			str = secToTime(time, true)
		}

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


function graph(index) {
	timeActive = false;
	data.data = timeHolder[index];
	canvas.style.display = "block";
	timeBox.style.display = "none";
	sbox.style.display = "none";

	iteration = 0;
	percent = 0;
}


function newDataSet() {
	timeHolder.push(data.data);
	data.data = [];
	updateSidebar();
	console.log(timer);
	console.log(data.data);
	canvas.style.display = "none";
	timeBox.style.display = "block";
	sbox.style.display = "block";

	timeActive = true;
}

function updateSidebar() {
	var scoll = document.getElementById("Scroll");
	scoll.innerHTML = scoll.innerHTML += "<table class=\"section\"><tr onclick=\"graph(" + (timeHolder.length - 1) + ")\"><td class=\"gg\">...</td><td class=\"gg\">...</td><td class=\"gg\">...</td></tr></table>";
}