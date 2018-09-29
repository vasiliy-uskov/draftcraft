function verify<T>(a: T | null): T {
    if (a) {
        return a;
    }
    throw new Error("Unexpected null");
}

export {verify};