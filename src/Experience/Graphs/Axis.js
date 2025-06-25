export default class Axis {
  constructor(parent, max, min, time, yLabel, xLabel) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.parent = parent;
    this.parent.appendChild(this.canvas);
    this.max = max;
    this.min = min;
    this.time = time;
    this.yLabel = yLabel;
    this.xLabel = xLabel;

    this.range = this.max - this.min;
    this.orderOfMag = Math.floor(
      Math.log10(Math.max(Math.abs(this.max), Math.abs(this.min)))
    );

    this.setCanvas();
    this.draw();
  }

  setCanvas() {
    this.canvas.style.position = "absolute";
    this.context = this.canvas.getContext("2d");

    this.canvas.width = this.parent.clientWidth;
    this.canvas.height = this.parent.clientHeight;
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.margin = 0.18 * this.canvas.height;
    this.labelMargin = 0.04 * this.canvas.height;
    this.yLength = this.canvas.height - 2 * this.margin;
    this.xLength = this.canvas.width - 2 * this.margin;
    this.xAxisYPos =
      this.margin + (this.max / (this.max - this.min)) * this.yLength;

    this.drawGrid();
    this.drawAxis();
  }

  drawAxis() {
    this.context.lineWidth = 1;
    this.context.setLineDash([]);
    this.context.strokeStyle = "#999999";
    this.context.fillStyle = "#999999";
    // this.context.font = "italic " + 0.06 * this.canvas.height + "px Space Mono, sans-serif";
    // this.context.textAlign = "center";
    // this.context.textBaseline = "middle";

    // draw y axis
    this.context.beginPath();
    this.context.moveTo(this.margin, this.margin);
    this.context.lineTo(this.margin, this.margin + this.yLength);
    this.context.stroke();
    // this.context.fillText(
    //   this.yLabel,
    //   this.margin,
    //   this.margin - this.labelMargin
    // );

    // draw x axis
    this.context.beginPath();
    this.context.moveTo(this.margin, this.xAxisYPos);
    this.context.lineTo(this.margin + this.xLength, this.xAxisYPos);
    this.context.stroke();
    // this.context.fillText(
    //   this.xLabel,
    //   this.margin + this.xLength + this.labelMargin,
    //   this.xAxisYPos
    // );
  }

  drawGrid() {
    this.context.lineWidth = 0.2;
    this.context.setLineDash([5, 10]);
    this.context.strokeStyle = "#999999";
    this.context.fillStyle = "#999999";
    this.context.font = 0.044 * this.canvas.height + "px Arial, sans-serif";
    this.context.textBaseline = "middle";

    // draw vertical grid
    this.context.textAlign = "center";
    this.vertGridSpacing = this.xLength / this.time;
    for (let i = 1; i <= this.time; i++) {
      this.context.beginPath();
      this.context.moveTo(this.margin + i * this.vertGridSpacing, this.margin);
      this.context.lineTo(
        this.margin + i * this.vertGridSpacing,
        this.margin + this.yLength
      );
      this.context.stroke();
      this.context.fillText(
        i,
        this.margin + i * this.vertGridSpacing,
        this.canvas.height - this.margin + this.labelMargin
      );
    }

    // draw horizontal grid
    this.context.textAlign = "right";
    this.horGridSpacing =
      this.yLength / (this.range / Math.pow(10, this.orderOfMag));
    // positive value grid
    for (let i = 1; i <= this.max / Math.pow(10, this.orderOfMag); i++) {
      this.context.beginPath();
      this.context.moveTo(
        this.margin,
        this.xAxisYPos - i * this.horGridSpacing
      );
      this.context.lineTo(
        this.margin + this.xLength,
        this.xAxisYPos - i * this.horGridSpacing
      );
      this.context.stroke();
      this.context.fillText(
        i * Math.pow(10, this.orderOfMag),
        this.margin - 0.4 * this.labelMargin,
        this.xAxisYPos - i * this.horGridSpacing
      );
    }
    // negative value grid
    for (
      let i = 1;
      i <= Math.abs(this.min) / Math.pow(10, this.orderOfMag);
      i++
    ) {
      this.context.beginPath();
      this.context.moveTo(
        this.margin,
        this.xAxisYPos + i * this.horGridSpacing
      );
      this.context.lineTo(
        this.margin + this.xLength,
        this.xAxisYPos + i * this.horGridSpacing
      );
      this.context.stroke();
      this.context.fillText(
        -i * Math.pow(10, this.orderOfMag),
        this.margin - 0.4 * this.labelMargin,
        this.xAxisYPos + i * this.horGridSpacing
      );
    }
  }

  resize() {
    this.canvas.width = this.parent.clientWidth;
    this.canvas.height = this.parent.clientHeight;

    this.draw();
  }

  setAppropriateScale(max, min) {
    this.max = max;
    this.min = min;
    // ensure visible time axis
    if (this.max > 0 && this.min > 0) {
      this.min = 0;
    } else if (this.max < 0 && this.min < 0) {
      this.max = 0;
    }
    // prevent range hopping around 0
    if (this.max < 1) {
      this.max = 1;
    }
    if (this.min > -1) {
      this.min = -1;
    }
    // create 10% margin
    this.max = 1.1 * this.max;
    this.min = 1.1 * this.min;

    this.range = this.max - this.min;
    this.orderOfMag = Math.floor(
      Math.log10(Math.max(Math.abs(this.max), Math.abs(this.min)))
    );

    this.draw();
  }
}
