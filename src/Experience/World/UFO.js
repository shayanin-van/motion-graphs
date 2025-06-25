import * as THREE from "three";
import Experience from "../Experience.js";

export default class UFO {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // model
    this.modelResource = this.resources.items.ufoModel;

    // texture
    this.textureResource = this.resources.items.ufoTexture;
    this.textureResource.colorSpace = THREE.SRGBColorSpace;
    this.textureResource.flipY = false;
    this.texture = new THREE.MeshBasicMaterial({ map: this.textureResource });

    // shadow
    this.shadowTexture = this.resources.items.ufoShadowTexture;

    this.setModel();
    this.setShadow();
  }

  setModel() {
    this.modelResource.scene.traverse((child) => {
      if (child.name === "ufo") {
        this.model = child;
        this.model.material = this.texture;
      }
    });

    this.scene.add(this.model);
  }

  setShadow() {
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        transparent: true,
        alphaMap: this.shadowTexture,
        color: "#2a3039",
        opacity: 0.8,
      })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.15 + 0.005;

    this.scene.add(this.shadow);
  }

  update() {
    // wobble effect
    this.model.position.y = 3.5 + 0.08 * Math.sin(3 * this.time.current);
    this.model.rotation.x =
      0.01 * Math.sin(1 * this.time.current) +
      0.02 * Math.cos(1 * this.time.current);
    this.model.rotation.y =
      0.02 * Math.sin(2 * this.time.current) +
      0.03 * Math.cos(1 * this.time.current);
    this.model.rotation.z =
      0.01 * Math.sin(0.5 * this.time.current) +
      0.01 * Math.cos(1 * this.time.current);

    // shadow
    let scaleFactor = this.model.position.y / 3.5;
    this.shadow.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }
}
