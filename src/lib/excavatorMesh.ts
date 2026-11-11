import * as THREE from 'three';

function createSoftShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.08,
      size / 2,
      size / 2,
      size * 0.48
    );
    grad.addColorStop(0, 'rgba(37, 39, 43, 0.34)');
    grad.addColorStop(0.55, 'rgba(37, 39, 43, 0.14)');
    grad.addColorStop(1, 'rgba(37, 39, 43, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createExtrudedShape(
  points: [number, number][],
  depth: number,
  bevelSize = 0.025
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevelSize > 0,
    bevelThickness: bevelSize,
    bevelSize,
    bevelSegments: 2,
  });
  geom.translate(0, 0, -depth / 2);
  return geom;
}

/**
 * Cria um cilindro hidraulico orientado exatamente entre dois pontos 3D.
 */
function createHydraulicCylinder(
  start: THREE.Vector3,
  end: THREE.Vector3,
  barrelRadius: number,
  rodRadius: number,
  barrelMat: THREE.Material,
  rodMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();
  const dir = new THREE.Vector3().subVectors(end, start);
  const totalLen = dir.length();
  const barrelLen = totalLen * 0.56;
  const rodLen = totalLen * 0.52;

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelLen, 16),
    barrelMat
  );
  barrel.position.y = barrelLen / 2;
  barrel.castShadow = true;

  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 1.18, barrelRadius * 1.18, 0.09, 16),
    barrelMat
  );
  collar.position.y = barrelLen;

  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(rodRadius, rodRadius, rodLen, 16),
    rodMat
  );
  rod.position.y = totalLen - rodLen / 2;
  rod.castShadow = true;

  const pinEndA = new THREE.Mesh(
    new THREE.CylinderGeometry(barrelRadius * 0.9, barrelRadius * 0.9, barrelRadius * 2.5, 12),
    barrelMat
  );
  pinEndA.rotation.z = Math.PI / 2;

  const pinEndB = pinEndA.clone();
  pinEndB.position.y = totalLen;

  group.add(barrel, collar, rod, pinEndA, pinEndB);
  group.position.copy(start);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return group;
}

