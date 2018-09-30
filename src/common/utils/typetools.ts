function verify<T>(a: T | null): T {
    if (a) {
        return a;
    }
    throw new Error("Unexpected null");
}

function isBool(a: any): boolean {
    return typeof a == "boolean";
}

function isNumber(a: any): boolean {
    return typeof a == "number";
}

function isString(a: any): boolean {
    return typeof a == "string";
}

export {verify, isBool, isNumber, isString};