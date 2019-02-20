import {createVec2ByPolar, Vec2} from "./Vec2";

function normalizeAngle(angle: number): number {
    return (angle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
}

function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(val, max));
}

function toDegrease(angle: number): number {
    return 180 * angle / Math.PI;
}

function toRadians(angle: number): number {
    return angle / 180 * Math.PI;
}

function compareFloat(n1: number, n2: number) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

function reduceVector(vec: Vec2, reduceStep: number = 15): Vec2 {
    const angle = toDegrease(vec.angle());
    const reducedAngle = toRadians(Math.round(angle / reduceStep) * reduceStep);
    return createVec2ByPolar(reducedAngle, vec.radius());
}

function binarySearch(min: number, max: number, inRange: (start: number, end: number) => boolean): number {
    let prevValue = min;
    let value = Math.floor((max - min) / 2);
    while (value != prevValue) {
        if (inRange(min, value)) {
            max = value;
        }
        else {
            min = value;
        }
        prevValue = value;
        value = min + Math.floor((max - min) / 2);
    }
    return value;
}

export {
    normalizeAngle,
    clamp,
    toDegrease,
    toRadians,
    binarySearch,
    compareFloat,
    reduceVector,
}