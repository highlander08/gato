import { COLORS } from './constants';

export type Color = typeof COLORS[number];

export enum AppState {
  HOME,
  PLAYING,
  RESULT,
}

export enum CatState {
  SUPERPOSITION,
  ALIVE,
  DEAD,
}
