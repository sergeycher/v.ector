import {ChainFunc, Vector} from "./types";
import {vector} from "./utils";

export function sub(vect: Vector): ChainFunc;
export function sub(vect: Vector, v2: Vector): Vector;
export function sub(vect: Vector, v2?: Vector): Vector | ChainFunc {
    if (arguments.length === 1) {
        return (v: Vector) => sub(v, vect);
    } else {
        return vect.map((v, i) => v - v2[i]) as Vector;
    }
}

export function add(vect: Vector): ChainFunc;
export function add(vect: Vector, v2: Vector): Vector;
export function add(vect: Vector, v2?: Vector): Vector | ChainFunc {
    if (arguments.length === 1) {
        return (v: Vector) => add(v, vect);
    } else {
        return vect.map((v, i) => v + v2[i]) as Vector;
    }
}

export function mul(value: number): ChainFunc;
export function mul(vec: Vector, value: number): Vector;
export function mul(arg1: Vector | number, value?: number): Vector | ChainFunc {
    if (arguments.length === 1) {
        return (v: Vector) => mul(v, arg1 as number);
    } else {
        return (arg1 as Vector).map((v, i) => v * value) as Vector;
    }
}

export function div(value: number): ChainFunc;
export function div(vec: Vector, value: number): Vector;
export function div(arg1: Vector | number, value?: number): Vector | ChainFunc {
    if (arguments.length === 1) {
        return (v: Vector) => div(v, value);
    } else {
        return (arg1 as Vector).map((v, i) => v / value) as Vector;
    }
}

export function abs(): ChainFunc;
export function abs(vec: Vector): Vector;
export function abs(vec?: Vector): Vector | ChainFunc {
    if (arguments.length === 1) {
        return vec.map((v) => Math.abs(v)) as Vector;
    } else {
        return (v) => abs(v);
    }
}

export function len(len: number): ChainFunc;
export function len(vec: Vector): number;
export function len(vec: Vector, length: number): Vector;
export function len(firstArg: Vector | number, length?: number): Vector | number | ChainFunc {
    if (arguments.length === 2) {
        return mul(norm(firstArg as Vector), length);
    } else {
        if (Number.isFinite(firstArg as number)) {
            return v => len(v, firstArg as number);
        } else {
            return Math.sqrt((firstArg as Vector).reduce((l, v) => l + v * v, 0));
        }
    }
}

export function norm(): ChainFunc;
export function norm(vec: Vector): Vector;
export function norm(vec?: Vector): Vector | ChainFunc {
    if (arguments.length === 1) {
        return len(vec) > 0 ? div(vec, len(vec)) : vector();
    } else {
        return (v) => norm(v);
    }
}

export function clamp(borders: [number, number]): ChainFunc;
export function clamp(vec: Vector, borders: [number, number]): Vector;
export function clamp(arg1: [number, number] | Vector, borders?: [number, number]): Vector | ChainFunc {
    if (arguments.length === 1) {
        return v => clamp(borders, v);
    } else {
        if (len(arg1 as Vector) > borders[1]) {
            return len(arg1 as Vector, borders[1]);
        }

        if (len(arg1 as Vector) < borders[0]) {
            return len(arg1 as Vector, borders[0]);
        }

        return arg1 as Vector;
    }
}
