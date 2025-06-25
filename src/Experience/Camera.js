import * as THREE from "three";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setLandscapeCam();
    this.setPortraitCam();
  }

  setLandscapeCam() {
    this.landscapeCam = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.scene.add(this.landscapeCam);
    this.landscapeCam.position.set(-17, 12.5, 17.4);
    this.landscapeCam.lookAt(new THREE.Vector3(-4, 4.5, 0));
  }

  setPortraitCam() {
    this.portraitCam = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.scene.add(this.portraitCam);
    this.portraitCam.position.set(-27, 23, 27);
    this.portraitCam.lookAt(new THREE.Vector3(0, 11, 0));
  }

  resize() {
    this.landscapeCam.aspect = this.sizes.width / this.sizes.height;
    this.landscapeCam.updateProjectionMatrix();

    this.portraitCam.aspect = this.sizes.width / this.sizes.height;
    this.portraitCam.updateProjectionMatrix();
  }
}
