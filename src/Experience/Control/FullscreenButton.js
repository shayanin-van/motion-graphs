export default class FullscreenButton {
  constructor(parent) {
    this.div = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.div);

    this.setStyle();
    this.setEvent();
  }

  setStyle() {
    this.div.style.background = "#222222dd";
    // Pulled out of the centred button row into the corner: this controls the
    // viewport, not the sim. Absolute inside ControlDiv keeps its responsive
    // sizing and leaves the other three centred.
    this.div.style.position = "absolute";
    this.div.style.right = "0px";
    this.div.style.margin = "1%";
    this.div.style.height = "80%";
    this.div.style.aspectRatio = "1";
    this.div.style.borderRadius = "8px";
    this.div.style.display = "flex";

    this.icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.div.appendChild(this.icon);
    this.icon.setAttribute("version", "1.0");
    this.icon.setAttribute("x", "0px");
    this.icon.setAttribute("y", "0px");
    this.icon.setAttribute("viewBox", "0 0 512 512");
    this.icon.setAttribute("xml:space", "preserve");
    this.path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path1.setAttribute(
      "d",
      "M64,64 H184 V104 H104 V184 H64 Z M448,64 H328 V104 H408 V184 H448 Z M64,448 H184 V408 H104 V328 H64 Z M448,448 H328 V408 H408 V328 H448 Z"
    );
    this.icon.appendChild(this.path1);

    this.icon.style.height = "86%";
    this.icon.style.aspectRatio = "1";
    this.icon.style.margin = "auto";
    this.icon.style.fill = "#000000dd";
  }

  setEvent() {
    this.div.addEventListener("mouseenter", () => {
      this.div.style.background = "#444444";
    });
    this.div.addEventListener("mouseleave", () => {
      this.div.style.background = "#222222dd";
    });

    this.div.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        // The graphs and controls are siblings of the canvas on body, so
        // fullscreening the canvas would drop every one of them.
        // ponytail: unprefixed only, add webkitRequestFullscreen if iPadOS < 16.4 shows up in analytics
        document.documentElement.requestFullscreen().catch(() => {});
      }
    });

    // Esc and the browser's own controls exit too, so follow the real state
    document.addEventListener("fullscreenchange", () => {
      this.icon.style.fill = document.fullscreenElement
        ? "#999999"
        : "#000000dd";
    });
  }
}
