import { Dispatch } from 'react';

export type GourmetForm = {
  largeArea: string;
  middleArea: string;
  genre: string;
  keyword: string;
  wifi: number;
  freeDrink: number;
  freeFood: number;
};

export type Actions =
  | { type: 'UPDATE_LARGE_AREA'; payload: { largeArea: string } }
  | { type: 'UPDATE_MIDDLE_AREA'; payload: { middleArea: string } }
  | { type: 'UPDATE_GENRE'; payload: { genre: string } }
  | { type: 'UPDATE_KEYWORD'; payload: { keyword: string } }
  | { type: 'UPDATE_WIFI'; payload: { wifi: number } }
  | { type: 'UPDATE_FREE_DRINK'; payload: { freeDrink: number } }
  | { type: 'UPDATE_FREE_FOOD'; payload: { freeFood: number } };

export type Context = {
  gourmetForm: GourmetForm;
  dispatch: Dispatch<Actions>;
};
