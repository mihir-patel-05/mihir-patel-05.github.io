import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

export type CivicView = "overview" | "lincoln" | "monument" | "capitol";

const views: Record<CivicView, { target: [number, number, number]; offset: [number, number, number] }> = {
  overview: { target: [0, 1, 0], offset: [24, 29, 34] },
  lincoln: { target: [0, 2, 16], offset: [13, 12, 16] },
  monument: { target: [0, 5, 0], offset: [15, 15, 16] },
  capitol: { target: [0, 3, -18], offset: [15, 12, 17] },
};

const viewOrder: CivicView[] = ["overview", "lincoln", "monument", "capitol"];

export default function CivicScene({ progressRef }: { progressRef: RefObject<number> }) {
  const mount = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180);
    const cameraTarget = new THREE.Vector3(...views.overview.target);
    const desiredPosition = new THREE.Vector3();
    const desiredTarget = new THREE.Vector3();
    const materials = {
      stone: new THREE.MeshStandardMaterial({ color: 0xe6e8e5, roughness: 0.9 }),
      shade: new THREE.MeshStandardMaterial({ color: 0xaebcc8, roughness: 0.92 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x8297aa, roughness: 0.9 }),
      grass: new THREE.MeshStandardMaterial({ color: 0x90a8a0, roughness: 1 }),
      lawn: new THREE.MeshStandardMaterial({ color: 0xaac1b5, roughness: 1 }),
      path: new THREE.MeshStandardMaterial({ color: 0xd9d7ce, roughness: 1 }),
      water: new THREE.MeshStandardMaterial({ color: 0x6096ba, metalness: 0.1, roughness: 0.32 }),
      tree: new THREE.MeshStandardMaterial({ color: 0x406a69, roughness: 1 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x657174, roughness: 1 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x274c77, roughness: 0.85 }),
    };

    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };
    const box = (width: number, height: number, depth: number, material: THREE.Material, x: number, y: number, z: number) =>
      add(new THREE.BoxGeometry(width, height, depth), material, x, y, z);
    const cylinder = (top: number, bottom: number, height: number, sides: number, material: THREE.Material, x: number, y: number, z: number) =>
      add(new THREE.CylinderGeometry(top, bottom, height, sides), material, x, y, z);

    // A deliberately simplified east-west National Mall: Lincoln, the Monument, and the Capitol.
    box(37, 0.5, 53, materials.grass, 0, -0.5, 0);
    box(10, 0.035, 52, materials.path, 0, -0.21, 0);
    box(8.5, 0.04, 12.5, materials.lawn, 0, -0.17, -9.3);
    box(8.5, 0.04, 6, materials.lawn, 0, -0.17, 9);
    box(3.1, 0.06, 12, materials.water, 0, -0.1, 8.2);
    box(3.55, 0.035, 12.5, materials.stone, 0, -0.15, 8.2);

    // Lincoln Memorial: a compact colonnade facing the Reflecting Pool.
    box(9, 0.5, 6.2, materials.stone, 0, 0.05, 19);
    box(8.4, 2.65, 5.4, materials.shade, 0, 1.62, 19.25);
    box(9, 0.36, 6, materials.stone, 0, 3.14, 19);
    box(9.3, 0.32, 6.3, materials.roof, 0, 3.47, 19);
    box(9.6, 0.22, 6.5, materials.stone, 0, 3.74, 19);
    for (const z of [16.1, 22.1]) {
      for (let x = -3.6; x <= 3.61; x += 1.2) {
        cylinder(0.17, 0.2, 2.7, 10, materials.stone, x, 1.68, z);
      }
    }
    for (const x of [-4.2, 4.2]) {
      for (let z = 17; z <= 21.1; z += 1.35) cylinder(0.17, 0.2, 2.7, 10, materials.stone, x, 1.68, z);
    }
    box(10.2, 0.22, 2, materials.stone, 0, -0.02, 15.7);

    // Washington Monument: square obelisk and its low plaza.
    box(6.2, 0.2, 6.2, materials.path, 0, -0.03, 0);
    box(2.25, 0.45, 2.25, materials.stone, 0, 0.22, 0);
    const shaft = cylinder(0.44, 0.72, 10.7, 4, materials.stone, 0, 5.8, 0);
    shaft.rotation.y = Math.PI / 4;
    const cap = add(new THREE.ConeGeometry(0.62, 1.5, 4), materials.shade, 0, 11.9, 0);
    cap.rotation.y = Math.PI / 4;

    // Capitol: broad wings, portico, and a tiered dome.
    box(13.3, 0.4, 6.6, materials.stone, 0, 0.05, -20);
    box(14.2, 2.6, 4.8, materials.stone, 0, 1.58, -20.4);
    box(5.6, 1.1, 6.3, materials.stone, 0, 1.95, -19.35);
    box(14.5, 0.35, 5.3, materials.roof, 0, 3.04, -20.4);
    for (let x = -2.1; x <= 2.11; x += 0.84) cylinder(0.14, 0.16, 2.2, 10, materials.stone, x, 1.45, -16.15);
    box(5.9, 0.3, 2.6, materials.stone, 0, 2.67, -17.3);
    cylinder(2.15, 2.35, 0.65, 24, materials.stone, 0, 3.48, -20);
    add(new THREE.SphereGeometry(2.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.stone, 0, 3.8, -20);
    cylinder(0.62, 0.8, 0.55, 16, materials.shade, 0, 5.99, -20);
    cylinder(0.08, 0.2, 0.66, 8, materials.dark, 0, 6.6, -20);

    // Allées and trees establish scale without claiming an exact architectural model.
    for (const x of [-7.5, 7.5]) {
      box(1.1, 0.035, 48, materials.path, x, -0.2, 0);
      for (let z = -22; z <= 22; z += 3.4) {
        if (Math.abs(z) < 3.5) continue;
        cylinder(0.09, 0.12, 0.9, 6, materials.trunk, x * 1.22, 0.45, z);
        add(new THREE.IcosahedronGeometry(0.63, 0), materials.tree, x * 1.22, 1.35, z);
      }
    }

    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const sun = new THREE.DirectionalLight(0xfff6e8, 3.2);
    sun.position.set(-12, 28, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -35;
    sun.shadow.camera.right = 35;
    sun.shadow.camera.top = 35;
    sun.shadow.camera.bottom = -35;
    scene.add(sun);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.fov = width < 600 ? 55 : 42;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animate = () => {
      const progress = Math.max(0, Math.min(3, progressRef.current));
      const current = Math.min(2, Math.floor(progress));
      const blend = reducedMotion.matches ? Math.round(progress) - current : progress - current;
      const from = views[viewOrder[current]];
      const to = views[viewOrder[current + 1]];
      desiredTarget.set(
        THREE.MathUtils.lerp(from.target[0], to.target[0], blend),
        THREE.MathUtils.lerp(from.target[1], to.target[1], blend),
        THREE.MathUtils.lerp(from.target[2], to.target[2], blend),
      );
      desiredPosition.set(
        desiredTarget.x + THREE.MathUtils.lerp(from.offset[0], to.offset[0], blend),
        desiredTarget.y + THREE.MathUtils.lerp(from.offset[1], to.offset[1], blend),
        desiredTarget.z + THREE.MathUtils.lerp(from.offset[2], to.offset[2], blend),
      );
      const easing = reducedMotion.matches ? 1 : 0.07;
      camera.position.lerp(desiredPosition, easing);
      cameraTarget.lerp(desiredTarget, easing);
      camera.lookAt(cameraTarget);
      if (width && height) renderer.render(scene, camera);
    };
    camera.position.copy(desiredPosition.set(...views.overview.offset));
    let inView = true;
    const syncLoop = () => renderer.setAnimationLoop(inView && !document.hidden ? animate : null);
    const visibilityObserver = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncLoop(); }, { threshold: 0.01 })
      : undefined;
    visibilityObserver?.observe(host);
    document.addEventListener("visibilitychange", syncLoop);
    syncLoop();

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      Object.values(materials).forEach(material => material.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="civic-scene" data-failed={failed || undefined} aria-hidden="true" />;
}
