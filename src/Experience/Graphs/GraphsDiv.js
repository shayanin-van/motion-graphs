import EachGraphDiv from "./EachGraphDiv";
import ScenarioDiv from "./ScenarioDiv";
import Axis from "./Axis";
import Graph from "./Graph";
import EventEmitter from "../Utils/EventEmitter";

let instance = null;

export default class GraphsDiv extends EventEmitter {
  constructor() {
    super();

    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.div = document.createElement("div");
    document.body.appendChild(this.div);

    this.isDragged = false;

    this.setStyle();
    this.setChild();
    this.setAxis();
    this.setGraph();
    this.setGraphEvent();
    this.setDivEvent();
  }

  setStyle() {
    this.div.style.position = "absolute";
    this.div.style.zIndex = "1";
    this.div.style.background = "#00000000";

    this.mediaQueryInit = window.matchMedia("(orientation: landscape)");
    if (this.mediaQueryInit.matches) {
      this.div.style.height = "100%";
      this.div.style.width = "30%";
    } else {
      this.div.style.height = "60%";
      this.div.style.width = "100%";
    }

    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.div.style.height = "100%";
        this.div.style.width = "30%";
      } else {
        this.div.style.height = "60%";
        this.div.style.width = "100%";
      }
      this.resize();
    });
  }

  setChild() {
    this.posDiv = new EachGraphDiv(this.div, "position (m) - time (s)");
    this.velDiv = new EachGraphDiv(this.div, "velocity (m/s) - time (s)");
    this.accDiv = new EachGraphDiv(this.div, "acceleration (m/s²) - time (s)");

    this.scenarioDiv = new ScenarioDiv();
  }

  setAxis() {
    this.posAxis = new Axis(this.posDiv.graphArea, 150, 0, 9, "x", "t");
    this.velAxis = new Axis(this.velDiv.graphArea, 30, 0, 9, "v", "t");
    this.accAxis = new Axis(this.accDiv.graphArea, 4, 0, 9, "a", "t");
  }

  setGraph() {
    this.posGraph = new Graph(this.posDiv.graphArea, this.posAxis);
    this.posGraph.section1.setCoeff(0, 5 / 3, 0, 0);
    this.posGraph.section2.setCoeff(0, 0, 10, -15);
    this.posGraph.section3.setCoeff(0, -5 / 3, 30, -75);
    this.posAxis.setAppropriateScale(
      this.posGraph.getMaxValue(),
      this.posGraph.getMinValue()
    );
    this.posGraph.draw();
    this.posGraph.pinControlPointToGraph();
    this.velGraph = new Graph(this.velDiv.graphArea, this.velAxis);
    this.velGraph.setToDerivativeOf(this.posGraph);
    this.velAxis.setAppropriateScale(
      this.velGraph.getMaxValue(),
      this.velGraph.getMinValue()
    );
    this.velGraph.draw();
    this.velGraph.pinControlPointToGraph();
    this.accGraph = new Graph(this.accDiv.graphArea, this.accAxis);
    this.accGraph.setToDerivativeOf(this.velGraph);
    this.accAxis.setAppropriateScale(
      this.accGraph.getMaxValue(),
      this.accGraph.getMinValue()
    );
    this.accGraph.draw();
    this.accGraph.pinControlPointToGraph();
  }

  setGraphEvent() {
    this.posGraph.on("drag", () => {
      this.trigger("drag");
      this.isDragged = true;
      this.velGraph.setToDerivativeOf(this.posGraph);
      this.velAxis.setAppropriateScale(
        this.velGraph.getMaxValue(),
        this.velGraph.getMinValue()
      );
      this.velGraph.draw();
      this.velGraph.pinControlPointToGraph();
      this.accGraph.setToDerivativeOf(this.velGraph);
      this.accAxis.setAppropriateScale(
        this.accGraph.getMaxValue(),
        this.accGraph.getMinValue()
      );
      this.accGraph.draw();
      this.accGraph.pinControlPointToGraph();
    });
    this.posGraph.on("dragend", () => {
      this.isDragged = false;
    });

    this.velGraph.on("drag", () => {
      this.trigger("drag");
      this.isDragged = true;
      this.posGraph.setToIntegralOf(this.velGraph);
      this.posAxis.setAppropriateScale(
        this.posGraph.getMaxValue(),
        this.posGraph.getMinValue()
      );
      this.posGraph.draw();
      this.posGraph.pinControlPointToGraph();
      this.accGraph.setToDerivativeOf(this.velGraph);
      this.accAxis.setAppropriateScale(
        this.accGraph.getMaxValue(),
        this.accGraph.getMinValue()
      );
      this.accGraph.draw();
      this.accGraph.pinControlPointToGraph();
    });
    this.velGraph.on("dragend", () => {
      this.isDragged = false;
    });

    this.accGraph.on("drag", () => {
      this.trigger("drag");
      this.isDragged = true;
      this.velGraph.setToIntegralOf(this.accGraph);
      this.velAxis.setAppropriateScale(
        this.velGraph.getMaxValue(),
        this.velGraph.getMinValue()
      );
      this.velGraph.draw();
      this.velGraph.pinControlPointToGraph();
      this.posGraph.setToIntegralOf(this.velGraph);
      this.posAxis.setAppropriateScale(
        this.posGraph.getMaxValue(),
        this.posGraph.getMinValue()
      );
      this.posGraph.draw();
      this.posGraph.pinControlPointToGraph();
    });
    this.accGraph.on("dragend", () => {
      this.isDragged = false;
    });
  }

  setDivEvent() {
    this.posDiv.on("showDiv", () => {
      this.trigger("showDiv");
    });
    this.velDiv.on("showDiv", () => {
      this.trigger("showDiv");
    });
    this.accDiv.on("showDiv", () => {
      this.trigger("showDiv");
    });
  }

  resize() {
    this.posAxis.resize();
    this.velAxis.resize();
    this.accAxis.resize();

    this.posGraph.resize();
    this.velGraph.resize();
    this.accGraph.resize();
  }
}