function buildTrackAssembly(
  sideX: number,
  graphiteMat: THREE.Material,
  darkIronMat: THREE.Material,
  yellowMat: THREE.Material
): THREE.Group {
  const track = new THREE.Group();
  track.position.x = sideX;

  // Viga lateral da esteira (perfil alongado arredondado)
  const beamShape = new THREE.Shape();
  const halfLen = 1.38;
  const r = 0.28;
  beamShape.absarc(halfLen, 0.34, r, -Math.PI / 2, Math.PI / 2, false);
  beamShape.absarc(-halfLen, 0.34, r, Math.PI / 2, (Math.PI * 3) / 2, false);
  beamShape.closePath();

  const beamGeom = new THREE.ExtrudeGeometry(beamShape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  beamGeom.translate(0, 0, -0.17);
  beamGeom.rotateY(Math.PI / 2);

  const beam = new THREE.Mesh(beamGeom, graphiteMat);
  beam.castShadow = true;
  beam.receiveShadow = true;
  track.add(beam);

  // Roda guia dianteira (+Z) e roda motriz traseira (-Z)
  const wheelGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.38, 22);
  wheelGeom.rotateZ(Math.PI / 2);

  const frontIdler = new THREE.Mesh(wheelGeom, darkIronMat);
  frontIdler.position.set(0, 0.34, halfLen);
  frontIdler.castShadow = true;

  const rearSprocket = new THREE.Mesh(wheelGeom, darkIronMat);
  rearSprocket.position.set(0, 0.34, -halfLen);
  rearSprocket.castShadow = true;

  const hubGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.44, 16);
  hubGeom.rotateZ(Math.PI / 2);
  const frontHub = new THREE.Mesh(hubGeom, yellowMat);
  frontHub.position.copy(frontIdler.position);
  const rearHub = new THREE.Mesh(hubGeom, graphiteMat);
  rearHub.position.copy(rearSprocket.position);

  track.add(frontIdler, rearSprocket, frontHub, rearHub);

  // Roletes inferiores e superiores
  const rollerGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.38, 12);
  rollerGeom.rotateZ(Math.PI / 2);
  for (let i = -3; i <= 3; i += 1) {
    const roller = new THREE.Mesh(rollerGeom, darkIronMat);
    roller.position.set(0, 0.14, i * 0.33);
    track.add(roller);
  }
  for (const zPos of [-0.65, 0.65]) {
    const carrier = new THREE.Mesh(rollerGeom, darkIronMat);
    carrier.position.set(0, 0.56, zPos);
    track.add(carrier);
  }

  // Sapatas metalicas ao redor do perimetro oval da esteira
  const padGeom = new THREE.BoxGeometry(0.56, 0.055, 0.155);
  const grouserGeom = new THREE.BoxGeometry(0.54, 0.032, 0.035);

  const addPad = (y: number, z: number, rotX: number) => {
    const padHolder = new THREE.Group();
    padHolder.position.set(0, y, z);
    padHolder.rotation.x = rotX;
    const pad = new THREE.Mesh(padGeom, darkIronMat);
    const grouser = new THREE.Mesh(grouserGeom, graphiteMat);
    grouser.position.y = 0.032;
    pad.castShadow = true;
    padHolder.add(pad, grouser);
    track.add(padHolder);
  };

  const trackRadius = 0.36;
  const centerY = 0.34;
  // Trecho superior e inferior
  const topBottomCount = 13;
  for (let i = 0; i < topBottomCount; i += 1) {
    const z = -halfLen + (i / (topBottomCount - 1)) * (halfLen * 2);
    addPad(centerY + trackRadius, z, 0);
    addPad(centerY - trackRadius, z, Math.PI);
  }
  // Arcos dianteiro e traseiro
  const arcCount = 7;
  for (let i = 1; i < arcCount; i += 1) {
    const theta = -Math.PI / 2 + (i / arcCount) * Math.PI;
    // Arco dianteiro (+Z)
    addPad(
      centerY + Math.sin(theta) * trackRadius,
      halfLen + Math.cos(theta) * trackRadius,
      Math.PI / 2 - theta
    );
    // Arco traseiro (-Z)
    addPad(
      centerY + Math.sin(theta) * trackRadius,
      -halfLen - Math.cos(theta) * trackRadius,
      -(Math.PI / 2 - theta)
    );
  }

  return track;
}

/**
 * Constroi o modelo 3D completo de uma escavadeira hidraulica industrial
 * alinhada com a identidade visual (#F3B51B e #25272B).
 */
