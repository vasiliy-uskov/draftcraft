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

export {normalizeAngle, clamp, toDegrease, toRadians}