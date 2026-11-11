import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { heroConfig } from '../config/sections';
import { createExcavatorModel } from '../lib/excavatorMesh';

interface Excavator3DProps {
  /** Angulo horizontal em graus (0 a 360) controlado pelo scroll */
  rotationDeg: number;
}

const INITIAL_YAW_RAD = -Math.PI * 0.26;

export function Excavator3D({ rotationDeg }: Excavator3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetYawRef = useRef(INITIAL_YAW_RAD);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    targetYawRef.current =
      INITIAL_YAW_RAD + ((rotationDeg * Math.PI) / 180) + dragOffsetRef.current;
  }, [rotationDeg]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 440;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvasEl = renderer.domElement;
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.display = 'block';
    canvasEl.setAttribute('data-testid', 'excavator-3d-canvas');
    container.appendChild(canvasEl);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 3.6, 12.6);
    camera.lookAt(0, 1.55, 0);

    // Iluminacao de estudio industrial
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc9c2b2, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffcf4, 2.2);
    keyLight.position.set(5.5, 9.5, 6.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 26;
    const d = 4.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf3b51b, 0.7);
    rimLight.position.set(-6, 4.5, -5);
    scene.add(rimLight);

    const model = createExcavatorModel();
    model.position.set(0, 0.05, 0);
    model.rotation.y = targetYawRef.current;
    scene.add(model);

    let currentYaw = targetYawRef.current;
    let rafId = 0;

    const animate = () => {
      // Interpolacao suave da rotacao horizontal 3D
      currentYaw += (targetYawRef.current - currentYaw) * 0.16;
      model.rotation.y = currentYaw;
      renderer?.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (!renderer) return;
            const nextW = container.clientWidth || 560;
            const nextH = container.clientHeight || 440;
            camera.aspect = nextW / nextH;
            camera.updateProjectionMatrix();
            renderer.setSize(nextW, nextH);
          })
        : null;
    resizeObserver?.observe(container);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      envTex.dispose();
      pmrem.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer?.dispose();
      if (canvasEl.parentNode === container) {
        container.removeChild(canvasEl);
      }
    };
  }, []);

  if (webglUnavailable) {
    return (
      <img
        src={heroConfig.centerpieceImage}
        alt={heroConfig.centerpieceAlt}
        className="w-full max-w-[460px] lg:max-w-[590px] h-auto object-contain select-none"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Modelo 3D interativo da escavadeira hidráulica com giro horizontal de 360 graus"
      data-rotation-deg={rotationDeg}
      onPointerDown={(e) => {
        isDraggingRef.current = true;
        lastPointerXRef.current = e.clientX;
      }}
      onPointerMove={(e) => {
        if (!isDraggingRef.current) return;
        const deltaX = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        dragOffsetRef.current += deltaX * 0.01;
        targetYawRef.current =
          INITIAL_YAW_RAD + ((rotationDeg * Math.PI) / 180) + dragOffsetRef.current;
      }}
      onPointerUp={() => {
        isDraggingRef.current = false;
      }}
      onPointerLeave={() => {
        isDraggingRef.current = false;
      }}
      className="w-full h-[320px] sm:h-[400px] lg:h-[470px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
    />
  );
}
