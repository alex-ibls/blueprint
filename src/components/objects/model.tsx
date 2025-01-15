import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
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

  const [selected, select] = useState(false);
  const [object, setObject] = useState<THREE.Group>();

  useEffect(() => {
    //console.info('mouse position', sceneStore.mousePosition);
  }, [sceneStore.mousePosition]);

  useEffect(() => {
    if (sceneStore.selectedObject !== id) {
      select(false);
    }
  }, [sceneStore.selectedObject]);

  useEffect(() => {
    if (selected && object) {
      sceneStore.selectObject(id);
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
    <mesh castShadow receiveShadow onClick={() => select(!selected)}>
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
