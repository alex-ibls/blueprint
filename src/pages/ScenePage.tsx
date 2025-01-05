//import { useTranslation } from 'react-i18next';
import type { FunctionComponent } from '../common/types';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout';
import { Canvas } from '@react-three/fiber'
export const ScenePage = (): FunctionComponent => {
  //const { t, i18n } = useTranslation();
  //const onTranslateButtonClick = async (): Promise<void> => {};

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
    //loadBlueprintTexture(stageRef.current?.options.)
    setMount(true);
    // console.log(stageRef.current.app);
  }, [stageRef.current]);

  return (
    <Layout>
      <div ref={containerRef} className="overflow-x-auto w-full h-full" >
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </Layout>
  );
};
