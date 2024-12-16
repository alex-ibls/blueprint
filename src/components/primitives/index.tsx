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
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.beginFill(props.color);
      g.drawRect(mouseX, mouseY, width, height);
      g.endFill();
    },
    [width, height],
  );

  const [drag, setDrag] = useState<boolean>(false);
  const [resize, setResize] = useState<ManipulatorDragEvent | null>(null);

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
    const cX = mouseX - mouseBind[0];
    const cY = mouseY - mouseBind[1];
    if (graphicsRef.current) {
      if (drag) {
        containerRef.current?.setTransform(cX, cY);
      }
      if (resize) {
        const _width =
          mouseX > resize.coords[0]
            ? resize.coords[0] + mouseX
            : resize.coords[0] - mouseX;
        const _height =
          mouseY > resize.coords[1]
            ? resize.coords[1] + mouseY
            : resize.coords[1] - mouseY;
        console.log(_width);
        console.log(_height);
        setWidth(_width);
        setHeight(_height);
      }
    }
  }, [props.mouseMove, drag, graphicsRef, resize]);

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
        <Manipulator
          x={currentX}
          y={currentY}
          width={width}
          height={height}
          mouseMove={props.mouseMove}
          onCornerDrag={(e) => {
            setResize(e);
          }}
          onCornerDragEnd={(e) => {
            setResize(null);
          }}
        />
      )}
    </Container>
  );
};
