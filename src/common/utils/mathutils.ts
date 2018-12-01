function normalizeAngle(angle: number): number {
    return (angle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
}

function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(val, max));
}

export {normalizeAngle, clamp}