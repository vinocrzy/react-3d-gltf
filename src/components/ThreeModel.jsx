import React, { useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";

const gltfLoader = new GLTFLoader();

// Scene
const scene = new THREE.Scene();

// Debug
// const gui = new dat.GUI();

const ThreeModel = () => {
  useEffect(() => {
    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // GLTF Load 3D

    gltfLoader.load(`/3d/shoe/Shoe-ToniRossi-Test.gltf`, (gltf) => {
      gltf.scene.rotation.set(0, 3, 5.7);
      gltf.scene.position.set(0.08, -0.05, 0);

      console.log(gltf);

      if (window.innerWidth < 500) {
        gltf.scene.scale.set(2.3, 2.3, 2.3);
      } else {
        gltf.scene.scale.set(3, 3, 3);
      }

      scene.add(gltf.scene);
    });

    // Lights

    var pointLight = new THREE.AmbientLight(0xffffff, 2);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    /**
     * Sizes
     */
    const sizes = {
      width:
        window.innerWidth > 500
          ? window.innerWidth - 100
          : window.innerWidth - 10,
      height:
        window.innerHeight > 500
          ? window.innerHeight - 100
          : window.innerHeight - 10,
    };

    if (window.innerWidth < 500) {
      sizes.width = window.innerWidth - 10;
      sizes.height = window.innerHeight - 10;
    } else {
      sizes.width = window.innerWidth - 100;
      sizes.height = window.innerHeight - 100;
    }

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      if (window.innerWidth < 500) {
        sizes.width = window.innerWidth - 10;
        sizes.height = window.innerHeight - 10;
      } else {
        sizes.width = window.innerWidth - 100;
        sizes.height = window.innerHeight - 100;
      }

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    // to disable zoom
    controls.enableZoom = false;
    // to disable pan
    controls.enablePan = false;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    // const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      // Update objects
      // sphere.rotation.y = 0.5 * elapsedTime;

      // Update Orbital Controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <div>
      <canvas className="webgl"></canvas>
    </div>
  );
};

export default ThreeModel;
