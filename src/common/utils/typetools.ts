function verifyObject<T>(a: T): T {
    return verifyType(a, "object");
}

function verifyString<T>(a: T): T {
    return verifyType(a, "string");
}

function verifyBoolean<T>(a: T): T {
    return verifyType(a, "boolean");
}

function verifyNumber<T>(a: T): T {
    return verifyType(a, "number");
}

function verifyType<T>(a: T, type: string): T {
    if (typeof a == type) {
        return a;
    }
    throw new Error(`Unexpected type: ${typeof a}`);
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

function isFunction(a: any): boolean {
    return typeof a == "function";
}

export {verifyNumber, verifyBoolean, verifyObject, verifyString, isBool, isNumber, isString, isFunction};