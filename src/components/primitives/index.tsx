import { Container, Graphics } from '@pixi/react';
import {
  ColorSource,
  FederatedPointerEvent,
  Graphics as PixiGraphics,
} from 'pixi.js';
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  const [currentY, setCurrentY] = useState(props.y);

  const [mouseBind, setMouseBind] = useState<[number, number]>([0, 0]);
  const draw = useCallback((g: PixiGraphics) => {
    g.beginFill(props.color);
    g.drawRect(mouseX, mouseY, props.width, props.height);
    g.endFill();
  }, []);

  const selectedDraw = useCallback(
    (g: PixiGraphics) => {
      g.lineStyle(1, props.color);
      g.moveTo(props.x - 10, props.y - 10);
      g.lineTo(props.x + 10 + props.width, props.y - 10);
      g.endFill();
    },

    [],
  );

  const [drag, setDrag] = useState<boolean>(false);

  const containerRef = useRef<PixiGraphics>(null);
  const graphicsRef = useRef<PixiGraphics>(null);
  const selectedRef = useRef<PixiGraphics>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current);
    }
  }, [containerRef.current]);

  const SetMouseBind = (e: FederatedPointerEvent) => {
    if (containerRef.current) {
      const offsetX = e.clientX - containerRef.current?.getBounds().left;
      const offsetY = e.clientY - containerRef.current?.getBounds().top;
      setMouseBind([offsetX, offsetY]);
      setDrag(!drag);
      setSelected(!selected);
    }
  };

  useEffect(() => {
    setMouseX(props.mouseMove[0]);
    setMouseY(props.mouseMove[1]);
    if (drag && graphicsRef.current) {
      console.log(props.mouseMove);
      const cX = mouseX - mouseBind[0];
      const cY = mouseY - mouseBind[1];
      setCurrentX(graphicsRef.current.x);
      setCurrentY(graphicsRef.current.y);
      containerRef.current?.setTransform(cX, cY);
    }
  }, [props.mouseMove, drag, graphicsRef]);

  return (
    <Container ref={containerRef}>
      {selected && (
        <Graphics ref={selectedRef} draw={selectedDraw}></Graphics>
      )}
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
    </Container>
  );
};
