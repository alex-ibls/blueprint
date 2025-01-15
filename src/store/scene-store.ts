import * as THREE from 'three';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { logger } from './logger';
import { produce } from 'immer';
export const GLOBAL_STORE_KEY: string = 'pvz-track-global-store';

export interface SceneState {
  mousePosition: THREE.Vector2;
  selectedObject: any;
  dragging: boolean;
  objects: string[];
}

export interface SceneActions {
  setMousePosition: (event: any) => void;
  selectObject: (id: any) => void;
  beginDrag: () => void;
  stopDrag: () => void;
  addObject: (id: any) => void;
  removeObject: (id: any) => void;
}

type SceneStore = SceneState & SceneActions;

const INITIAL_STATE: SceneState = {
  mousePosition: new THREE.Vector2(0, 0),
  selectedObject: null,
  dragging: false,
  objects: [],
};

const middlewares = (f: StateCreator<SceneStore>) =>
  devtools(
    persist(logger(f), {
      name: GLOBAL_STORE_KEY,
      storage: createJSONStorage(() => localStorage),
    }),
  );

const storeCreator = middlewares((set) => ({
  ...INITIAL_STATE,

  setMousePosition: (event: MouseEvent) =>
    set(
      produce<SceneState>((state) => {
        state.mousePosition = new THREE.Vector2(event.clientX, event.clientY);
      }),
    ),
  selectObject: (id) => set({ selectedObject: id }),
  beginDrag: () => set({ dragging: true }),
  stopDrag: () => set({ dragging: false }),
  addObject: (id) =>
    set(
      produce<SceneState>((state) => {
        state.objects.push(id);
      }),
    ),
  removeObject: (id) =>
    set(
      produce<SceneState>((state) => {
        const objectIndex = state.objects.findIndex((_obj) => _obj === id);
        state.objects.splice(objectIndex, 1);
      }),
    ),
}));

export const useSceneStore = create(storeCreator);
