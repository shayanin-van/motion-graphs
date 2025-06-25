import * as THREE from "three";
import Experience from "../Experience.js";

export default class StaticScene {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.playbackSystem = this.experience.playbackSystem;
    this.graphs = this.experience.graphs;

    // model
    this.modelResource = this.resources.items.staticSceneModel;

    // texture
    this.textureResource = this.resources.items.staticSceneTexture;
    this.textureResource.colorSpace = THREE.SRGBColorSpace;
    this.textureResource.flipY = false;
    this.texture = new THREE.MeshBasicMaterial({ map: this.textureResource });

    this.setModel();
  }

  setModel() {
    this.modelResource.scene.traverse((child) => {
      if (child.name === "staticScene") {
        this.model1 = child;
        this.model1.material = this.texture;
      }
    });

    this.model1.position.x = -50;
    this.model2 = this.model1.clone();
    this.model2.position.x = 0;
    this.model3 = this.model1.clone();
    this.model3.position.x = 50;

    this.scene.add(this.model1);
    this.scene.add(this.model2);
    this.scene.add(this.model3);
  }

  update() {
    let time = this.playbackSystem.playbackTime;
    let pos;
    if (time < 9) {
      pos = this.graphs.posGraph.getValue(time);
    } else {
      pos = this.graphs.posGraph.section3.getValue(time);
    }

    let scenePos;
    if (pos >= 0) {
      scenePos = 25 - ((pos + 25) % 50);
    } else {
      scenePos = -25 - ((pos - 25) % 50);
    }

    this.model1.position.x = scenePos - 50;
    this.model2.position.x = scenePos;
    this.model3.position.x = scenePos + 50;
  }
}
