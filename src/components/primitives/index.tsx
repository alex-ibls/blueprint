import { Container, Graphics } from '@pixi/react';
import {
  ColorSource,
  FederatedPointerEvent,
  Graphics as PixiGraphics,
} from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Manipulator } from '../manipulator';
import { ManipulatorDragEvent } from '../manipulator/manipulator';

export const RectanglePrm = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  color: ColorSource;
  mouseMove: [number, number];
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState(props.x);
  const [mouseY, setMouseY] = useState(props.y);

  const [currentX, setCurrentX] = useState(props.x);
  const [currentY, setCurrentY] = useState(props.x);
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const [mouseBind, setMouseBind] = useState<[number, number]>([0, 0]);
  const draw = useCallback((g: PixiGraphics) => {
    g.beginFill(props.color);
    g.drawRect(mouseX, mouseY, width, height);
    g.endFill();
  }, []);

  const [drag, setDrag] = useState<boolean>(false);

  const containerRef = useRef<PixiGraphics>(null);
  const graphicsRef = useRef<PixiGraphics>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current);
    }
  }, [containerRef.current]);

  const SetMouseBind = (e: FederatedPointerEvent) => {
    if (containerRef.current) {
      const offsetX = e.clientX - containerRef.current?.getBounds().left + 10;
      const offsetY = e.clientY - containerRef.current?.getBounds().top + 10;
      setMouseBind([offsetX, offsetY]);
      setDrag(!drag);
      setSelected(true);
    }
  };

  
  useEffect(() => {
    setMouseX(props.mouseMove[0]);
    setMouseY(props.mouseMove[1]);
    if (drag && graphicsRef.current) {
      console.log(props.mouseMove);
      const cX = mouseX - mouseBind[0];
      const cY = mouseY - mouseBind[1];
      containerRef.current?.setTransform(cX, cY);
    }
  }, [props.mouseMove, drag, graphicsRef]);

  return (
    <Container ref={containerRef}>
      <Graphics
        ref={graphicsRef}
        draw={draw}
        interactive={true}
        pointerdown={(e) => {
          SetMouseBind(e);
        }}
        pointerup={() => {
          setDrag(false);
        }}
      />
      {selected && (
        <Container>
          <Manipulator
            x={currentX}
            y={currentY}
            width={width}
            height={height}
            mouseMove={props.mouseMove}
            onCornerDrag={(e) => {}}
          />
        </Container>
      )}
    </Container>
  );
};
