class Data {
	constructor(data, ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.data = data;
		this.leftLable = true;
		this.bottomLable = true;
		this.lines = 20;
		this.lineWidth = 2;
		
		this.heightPerc = 100;

		this.barSpace = 10;
		this.xSpace = 50;
		this.ySpace = 0;
		
		this.barColor = "black";
		var largest = 0;
		for (var w = 0; w < this.data.length; w++) {
			if (this.data[w] > largest) {
				largest = this.data[w];
			}
		}
		this.largest = largest;

	}

	drawBar(bar) {
		var barInc = ((this.canvas.width - this.xSpace) + this.barSpace) / this.data.length;
		var barWidth = (this.canvas.width - this.xSpace) / this.data.length - this.barSpace;
		var height = ((this.data[bar] / this.largest) * this.canvas.height) - this.ySpace;
		this.ctx.fillStyle = this.barColor;
		this.ctx.fillRect(this.xSpace + (bar * barInc), ((this.canvas.height - this.ySpace) - height * (this.heightPerc / 100)), barWidth, height * (this.heightPerc/100));
	}

	graph() {
		if (this.lines > 0) {
			var lineInc = (this.canvas.height - this.ySpace) / this.lines;

			console.log(lineInc);
			for (var i = 1; i < this.lines; i++) {
				this.ctx.fillStyle = "#999";
				this.ctx.fillRect(this.xSpace, lineInc * i, this.canvas.width - this.xSpace, this.lineWidth);
				
				this.ctx.font = "30px Arial";
				this.ctx.textAlign = "center";
				this.ctx.textBaseline="middle"; 
				this.ctx.fillText(Math.round(this.largest - (lineInc * i) / (this.canvas.height - this.ySpace) * this.largest), this.xSpace / 2,lineInc * i);
			}
			//this.ctx.fillRect()
		}
	}
}