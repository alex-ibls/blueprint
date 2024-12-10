export type ManipulatorDragSide = 'TL' | 'TR' | 'BL' | 'BR' | null;
export type ManipulatorDragEvent = {
  type: ManipulatorDragSide;
  coords: [number, number];
};
