import PlayButton from "./PlayButton";
import AreaAndSlopeButton from "./AreaAndSlopeButton";
import VectorButton from "./vectorButton";

export default class ControlDiv {
  constructor() {
    this.div = document.createElement("div");
    document.body.appendChild(this.div);

    this.setStyle();
    this.setChild();
  }

  setStyle() {
    this.div.style.position = "absolute";
    this.div.style.zIndex = "1";
    this.div.style.background = "#00000000";
    this.div.style.right = "0px";
    this.div.style.bottom = "0px";
    this.div.style.marginBottom = "8px";
    this.div.style.display = "flex";
    this.div.style.flexDirection = "row";
    this.div.style.justifyContent = "center";
    this.div.style.alignItems = "center";

    this.mediaQueryInit = window.matchMedia("(orientation: landscape)");
    if (this.mediaQueryInit.matches) {
      this.div.style.height = "10%";
      this.div.style.width = "70%";
    } else {
      this.div.style.height = "7.5%";
      this.div.style.width = "100%";
    }

    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.div.style.height = "10%";
        this.div.style.width = "70%";
      } else {
        this.div.style.height = "7.5%";
        this.div.style.width = "100%";
      }
    });
  }

  setChild() {
    this.areaAndSlopeButton = new AreaAndSlopeButton(this.div);
    this.playButton = new PlayButton(this.div);
    this.vectorButton = new VectorButton(this.div);
  }
}
