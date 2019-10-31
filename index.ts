export {Vector} from "./lib/types";
export * from "./lib/operators";
import {ChainFunc, Vector} from "./lib/types";
import {vector} from "./lib/utils";

export function V(vect: Vector): (...functs: ChainFunc[]) => Vector {
    return (...functs: ChainFunc[]) => chain(vect, ...functs);
}

V.ector = vector;

function chain(v: Vector, ...functs: ChainFunc[]): Vector {
    return functs.reduce((result, func) => {
        return func(result);
    }, v);
}
