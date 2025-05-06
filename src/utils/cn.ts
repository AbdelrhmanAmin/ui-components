import classNames, { type ArgumentArray } from "classnames";
import { twMerge } from "tailwind-merge";

export default function cn(...args: ArgumentArray) {
  return twMerge(classNames(args));
}