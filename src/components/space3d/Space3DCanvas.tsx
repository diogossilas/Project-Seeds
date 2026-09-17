import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Compass, Info } from 'lucide-react';
import { TEAMS_DATA } from '../../data/sevenSeedsData';
import { GLOBAL_PROGRAMS_DATA } from '../../data/globalSeedsData';
import { mapPercentTo3DCoordinate } from '../../services/telemetryMath';
import { CameraPreset } from './Space3DControls';

interface Space3DCanvasProps {
  autoRotate: boolean;
  cameraAngle: CameraPreset;
  scope?: 'global' | 'japan';
}

export const Space3DCanvas: React.FC<Space3DCanvasProps> = ({
  autoRotate,
  cameraAngle,
  scope = 'global',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080d16);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(130, 90, 150);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 1.5, 300);
    pointLight.position.set(80, 120, 80);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0x10b981, 1.2, 300);
    backLight.position.set(-80, -40, -80);
    scene.add(backLight);

    // 5. Root Group for rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    groupRef.current = rootGroup;

    // 6. 3D Coordinate Grid & Planes
    const gridXZ = new THREE.GridHelper(140, 14, 0x1e293b, 0x0f172a);
    gridXZ.position.y = -50;
    rootGroup.add(gridXZ);

    // Coordinate Bounding Box / Volume Cage
    const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
    const boxEdges = new THREE.EdgesGeometry(boxGeometry);
    const boxLines = new THREE.LineSegments(
      boxEdges, 
      new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.4 })
    );
    rootGroup.add(boxLines);

    // 7. 3D Axes with Labels
    // X Axis: Emerald (Empatia & Biocentrismo)
    const axisMaterialX = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 });
    const pointsX = [new THREE.Vector3(-50, -50, -50), new THREE.Vector3(65, -50, -50)];
    const geomX = new THREE.BufferGeometry().setFromPoints(pointsX);
    rootGroup.add(new THREE.Line(geomX, axisMaterialX));

    // Y Axis: Blue/Amber (Biopoder & Técnica)
    const axisMaterialY = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const pointsY = [new THREE.Vector3(-50, -50, -50), new THREE.Vector3(-50, 65, -50)];
    const geomY = new THREE.BufferGeometry().setFromPoints(pointsY);
    rootGroup.add(new THREE.Line(geomY, axisMaterialY));

    // Z Axis: Violet/Amber (Resiliência & Sobrevivência Temporal)
    const axisMaterialZ = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
    const pointsZ = [new THREE.Vector3(-50, -50, -50), new THREE.Vector3(-50, -50, 65)];
    const geomZ = new THREE.BufferGeometry().setFromPoints(pointsZ);
    rootGroup.add(new THREE.Line(geomZ, axisMaterialZ));

    // 8. Add Data Spheres
    if (scope === 'global') {
      const attractorVector = new THREE.Vector3(
        mapPercentTo3DCoordinate(96),
        mapPercentTo3DCoordinate(10),
        mapPercentTo3DCoordinate(96)
      );

      GLOBAL_PROGRAMS_DATA.forEach((prog) => {
        const pos = new THREE.Vector3(
          mapPercentTo3DCoordinate(prog.spatial3D.x),
          mapPercentTo3DCoordinate(prog.spatial3D.y),
          mapPercentTo3DCoordinate(prog.spatial3D.z)
        );

        const radius = prog.id === 'lunar-colonies' ? 3.5 : prog.id === 'south-america' ? 5.5 : 4.5;
        const sphereGeom = new THREE.SphereGeometry(radius, 24, 24);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(prog.color),
          roughness: 0.2,
          metalness: 0.6,
          emissive: new THREE.Color(prog.color),
          emissiveIntensity: prog.statusLevel === 'prosperous' ? 0.6 : 0.3,
        });

        const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
        sphereMesh.position.copy(pos);
        rootGroup.add(sphereMesh);

        // Wireframe pulse halo
        const wireGeom = new THREE.IcosahedronGeometry(radius * 1.35, 1);
        const wireMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(prog.color),
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        });
        const wireMesh = new THREE.Mesh(wireGeom, wireMat);
        wireMesh.position.copy(pos);
        rootGroup.add(wireMesh);

        // Drop line to floor
        const dropLinePoints = [pos, new THREE.Vector3(pos.x, -50, pos.z)];
        const dropGeom = new THREE.BufferGeometry().setFromPoints(dropLinePoints);
        const dropMat = new THREE.LineDashedMaterial({
          color: new THREE.Color(prog.color),
          dashSize: 2,
          gapSize: 2,
          transparent: true,
          opacity: 0.35,
        });
        const dropLine = new THREE.Line(dropGeom, dropMat);
        dropLine.computeLineDistances();
        rootGroup.add(dropLine);

        // Arc towards biocentric attractor if program shifted
        if (prog.id !== 'lunar-colonies') {
          const curve = new THREE.QuadraticBezierCurve3(
            pos,
            new THREE.Vector3((pos.x + attractorVector.x) / 2, Math.max(pos.y, attractorVector.y) + 12, (pos.z + attractorVector.z) / 2),
            attractorVector
          );
          const arcPoints = curve.getPoints(24);
          const arcGeom = new THREE.BufferGeometry().setFromPoints(arcPoints);
          const arcMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(prog.color),
            transparent: true,
            opacity: 0.35,
          });
          rootGroup.add(new THREE.Line(arcGeom, arcMat));
        }
      });
    } else {
      const fujiTeam = TEAMS_DATA.find(t => t.id === 'arca-fuji');
      const sadoVector = new THREE.Vector3(
        mapPercentTo3DCoordinate(fujiTeam?.spatial3D.x ?? 95),
        mapPercentTo3DCoordinate(fujiTeam?.spatial3D.y ?? 50),
        mapPercentTo3DCoordinate(fujiTeam?.spatial3D.z ?? 96)
      );

      TEAMS_DATA.forEach((team) => {
        const pos = new THREE.Vector3(
          mapPercentTo3DCoordinate(team.spatial3D.x),
          mapPercentTo3DCoordinate(team.spatial3D.y),
          mapPercentTo3DCoordinate(team.spatial3D.z)
        );

        const radius = team.id === 'arca-fuji' ? 5.5 : team.id === 'ryugu' ? 3.5 : 4.5;
        const sphereGeom = new THREE.SphereGeometry(radius, 24, 24);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(team.color),
          roughness: 0.2,
          metalness: 0.6,
          emissive: new THREE.Color(team.color),
          emissiveIntensity: team.id === 'arca-fuji' ? 0.6 : 0.3,
        });

        const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
        sphereMesh.position.copy(pos);
        rootGroup.add(sphereMesh);

        // Wireframe pulse halo around sphere
        const wireGeom = new THREE.IcosahedronGeometry(radius * 1.35, 1);
        const wireMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(team.color),
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        });
        const wireMesh = new THREE.Mesh(wireGeom, wireMat);
        wireMesh.position.copy(pos);
        rootGroup.add(wireMesh);

        // Drop line to floor (XZ plane at y = -50)
        const dropLinePoints = [pos, new THREE.Vector3(pos.x, -50, pos.z)];
        const dropGeom = new THREE.BufferGeometry().setFromPoints(dropLinePoints);
        const dropMat = new THREE.LineDashedMaterial({
          color: new THREE.Color(team.color),
          dashSize: 2,
          gapSize: 2,
          transparent: true,
          opacity: 0.35,
        });
        const dropLine = new THREE.Line(dropGeom, dropMat);
        dropLine.computeLineDistances();
        rootGroup.add(dropLine);

        // Trajectory arc connecting to Sado (except Sado itself and Ryugu)
        if (team.id !== 'arca-fuji' && team.id !== 'ryugu') {
          const curve = new THREE.QuadraticBezierCurve3(
            pos,
            new THREE.Vector3((pos.x + sadoVector.x) / 2, Math.max(pos.y, sadoVector.y) + 15, (pos.z + sadoVector.z) / 2),
            sadoVector
          );
          const arcPoints = curve.getPoints(24);
          const arcGeom = new THREE.BufferGeometry().setFromPoints(arcPoints);
          const arcMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(team.color),
            transparent: true,
            opacity: 0.45,
          });
          rootGroup.add(new THREE.Line(arcGeom, arcMat));
        }
      });
    }

    // 9. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && rootGroup && !isDraggingRef.current) {
        rootGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 10. Mouse Interaction (Orbit / Drag)
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !rootGroup) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!camera) return;
      camera.position.z += e.deltaY * 0.1;
      camera.position.z = Math.max(80, Math.min(300, camera.position.z));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [autoRotate, scope]);

  // Handle camera presets change
  useEffect(() => {
    if (!cameraRef.current || !groupRef.current) return;

    groupRef.current.rotation.set(0, 0, 0);

    if (cameraAngle === 'iso') {
      cameraRef.current.position.set(130, 90, 150);
    } else if (cameraAngle === 'xy') {
      cameraRef.current.position.set(0, 0, 190);
    } else if (cameraAngle === 'xz') {
      cameraRef.current.position.set(0, 190, 0);
    } else if (cameraAngle === 'yz') {
      cameraRef.current.position.set(190, 0, 0);
    }
    cameraRef.current.lookAt(0, 0, 0);
  }, [cameraAngle]);

  return (
    <div className="lg:col-span-8 relative bg-[#080d16] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl min-h-[460px] flex flex-col justify-between">
      {/* 3D Viewport Title Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono-code font-bold text-slate-200 tracking-wider">
            {scope === 'global' ? 'ESPAÇO TRIDIMENSIONAL: 11 FRENTES PLANETÁRIAS' : 'ESPAÇO TRIDIMENSIONAL: CONVERGÊNCIA SADO'}
          </span>
        </div>
        <p className="text-[11px] font-mono-code text-slate-400">
          WebGL Interativo • Arraste para orbitar • Roda do mouse para zoom
        </p>
      </div>

      {/* Axis Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2 text-[10px] font-mono-code pointer-events-none">
        <span className="px-2 py-1 rounded bg-[#0b131f]/90 border border-emerald-500/40 text-emerald-400 font-bold backdrop-blur-sm">
          Eixo X: Empatia / Saber Tradicional
        </span>
        <span className="px-2 py-1 rounded bg-[#0b131f]/90 border border-sky-500/40 text-sky-400 font-bold backdrop-blur-sm">
          Eixo Y: Biopoder / Dependência IA
        </span>
        <span className="px-2 py-1 rounded bg-[#0b131f]/90 border border-amber-500/40 text-amber-400 font-bold backdrop-blur-sm">
          Eixo Z: Resiliência &amp; Sobrevivência
        </span>
      </div>

      {/* Actual 3D Canvas mount element */}
      <div ref={mountRef} className="w-full h-[460px] sm:h-[500px] cursor-grab active:cursor-grabbing" />
    </div>
  );
};

