import { SetMetadata } from '@nestjs/common';

export enum Color {
  BLACK,
  WHITE,
  RED,
  BLUE,
  YELLOW,
}

export const COLORS_KEY = 'colors';
export const Colors = (...colors: Color[]) => SetMetadata(COLORS_KEY, colors);
