import ControlPoint from "./ControlPoint";
import GraphsDiv from "./GraphsDiv";
import GraphSection from "./GraphSection";
import EventEmitter from "../Utils/EventEmitter";

export default class Graph extends EventEmitter {
  constructor(parent, axis) {
    super();

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.parent = parent;
    this.parent.appendChild(this.canvas);
    this.axis = axis;
    this.graphDiv = new GraphsDiv();

    this.setCanvas();
    this.setControlPoints();
    this.setControlPointsEvent();
    this.setSections();
  }

  setCanvas() {
    this.canvas.style.position = "absolute";
    this.context = this.canvas.getContext("2d");

    this.canvas.width = this.parent.clientWidth;
    this.canvas.height = this.parent.clientHeight;
  }

  resizeCanvas() {
    this.canvas.width = this.parent.clientWidth;
    this.canvas.height = this.parent.clientHeight;
  }

  setControlPoints() {
    this.points = [];
    for (let i = 0; i < 4; i++) {
      this.points.push(new ControlPoint(this.parent));
      this.points[i].addConstraint(
        this.axis.margin + 3 * i * this.axis.vertGridSpacing,
        this.axis.margin + 3 * i * this.axis.vertGridSpacing,
        this.axis.margin,
        this.axis.margin + this.axis.yLength
      );
      this.points[i].pinToConstraint();
      this.points[i].value = this.points[i].getValue(this.axis);
    }
  }

  setControlPointsEvent() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].on("drag", () => {
        this.updateControlPointValue();
        this.section1.setToStraight(
          this.points[0].value,
          this.points[1].value,
          0,
          3
        );
        this.section2.setToStraight(
          this.points[1].value,
          this.points[2].value,
          3,
          6
        );
        this.section3.setToStraight(
          this.points[2].value,
          this.points[3].value,
          6,
          9
        );
        this.draw();
        this.trigger("drag");
      });
      this.points[i].on("dragend", () => {
        this.trigger("dragend");
      });
    }
  }

  resizeControlPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].resize();
      this.points[i].pinToValue(this.axis, 3 * i, this.points[i].value);
      this.points[i].addConstraint(
        this.axis.margin + 3 * i * this.axis.vertGridSpacing,
        this.axis.margin + 3 * i * this.axis.vertGridSpacing,
        this.axis.margin,
        this.axis.margin + this.axis.yLength
      );
      this.points[i].pinToConstraint();
    }
  }

  setSections() {
    this.section1 = new GraphSection(0, 0, 0, 0);
    this.section2 = new GraphSection(0, 0, 0, 0);
    this.section3 = new GraphSection(0, 0, 0, 0);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.section1.draw(0, 3, this.axis, this.context);
    this.section2.draw(3, 6, this.axis, this.context);
    this.section3.draw(6, 9, this.axis, this.context);
  }

  resize() {
    this.resizeCanvas();
    this.resizeControlPoints();
    this.draw();
  }

  updateControlPointValue() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].value = this.points[i].getValue(this.axis);
    }
  }

  pinControlPointToGraph() {
    this.points[0].pinToValue(this.axis, 0, this.section1.getValue(0));
    this.points[1].pinToValue(this.axis, 3, this.section2.getValue(3));
    this.points[2].pinToValue(this.axis, 6, this.section3.getValue(6));
    this.points[3].pinToValue(this.axis, 9, this.section3.getValue(9));

    this.updateControlPointValue();
  }

  setToDerivativeOf(graph) {
    this.section1.setToDerivativeOf(graph.section1);
    this.section2.setToDerivativeOf(graph.section2);
    this.section3.setToDerivativeOf(graph.section3);
  }

  setToIntegralOf(graph) {
    this.section1.setToIntegralOf(graph.section1);
    // this.section1.setYintercept(0);
    this.section2.setToIntegralOf(graph.section2);
    this.section2.setYintercept(
      this.section2.solveYinterceptFrom(this.section1.getValue(3), 3)
    );
    this.section3.setToIntegralOf(graph.section3);
    this.section3.setYintercept(
      this.section3.solveYinterceptFrom(this.section2.getValue(6), 6)
    );
  }

  getMaxValue() {
    return Math.max(
      this.section1.getValue(0),
      this.section2.getValue(3),
      this.section2.getValue(6),
      this.section3.getValue(9)
    );
  }

  getMinValue() {
    return Math.min(
      this.section1.getValue(0),
      this.section2.getValue(3),
      this.section2.getValue(6),
      this.section3.getValue(9)
    );
  }

  getValue(time) {
    if (time < 0 || time > 9) {
      return;
    }

    if (time < 3) {
      return this.section1.getValue(time);
    } else if (time < 6) {
      return this.section2.getValue(time);
    } else {
      return this.section3.getValue(time);
    }
  }
}
