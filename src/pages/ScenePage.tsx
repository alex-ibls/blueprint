//import { useTranslation } from 'react-i18next';
import type { FunctionComponent } from '../common/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Assets, BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text, _ReactPixi, useApp } from '@pixi/react';

const loadBlueprintTexture = async (sceneSize: any) => {};

export const ScenePage = (): FunctionComponent => {
  //const { t, i18n } = useTranslation();
  //const onTranslateButtonClick = async (): Promise<void> => {};
  const app = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [sceneSize, setSceneSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 },
  );
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  useEffect(() => {
    if (containerRef.current) {
      const width: number = containerRef?.current.offsetWidth || 0;
      const height: number = containerRef?.current.offsetHeight || 0;
      setSceneSize({ width, height });
      console.log({ width, height });
    }
  }, [containerRef.current]);

  useEffect(() => {
    //loadBlueprintTexture(stageRef.current?.options.)
    console.log(stageRef.current.app);
  }, [stageRef.current?.app?.stage]);

  return (
    <div
      className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center"
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={sceneSize.width}
        height={sceneSize.height}
        options={{ background: 0xffffff, resizeTo: window }}
      >
        {' '}
        <Container position={[0, 0]}
		
		></Container>
      </Stage>
    </div>
  );
};
