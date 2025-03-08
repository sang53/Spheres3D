import { Color } from "three";

export function getRandomColor() {
  return new Color(Math.random(), Math.random(), Math.random());
}

export function getHexDiff(colour1: Color, colour2: Color) {
  return Math.abs(colour1.getHex() - colour2.getHex());
}
