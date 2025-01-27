//import { useTranslation } from 'react-i18next';
import type { FunctionComponent } from '../common/types';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls, Sky, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import floorTexture from '../assets/textures/5270.jpg';
import { Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import Model from '../components/objects/model';
import { useSceneStore } from '../store/scene-store';
import { v4 as uuidv4 } from 'uuid';

function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export const Whall = () => {
  return (
    <mesh position={[0, 0, -10]} rotation-x={-Math.PI / 2}>
      <boxGeometry args={[20, 0.1, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export const Whall2 = () => {
  return (
    <mesh position={[10, 0, 0]} rotation-x={-Math.PI / 2}>
      <boxGeometry args={[0.1, 20, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export const Ground = () => {
  const texture = useTexture(floorTexture);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <mesh position={[0, -5, 0]} rotation-x={-Math.PI / 2} receiveShadow={true}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="gray" map={texture} map-repeat={[10, 6]} />
    </mesh>
  );
};

export const Model3 = () => {
  const texture = useLoader(TextureLoader, '/src/assets/textures/map/map.jpg');

  const fbx2 = useLoader(FBXLoader, '/src/assets/models/bim_oven2.fbx');

  useEffect(() => {
    const material = new MeshStandardMaterial({
      color: 'white',
      roughness: 1,
      metalness: 1,
      map: texture,
      displacementScale: 0.05,
    });
    fbx2.traverse(function (child) {
      if (child instanceof Mesh) {
        child.material = material;
      }
    });
  }, [fbx2, texture]);

  return (
    <mesh>
      <primitive
        object={fbx2}
        color="red"
        scale={[0.05, 0.05, 0.05]}
        position={[-4, -3.5, -6]}
      />
    </mesh>
  );
};

export const Model2 = () => {
  const fbx = useLoader(FBXLoader, '/src/assets/models/model.fbx');
  const fbx1 = useLoader(FBXLoader, '/src/assets/models/model2.fbx');

  return (
    <>
      <mesh>
        <primitive
          object={fbx1}
          scale={[0.05, 0.05, 0.05]}
          position={[3, -2, -5]}
        />
      </mesh>
      <mesh>
        <primitive
          material=""
          object={fbx}
          color="red"
          scale={[0.05, 0.05, 0.05]}
          position={[3, -1, -6]}
        />
      </mesh>
    </>
  );
};

export const ScenePage = (): FunctionComponent => {
  //const { t, i18n } = useTranslation();
  //const onTranslateButtonClick = async (): Promise<void> => {};
  const sceneStore = useSceneStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [sceneSize, setSceneSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 },
  );

  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      const width: number = containerRef?.current.offsetWidth || 0;
      const height: number = containerRef?.current.offsetHeight || 0;
      setSceneSize({ width, height });
    }
  }, [containerRef.current]);
  useEffect(() => {
    sceneStore.addObject(uuidv4());
  }, []);

  useEffect(() => {
    //loadBlueprintTexture(stageRef.current?.options.)
    setMount(true);
    // console.log(stageRef.current.app);
  }, [stageRef.current]);

  return (
    <Layout>
      <div ref={containerRef} className="overflow-x-auto w-full h-full">
        <Canvas shadows onPointerMove={sceneStore.setMousePosition}>
          <pointLight position={[10, 10, 0]} intensity={1200} visible={true} />
          <ambientLight position={[10, 10, 10]} intensity={0.5} />
          <mesh>
            <Sky sunPosition={[100, 20, 100]} />
            {sceneStore.objects.map((obj) => (
              <Model id={obj} key={obj} />
            ))}
            <Model3 />
            <Whall />
            <Whall2 />
            <meshStandardMaterial />
            <Ground />
            <OrbitControls />
          </mesh>
        </Canvas>
      </div>
    </Layout>
  );
};
