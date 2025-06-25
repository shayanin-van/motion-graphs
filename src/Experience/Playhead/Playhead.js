import GraphsDiv from "../Graphs/GraphsDiv";
import Experience from "../Experience";

export default class Playhead {
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

    this.normalColor = "#555555aa";
    this.eventColor = "#999999aa";

    this.onDrag = this.onDrag.bind(this);
    this.isDragging = false;

    this.setCanvas();
    this.setPlayheadElement();
    this.setMediaQuery();
    this.setEvent();
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

  setPlayheadElement() {
    this.posHead = document.createElement("canvas");
    this.setPlayheadStyle(this.posHead, this.posBox);
    this.posBox.appendChild(this.posHead);

    this.velHead = document.createElement("canvas");
    this.setPlayheadStyle(this.velHead, this.velBox);
    this.velBox.appendChild(this.velHead);

    this.accHead = document.createElement("canvas");
    this.setPlayheadStyle(this.accHead, this.accBox);
    this.accBox.appendChild(this.accHead);
  }

  setPlayheadStyle(playhead, parent) {
    playhead.style.position = "absolute";
    playhead.style.border = 0.011 * parent.clientHeight + "px solid #777777";
    playhead.style.borderRadius = "0 0 50% 50%";
    playhead.style.background = this.normalColor;
    playhead.style.width = 0.04 * parent.clientHeight + "px";
    playhead.style.height = 0.04 * parent.clientHeight + "px";
    playhead.style.translate = "-50% -50%";
    playhead.style.touchAction = "none";
    playhead.style.userSelect = "none";
  }

  setMediaQuery() {
    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      this.resize();
    });
  }

  setEvent() {
    this.posHead.addEventListener("mouseenter", () => {
      this.posHead.style.background = this.eventColor;
    });
    this.posHead.addEventListener("mouseleave", () => {
      this.posHead.style.background = this.normalColor;
    });
    this.posHead.addEventListener("pointerdown", () => {
      this.posHead.style.background = this.eventColor;
      this.isDragging = true;
      this.posBox.addEventListener("pointermove", this.onDrag);
      document.addEventListener(
        "pointerup",
        () => {
          this.posHead.style.background = this.normalColor;
          this.posBox.removeEventListener("pointermove", this.onDrag);
          this.isDragging = false;
        },
        { once: true }
      );
    });

    this.velHead.addEventListener("mouseenter", () => {
      this.velHead.style.background = this.eventColor;
    });
    this.velHead.addEventListener("mouseleave", () => {
      this.velHead.style.background = this.normalColor;
    });
    this.velHead.addEventListener("pointerdown", () => {
      this.velHead.style.background = this.eventColor;
      this.isDragging = true;
      this.velBox.addEventListener("pointermove", this.onDrag);
      document.addEventListener(
        "pointerup",
        () => {
          this.velHead.style.background = this.normalColor;
          this.velBox.removeEventListener("pointermove", this.onDrag);
          this.isDragging = false;
        },
        { once: true }
      );
    });

    this.accHead.addEventListener("mouseenter", () => {
      this.accHead.style.background = this.eventColor;
    });
    this.accHead.addEventListener("mouseleave", () => {
      this.accHead.style.background = this.normalColor;
    });
    this.accHead.addEventListener("pointerdown", () => {
      this.accHead.style.background = this.eventColor;
      this.isDragging = true;
      this.accBox.addEventListener("pointermove", this.onDrag);
      document.addEventListener(
        "pointerup",
        () => {
          this.accHead.style.background = this.normalColor;
          this.accBox.removeEventListener("pointermove", this.onDrag);
          this.isDragging = false;
        },
        { once: true }
      );
    });
  }

  onDrag(e) {
    this.posHead.style.left =
      e.clientX - this.posBox.getBoundingClientRect().left + "px";
    this.velHead.style.left =
      e.clientX - this.velBox.getBoundingClientRect().left + "px";
    this.accHead.style.left =
      e.clientX - this.accBox.getBoundingClientRect().left + "px";

    this.checkDragConstraint();
  }

  resize() {
    this.posCanvas.width = this.posBox.clientWidth;
    this.posCanvas.height = this.posBox.clientHeight;

    this.velCanvas.width = this.velBox.clientWidth;
    this.velCanvas.height = this.velBox.clientHeight;

    this.accCanvas.width = this.accBox.clientWidth;
    this.accCanvas.height = this.accBox.clientHeight;

    this.posHead.style.border =
      0.011 * this.posBox.clientHeight + "px solid #777777";
    this.posHead.style.width = 0.04 * this.posBox.clientHeight + "px";
    this.posHead.style.height = 0.04 * this.posBox.clientHeight + "px";

    this.velHead.style.border =
      0.011 * this.velBox.clientHeight + "px solid #777777";
    this.velHead.style.width = 0.04 * this.velBox.clientHeight + "px";
    this.velHead.style.height = 0.04 * this.velBox.clientHeight + "px";

    this.accHead.style.border =
      0.011 * this.accBox.clientHeight + "px solid #777777";
    this.accHead.style.width = 0.04 * this.accBox.clientHeight + "px";
    this.accHead.style.height = 0.04 * this.accBox.clientHeight + "px";
  }

  draw(elapsedTime) {
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

    if (elapsedTime < 0 || elapsedTime > 9) {
      return;
    }

    this.drawLine(this.posContext, this.posAxis, elapsedTime);
    this.drawLine(this.velContext, this.velAxis, elapsedTime);
    this.drawLine(this.accContext, this.accAxis, elapsedTime);

    this.updateHeadElement(this.posHead, this.posAxis, elapsedTime);
    this.updateHeadElement(this.velHead, this.velAxis, elapsedTime);
    this.updateHeadElement(this.accHead, this.accAxis, elapsedTime);
  }

  drawLine(context, axis, elapsedTime) {
    // draw line
    context.strokeStyle = "#999999";
    context.setLineDash([6, 10]);
    context.lineCap = "round";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(
      axis.margin + elapsedTime * axis.vertGridSpacing,
      axis.margin + 0.04 * axis.yLength
    );
    context.lineTo(
      axis.margin + elapsedTime * axis.vertGridSpacing,
      axis.margin + 0.98 * axis.yLength
    );
    context.stroke();
  }

  updateHeadElement(head, axis, elapsedTime) {
    head.style.left = axis.margin + elapsedTime * axis.vertGridSpacing + "px";
    head.style.top = 0.8 * axis.margin + "px";
  }

  getTime() {
    let px = this.posHead.style.left.substring(
      0,
      this.posHead.style.left.length - 2
    );
    return (px - this.posAxis.margin) / this.posAxis.vertGridSpacing;
  }

  checkDragConstraint() {
    if (
      this.posHead.style.left.substring(0, this.posHead.style.left.length - 2) <
      this.posAxis.margin
    ) {
      this.posHead.style.left = this.posAxis.margin + "px";
    }

    if (
      this.posHead.style.left.substring(0, this.posHead.style.left.length - 2) >
      this.posAxis.margin + 9 * this.posAxis.vertGridSpacing
    ) {
      this.posHead.style.left =
        this.posAxis.margin + 9 * this.posAxis.vertGridSpacing + "px";
    }
  }
}
