import Experience from "../Experience.js";
import Environment from "./Environment.js";
import StaticScene from "./StaticScene.js";
import UFO from "./UFO.js";
import Marker from "./Marker.js";
import Vector from "./Vector.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.staticScene = new StaticScene();
      this.ufo = new UFO();
      this.environment = new Environment();
      this.marker = new Marker();
      this.vector = new Vector();
    });
  }

  update() {
    if (this.ufo) {
      this.ufo.update();
    }
    if (this.staticScene) {
      this.staticScene.update();
    }
    if (this.marker) {
      this.marker.update();
    }
    if (this.vector) {
      this.vector.update();
    }
  }
}
