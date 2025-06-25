// each section is governed by the polynomial ax^3 + bx^2 + cx + d

export default class GraphSection {
  constructor(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  setCoeff(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  getValue(time) {
    return (
      this.a * Math.pow(time, 3) +
      this.b * Math.pow(time, 2) +
      this.c * time +
      this.d
    );
  }

  setToDerivativeOf(section) {
    this.d = section.c;
    this.c = 2 * section.b;
    this.b = 3 * section.a;
    this.a = 0;
  }

  setToIntegralOf(section) {
    this.a = section.b / 3;
    this.b = section.c / 2;
    this.c = section.d;
  }

  setYintercept(yIntercept) {
    this.d = yIntercept;
  }

  solveYinterceptFrom(value, time) {
    return (
      value -
      this.a * Math.pow(time, 3) -
      this.b * Math.pow(time, 2) -
      this.c * time
    );
  }

  setToStraight(point1Value, point2Value, point1Time, point2Time) {
    let slope = (point2Value - point1Value) / (point2Time - point1Time);
    let yIntercept = point1Value - slope * point1Time;
    this.a = 0;
    this.b = 0;
    this.c = slope;
    this.d = yIntercept;
  }

  draw(timeStart, timeEnd, axis, context) {
    let detailPerSection = 30;
    let valuePerPx = axis.range / axis.yLength;

    context.lineWidth = 2;
    context.strokeStyle = "#999999";
    context.beginPath();
    context.moveTo(
      axis.margin + axis.vertGridSpacing * timeStart,
      axis.xAxisYPos - this.getValue(timeStart) / valuePerPx
    );
    for (let i = 0; i < detailPerSection + 1; i++) {
      let time = timeStart + (i * (timeEnd - timeStart)) / detailPerSection;
      context.lineTo(
        axis.margin + axis.vertGridSpacing * time,
        axis.xAxisYPos - this.getValue(time) / valuePerPx
      );
    }
    context.stroke();
  }

  getAreaUnder(timeStart, timeEnd) {
    return (
      (this.a * Math.pow(timeEnd, 4)) / 4 +
      (this.b * Math.pow(timeEnd, 3)) / 3 +
      (this.c * Math.pow(timeEnd, 2)) / 2 +
      this.d * timeEnd -
      ((this.a * Math.pow(timeStart, 4)) / 4 +
        (this.b * Math.pow(timeStart, 3)) / 3 +
        (this.c * Math.pow(timeStart, 2)) / 2 +
        this.d * timeStart)
    );
  }

  getSlope(time) {
    return 3 * this.a * Math.pow(time, 2) + 2 * this.b * time + this.c;
  }
}