export function createExcavatorModel(): THREE.Group {
  const root = new THREE.Group();

  const yellowMat = new THREE.MeshPhysicalMaterial({
    color: 0xe59f0d,
    metalness: 0.14,
    roughness: 0.34,
    clearcoat: 0.55,
    clearcoatRoughness: 0.25,
  });
  const graphiteMat = new THREE.MeshStandardMaterial({
    color: 0x25272b,
    metalness: 0.44,
    roughness: 0.48,
  });
  const darkIronMat = new THREE.MeshStandardMaterial({
    color: 0x1a1c20,
    metalness: 0.52,
    roughness: 0.56,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe6ebf2,
    metalness: 0.94,
    roughness: 0.12,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8ea9a2,
    metalness: 0.05,
    roughness: 0.08,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151619,
    metalness: 0.08,
    roughness: 0.82,
  });
  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xfff8dc,
    emissive: 0xffe49e,
    emissiveIntensity: 0.45,
    roughness: 0.2,
  });

  // 1. Sombra suave de contato no solo
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(6.8, 6.2),
    new THREE.MeshBasicMaterial({
      map: createSoftShadowTexture(),
      transparent: true,
      depthWrite: false,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(0, 0.01, 0.6);
  root.add(shadowPlane);

  // 2. Material rodante (esteiras esquerda/direita + chassi em H)
  const undercarriage = new THREE.Group();
  undercarriage.add(buildTrackAssembly(-0.96, graphiteMat, darkIronMat, yellowMat));
  undercarriage.add(buildTrackAssembly(0.96, graphiteMat, darkIronMat, yellowMat));

  const crossBeamA = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.28, 0.42),
    graphiteMat
  );
  crossBeamA.position.set(0, 0.38, 0.45);
  const crossBeamB = crossBeamA.clone();
  crossBeamB.position.z = -0.45;
  const centerHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.68, 0.34, 24),
    darkIronMat
  );
  centerHub.position.set(0, 0.5, 0);

  const slewRing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.68, 0.16, 28),
    graphiteMat
  );
  slewRing.position.set(0, 0.72, 0);

  undercarriage.add(crossBeamA, crossBeamB, centerHub, slewRing);
  root.add(undercarriage);

  // 3. Superestrutura giratoria (contrapeso, motor, cabine, tanque)
  const upper = new THREE.Group();
  upper.position.set(0, 0.8, 0);

  // Base da plataforma superior
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(2.14, 0.18, 2.75),
    graphiteMat
  );
  deck.position.set(0, 0.09, -0.25);
  deck.castShadow = true;
  deck.receiveShadow = true;
  upper.add(deck);

  // Contrapeso traseiro curvo em arco
  const cwShape = new THREE.Shape();
  cwShape.moveTo(-1.08, -0.8);
  cwShape.quadraticCurveTo(-1.12, -1.62, -0.48, -1.78);
  cwShape.lineTo(0.48, -1.78);
  cwShape.quadraticCurveTo(1.12, -1.62, 1.08, -0.8);
  cwShape.closePath();

  const cwBottomGeom = new THREE.ExtrudeGeometry(cwShape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  cwBottomGeom.rotateX(Math.PI / 2);
  const cwBottom = new THREE.Mesh(cwBottomGeom, graphiteMat);
  cwBottom.position.set(0, 0.56, 0);
  cwBottom.castShadow = true;

  const cwTopGeom = new THREE.ExtrudeGeometry(cwShape, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  cwTopGeom.rotateX(Math.PI / 2);
  const cwTop = new THREE.Mesh(cwTopGeom, yellowMat);
  cwTop.position.set(0, 1.02, 0);
  cwTop.castShadow = true;
  upper.add(cwBottom, cwTop);

  // Compartimento do motor central e lateral direita
  const hoodMain = new THREE.Mesh(
    new THREE.BoxGeometry(1.12, 0.88, 1.38),
    yellowMat
  );
  hoodMain.position.set(0.32, 0.62, -0.42);
  hoodMain.castShadow = true;

  const hoodTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.14, 1.08),
    graphiteMat
  );
  hoodTop.position.set(0.32, 1.1, -0.46);

  // Escapamento vertical
  const muffler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.09, 0.42, 14),
    darkIronMat
  );
  muffler.position.set(0.45, 1.28, -0.82);
  const exhaustTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.25, 12),
    darkIronMat
  );
  exhaustTip.position.set(0.45, 1.54, -0.86);
  exhaustTip.rotation.x = -0.35;

  // Lateral direita: reservatorio hidraulico com grade escura
  const rightSideBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.68, 1.52),
    yellowMat
  );
  rightSideBox.position.set(0.84, 0.52, 0.14);
  rightSideBox.castShadow = true;

  const ventPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.36, 0.68),
    graphiteMat
  );
  ventPlate.position.set(1.08, 0.56, -0.05);

  // Guarda-corpo de seguranca superior
  const railCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.98, 0.86, 0.72),
    new THREE.Vector3(0.98, 1.36, 0.72),
    new THREE.Vector3(0.98, 1.36, -0.45),
    new THREE.Vector3(0.98, 0.86, -0.45),
  ]);
  const handrail = new THREE.Mesh(
    new THREE.TubeGeometry(railCurve, 24, 0.024, 8, false),
    graphiteMat
  );

  upper.add(hoodMain, hoodTop, muffler, exhaustTip, rightSideBox, ventPlate, handrail);

  // 4. Cabine do operador (esquerda-frente) com vidro e interior detalhado
  const cab = new THREE.Group();
  cab.position.set(-0.62, 0.18, 0.32);

  const cabBase = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.14, 1.38), graphiteMat);
  cabBase.position.y = 0.07;
  cab.add(cabBase);

  const cabLowerSide = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 0.38, 1.24),
    yellowMat
  );
  cabLowerSide.position.set(0, 0.32, -0.04);
  cabLowerSide.castShadow = true;
  cab.add(cabLowerSide);

  // Vidros da cabine
  const glassBox = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.94, 1.22), glassMat);
  glassBox.position.set(0, 0.92, 0);
  cab.add(glassBox);

  // Pilares estruturais ROPS
  const pillarGeom = new THREE.BoxGeometry(0.075, 1.0, 0.075);
  for (const px of [-0.41, 0.41]) {
    for (const pz of [-0.61, 0.61]) {
      const pillar = new THREE.Mesh(pillarGeom, graphiteMat);
      pillar.position.set(px, 0.94, pz);
      pillar.castShadow = true;
      cab.add(pillar);
    }
  }

  // Teto da cabine + farois de trabalho
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.11, 1.36), yellowMat);
  cabRoof.position.set(0, 1.46, -0.02);
  cabRoof.castShadow = true;
  const cabRoofTrim = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.05, 1.42), graphiteMat);
  cabRoofTrim.position.set(0, 1.4, 0);
  cab.add(cabRoof, cabRoofTrim);

  for (const lx of [-0.32, 0.32]) {
    const lampCase = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.08), graphiteMat);
    lampCase.position.set(lx, 1.54, 0.66);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.02), lightMat);
    lens.position.set(lx, 1.54, 0.7);
    cab.add(lampCase, lens);
  }

  // Interior da cabine: assento e joysticks
  const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.44), darkIronMat);
  seatBase.position.set(0, 0.48, -0.1);
  const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.56, 0.12), darkIronMat);
  seatBack.position.set(0, 0.78, -0.28);
  seatBack.rotation.x = -0.14;
  cab.add(seatBase, seatBack);

  for (const jx of [-0.24, 0.24]) {
    const joystick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.24, 8),
      darkIronMat
    );
    joystick.position.set(jx, 0.68, 0.14);
    joystick.rotation.x = 0.2;
    cab.add(joystick);
  }

  upper.add(cab);

  // 5. Conjunto articulado (Lanca + Braco + Cilindros + Mangueiras + Cacamba dentada)
  const boomGroup = new THREE.Group();
  boomGroup.position.set(0.06, 0.42, 0.56);

  // Suporte pivô da lança
  const boomClevis = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.46, 0.48), graphiteMat);
  boomClevis.position.set(0, 0.12, 0);
  boomGroup.add(boomClevis);

  // Lanca principal curvada (eixo Z = alcance para frente, eixo Y = altura)
  const boomPts: [number, number][] = [
    [0.0, 0.0],
    [0.52, 1.15],
    [1.05, 1.88],
    [2.15, 2.28],
    [2.26, 2.04],
    [1.14, 1.54],
    [0.68, 0.85],
    [0.24, -0.12],
  ];
  const boomGeom = createExtrudedShape(boomPts, 0.28, 0.025);
  boomGeom.rotateY(-Math.PI / 2);
  const boomMesh = new THREE.Mesh(boomGeom, yellowMat);
  boomMesh.castShadow = true;
  boomGroup.add(boomMesh);

  // Pinos de articulacao da lanca
  const boomTipPin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.42, 16),
    graphiteMat
  );
  boomTipPin.rotation.z = Math.PI / 2;
  boomTipPin.position.set(0, 2.15, 2.16);
  boomGroup.add(boomTipPin);

  // Dois cilindros principais de elevacao da lanca
  for (const cx of [-0.21, 0.21]) {
    boomGroup.add(
      createHydraulicCylinder(
        new THREE.Vector3(cx, -0.05, 0.34),
        new THREE.Vector3(cx, 1.25, 0.72),
        0.075,
        0.046,
        graphiteMat,
        chromeMat
      )
    );
  }

  // Braco (Stick) descendo da ponta da lanca
  const stickPts: [number, number][] = [
    [1.92, 2.66],
    [2.14, 2.74],
    [2.78, 0.62],
    [2.64, 0.56],
    [2.12, 2.14],
  ];
  const stickGeom = createExtrudedShape(stickPts, 0.24, 0.02);
  stickGeom.rotateY(-Math.PI / 2);
  const stickMesh = new THREE.Mesh(stickGeom, yellowMat);
  stickMesh.castShadow = true;
  boomGroup.add(stickMesh);

  // Cilindro do braco (em cima da lanca ate o topo do stick)
  boomGroup.add(
    createHydraulicCylinder(
      new THREE.Vector3(0, 1.88, 0.96),
      new THREE.Vector3(0, 2.66, 1.98),
      0.08,
      0.05,
      graphiteMat,
      chromeMat
    )
  );

  // Cilindro da cacamba (ao longo do stick)
  boomGroup.add(
    createHydraulicCylinder(
      new THREE.Vector3(0, 2.48, 2.26),
      new THREE.Vector3(0, 1.02, 2.74),
      0.068,
      0.042,
      graphiteMat,
      chromeMat
    )
  );

  // Mangueiras hidraulicas curvas
  for (const hx of [-0.1, 0.1]) {
    const hoseCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(hx, 1.92, 1.35),
      new THREE.Vector3(hx * 1.4, 2.38, 1.86),
      new THREE.Vector3(hx * 1.2, 2.15, 2.22),
      new THREE.Vector3(hx, 1.56, 2.45),
    ]);
    const hose = new THREE.Mesh(
      new THREE.TubeGeometry(hoseCurve, 20, 0.022, 8, false),
      rubberMat
    );
    boomGroup.add(hose);
  }

  // Cacamba escavadeira pesada com 5 dentes forjados voltados para a frente/escavacao
  const bucketGroup = new THREE.Group();
  bucketGroup.position.set(0, 0.56, 2.7);
  bucketGroup.rotation.x = 0.15;

  const bucketPts: [number, number][] = [
    [-0.12, 0.14],
    [0.24, 0.14],
    [0.44, -0.18],
    [0.4, -0.56],
    [0.05, -0.74],
    [-0.36, -0.62],
    [-0.46, -0.34],
    [-0.2, -0.46],
    [0.14, -0.48],
    [0.26, -0.22],
  ];
  const bucketShellGeom = createExtrudedShape(bucketPts, 0.72, 0.018);
  bucketShellGeom.rotateY(-Math.PI / 2);
  const bucketMesh = new THREE.Mesh(bucketShellGeom, graphiteMat);
  bucketMesh.castShadow = true;
  bucketGroup.add(bucketMesh);

  // Placas laterais e reforco superior
  for (const sx of [-0.36, 0.36]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.58, 0.62), darkIronMat);
    cheek.position.set(sx, -0.28, 0.02);
    bucketGroup.add(cheek);
  }

  // 5 dentes de escavacao alinhados na borda inferior de corte (-Z)
  const toothGeom = new THREE.ConeGeometry(0.044, 0.2, 4);
  toothGeom.rotateX(-Math.PI / 2);
  toothGeom.rotateZ(Math.PI / 4);
  for (const tx of [-0.26, -0.13, 0, 0.13, 0.26]) {
    const tooth = new THREE.Mesh(toothGeom, darkIronMat);
    tooth.position.set(tx, -0.36, -0.5);
    tooth.rotation.x = 0.25;
    bucketGroup.add(tooth);
  }

  boomGroup.add(bucketGroup);
  upper.add(boomGroup);
  root.add(upper);

  // Centraliza o eixo de rotacao 360 no meio visual da maquina (entre contrapeso e cacamba)
  const pivotGroup = new THREE.Group();
  root.position.set(0, 0, -0.45);
  pivotGroup.add(root);

  return pivotGroup;
}
