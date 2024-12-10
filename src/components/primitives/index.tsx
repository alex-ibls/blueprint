import { Graphics } from '@pixi/react';
import {
  ColorSource,
  FederatedPointerEvent,
  Graphics as PixiGraphics,
} from 'pixi.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const RectanglePrm = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  color: ColorSource;
  mouseMove: [number, number];
}) => {
  const [mouseX, setMouseX] = useState(props.x);
  const [mouseY, setMouseY] = useState(props.y);
  const [mouseBind, setMouseBind] = useState<[number, number]>([0, 0]);
  const draw = useCallback((g: PixiGraphics) => {
    g.beginFill(props.color);
    g.drawRect(mouseX, mouseY, props.width, props.height);
    g.endFill();
  }, []);

  const [drag, setDrag] = useState<boolean>(false);

  const ref = useRef<PixiGraphics>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
    }
  }, [ref.current]);

  const SetMouseBind = (e: FederatedPointerEvent) => {
    console.log(e);
    if (ref.current) {
      const offsetX = e.clientX - ref.current?.getBounds().left;
      const offsetY = e.clientY - ref.current?.getBounds().top;
      setMouseBind([offsetX, offsetY]);
      setDrag(!drag);
    }
  };

  useEffect(() => {
    setMouseX(props.mouseMove[0]);
    setMouseY(props.mouseMove[1]);
    if (drag) {
      console.log(props.mouseMove);

      ref.current?.setTransform(mouseX - mouseBind[0], mouseY - mouseBind[1]);
    }
  }, [props.mouseMove, drag, ref]);

  return (
    <Graphics
      draw={draw}
      ref={ref}
      interactive={true}
      pointerdown={(e) => {
        SetMouseBind(e);
      }}
      pointerup={() => {
        setDrag(false);
      }}
    />
  );
};
