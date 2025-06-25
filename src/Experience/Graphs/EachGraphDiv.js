import EventEmitter from "../Utils/EventEmitter";

export default class EachGraphDiv extends EventEmitter {
  constructor(parent, title) {
    super();

    this.graphArea = document.createElement("div");
    this.header = document.createElement("div");

    this.header.innerText = title;

    parent.appendChild(this.header);
    parent.appendChild(this.graphArea);

    this.setHeaderStyle();
    this.setGraphAreaStyle();
    this.setEvent();
  }

  setHeaderStyle() {
    this.header.style.background = "#333333";
    this.header.style.height = "2.8%";
    this.header.style.marginTop = "8px";
    this.header.style.marginLeft = "8px";
    this.header.style.marginRight = "8px";
    this.header.style.borderTopLeftRadius = "8px";
    this.header.style.borderTopRightRadius = "8px";
    this.header.style.color = "#999999";
    this.header.style.textAlign = "center";
    this.header.style.display = "grid";
    this.header.style.alignItems = "center";
    this.header.style.fontFamily =
      "Space Mono, Courier New, Monospace, sans-serif";
    this.header.style.userSelect = "none";

    this.mediaQueryInit = window.matchMedia("(orientation: landscape)");
    if (this.mediaQueryInit.matches) {
      this.header.style.fontSize = "1.4vh";
    } else {
      this.header.style.fontSize = "1vh";
    }

    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.header.style.fontSize = "1.4vh";
      } else {
        this.header.style.fontSize = "1vh";
      }
    });
  }

  setGraphAreaStyle() {
    this.graphArea.style.position = "relative";
    this.graphArea.style.display = "block";
    this.graphArea.style.background = "#222222dd";
    this.graphArea.style.height = "calc((91.6% - 32px)/3)";
    this.graphArea.style.marginBottom = "8px";
    this.graphArea.style.marginLeft = "8px";
    this.graphArea.style.marginRight = "8px";
    this.graphArea.style.borderBottomLeftRadius = "8px";
    this.graphArea.style.borderBottomRightRadius = "8px";
    this.graphArea.style.overflow = "hidden";
    this.graphArea.style.touchAction = "none";
  }

  setEvent() {
    this.header.addEventListener("mouseenter", () => {
      this.header.style.background = "#444444";
    });
    this.header.addEventListener("mouseleave", () => {
      this.header.style.background = "#333333";
    });
    this.header.addEventListener("click", () => {
      if (this.graphArea.style.display == "block") {
        this.graphArea.style.display = "none";
        this.header.style.borderBottomLeftRadius = "8px";
        this.header.style.borderBottomRightRadius = "8px";
      } else {
        this.graphArea.style.display = "block";
        this.header.style.borderBottomLeftRadius = "0px";
        this.header.style.borderBottomRightRadius = "0px";
        this.trigger("showDiv");
      }
    });
  }
}
