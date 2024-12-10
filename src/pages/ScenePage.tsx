//import { useTranslation } from 'react-i18next';
import type { FunctionComponent } from '../common/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Graphics, Stage, _ReactPixi } from '@pixi/react';
import { PanelBoard } from '../components/panel-board';
import { RectanglePrm } from '../components/primitives';
import Layout from '../components/layout';

export const ScenePage = (): FunctionComponent => {
  //const { t, i18n } = useTranslation();
  //const onTranslateButtonClick = async (): Promise<void> => {};

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [sceneSize, setSceneSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 },
  );

  const [mount, setMount] = useState<boolean>(false);
  const [mouseMove, setMouseMove] = useState<[number, number]>([0, 0]);
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
        <div ref={containerRef} className='overflow-x-auto'>
          <Stage
            ref={stageRef}
            width={5000}
            height={5000}
            options={{ background: 0xffffff, resolution: 1, antialias: true }}
            onMouseMove={(e) => {
              setMouseMove([e.clientX, e.clientY]);
            }}
          >
            <PanelBoard size={sceneSize} />

            <RectanglePrm
              x={10}
              y={10}
              width={100}
              height={100}
              color={0xff00ff}
              mouseMove={mouseMove}
            />
          </Stage>
        </div>
    </Layout>
  );
};
