import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setFog();
  }

  setFog() {
    this.scene.fog = new THREE.Fog("#000000", 25, 75);
  }
}
