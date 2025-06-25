import * as THREE from "three";
import Experience from "../Experience.js";

export default class Vector {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.control = this.experience.control;
    this.resources = this.experience.resources;
    this.playbackSystem = this.experience.playbackSystem;
    this.graphs = this.experience.graphs;

    // label
    this.velVecTexture = this.resources.items.velVecTexture;
    this.accVecTexture = this.resources.items.accVecTexture;
    this.labelGeometry = new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 1.4, 0]), 3)
    );
    this.velLabelMaterial = new THREE.PointsMaterial({
      size: 30,
      sizeAttenuation: false,
      color: "green",
      alphaMap: this.velVecTexture,
      transparent: true,
    });
    this.accLabelMaterial = new THREE.PointsMaterial({
      size: 30,
      sizeAttenuation: false,
      color: "red",
      alphaMap: this.accVecTexture,
      transparent: true,
    });

    // parameter
    this.vecScale = 0.5;

    this.setModel();
  }

  setModel() {
    // velocity
    this.velVector = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 5.4, 0),
      0,
      "green",
      0.3,
      0.3
    );
    this.scene.add(this.velVector);
    this.velVecLabel = new THREE.Points(
      this.labelGeometry,
      this.velLabelMaterial
    );
    this.velVector.cone.add(this.velVecLabel);
    this.velVector.visible = false;

    // acceleration
    this.accVector = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 5.8, 0),
      0,
      "red",
      0.3,
      0.3
    );
    this.scene.add(this.accVector);
    this.accVecLabel = new THREE.Points(
      this.labelGeometry,
      this.accLabelMaterial
    );
    this.accVector.cone.add(this.accVecLabel);
    this.accVector.visible = false;
  }

  update() {
    if (this.control.vectorButton.isActive) {
      this.updateArrow();
      this.velVector.visible = true;
      this.accVector.visible = true;
    } else {
      this.velVector.visible = false;
      this.accVector.visible = false;
    }
  }

  updateArrow() {
    let time = this.playbackSystem.playbackTime;

    let vel;
    if (time < 9) {
      vel = this.graphs.velGraph.getValue(time);
    } else {
      vel = this.graphs.velGraph.section3.getValue(time);
    }
    this.velVector.setDirection(new THREE.Vector3(vel / Math.abs(vel), 0, 0));
    this.velVector.setLength(this.vecScale * Math.abs(vel), 0.3, 0.3);

    let acc;
    if (time < 9) {
      acc = this.graphs.accGraph.getValue(time);
    } else {
      acc = this.graphs.accGraph.section3.getValue(time);
    }
    this.accVector.setDirection(new THREE.Vector3(acc / Math.abs(acc), 0, 0));
    this.accVector.setLength(this.vecScale * Math.abs(acc), 0.3, 0.3);
  }
}
