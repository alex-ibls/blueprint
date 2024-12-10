import { Container, Graphics } from '@pixi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FederatedPointerEvent, Graphics as PixiGraphics } from 'pixi.js';
import { ManipulatorDragEvent, ManipulatorDragSide } from './manipulator';

const ManipulatorCorner = ({
  drawFunction,
  dragSide,
  mouseMove,
  x,
  y,
  width,
  height,
}: {
  drawFunction: (g: PixiGraphics) => void;
  dragSide: ManipulatorDragSide;
  mouseMove: [number, number];
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const [mouseX, setMouseX] = useState(x);
  const [mouseY, setMouseY] = useState(y);
  const [mouseBind, setMouseBind] = useState<[number, number]>([0, 0]);
  const [drag, setDrag] = useState<boolean>(false);

  const SetMouseBind = (e: FederatedPointerEvent) => {
    console.log('drag', e);
    if (ref.current) {
      const offsetX = e.clientX - ref.current?.getBounds().left + 8;
      const offsetY = e.clientY - ref.current?.getBounds().top + 8;
      setMouseBind([offsetX, offsetY]);
      setDrag(!drag);
    }
  };

  const ref = useRef<PixiGraphics>(null);
  useEffect(() => {
    setMouseX(mouseMove[0]);
    setMouseY(mouseMove[1]);
    if (drag && ref.current) {
      console.log(mouseMove);
      const cX = mouseX - mouseBind[0];
      const cY = mouseY - mouseBind[1];
      ref.current?.setTransform(cX, cY);
    }
  }, [mouseMove, drag, ref]);
  return (
    <Graphics
      draw={drawFunction}
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

export const Manipulator = ({
  x,
  y,
  width,
  height,
  mouseMove,
  onCornerDrag,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseMove: [number, number];
  onCornerDrag: (e: ManipulatorDragEvent) => void;
}) => {
  const selectedRef = useRef<PixiGraphics>(null);
  const refTl = useRef<PixiGraphics>(null);
  const refTr = useRef<PixiGraphics>(null);
  const refBr = useRef<PixiGraphics>(null);
  const refBl = useRef<PixiGraphics>(null);

  const CornerTL = useCallback((g: PixiGraphics) => {
    const color = [0, 0, 254, 1];
    g.beginFill(color);
    g.drawRect(x - 4, y - 4, 8, 8);
    g.endFill();
  }, []);

  const CornerTR = useCallback((g: PixiGraphics) => {
    const color = [0, 0, 254, 1];
    g.beginFill(color);
    g.drawRect(x + width - 4, y - 4, 8, 8);
    g.endFill();
  }, []);

  const CornerBR = useCallback((g: PixiGraphics) => {
    const color = [0, 0, 254, 1];
    g.beginFill(color);
    g.drawRect(x + width - 4, y + height - 4, 8, 8);
    g.endFill();
  }, []);

  const CornerBL = useCallback((g: PixiGraphics) => {
    const color = [0, 0, 254, 1];
    g.beginFill(color);
    g.drawRect(x - 4, y + height - 4, 8, 8);
    g.endFill();
  }, []);

  const selectedDraw = useCallback((g: PixiGraphics) => {
    const color = [0, 0, 254, 1];
    g.lineStyle(1, color);

    g.moveTo(x - 1, y - 1);
    g.lineTo(x + 1 + width, y - 1);
    g.lineTo(x + 1 + width, y + height + 1);
    g.lineTo(x - 1, y + height + 1);
    g.lineTo(x - 1, y - 1);
  }, []);

  useEffect(() => {}, [mouseMove]);

  return (
    <Container>
      <Graphics ref={selectedRef} draw={selectedDraw}></Graphics>
      <ManipulatorCorner
        drawFunction={CornerTL}
        x={x - 4}
        y={y - 4}
        height={height}
        width={width}
        dragSide={'TL'}
        mouseMove={mouseMove}
      />
      <ManipulatorCorner
        drawFunction={CornerTR}
        x={x + width - 4}
        y={y - 4}
        height={height}
        width={width}
        dragSide={'TR'}
        mouseMove={mouseMove}
      />
      <ManipulatorCorner
        drawFunction={CornerBR}
        x={x + width - 4}
        y={y + height - 4}
        height={height}
        width={width}
        dragSide={'BR'}
        mouseMove={mouseMove}
      />
      <ManipulatorCorner
        drawFunction={CornerBL}
        x={x - 4}
        y={y + height - 4}
        height={height}
        width={width}
        dragSide={'BL'}
        mouseMove={mouseMove}
      />
    </Container>
  );
};
