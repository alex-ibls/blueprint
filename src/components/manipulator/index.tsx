import { Container, Graphics } from '@pixi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Graphics as PixiGraphics } from 'pixi.js';
import { ManipulatorDragEvent, ManipulatorDragSide } from './manipulator';

const ManipulatorCorner = ({
  drawFunction,
  dragSide,
  x,
  y,
  width,
  height,
  onDragStart,
  onDragEnd,
}: {
  drawFunction: (g: PixiGraphics) => void;
  dragSide: ManipulatorDragSide;
  x: number;
  y: number;
  width: number;
  height: number;
  onDragStart: () => void;
  onDragEnd?: () => void;
}) => {
  const [drag, setDrag] = useState<boolean>(false);

  useEffect(() => {
    if (drag) {
      onDragStart();
    } else {
      onDragEnd && onDragEnd();
    }
  }, [drag]);

  const ref = useRef<PixiGraphics>(null);

  return (
    <Graphics
      draw={drawFunction}
      ref={ref}
      interactive={true}
      pointerdown={() => {
        setDrag(!drag);
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
  onCornerDragEnd,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseMove: [number, number];
  onCornerDrag: (e: ManipulatorDragEvent) => void;
  onCornerDragEnd: (e: ManipulatorDragEvent) => void;
}) => {
  const selectedRef = useRef<PixiGraphics>(null);
  const containerRef = useRef<PixiGraphics>(null);

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
    <Container ref={containerRef}>
      <Graphics ref={selectedRef} draw={selectedDraw}></Graphics>
      <ManipulatorCorner
        drawFunction={CornerTL}
        x={x - 4}
        y={y - 4}
        height={height}
        width={width}
        dragSide={'TL'}
        onDragStart={() => onCornerDrag({ type: 'TL', coords: mouseMove })}
        onDragEnd={() => onCornerDragEnd({ type: 'TL', coords: mouseMove })}
        
      />
      <ManipulatorCorner
        drawFunction={CornerTR}
        x={x + width - 4}
        y={y - 4}
        height={height}
        width={width}
        dragSide={'TR'}
        onDragStart={() => onCornerDrag({ type: 'TR', coords: mouseMove })}
        onDragEnd={() => onCornerDragEnd({ type: 'TR', coords: mouseMove })}
      />
      <ManipulatorCorner
        drawFunction={CornerBR}
        x={x + width - 4}
        y={y + height - 4}
        height={height}
        width={width}
        dragSide={'BR'}
        onDragStart={() => onCornerDrag({ type: 'BR', coords: mouseMove })}
        onDragEnd={() => onCornerDragEnd({ type: 'BR', coords: mouseMove })}
      />
      <ManipulatorCorner
        drawFunction={CornerBL}
        x={x - 4}
        y={y + height - 4}
        height={height}
        width={width}
        dragSide={'BL'}
        onDragStart={() => onCornerDrag({ type: 'BL', coords: mouseMove })}
        onDragEnd={() => onCornerDragEnd({ type: 'BL', coords: mouseMove })}
      />
    </Container>
  );
};
