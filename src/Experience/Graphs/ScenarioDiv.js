import GraphsDiv from "./GraphsDiv";

export default class ScenarioDiv {
  constructor() {
    this.active = window.location.hash === "#tc";

    if (this.active == false) {
      return;
    }

    this.graphsDiv = new GraphsDiv();

    this.div = document.createElement("div");
    document.body.appendChild(this.div);

    this.label = document.createElement("label");
    this.label.textContent = "scenario : ";
    this.label.setAttribute("for", "scenarioSelect");
    this.div.appendChild(this.label);

    this.select = document.createElement("select");
    this.select.id = "scenarioSelect";
    this.div.appendChild(this.select);

    this.options = [
      { value: "custom", text: "custom" },
      { value: "constV+", text: "constant velocity (+)" },
      { value: "constV-", text: "constant velocity (-)" },
      { value: "constA+", text: "constant acceleration (+)" },
      { value: "constA-", text: "constant acceleration (-)" },
      { value: "constDecel", text: "constant deceleration" },
    ];
    this.options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.text;
      this.select.appendChild(option);
    });

    this.setStyle();
    this.setEvent();
  }

  setStyle() {
    // div stylling
    this.div.style.position = "absolute";
    this.div.style.right = "0px";
    this.div.style.zIndex = "1";
    this.div.style.background = "#00000000";
    this.div.style.height = "2.8%";
    this.div.style.marginTop = "8px";
    this.div.style.marginBottom = "8px";
    this.div.style.marginLeft = "8px";
    this.div.style.marginRight = "8px";
    this.div.style.color = "#999999";
    this.div.style.textAlign = "center";
    this.div.style.fontFamily =
      "Space Mono, Courier New, Monospace, sans-serif";
    this.div.style.userSelect = "none";

    // label stylling
    this.label.style.verticalAlign = "middle";

    // select stylling
    this.select.style.height = "75%";
    this.select.style.verticalAlign = "middle";
    this.select.style.backgroundColor = "#222222";
    this.select.style.borderRadius = "8px";
    this.select.style.color = "#999999";
    this.select.style.textAlign = "center";
    this.select.style.borderWidth = "0px";
    this.select.style.fontFamily =
      "Space Mono, Courier New, Monospace, sans-serif";

    this.mediaQueryInit = window.matchMedia("(orientation: landscape)");
    if (this.mediaQueryInit.matches) {
      this.div.style.fontSize = "1.4vh";
      this.select.style.fontSize = "1.4vh";
      this.div.style.top = "0%";
    } else {
      this.div.style.fontSize = "1vh";
      this.select.style.fontSize = "1vh";
      this.div.style.top = "60%";
    }
    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.div.style.fontSize = "1.4vh";
        this.select.style.fontSize = "1.4vh";
        this.div.style.top = "0%";
      } else {
        this.div.style.fontSize = "1vh";
        this.select.style.fontSize = "1vh";
        this.div.style.top = "60%";
      }
    });
  }

  setEvent() {
    this.select.addEventListener("change", () => {
      this.onScenarioChange();
    });

    this.graphsDiv.on("drag", () => {
      this.select.value = "custom";
    });
  }

  onScenarioChange() {
    if (this.select.value == "custom") {
      return;
    }

    if (this.select.value == "constV+") {
      this.graphsDiv.posGraph.section1.setCoeff(0, 0, 12, 0);
      this.graphsDiv.posGraph.section2.setCoeff(0, 0, 12, 0);
      this.graphsDiv.posGraph.section3.setCoeff(0, 0, 12, 0);
      this.setConsequence();
      return;
    }

    if (this.select.value == "constV-") {
      this.graphsDiv.posGraph.section1.setCoeff(0, 0, -12, 0);
      this.graphsDiv.posGraph.section2.setCoeff(0, 0, -12, 0);
      this.graphsDiv.posGraph.section3.setCoeff(0, 0, -12, 0);
      this.setConsequence();
      return;
    }

    if (this.select.value == "constA+") {
      this.graphsDiv.posGraph.section1.setCoeff(0, 1.5, 0, 0);
      this.graphsDiv.posGraph.section2.setCoeff(0, 1.5, 0, 0);
      this.graphsDiv.posGraph.section3.setCoeff(0, 1.5, 0, 0);
      this.setConsequence();
      return;
    }

    if (this.select.value == "constA-") {
      this.graphsDiv.posGraph.section1.setCoeff(0, -1.5, 0, 0);
      this.graphsDiv.posGraph.section2.setCoeff(0, -1.5, 0, 0);
      this.graphsDiv.posGraph.section3.setCoeff(0, -1.5, 0, 0);
      this.setConsequence();
      return;
    }

    if (this.select.value == "constDecel") {
      this.graphsDiv.posGraph.section1.setCoeff(0, -1.5, 27, 0);
      this.graphsDiv.posGraph.section2.setCoeff(0, -1.5, 27, 0);
      this.graphsDiv.posGraph.section3.setCoeff(0, -1.5, 27, 0);
      this.setConsequence();
      return;
    }
  }

  setConsequence() {
    this.graphsDiv.posAxis.setAppropriateScale(
      this.graphsDiv.posGraph.getMaxValue(),
      this.graphsDiv.posGraph.getMinValue()
    );
    this.graphsDiv.posGraph.draw();
    this.graphsDiv.posGraph.pinControlPointToGraph();
    this.graphsDiv.velGraph.setToDerivativeOf(this.graphsDiv.posGraph);
    this.graphsDiv.velAxis.setAppropriateScale(
      this.graphsDiv.velGraph.getMaxValue(),
      this.graphsDiv.velGraph.getMinValue()
    );
    this.graphsDiv.velGraph.draw();
    this.graphsDiv.velGraph.pinControlPointToGraph();
    this.graphsDiv.accGraph.setToDerivativeOf(this.graphsDiv.velGraph);
    this.graphsDiv.accAxis.setAppropriateScale(
      this.graphsDiv.accGraph.getMaxValue(),
      this.graphsDiv.accGraph.getMinValue()
    );
    this.graphsDiv.accGraph.draw();
    this.graphsDiv.accGraph.pinControlPointToGraph();
  }
}
