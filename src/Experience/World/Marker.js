import * as THREE from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Marker {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.playbackSystem = this.experience.playbackSystem;
    this.graphs = this.experience.graphs;

    // font
    this.font = this.resources.items.markerFont;

    // parameter
    this.prevPos = 0;

    this.setMaterial();
    this.setModel();
  }

  setMaterial() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;

        varying vec3 vPosition;
        varying vec3 vNormal;

        float random2D(vec2 value)
        {
          return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main()
        {
          // Position
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // Glitch
          float glitchTime = uTime - modelPosition.y;
          float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) +  sin(glitchTime * 8.76);
          glitchStrength /= 3.0;
          glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
          glitchStrength *= 0.1;
          modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
          modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

          // Final position
          gl_Position = projectionMatrix * viewMatrix * modelPosition;

          // Model normal
          vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

          // Varyings
          vPosition = modelPosition.xyz;
          vNormal = modelNormal.xyz;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;

        varying vec3 vPosition;
        varying vec3 vNormal;

        void main()
        {
          // Normal
          vec3 normal = normalize(vNormal);
          if(!gl_FrontFacing)
          normal *= - 1.0;

          // Stripes
          float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
          stripes = pow(stripes, 3.0);

          // Fresnel
          vec3 viewDirection = normalize(vPosition - cameraPosition);
          float fresnel = dot(viewDirection, normal) + 1.0;
          fresnel = pow(fresnel, 2.0);

          // Falloff
          float falloff = smoothstep(0.8, 0.2, fresnel);

          // Holographic
          float holographic = stripes * fresnel;
          holographic += fresnel * 1.25;
          holographic *= falloff;

          // Final color
          gl_FragColor = vec4(uColor, holographic);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color("white")),
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  setModel() {
    this.geo = new TextGeometry("0 m", {
      font: this.font,
      size: 0.6,
      depth: 0.2,
      curveSegments: 3,
    });

    this.model = new THREE.Mesh(this.geo, this.mat);

    this.model.geometry.center();
    this.model.position.set(0, 2, 6);
    this.model.rotation.set(0, -Math.PI / 2, 0);

    this.world.staticScene.model2.add(this.model);
  }

  update() {
    // shader
    this.mat.uniforms.uTime.value = this.time.elapsed;

    // marker number
    let time = this.playbackSystem.playbackTime;
    let pos;
    if (time < 9) {
      pos = this.graphs.posGraph.getValue(time);
    } else {
      pos = this.graphs.posGraph.section3.getValue(time);
    }

    let prevTileNumber = Math.floor((this.prevPos + 25) / 50);
    let prevFrontThreshold = prevTileNumber * 50 + 25;
    let prevBackThreshold = prevTileNumber * 50 - 25;

    if (pos >= prevFrontThreshold || pos <= prevBackThreshold) {
      let tileNumber = Math.floor((pos + 25) / 50) * 50;
      let text = tileNumber + " m";

      this.model.geometry.dispose();
      this.model.geometry = new TextGeometry(text, {
        font: this.font,
        size: 0.6,
        depth: 0.2,
        curveSegments: 3,
      });
      this.model.geometry.center();
    }

    this.prevPos = pos;
  }
}
