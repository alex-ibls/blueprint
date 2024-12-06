import { Container, Sprite, TilingSprite, useApp } from '@pixi/react';
import { Assets } from 'pixi.js';
import { useEffect } from 'react';

const loadBlueprint = async () => {
const texture = await Assets.load('/src/assets/textures/blueprint_gray.png');
};

export const PanelBoard = ({
  size,
}: {
  size: { width: number; height: number };
}) => {
  const app = useApp();

  useEffect(()=>{
    if(size.height && size.width){
        
    }
  },[size]);
  return (
    <Container position={[0, 0]} width={5000} height={5000}>
      <TilingSprite
        image={'/src/assets/textures/blueprint_gray.png'}
        width={5000}
        height={5000}
        tilePosition={{ x: 0, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />
    </Container>
  );
};
