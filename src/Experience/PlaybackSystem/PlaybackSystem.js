import Experience from "../Experience";
import gsap from "gsap";

export default class PlaybackSystem {
  constructor() {
    this.webglCanvas = document.querySelector("canvas.webgl");
    this.experience = new Experience();
    this.time = this.experience.time;
    this.playhead = this.experience.playhead;
    this.control = this.experience.control;

    this.playbackTime = 0;
  }

  update() {
    if (this.control.playButton.isPlaying) {
      this.playbackTime += this.time.delta;
    }

    if (this.playbackTime > 9) {
      gsap.to(this.webglCanvas, { opacity: 0, duration: 0.25, delay: 0 });
      gsap.to(this.webglCanvas, { opacity: 1, duration: 0.25, delay: 0.25 });
      setTimeout(() => {
        this.playbackTime = 0;
        this.control.playButton.pause();
      }, 250);
    }

    if (this.playhead.isDragging) {
      this.playbackTime = this.playhead.getTime();
    }

    this.playhead.draw(this.playbackTime);
  }
}
