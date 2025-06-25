import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import GraphsDiv from "./Graphs/GraphsDiv.js";
import ControlDiv from "./Control/ControlDiv.js";
import AreaAndSlope from "./AreaAndSlope/AreaAndSlope.js";
import Playhead from "./Playhead/Playhead.js";
import PlaybackSystem from "./PlaybackSystem/PlaybackSystem.js";

import sources from "./sources.js";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.graphs = new GraphsDiv();
    this.control = new ControlDiv();
    this.areaAndSlope = new AreaAndSlope();
    this.playhead = new Playhead();
    this.playbackSystem = new PlaybackSystem();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    // Show graph divs event
    this.graphs.on("showDiv", () => {
      this.onShowDiv();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.graphs.resize();
    this.areaAndSlope.resize();
    this.playhead.resize();
  }

  onShowDiv() {
    this.graphs.resize();
    this.areaAndSlope.resize();
    this.playhead.resize();
  }

  update() {
    this.playbackSystem.update();
    this.world.update();
    this.renderer.update();
  }
}
