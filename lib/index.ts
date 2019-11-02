export {Vector} from "./types";
export * from "./operators";
import {ChainFunc, Vector} from "./types";
import {vector} from "./utils";

export function V(vect: Vector): (...functs: ChainFunc[]) => Vector {
    return (...functs: ChainFunc[]) => chain(vect, ...functs);
}

V.ector = vector;

function chain(v: Vector, ...functs: ChainFunc[]): Vector {
    return functs.reduce((result, func) => {
        return func(result);
    }, v);
}
