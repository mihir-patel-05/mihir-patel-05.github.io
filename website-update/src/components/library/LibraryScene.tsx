import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

export type LibraryBook = "about" | "projects" | "experience" | "contact";

const featured: { id: LibraryBook; title: string; x: number; color: number }[] = [
  { id: "about", title: "ABOUT", x: -5.35, color: 0x355047 },
  { id: "projects", title: "PROJECTS", x: -1.78, color: 0x6d3230 },
  { id: "experience", title: "EXPERIENCE", x: 1.78, color: 0x303f50 },
  { id: "contact", title: "CONTACT", x: 5.35, color: 0x694c2e },
];

const views = [
  { target: [0, 3.2, -4] as const, position: [0, 3.5, 10.5] as const },
  ...featured.map(book => ({ target: [book.x, 3.38, -3.85] as const, position: [book.x, 3.45, 0.65] as const })),
];

function spineTexture(title: string, color: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const context = canvas.getContext("2d")!;
  context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  context.fillRect(0, 0, 256, 1024);
  context.strokeStyle = "#c6a46a";
  context.lineWidth = 8;
  context.strokeRect(20, 20, 216, 984);
  context.lineWidth = 2;
  context.strokeRect(32, 34, 192, 956);
  context.fillStyle = "#d8bb83";
  for (const y of [100, 120, 900, 920]) context.fillRect(38, y, 180, 5);
  context.save();
  context.translate(128, 510);
  context.rotate(-Math.PI / 2);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 81px Georgia";
  context.fillText(title, 0, 0);
  context.restore();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export default function LibraryScene({ progressRef, openRef, onSelect }: {
  progressRef: RefObject<number>;
  openRef: RefObject<LibraryBook | null>;
  onSelect: (book: LibraryBook) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  const [failed, setFailed] = useState(false);
  selectRef.current = onSelect;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.65;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x120e0c);
    scene.fog = new THREE.Fog(0x120e0c, 12, 31);
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 80);
    const materials = {
      wood: new THREE.MeshStandardMaterial({ color: 0x321c16, roughness: .75 }),
      woodLight: new THREE.MeshStandardMaterial({ color: 0x513025, roughness: .73 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x754b32, roughness: .6 }),
      wall: new THREE.MeshStandardMaterial({ color: 0x241713, roughness: .95 }),
      floor: new THREE.MeshStandardMaterial({ color: 0x3f251c, roughness: .78 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xc09a5c, metalness: .72, roughness: .34 }),
      green: new THREE.MeshStandardMaterial({ color: 0x183329, roughness: .88 }),
      leather: new THREE.MeshStandardMaterial({ color: 0x402b24, roughness: .9 }),
      cream: new THREE.MeshStandardMaterial({ color: 0xd6bf95, roughness: .92 }),
      glow: new THREE.MeshBasicMaterial({ color: 0xffd397 }),
    };
    const managedMaterials = new Set<THREE.Material>(Object.values(materials));
    const textures: THREE.Texture[] = [];
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const box = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene) =>
      add(new THREE.BoxGeometry(w, h, d), material, parent, x, y, z);
    const cylinder = (top: number, bottom: number, h: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene) =>
      add(new THREE.CylinderGeometry(top, bottom, h, 12), material, parent, x, y, z);

    // A compact reading room: paneled walls, a coffered ceiling, and floor-to-ceiling walnut cases.
    box(20, 10, .3, materials.wall, 0, 4.6, -5.15);
    box(.3, 10, 20, materials.wall, -9.25, 4.6, 2);
    box(.3, 10, 20, materials.wall, 9.25, 4.6, 2);
    box(20, .3, 21, materials.floor, 0, -.18, 2);
    box(20, .35, 21, materials.wood, 0, 9.2, 2);
    for (let x = -9; x <= 9; x += 1.5) box(.07, .018, 20, materials.woodLight, x, .015, 2);
    for (let z = -4; z <= 11; z += 2.5) box(20, .08, .24, materials.trim, 0, 9, z);
    for (const x of [-8.1, -4.55, -1, 2.55, 6.1, 8.9]) box(.19, 8.45, .7, materials.woodLight, x, 4.18, -4.25);
    for (const y of [.52, 2.48, 4.43, 6.38, 8.31]) {
      box(18.2, .16, .85, materials.woodLight, 0, y, -4.34);
      box(18.2, .055, .87, materials.trim, 0, y + .1, -4.34);
    }
    box(19, .36, 1, materials.woodLight, 0, 8.62, -4.28);
    box(19, .07, 1.05, materials.brass, 0, 8.45, -4.28);
    for (const x of [-8.95, 8.95]) box(.4, 9, .9, materials.wood, x, 4.4, -4.15);
    for (const x of [-7.1, -3.55, 0, 3.55, 7.1]) {
      box(3.2, .07, .08, materials.trim, x, 8.1, -3.78);
      box(3.2, .07, .08, materials.trim, x, .38, -3.78);
    }

    const bookColors = [0x402d2b, 0x65493b, 0x283d38, 0x3a3644, 0x746148, 0x542f2d, 0x354455, 0x8a7053];
    const genericMaterials = bookColors.map(color => new THREE.MeshStandardMaterial({ color, roughness: .88 }));
    genericMaterials.forEach(material => managedMaterials.add(material));
    for (let row = 0; row < 4; row++) {
      for (let i = 0; i < 100; i++) {
        const x = -8.52 + i * .172;
        if (row === 1 && featured.some(book => Math.abs(book.x - x) < .49)) continue;
        if ((i + row * 7) % 19 === 0) continue;
        const height = 1.28 + ((i * 7 + row * 11) % 9) * .052;
        const width = .13 + ((i * 3 + row) % 4) * .014;
        const y = [.7, 2.65, 4.6, 6.55][row] + height / 2;
        const book = box(width, height, .48, genericMaterials[(i * 5 + row * 3) % genericMaterials.length], x, y, -4.12);
        if (i % 17 === 0) book.rotation.z = .07;
        if (i % 9 === 0) box(.012, height * .78, .006, materials.brass, x, y, -3.874);
      }
    }

    const clickable: THREE.Mesh[] = [];
    const bookGroups = new Map<LibraryBook, { group: THREE.Group; cover: THREE.Group; material: THREE.MeshStandardMaterial }>();
    for (const book of featured) {
      const group = new THREE.Group();
      group.position.set(book.x, 3.38, -3.83);
      scene.add(group);
      const leather = new THREE.MeshStandardMaterial({ color: book.color, roughness: .7, metalness: .08, emissive: 0x000000 });
      managedMaterials.add(leather);
      const texture = spineTexture(book.title, book.color);
      textures.push(texture);
      const titleMaterial = new THREE.MeshStandardMaterial({ map: texture, roughness: .72, emissive: 0x000000 });
      managedMaterials.add(titleMaterial);
      box(.7, 1.75, .38, materials.cream, 0, 0, 0, group);
      box(.72, 1.79, .06, leather, 0, 0, -.2, group);
      const cover = new THREE.Group();
      cover.position.set(-.37, 0, .21);
      group.add(cover);
      const spine = box(.74, 1.81, .055, titleMaterial, .37, 0, 0, cover);
      spine.userData.book = book.id;
      clickable.push(spine);
      box(.9, .065, .48, materials.brass, 0, -.94, 0, group);
      bookGroups.set(book.id, { group, cover, material: titleMaterial });
    }

    // Warm sconces, a library table, a wingback reading chair, and a simple chandelier.
    for (const x of [-7.5, -3.5, .5, 4.5, 7.8]) {
      box(.13, .7, .18, materials.brass, x, 5.45, -3.65);
      cylinder(.28, .38, .42, materials.glow, x, 5.75, -3.5);
      const lamp = new THREE.PointLight(0xffbe78, 2.1, 5.5, 2);
      lamp.position.set(x, 5.75, -3.25);
      scene.add(lamp);
    }
    box(6, .2, 2.55, materials.woodLight, 0, .88, 4.6);
    for (const x of [-2.65, 2.65]) for (const z of [3.65, 5.55]) box(.18, .9, .18, materials.wood, x, .36, z);
    box(1.2, .045, .75, materials.cream, -.9, 1.02, 4.4);
    box(.8, .055, .55, genericMaterials[6], .9, 1.04, 4.2);
    const chair = new THREE.Group();
    chair.position.set(4.8, 0, -.55);
    chair.rotation.y = -.22;
    scene.add(chair);
    cylinder(2.15, 2.15, .025, materials.leather, 4.8, .018, -.35);
    for (const x of [-.82, .82]) for (const z of [-.62, .62]) {
      const leg = box(.16, .48, .16, materials.woodLight, x, .22, z, chair);
      leg.rotation.z = x < 0 ? -.07 : .07;
    }
    box(2.04, .32, 1.6, materials.wood, 0, .58, 0, chair);
    const seat = add(new THREE.SphereGeometry(1, 24, 16), materials.green, chair, 0, .82, .08);
    seat.scale.set(.99, .3, .76);
    const back = add(new THREE.SphereGeometry(1, 24, 16), materials.green, chair, 0, 1.64, -.61);
    back.scale.set(1.04, 1.15, .32);
    for (const x of [-.91, .91]) {
      const wing = add(new THREE.SphereGeometry(1, 16, 12), materials.green, chair, x, 1.85, -.49);
      wing.scale.set(.33, .8, .39);
      wing.rotation.z = x < 0 ? -.12 : .12;
      const arm = add(new THREE.SphereGeometry(1, 18, 12), materials.green, chair, x * 1.1, 1.02, .2);
      arm.scale.set(.3, .29, .86);
      cylinder(.075, .075, .15, materials.brass, x * 1.06, .71, .78, chair);
    }
    const lumbar = add(new THREE.SphereGeometry(1, 18, 12), materials.leather, chair, .05, 1.18, -.31);
    lumbar.scale.set(.48, .36, .14);
    const blanket = box(.47, .04, .92, materials.cream, -1.08, 1.3, .18, chair);
    blanket.rotation.z = .1;
    cylinder(.43, .49, .08, materials.woodLight, 6.75, .68, .2);
    cylinder(.12, .12, .68, materials.wood, 6.75, .3, .2);
    cylinder(.32, .36, .12, materials.brass, 3.25, .06, -.55);
    cylinder(.035, .035, 2.0, materials.brass, 3.25, 1.08, -.55);
    cylinder(.22, .43, .6, materials.cream, 3.25, 2.35, -.55);
    const readingLight = new THREE.PointLight(0xffca82, 7, 5, 2);
    readingLight.position.set(3.25, 2.1, -.25);
    scene.add(readingLight);
    cylinder(.55, .72, .3, materials.brass, 0, 7.65, 2.5);
    cylinder(.09, .09, 1.2, materials.brass, 0, 8.35, 2.5);
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3;
      const x = Math.cos(angle) * 1.05;
      const z = 2.5 + Math.sin(angle) * 1.05;
      const arm = cylinder(.025, .025, .65, materials.brass, x * .6, 7.38, 2.5 + Math.sin(angle) * .6);
      arm.rotation.z = -Math.cos(angle) * .9;
      cylinder(.11, .15, .25, materials.glow, x, 7.25, z);
    }

    scene.add(new THREE.AmbientLight(0xffd9af, 1.25));
    const key = new THREE.DirectionalLight(0xffdfb7, 2.8);
    key.position.set(-3, 8, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -12;
    key.shadow.camera.right = 12;
    key.shadow.camera.top = 12;
    key.shadow.camera.bottom = -12;
    scene.add(key);
    const warm = new THREE.PointLight(0xffbd75, 12, 12, 2);
    warm.position.set(0, 7.1, 2.5);
    scene.add(warm);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hitBook = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(clickable, false)[0]?.object.userData.book as LibraryBook | undefined;
    };
    const onMove = (event: PointerEvent) => { renderer.domElement.style.cursor = hitBook(event) ? "pointer" : "default"; };
    const onDown = (event: PointerEvent) => { const book = hitBook(event); if (book) selectRef.current(book); };
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerdown", onDown);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.fov = width < 650 ? 58 : 48;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    camera.position.set(...views[0].position);
    const currentTarget = new THREE.Vector3(...views[0].target);
    const desiredTarget = new THREE.Vector3();
    const desiredPosition = new THREE.Vector3();
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const animate = () => {
      const progress = Math.max(0, Math.min(4, progressRef.current));
      const index = Math.min(3, Math.floor(progress));
      const t = reducedMotion.matches ? Math.round(progress) - index : THREE.MathUtils.smoothstep(progress - index, 0, 1);
      desiredTarget.fromArray(views[index].target).lerp(new THREE.Vector3(...views[index + 1].target), t);
      desiredPosition.fromArray(views[index].position).lerp(new THREE.Vector3(...views[index + 1].position), t);
      if (width < 650) {
        const readingCorner = THREE.MathUtils.clamp(1 - progress * 2, 0, 1) * 2.8;
        desiredPosition.x += readingCorner;
        desiredTarget.x += readingCorner;
        desiredPosition.z += progress > .5 ? .55 : 2.5;
      }
      camera.position.lerp(desiredPosition, reducedMotion.matches ? 1 : .065);
      currentTarget.lerp(desiredTarget, reducedMotion.matches ? 1 : .065);
      camera.lookAt(currentTarget);
      for (const book of featured) {
        const entry = bookGroups.get(book.id)!;
        const selected = openRef.current === book.id;
        const focused = Math.round(progress) === featured.indexOf(book) + 1;
        entry.group.position.z = THREE.MathUtils.lerp(entry.group.position.z, selected ? -3.25 : -3.83, .09);
        entry.cover.rotation.y = THREE.MathUtils.lerp(entry.cover.rotation.y, selected ? -2.15 : 0, .09);
        entry.material.emissive.setHex(focused ? 0x34200c : 0x000000);
      }
      if (width && height) renderer.render(scene, camera);
    };
    let inView = true;
    const syncLoop = () => renderer.setAnimationLoop(inView && !document.hidden ? animate : null);
    const visibilityObserver = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncLoop(); }, { threshold: .01 });
    visibilityObserver.observe(host);
    document.addEventListener("visibilitychange", syncLoop);
    syncLoop();
    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      scene.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      managedMaterials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="library-scene" data-failed={failed || undefined} aria-label="Interactive 3D library shelves" />;
}
