import GraphsDiv from "../Graphs/GraphsDiv";
import Experience from "../Experience";

export default class AreaAndSlope {
  constructor() {
    this.experience = new Experience();
    this.control = this.experience.control;
    this.graphsDiv = new GraphsDiv();
    this.posBox = this.graphsDiv.posDiv.graphArea;
    this.velBox = this.graphsDiv.velDiv.graphArea;
    this.accBox = this.graphsDiv.accDiv.graphArea;
    this.posAxis = this.graphsDiv.posAxis;
    this.velAxis = this.graphsDiv.velAxis;
    this.accAxis = this.graphsDiv.accAxis;
    this.posGraph = this.graphsDiv.posGraph;
    this.velGraph = this.graphsDiv.velGraph;
    this.accGraph = this.graphsDiv.accGraph;

    this.pointerStatus = "none";
    this.pointerTime = 0;

    this.setCanvas();
    this.setEvent();
    this.setMediaQuery();
  }

  setCanvas() {
    this.posCanvas = document.createElement("canvas");
    this.posContext = this.posCanvas.getContext("2d");
    this.posBox.appendChild(this.posCanvas);
    this.posCanvas.style.position = "absolute";
    this.posCanvas.style.pointerEvents = "none";
    this.posCanvas.style.userSelect = "none";
    this.posCanvas.width = this.posBox.clientWidth;
    this.posCanvas.height = this.posBox.clientHeight;

    this.velCanvas = document.createElement("canvas");
    this.velContext = this.velCanvas.getContext("2d");
    this.velBox.appendChild(this.velCanvas);
    this.velCanvas.style.position = "absolute";
    this.velCanvas.style.pointerEvents = "none";
    this.velCanvas.style.userSelect = "none";
    this.velCanvas.width = this.velBox.clientWidth;
    this.velCanvas.height = this.velBox.clientHeight;

    this.accCanvas = document.createElement("canvas");
    this.accContext = this.accCanvas.getContext("2d");
    this.accBox.appendChild(this.accCanvas);
    this.accCanvas.style.position = "absolute";
    this.accCanvas.style.pointerEvents = "none";
    this.accCanvas.style.userSelect = "none";
    this.accCanvas.width = this.accBox.clientWidth;
    this.accCanvas.height = this.accBox.clientHeight;
  }

  setEvent() {
    this.posBox.addEventListener("pointermove", (e) => {
      this.checkPosPointer(e);
      this.draw();
    });
    this.posBox.addEventListener("pointerdown", (e) => {
      this.checkPosPointer(e);
      this.draw();
    });

    this.velBox.addEventListener("pointermove", (e) => {
      this.checkVelPointer(e);
      this.draw();
    });
    this.velBox.addEventListener("pointerdown", (e) => {
      this.checkVelPointer(e);
      this.draw();
    });

    this.accBox.addEventListener("pointermove", (e) => {
      this.checkAccPointer(e);
      this.draw();
    });
    this.accBox.addEventListener("pointerdown", (e) => {
      this.checkAccPointer(e);
      this.draw();
    });
  }

