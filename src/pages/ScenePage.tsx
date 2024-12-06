//import { useTranslation } from 'react-i18next';
import type { FunctionComponent } from '../common/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Assets, BlurFilter, TextStyle } from 'pixi.js';
import { Stage, _ReactPixi } from '@pixi/react';
import { PanelBoard } from '../components/panel-board';

export const ScenePage = (): FunctionComponent => {
  //const { t, i18n } = useTranslation();
  //const onTranslateButtonClick = async (): Promise<void> => {};

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [sceneSize, setSceneSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 },
  );

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
        width={5000}
        height={5000}
        options={{ background: 0xffffff,  resolution: 1 }}
      >
        <PanelBoard size={sceneSize} />
      </Stage>
    </div>
  );
};
