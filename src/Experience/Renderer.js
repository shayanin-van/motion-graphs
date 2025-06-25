import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setQuery();
    this.setInstance();
  }

  setQuery() {
    this.mediaQueryInit = window.matchMedia("(orientation: landscape)");
    if (this.mediaQueryInit.matches) {
      this.mode = "landscape";
    } else {
      this.mode = "portrait";
    }

    this.mediaQuery = window.matchMedia("(orientation: landscape)");
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.mode = "landscape";
      } else {
        this.mode = "portrait";
      }
    });
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    if (this.mode == "landscape") {
      this.instance.render(this.scene, this.camera.landscapeCam);
    } else {
      this.instance.render(this.scene, this.camera.portraitCam);
    }
  }
}
