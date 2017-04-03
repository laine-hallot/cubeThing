var data = new Data([], ctx, canvas);
var percent = 0;
var iteration = 0;
var FPS = 30
var time = 2 * FPS //time in seconds
var m = (time * time) / 100;
setInterval(function() {
	graphData();
}, 1000 / FPS);

hideG();


console.log(hideG);

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
		var output = secToTime(Math.round(data.data[data.newHover] * 100) / 100, true);
		data.ctx.fillText(output, data.x - xOff, data.y - yOff);
		secToTime(Math.round(data.data[data.newHover] * 100) / 100);
	}

}

canvas.addEventListener('mousemove', function(evt) {
	data.hover(evt.offsetX, evt.offsetY);
}, false);


