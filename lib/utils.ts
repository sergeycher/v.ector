import {Vector} from "./types";

export function vector(v?: [number, number]): Vector;
export function vector(x: number, y: number): Vector;
export function vector(arg1?: number | [number, number], y?: number): Vector {
    let X = 0;
    let Y = 0;

    if (isFinite(+arg1) && y) {
        X = arg1 as number;
        Y = y;
    } else if (Array.isArray(arg1)) {
        [X, Y] = (arg1 as number[]) || [0, 0];
    }

    return [X, Y] as Vector;
}
