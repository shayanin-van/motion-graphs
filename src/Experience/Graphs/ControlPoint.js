import EventEmitter from "../Utils/EventEmitter";

export default class ControlPoint extends EventEmitter {
  constructor(parent) {
    super();

    this.parent = parent;
    this.node = document.createElement("div");
    this.parent.appendChild(this.node);
    this.normalColor = "#555555aa";
    this.eventColor = "#999999aa";

    this.onDrag = this.onDrag.bind(this);

    this.setStyle();
    this.setEvent();
  }

  setStyle() {
    this.node.style.position = "absolute";
    this.node.style.border =
      0.011 * this.parent.clientHeight + "px solid #777777";
    this.node.style.borderRadius = "50%";
    this.node.style.background = this.normalColor;
    this.node.style.width = 0.044 * this.parent.clientHeight + "px";
    this.node.style.height = 0.044 * this.parent.clientHeight + "px";
    this.node.style.translate = "-50% -50%";
    this.node.style.touchAction = "none";
    this.node.style.userSelect = "none";
  }

  setEvent() {
    this.node.addEventListener("mouseenter", () => {
      this.node.style.background = this.eventColor;
    });
    this.node.addEventListener("mouseleave", () => {
      this.node.style.background = this.normalColor;
    });
    this.node.addEventListener("pointerdown", () => {
      this.node.style.background = this.eventColor;
      this.parent.addEventListener("pointermove", this.onDrag);
      document.addEventListener(
        "pointerup",
        () => {
          this.node.style.background = this.normalColor;
          this.parent.removeEventListener("pointermove", this.onDrag);
          this.trigger("dragend");
        },
        { once: true }
      );
    });
  }

  onDrag(e) {
    this.node.style.left =
      e.clientX - this.parent.getBoundingClientRect().left + "px";
    this.node.style.top =
      e.clientY - this.parent.getBoundingClientRect().top + "px";

    this.pinToConstraint();
    this.trigger("drag");
  }

  addConstraint(xMin, xMax, yMin, yMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
  }

  pinToConstraint() {
    if (
      this.node.style.left.substring(0, this.node.style.left.length - 2) <
      this.xMin
    ) {
      this.node.style.left = this.xMin + "px";
    }

    if (
      this.node.style.left.substring(0, this.node.style.left.length - 2) >
      this.xMax
    ) {
      this.node.style.left = this.xMax + "px";
    }

    if (
      this.node.style.top.substring(0, this.node.style.top.length - 2) <
      this.yMin
    ) {
      this.node.style.top = this.yMin + "px";
    }

    if (
      this.node.style.top.substring(0, this.node.style.top.length - 2) >
      this.yMax
    ) {
      this.node.style.top = this.yMax + "px";
    }
  }

  getValue(axis) {
    let yPx = this.node.style.top.substring(0, this.node.style.top.length - 2);
    let valuePerPx = axis.range / axis.yLength;

    return (axis.xAxisYPos - yPx) * valuePerPx;
  }

  pinToValue(axis, time, value) {
    this.node.style.left = axis.margin + axis.vertGridSpacing * time + "px";
    let valuePerPx = axis.range / axis.yLength;
    this.node.style.top = axis.xAxisYPos - value / valuePerPx + "px";
  }

  resize() {
    this.node.style.border =
      0.011 * this.parent.clientHeight + "px solid #777777";
    this.node.style.width = 0.044 * this.parent.clientHeight + "px";
    this.node.style.height = 0.044 * this.parent.clientHeight + "px";
  }
}