  setMediaQuery() {
    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      this.resize();
    });
  }

  checkPosPointer(e) {
    let pointerX = e.clientX - this.posBox.getBoundingClientRect().left;
    let pointerY = e.clientY - this.posBox.getBoundingClientRect().top;
    this.pointerTime =
      (pointerX - this.posAxis.margin) / this.posAxis.vertGridSpacing;
    let valuePerPx = this.posAxis.range / this.posAxis.yLength;
    let pointerValue = (this.posAxis.xAxisYPos - pointerY) * valuePerPx;

    if (
      Math.abs(pointerValue - this.posGraph.getValue(this.pointerTime)) /
        valuePerPx <
      14
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "overPosSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "overPosSec2";
      } else {
        this.pointerStatus = "overPosSec3";
      }
      return;
    }
    if (
      Math.abs(pointerValue) <
        Math.abs(this.posGraph.getValue(this.pointerTime)) &&
      pointerValue / this.posGraph.getValue(this.pointerTime) > 0
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "underPosSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "underPosSec2";
      } else {
        this.pointerStatus = "underPosSec3";
      }
    } else {
      this.pointerStatus = "none";
    }
  }

  checkVelPointer(e) {
    let pointerX = e.clientX - this.velBox.getBoundingClientRect().left;
    let pointerY = e.clientY - this.velBox.getBoundingClientRect().top;
    this.pointerTime =
      (pointerX - this.velAxis.margin) / this.velAxis.vertGridSpacing;
    let valuePerPx = this.velAxis.range / this.velAxis.yLength;
    let pointerValue = (this.velAxis.xAxisYPos - pointerY) * valuePerPx;

    if (
      Math.abs(pointerValue - this.velGraph.getValue(this.pointerTime)) /
        valuePerPx <
      14
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "overVelSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "overVelSec2";
      } else {
        this.pointerStatus = "overVelSec3";
      }
      return;
    }
    if (
      Math.abs(pointerValue) <
        Math.abs(this.velGraph.getValue(this.pointerTime)) &&
      pointerValue / this.velGraph.getValue(this.pointerTime) > 0
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "underVelSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "underVelSec2";
      } else {
        this.pointerStatus = "underVelSec3";
      }
    } else {
      this.pointerStatus = "none";
    }
  }

  checkAccPointer(e) {
    let pointerX = e.clientX - this.accBox.getBoundingClientRect().left;
    let pointerY = e.clientY - this.accBox.getBoundingClientRect().top;
    this.pointerTime =
      (pointerX - this.accAxis.margin) / this.accAxis.vertGridSpacing;
    let valuePerPx = this.accAxis.range / this.accAxis.yLength;
    let pointerValue = (this.accAxis.xAxisYPos - pointerY) * valuePerPx;

    if (
      Math.abs(pointerValue - this.accGraph.getValue(this.pointerTime)) /
        valuePerPx <
      14
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "overAccSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "overAccSec2";
      } else {
        this.pointerStatus = "overAccSec3";
      }
      return;
    }
    if (
      Math.abs(pointerValue) <
        Math.abs(this.accGraph.getValue(this.pointerTime)) &&
      pointerValue / this.accGraph.getValue(this.pointerTime) > 0
    ) {
      if (this.pointerTime < 3) {
        this.pointerStatus = "underAccSec1";
      } else if (this.pointerTime < 6) {
        this.pointerStatus = "underAccSec2";
      } else {
        this.pointerStatus = "underAccSec3";
      }
    } else {
      this.pointerStatus = "none";
    }
  }

  resize() {
    this.posCanvas.width = this.posBox.clientWidth;
    this.posCanvas.height = this.posBox.clientHeight;

    this.velCanvas.width = this.velBox.clientWidth;
    this.velCanvas.height = this.velBox.clientHeight;

    this.accCanvas.width = this.accBox.clientWidth;
    this.accCanvas.height = this.accBox.clientHeight;
  }

  draw() {
    this.posContext.clearRect(
      0,
      0,
      this.posCanvas.width,
      this.posCanvas.height
    );
    this.velContext.clearRect(
      0,
      0,
      this.velCanvas.width,
      this.velCanvas.height
    );
    this.accContext.clearRect(
      0,
      0,
      this.accCanvas.width,
      this.accCanvas.height
    );

    if (
      this.pointerStatus == "none" ||
      this.graphsDiv.isDragged ||
      this.control.areaAndSlopeButton.isActive == false
    ) {
      return;
    }

    // if (this.pointerStatus == "underPosSec1") {
    //   this.drawArea(
    //     this.posCanvas,
    //     this.posContext,
    //     this.posGraph.section1,
    //     this.posAxis,
    //     0,
    //     3
    //   );
    // }

    if (this.pointerStatus == "overPosSec1") {
      this.drawSlope(
        this.posCanvas,
        this.posContext,
        this.posGraph.section1,
        this.posAxis,
        this.pointerTime
      );
      this.drawValue(
        this.velCanvas,
        this.velContext,
        this.velGraph.section1,
        this.velAxis,
        this.pointerTime
      );
    }

    // if (this.pointerStatus == "underPosSec2") {
    //   this.drawArea(
    //     this.posCanvas,
    //     this.posContext,
    //     this.posGraph.section2,
    //     this.posAxis,
    //     3,
    //     6
    //   );
    // }

    if (this.pointerStatus == "overPosSec2") {
      this.drawSlope(
        this.posCanvas,
        this.posContext,
        this.posGraph.section2,
        this.posAxis,
        this.pointerTime
      );
      this.drawValue(
        this.velCanvas,
        this.velContext,
        this.velGraph.section2,
        this.velAxis,
        this.pointerTime
      );
    }

    // if (this.pointerStatus == "underPosSec3") {
    //   this.drawArea(
    //     this.posCanvas,
    //     this.posContext,
    //     this.posGraph.section3,
    //     this.posAxis,
    //     6,
    //     9
    //   );
    // }

    if (this.pointerStatus == "overPosSec3") {
      this.drawSlope(
        this.posCanvas,
        this.posContext,
        this.posGraph.section3,
        this.posAxis,
        this.pointerTime
      );
      this.drawValue(
        this.velCanvas,
        this.velContext,
        this.velGraph.section3,
        this.velAxis,
        this.pointerTime
      );
    }

    if (this.pointerStatus == "underVelSec1") {
      this.drawArea(
        this.velCanvas,
        this.velContext,
        this.velGraph.section1,
        this.velAxis,
        0,
        3
      );
      this.drawDelta(
        this.posCanvas,
        this.posContext,
        this.posGraph.section1,
        this.posAxis,
        0,
        3
      );
    }

    if (this.pointerStatus == "overVelSec1") {
      this.drawSlope(
        this.velCanvas,
        this.velContext,
        this.velGraph.section1,
        this.velAxis,
        this.pointerTime
      );
      this.drawValue(
        this.accCanvas,
        this.accContext,
        this.accGraph.section1,
        this.accAxis,
        this.pointerTime
      );
    }

    if (this.pointerStatus == "underVelSec2") {
      this.drawArea(
        this.velCanvas,
        this.velContext,
        this.velGraph.section2,
        this.velAxis,
        3,
        6
      );
      this.drawDelta(
        this.posCanvas,
        this.posContext,
        this.posGraph.section2,
        this.posAxis,
        3,
        6
      );
    }

    if (this.pointerStatus == "overVelSec2") {
      this.drawSlope(
        this.velCanvas,
        this.velContext,
        this.velGraph.section2,
        this.velAxis,
        this.pointerTime
      );
      this.drawValue(
        this.accCanvas,
        this.accContext,
        this.accGraph.section2,
        this.accAxis,
        this.pointerTime
      );
    }

    if (this.pointerStatus == "underVelSec3") {
      this.drawArea(
        this.velCanvas,
        this.velContext,
        this.velGraph.section3,
        this.velAxis,
        6,
        9
      );
      this.drawDelta(
        this.posCanvas,
        this.posContext,
        this.posGraph.section3,
        this.posAxis,
        6,
        9
      );
    }

    if (this.pointerStatus == "overVelSec3") {
      this.drawSlope(
        this.velCanvas,
        this.velContext,
        this.velGraph.section3,
        this.velAxis,
        this.pointerTime
      );
      this.drawValue(
        this.accCanvas,
        this.accContext,
        this.accGraph.section3,
        this.accAxis,
        this.pointerTime
      );
    }

    if (this.pointerStatus == "underAccSec1") {
      this.drawArea(
        this.accCanvas,
        this.accContext,
        this.accGraph.section1,
        this.accAxis,
        0,
        3
      );
      this.drawDelta(
        this.velCanvas,
        this.velContext,
        this.velGraph.section1,
        this.velAxis,
        0,
        3
      );
    }

    // if (this.pointerStatus == "overAccSec1") {
    //   this.drawSlope(
    //     this.accCanvas,
    //     this.accContext,
    //     this.accGraph.section1,
    //     this.accAxis,
    //     this.pointerTime
    //   );
    // }

    if (this.pointerStatus == "underAccSec2") {
      this.drawArea(
        this.accCanvas,
        this.accContext,
        this.accGraph.section2,
        this.accAxis,
        3,
        6
      );
      this.drawDelta(
        this.velCanvas,
        this.velContext,
        this.velGraph.section2,
        this.velAxis,
        3,
        6
      );
    }

    // if (this.pointerStatus == "overAccSec2") {
    //   this.drawSlope(
    //     this.accCanvas,
    //     this.accContext,
    //     this.accGraph.section2,
    //     this.accAxis,
    //     this.pointerTime
    //   );
    // }

    if (this.pointerStatus == "underAccSec3") {
      this.drawArea(
        this.accCanvas,
        this.accContext,
        this.accGraph.section3,
        this.accAxis,
        6,
        9
      );
      this.drawDelta(
        this.velCanvas,
        this.velContext,
        this.velGraph.section3,
        this.velAxis,
        6,
        9
      );
    }

    // if (this.pointerStatus == "overAccSec3") {
    //   this.drawSlope(
    //     this.accCanvas,
    //     this.accContext,
    //     this.accGraph.section3,
    //     this.accAxis,
    //     this.pointerTime
    //   );
    // }
  }

  drawArea(canvas, context, section, axis, timeStart, timeEnd) {
    let detailPerSection = 30;
    let pxPerValue = axis.yLength / axis.range;
    let startTimePx = axis.margin + timeStart * axis.vertGridSpacing;
    let endTimePx = axis.margin + timeEnd * axis.vertGridSpacing;
    let midValuePx = section.getValue((timeStart + timeEnd) / 2) * pxPerValue;

    // draw area
    context.fillStyle = "#34b1eb44";
    context.beginPath();
    context.moveTo(startTimePx, axis.xAxisYPos);
    for (let i = 0; i < detailPerSection + 1; i++) {
      let time = timeStart + (i * (timeEnd - timeStart)) / detailPerSection;
      context.lineTo(
        axis.margin + time * axis.vertGridSpacing,
        axis.xAxisYPos - section.getValue(time) * pxPerValue
      );
    }
    context.lineTo(endTimePx, axis.xAxisYPos);
    context.closePath();
    context.fill();

    // draw text
    context.fillStyle = "#34b1eb";
    context.font = "bold " + 0.054 * canvas.height + "px Arial, sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    let textX = (startTimePx + endTimePx) / 2;
    let textY = axis.xAxisYPos - midValuePx / 2;
    context.fillText(
      "area = " + section.getAreaUnder(timeStart, timeEnd).toPrecision(3),
      textX,
      textY
    );
  }

  drawSlope(canvas, context, section, axis, time) {
    let timePx = axis.margin + time * axis.vertGridSpacing;
    let pxPerValue = axis.yLength / axis.range;
    let valuePx = axis.xAxisYPos - section.getValue(time) * pxPerValue;
    let slope = section.getSlope(time);

    // draw tangent point
    context.fillStyle = "#eb7134";
    context.beginPath();
    context.arc(timePx, valuePx, 4, 0, 2 * Math.PI);
    context.fill();

    // draw tangent line
    let length = 0.16 * axis.xLength;
    let angle = Math.atan2(slope * pxPerValue, axis.vertGridSpacing);
    let startX = timePx - 0.5 * length * Math.cos(angle);
    let endX = timePx + 0.5 * length * Math.cos(angle);
    let startY = valuePx + 0.5 * length * Math.sin(angle);
    let endY = valuePx - 0.5 * length * Math.sin(angle);
    context.lineWidth = 3;
    context.strokeStyle = "#eb7134";
    context.beginPath();
    context.setLineDash([]);
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    // draw text
    context.fillStyle = "#eb7134";
    context.font = "bold " + 0.054 * canvas.height + "px Arial, sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    let textY = valuePx;
    let textX = timePx;
    if (section.getValue(time) >= 0) {
      textY = textY - 0.054 * canvas.height * Math.cos(angle);
      textX = textX - 0.054 * canvas.height * Math.sin(angle);
    } else {
      textY = textY + 0.054 * canvas.height * Math.cos(angle);
      textX = textX + 0.054 * canvas.height * Math.sin(angle);
    }
    context.save();
    context.translate(textX, textY);
    context.rotate(-angle);
    context.fillText("slope = " + slope.toPrecision(3), 0, 0);
    context.restore();
  }

  drawDelta(canvas, context, section, axis, timeStart, timeEnd) {
    let pxPerValue = axis.yLength / axis.range;
    let startTimePx = axis.margin + timeStart * axis.vertGridSpacing;
    let endTimePx = axis.margin + timeEnd * axis.vertGridSpacing;
    let startValue = section.getValue(timeStart);
    let startValuePx = startValue * pxPerValue;
    let endValue = section.getValue(timeEnd);
    let endValuePx = endValue * pxPerValue;
    let deltaValue = endValue - startValue;

    // draw dashed line
    context.strokeStyle = "#34b1eb";
    context.setLineDash([8, 8]);
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0.5 * axis.margin, axis.xAxisYPos - startValuePx);
    context.lineTo(startTimePx, axis.xAxisYPos - startValuePx);
    context.stroke();
    context.beginPath();
    context.moveTo(0.5 * axis.margin, axis.xAxisYPos - endValuePx);
    context.lineTo(endTimePx, axis.xAxisYPos - endValuePx);
    context.stroke();

    // draw text
    context.fillStyle = "#34b1eb";
    context.font = "bold " + 0.054 * canvas.height + "px Arial, sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "right";
    context.fillText(
      deltaValue.toPrecision(3),
      0.9 * axis.margin,
      axis.xAxisYPos - (startValuePx + endValuePx) / 2,
      0.9 * axis.margin
    );

    // draw arrow
    let arrowLength = endValuePx - startValuePx;
    context.strokeStyle = "#34b1eb";
    context.setLineDash([]);
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0.58 * axis.margin, axis.xAxisYPos - startValuePx);
    context.lineTo(
      0.58 * axis.margin,
      axis.xAxisYPos -
        startValuePx -
        0.5 * arrowLength +
        (0.04 * canvas.height * arrowLength) / Math.abs(arrowLength)
    );
    context.stroke();
    context.beginPath();
    context.moveTo(
      0.58 * axis.margin,
      axis.xAxisYPos -
        startValuePx -
        0.5 * arrowLength -
        (0.04 * canvas.height * arrowLength) / Math.abs(arrowLength)
    );
    context.lineTo(0.58 * axis.margin, axis.xAxisYPos - endValuePx);
    context.stroke();
    let arrowHeadSize = 8; // in px
    let headRatio = arrowLength / Math.abs(arrowLength);
    if (arrowHeadSize > 0.25 * Math.abs(arrowLength)) {
      headRatio = (0.25 * arrowLength) / arrowHeadSize;
    }
    context.fillStyle = "#34b1eb";
    context.beginPath();
    context.moveTo(0.58 * axis.margin, axis.xAxisYPos - endValuePx);
    context.lineTo(
      0.58 * axis.margin + 0.5 * arrowHeadSize * headRatio,
      axis.xAxisYPos - endValuePx + arrowHeadSize * headRatio
    );
    context.lineTo(
      0.58 * axis.margin - 0.5 * arrowHeadSize * headRatio,
      axis.xAxisYPos - endValuePx + arrowHeadSize * headRatio
    );
    context.closePath();
    context.fill();
  }

  drawValue(canvas, context, section, axis, time) {
    let timePx = axis.margin + time * axis.vertGridSpacing;
    let pxPerValue = axis.yLength / axis.range;
    let valuePx = axis.xAxisYPos - section.getValue(time) * pxPerValue;

    // draw point
    context.fillStyle = "#eb7134";
    context.beginPath();
    context.arc(timePx, valuePx, 4, 0, 2 * Math.PI);
    context.fill();

    // draw dashed line
    context.strokeStyle = "#eb7134";
    context.setLineDash([8, 8]);
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0.9 * axis.margin, valuePx);
    context.lineTo(timePx, valuePx);
    context.stroke();

    // draw text
    context.fillStyle = "#eb7134";
    context.font = "bold " + 0.054 * canvas.height + "px Arial, sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "right";
    context.fillText(
      section.getValue(time).toPrecision(3),
      0.84 * axis.margin,
      valuePx,
      0.84 * axis.margin
    );
  }
}
