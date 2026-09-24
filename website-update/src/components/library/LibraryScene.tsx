import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { ArrowUpRight } from "lucide-react";
import { currentRead } from "./reading";

export const ESSAYS_URL = "https://essay-site-one.vercel.app/";

export type LibraryBook = "about" | "projects" | "experience" | "coursework" | "contact";

// Where the books on each shelf row stand, bottom to top. A featured volume's centre sits .73 above
// its row so its brass nameplate rests on the shelf lip.
const shelfRows = [.7, 2.65, 4.6, 6.55];

// The volumes zigzag between the second and third rows, one per bay. Third-row books stand clear
// of the sconces, and every volume keeps clear of the bay dividers so the covers can swing open.
const featured = ([
  { id: "about", title: "ABOUT", x: -5.5, row: 2, color: 0x355047 },
  { id: "projects", title: "PROJECTS", x: -2.2, row: 1, color: 0x6d3230 },
  { id: "experience", title: "EXPERIENCE", x: 1.7, row: 2, color: 0x303f50 },
  { id: "coursework", title: "COURSEWORK", x: 4.3, row: 1, color: 0x4b2f45 },
  { id: "contact", title: "CONTACT", x: 6.75, row: 2, color: 0x694c2e },
] satisfies { id: LibraryBook; title: string; x: number; row: number; color: number }[]).map(book => ({ ...book, y: shelfRows[book.row] + .73 }));

const views: { target: readonly [number, number, number]; position: readonly [number, number, number] }[] = [
  { target: [0, 3.2, -4] as const, position: [0, 3.5, 10.5] as const },
  ...featured.map(book => ({ target: [book.x, book.y, -3.85] as const, position: [book.x, book.y + .07, 0.65] as const })),
  { target: [0, 3.2, -4] as const, position: [0, 3.5, 10.5] as const },
];
// Scroll progress runs from the entrance (0), through one stage per volume, to the return view.
const lastStage = views.length - 1;

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

function paperTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 680;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#f3e7cf";
  context.fillRect(0, 0, 512, 680);
  context.strokeStyle = "#9fb3c0";
  context.lineWidth = 2;
  for (let y = 170; y < 650; y += 38) {
    context.beginPath();
    context.moveTo(28, y);
    context.lineTo(484, y);
    context.stroke();
  }
  context.strokeStyle = "#c98a7a";
  context.beginPath();
  context.moveTo(70, 0);
  context.lineTo(70, 680);
  context.stroke();
  context.fillStyle = "#2c2a3a";
  context.font = "italic 64px Georgia";
  context.fillText("Essays &", 88, 82);
  context.fillText("Thoughts", 112, 144);
  // Loose handwriting: wavy ink strokes of varying length on each ruled line.
  context.strokeStyle = "#3a3448";
  context.lineWidth = 3;
  for (let line = 0; line < 11; line++) {
    const y = 202 + line * 38 - 6;
    const end = line % 4 === 3 ? 260 + (line * 37) % 90 : 400 + (line * 53) % 70;
    context.beginPath();
    context.moveTo(88, y);
    for (let x = 88; x < end; x += 9) context.lineTo(x, y + Math.sin(x * .19 + line) * 5 - (x % 31 < 4 ? 8 : 0));
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function openPagesTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 340;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#efe3c8";
  context.fillRect(0, 0, 256, 340);
  context.fillStyle = "#6f6152";
  for (let line = 0; line < 17; line++) {
    const end = line % 6 === 5 ? 120 + (line * 29) % 60 : 222 - (line * 13) % 18;
    context.fillRect(28, 34 + line * 17, end - 28, 5);
  }
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
  const tagRef = useRef<HTMLAnchorElement>(null);
  const readingTagRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  const [failed, setFailed] = useState(false);
  selectRef.current = onSelect;

  useEffect(() => {
    const host = hostRef.current;
    const tag = tagRef.current;
    const readingTag = readingTagRef.current;
    if (!host || !tag) return;
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
        if (featured.some(book => book.row === row && Math.abs(book.x - x) < .49)) continue;
        if ((i + row * 7) % 19 === 0) continue;
        const height = 1.28 + ((i * 7 + row * 11) % 9) * .052;
        const width = .13 + ((i * 3 + row) % 4) * .014;
        const y = shelfRows[row] + height / 2;
        const book = box(width, height, .48, genericMaterials[(i * 5 + row * 3) % genericMaterials.length], x, y, -4.12);
        if (i % 17 === 0) book.rotation.z = .07;
        if (i % 9 === 0) box(.012, height * .78, .006, materials.brass, x, y, -3.874);
      }
    }

    const clickable: THREE.Mesh[] = [];
    // Every lamp in the room can be clicked off and back on; there's deliberately no hint that it's possible.
    type Shade = THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
    const lamps: { on: boolean; level: number; flickerUntil: number; lights: [THREE.PointLight, number][]; shade: Shade; lit: THREE.Color; unlit: THREE.Color }[] = [];
    const addLamp = (lights: THREE.PointLight[], parts: THREE.Mesh[], shade: Shade, unlit: number) => {
      const index = lamps.push({ on: true, level: 1, flickerUntil: 0, lights: lights.map(light => [light, light.intensity]), shade, lit: shade.color.clone(), unlit: new THREE.Color(unlit) }) - 1;
      parts.forEach(part => { part.userData.lamp = index; clickable.push(part); });
    };
    const lampShade = <T extends Shade>(material: T) => {
      const shade = material.clone() as T;
      managedMaterials.add(shade);
      return shade;
    };
    const bookGroups = new Map<LibraryBook, { group: THREE.Group; cover: THREE.Group; material: THREE.MeshStandardMaterial }>();
    for (const book of featured) {
      const group = new THREE.Group();
      group.position.set(book.x, book.y, -3.83);
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
      const glow = lampShade(materials.glow);
      const bracket = box(.13, .7, .18, materials.brass, x, 5.45, -3.65);
      const shade = cylinder(.28, .38, .42, glow, x, 5.75, -3.5);
      const lamp = new THREE.PointLight(0xffbe78, 2.1, 5.5, 2);
      lamp.position.set(x, 5.75, -3.25);
      scene.add(lamp);
      addLamp([lamp], [bracket, shade], glow, 0x2e231b);
    }
    box(6, .2, 2.55, materials.woodLight, 0, .88, 4.6);
    for (const x of [-2.65, 2.65]) for (const z of [3.65, 5.55]) box(.18, .9, .18, materials.wood, x, .36, z);
    const tableBook = box(.8, .055, .55, genericMaterials[6], -1.3, 1.01, 4.05);
    tableBook.rotation.y = .18;

    // A loose stack of manuscript pages and a fountain pen: the doorway to the essays site.
    const essayDesk = new THREE.Group();
    essayDesk.position.set(1.45, .98, 3.95);
    essayDesk.rotation.y = -.14;
    essayDesk.scale.setScalar(1.15);
    scene.add(essayDesk);
    const paper = new THREE.MeshStandardMaterial({ color: 0xeadcc0, roughness: .95 });
    const manuscript = paperTexture();
    textures.push(manuscript);
    const topSheetMaterial = new THREE.MeshStandardMaterial({ map: manuscript, roughness: .9, emissive: 0x000000 });
    const penBody = new THREE.MeshStandardMaterial({ color: 0x14100f, metalness: .35, roughness: .28 });
    [paper, topSheetMaterial, penBody].forEach(material => managedMaterials.add(material));
    const sheets = [[-.05, .08, .1], [.06, -.04, -.07], [-.02, .03, .04]];
    sheets.forEach(([x, z, turn], i) => {
      const sheet = box(.7, .006, .92, i % 2 ? materials.cream : paper, x, .004 + i * .007, z, essayDesk);
      sheet.rotation.y = turn;
      sheet.userData.href = ESSAYS_URL;
      clickable.push(sheet);
    });
    const topSheet = box(.7, .006, .92, topSheetMaterial, 0, .004 + sheets.length * .007, 0, essayDesk);
    topSheet.userData.href = ESSAYS_URL;
    clickable.push(topSheet);
    const topSheetRest = topSheet.position.y;
    const pen = new THREE.Group();
    pen.position.set(.44, .05, .12);
    pen.rotation.y = -.95;
    essayDesk.add(pen);
    const penParts = [
      cylinder(.022, .022, .42, penBody, 0, 0, 0, pen),
      cylinder(.024, .024, .17, materials.brass, .29, 0, 0, pen),
      cylinder(.004, .022, .09, materials.brass, -.255, 0, 0, pen),
      box(.13, .006, .012, materials.brass, .3, .026, 0, pen),
    ];
    penParts.slice(0, 3).forEach(part => { part.rotation.z = Math.PI / 2; });
    penParts.forEach(part => { part.userData.href = ESSAYS_URL; clickable.push(part); });
    essayDesk.updateMatrixWorld(true);
    const essayAnchor = essayDesk.localToWorld(new THREE.Vector3(0, .1, -.3));
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
    // The current read, left open face-up on the seat as if its reader just stepped away.
    const openBook = new THREE.Group();
    let openPagesMaterial: THREE.MeshStandardMaterial | undefined;
    if (currentRead) {
      openBook.position.set(.12, 1.1, .25);
      openBook.rotation.set(.1, -.28, 0);
      chair.add(openBook);
      const binding = new THREE.MeshStandardMaterial({ color: currentRead.color, roughness: .62, metalness: .05 });
      const pagesTexture = openPagesTexture();
      textures.push(pagesTexture);
      openPagesMaterial = new THREE.MeshStandardMaterial({ map: pagesTexture, roughness: .9, emissive: 0x000000 });
      [binding, openPagesMaterial].forEach(material => managedMaterials.add(material));
      const bookParts = [box(.9, .02, .6, binding, 0, 0, 0, openBook), box(.05, .03, .6, binding, 0, .012, 0, openBook)];
      for (const side of [-1, 1]) {
        const page = box(.42, .04, .56, openPagesMaterial, side * .215, .03, 0, openBook);
        page.rotation.z = side * .07;
        bookParts.push(page);
      }
      bookParts.push(box(.022, .004, .2, binding, .06, .052, .36, openBook));
      bookParts.forEach(part => { part.userData.reading = true; clickable.push(part); });
    }
    const openBookRest = openBook.position.y;
    const lumbar = add(new THREE.SphereGeometry(1, 18, 12), materials.leather, chair, .05, 1.18, -.31);
    lumbar.scale.set(.48, .36, .14);
    const blanket = box(.47, .04, .92, materials.cream, -1.08, 1.3, .18, chair);
    blanket.rotation.z = .1;
    cylinder(.43, .49, .08, materials.woodLight, 6.75, .68, .2);
    cylinder(.12, .12, .68, materials.wood, 6.75, .3, .2);
    const floorShade = lampShade(materials.cream);
    const floorLamp = [
      cylinder(.32, .36, .12, materials.brass, 3.25, .06, -.55),
      cylinder(.035, .035, 2.0, materials.brass, 3.25, 1.08, -.55),
      cylinder(.22, .43, .6, floorShade, 3.25, 2.35, -.55),
    ];
    const readingLight = new THREE.PointLight(0xffca82, 7, 5, 2);
    readingLight.position.set(3.25, 2.1, -.25);
    scene.add(readingLight);
    addLamp([readingLight], floorLamp, floorShade, 0x5a4a38);
    const chandelierGlow = lampShade(materials.glow);
    const chandelier = [
      cylinder(.55, .72, .3, materials.brass, 0, 7.65, 2.5),
      cylinder(.09, .09, 1.2, materials.brass, 0, 8.35, 2.5),
    ];
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3;
      const x = Math.cos(angle) * 1.05;
      const z = 2.5 + Math.sin(angle) * 1.05;
      const arm = cylinder(.025, .025, .65, materials.brass, x * .6, 7.38, 2.5 + Math.sin(angle) * .6);
      arm.rotation.z = -Math.cos(angle) * .9;
      chandelier.push(arm, cylinder(.11, .15, .25, chandelierGlow, x, 7.25, z));
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
    addLamp([warm], chandelier, chandelierGlow, 0x2e231b);

    chair.updateMatrixWorld(true);
    const readingAnchor = openBook.localToWorld(new THREE.Vector3(0, .06, 0));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hit = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(clickable, false)[0]?.object.userData as { book?: LibraryBook; href?: string; lamp?: number; reading?: boolean } | undefined;
    };
    let essayHovered = false;
    let readingHovered = false;
    // Hovering shows the current read; a click or tap pins it open until the next click elsewhere.
    let readingPinned = false;
    const onMove = (event: PointerEvent) => {
      const target = hit(event);
      essayHovered = !!target?.href;
      readingHovered = !!target?.reading;
      renderer.domElement.style.cursor = target ? "pointer" : "default";
    };
    const onLeave = () => { essayHovered = false; readingHovered = false; };
    let tagHovered = false;
    const onTagEnter = () => { tagHovered = true; };
    const onTagLeave = () => { tagHovered = false; };
    tag.addEventListener("pointerenter", onTagEnter);
    tag.addEventListener("pointerleave", onTagLeave);
    tag.addEventListener("focus", onTagEnter);
    tag.addEventListener("blur", onTagLeave);
    const onDown = (event: PointerEvent) => { const book = hit(event)?.book; if (book) selectRef.current(book); };
    // Opened on click rather than pointerdown so touch taps count as a user gesture for the new tab.
    const onClick = (event: MouseEvent) => {
      const target = hit(event);
      if (target?.href) open(target.href, "_blank", "noopener,noreferrer");
      readingPinned = !!target?.reading && !readingPinned;
      if (target?.lamp === undefined) return;
      const lamp = lamps[target.lamp];
      lamp.on = !lamp.on;
      if (lamp.on) lamp.flickerUntil = performance.now() + 320;
    };
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerleave", onLeave);
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("click", onClick);

    let width = 0;
    let height = 0;
    let tagHalfWidth = 0;
    const resize = () => {
      tagHalfWidth = tag.offsetWidth / 2;
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
    resizeObserver.observe(tag);
    resize();
    camera.position.set(...views[0].position);
    const currentTarget = new THREE.Vector3(...views[0].target);
    const desiredTarget = new THREE.Vector3();
    const desiredPosition = new THREE.Vector3();
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const projectedAnchor = new THREE.Vector3();
    let tagShown = false;
    let readingShown = false;
    let lastFrame = 0;
    const animate = (time: number) => {
      // Easing rates are tuned per 60fps frame; scale them by the real frame time so the camera glides
      // between shelves at the same pace on any refresh rate. The first frame after a pause holds still.
      const frames = lastFrame ? Math.min(time - lastFrame, 250) / (1000 / 60) : 0;
      lastFrame = time;
      const ease = (rate: number) => 1 - Math.pow(1 - rate, frames);
      const progress = Math.max(0, Math.min(lastStage, progressRef.current));
      const index = Math.min(lastStage - 1, Math.floor(progress));
      const t = reducedMotion.matches ? Math.round(progress) - index : THREE.MathUtils.smoothstep(progress - index, 0, 1);
      desiredTarget.fromArray(views[index].target).lerp(new THREE.Vector3(...views[index + 1].target), t);
      desiredPosition.fromArray(views[index].position).lerp(new THREE.Vector3(...views[index + 1].position), t);
      const overview = Math.max(THREE.MathUtils.clamp(1 - progress * 2, 0, 1), THREE.MathUtils.clamp(progress - (lastStage - 1), 0, 1));
      if (width < 650) {
        const readingCorner = overview * 2.8;
        desiredPosition.x += readingCorner;
        desiredTarget.x += readingCorner;
        desiredPosition.z += THREE.MathUtils.lerp(.55, 2.5, overview);
      }
      camera.position.lerp(desiredPosition, reducedMotion.matches ? 1 : ease(.065));
      currentTarget.lerp(desiredTarget, reducedMotion.matches ? 1 : ease(.065));
      camera.lookAt(currentTarget);
      for (const book of featured) {
        const entry = bookGroups.get(book.id)!;
        const selected = openRef.current === book.id;
        const focused = Math.round(progress) === featured.indexOf(book) + 1;
        entry.group.position.z = THREE.MathUtils.lerp(entry.group.position.z, selected ? -3.25 : -3.83, ease(.09));
        entry.cover.rotation.y = THREE.MathUtils.lerp(entry.cover.rotation.y, selected ? -2.15 : 0, ease(.09));
        entry.material.emissive.setHex(focused ? 0x34200c : 0x000000);
      }
      const essayActive = (essayHovered || tagHovered) && overview > .05;
      topSheet.position.y = THREE.MathUtils.lerp(topSheet.position.y, essayActive ? topSheetRest + .035 : topSheetRest, ease(.12));
      topSheetMaterial.emissive.setHex(essayActive ? 0x2a1a08 : 0x000000);
      tag.classList.toggle("is-hovered", essayActive);
      const readingActive = (readingHovered || readingPinned) && overview > .05;
      openBook.position.y = THREE.MathUtils.lerp(openBook.position.y, readingActive ? openBookRest + .03 : openBookRest, ease(.12));
      openPagesMaterial?.emissive.setHex(readingActive ? 0x2a1a08 : 0x000000);
      const now = performance.now();
      for (const lamp of lamps) {
        lamp.level = reducedMotion.matches ? +lamp.on : THREE.MathUtils.lerp(lamp.level, +lamp.on, ease(.16));
        // A switched-on bulb sputters for a moment before it settles.
        const level = !reducedMotion.matches && now < lamp.flickerUntil && Math.random() < .4 ? lamp.level * .2 : lamp.level;
        for (const [light, intensity] of lamp.lights) light.intensity = intensity * level;
        lamp.shade.color.lerpColors(lamp.unlit, lamp.lit, level);
      }
      if (!width || !height) return;
      renderer.render(scene, camera);
      // The reading callout sits up and to the left of the chair, clear of the volume nav and the essay tag.
      if (readingTag) {
        projectedAnchor.copy(readingAnchor).project(camera);
        const show = readingActive && projectedAnchor.z < 1;
        if (show !== readingShown) { readingShown = show; readingTag.style.visibility = show ? "visible" : "hidden"; }
        if (show) {
          const halfWidth = readingTag.offsetWidth / 2;
          const anchorX = (projectedAnchor.x + 1) / 2 * width;
          const x = THREE.MathUtils.clamp(anchorX - halfWidth + 36, halfWidth + 16, width - halfWidth - 16);
          readingTag.style.opacity = String(overview);
          readingTag.style.setProperty("--tag-x", `${x.toFixed(1)}px`);
          readingTag.style.setProperty("--tag-y", `${((1 - projectedAnchor.y) / 2 * height).toFixed(1)}px`);
          readingTag.style.setProperty("--tag-line", `${THREE.MathUtils.clamp(anchorX - x, 12 - halfWidth, halfWidth - 12).toFixed(1)}px`);
        }
      }
      // Pin the HTML callout above the manuscript while the room is in its overview shot.
      projectedAnchor.copy(essayAnchor).project(camera);
      const show = overview > .05 && projectedAnchor.z < 1;
      if (show !== tagShown) { tagShown = show; tag.style.visibility = show ? "visible" : "hidden"; }
      if (!show) return;
      const anchorX = (projectedAnchor.x + 1) / 2 * width;
      const x = THREE.MathUtils.clamp(anchorX, tagHalfWidth + 16, width - tagHalfWidth - 16);
      const y = (1 - projectedAnchor.y) / 2 * height;
      tag.style.opacity = String(overview);
      tag.style.setProperty("--tag-x", `${x.toFixed(1)}px`);
      tag.style.setProperty("--tag-y", `${y.toFixed(1)}px`);
      tag.style.setProperty("--tag-line", `${THREE.MathUtils.clamp(anchorX - x, 12 - tagHalfWidth, tagHalfWidth - 12).toFixed(1)}px`);
    };
    let inView = true;
    const syncLoop = () => { lastFrame = 0; renderer.setAnimationLoop(inView && !document.hidden ? animate : null); };
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
      renderer.domElement.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("click", onClick);
      tag.removeEventListener("pointerenter", onTagEnter);
      tag.removeEventListener("pointerleave", onTagLeave);
      tag.removeEventListener("focus", onTagEnter);
      tag.removeEventListener("blur", onTagLeave);
      scene.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      managedMaterials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <>
    <div ref={hostRef} className="library-scene" data-failed={failed || undefined} aria-label="Interactive 3D library shelves" />
    <a ref={tagRef} className="library-essay-tag" href={ESSAYS_URL} target="_blank" rel="noopener noreferrer"><span>The writing desk</span><strong>Click the pages to read my essays &amp; thoughts <ArrowUpRight size={15} /></strong></a>
    {currentRead && <>
      <div ref={readingTagRef} className="library-essay-tag library-reading-tag" aria-hidden="true"><span>Currently reading</span><strong>{currentRead.title}</strong><small>{currentRead.author}</small></div>
      <p className="library-visually-hidden">Currently reading: {currentRead.title} by {currentRead.author}.</p>
    </>}
  </>;
}
