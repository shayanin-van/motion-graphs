export default class PlayButton {
  constructor(parent) {
    this.div = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.div);

    // parameter
    this.isPlaying = false;

    this.setStyle();
    this.setEvent();
  }

  setStyle() {
    this.div.style.background = "#222222dd";
    this.div.style.margin = "1%";
    this.div.style.height = "100%";
    this.div.style.aspectRatio = "1";
    this.div.style.borderRadius = "8px";
    this.div.style.display = "flex";

    this.icon = document.createElement("div");
    this.div.appendChild(this.icon);

    this.icon.style.background = "#999999";
    this.icon.style.height = "25%";
    this.icon.style.aspectRatio = "1";
    this.icon.style.margin = "auto";
    this.icon.style.clipPath = "polygon(0 0,100% 50%,0 100%)";
  }

  setEvent() {
    this.div.addEventListener("mouseenter", () => {
      this.div.style.background = "#444444";
    });
    this.div.addEventListener("mouseleave", () => {
      this.div.style.background = "#222222dd";
    });

    this.div.addEventListener("click", () => {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    });
  }

  pause() {
    this.isPlaying = false;
    this.icon.style.clipPath = "polygon(0 0,100% 50%,0 100%)";
  }

  play() {
    this.isPlaying = true;
    this.icon.style.clipPath =
      "polygon(0 0, 0 100%, 30% 100%, 30% 0, 70% 0, 70% 100%, 100% 100%, 100% 0)";
  }
}
