function normalizeAngle(angle: number): number {
    return (angle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
}

export {normalizeAngle}