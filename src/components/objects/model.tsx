import { useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import { useSceneStore } from '../../store/scene-store';
import { TransformControls } from '@react-three/drei';

export type ModelObjectProps = {
  id: string;
};

const Model = ({ id }: ModelObjectProps) => {
  const sceneStore = useSceneStore();
  const modelRef = useRef<any>(null);
  const [selected, select] = useState(false);
  const [object, setObject] = useState<THREE.Group>();

  useEffect(() => {
    if (selected) {
      let windowHalfX = window.innerWidth / 2;
      let windowHalfY = window.innerHeight / 2;
      console.log(windowHalfX);
      console.info('mouse position', sceneStore.mousePosition);
      console.log(modelRef.current);
      modelRef.current.position.x +=
        (sceneStore.mousePosition.x - windowHalfX) * 0.005;
      modelRef.current.position.z +=
        (sceneStore.mousePosition.y - windowHalfY) * 0.005;
    }
  }, [sceneStore.mousePosition]);

  useEffect(() => {
    if (sceneStore.selectedObject !== id) {
      select(false);
    }
  }, [sceneStore.selectedObject]);

  useEffect(() => {
    if (selected && object) {
      sceneStore.selectObject(id);
      sceneStore.beginDrag();
    }
  }, [selected, object]);

  const obj = useLoader(OBJLoader, '/src/assets/models/shelf_obj.obj');
  const texture = useLoader(TextureLoader, '/src/assets/textures/wood-9.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  useEffect(() => {
    const material = new MeshStandardMaterial({
      color: 'white',
      roughness: 1,
      metalness: 1,
      map: texture,
      displacementScale: 1,
    });
    obj.traverse(function (child) {
      if (child instanceof Mesh) {
        child.material = material;
      }
    });
    if (obj) {
      setObject(obj);
    }
  }, [obj, texture]);
  return (
    <mesh
      castShadow
      receiveShadow
      onClick={() => select(!selected)}
      ref={modelRef}
    >
      <primitive
        object={obj}
        color="gray"
        scale={[0.008, 0.008, 0.008]}
        position={[0, -5, -6]}
      />
    </mesh>
  );
};

export default Model;
