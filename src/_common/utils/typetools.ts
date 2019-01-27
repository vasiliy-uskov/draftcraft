function verifyObject<T>(a: T): Object {
    return verifyType(a, "object") as any as Object;
}

function verifyString<T>(a: T): string {
    return verifyType(a, "string") as any as string;
}

function verifyBoolean<T>(a: T): boolean {
    return verifyType(a, "boolean") as any as boolean;
}

function verifyNumber<T>(a: T): number {
    const numb = verifyType(a, "number") as any as number;
    if (isNaN(numb)) {
        throw new Error("Unexpected not a number number");
    }
    return numb;
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

function verify<T>(a: T) {
    if (a) {
        return a;
    }
    throw new Error(`Verify fail`);
}

export {verify, verifyNumber, verifyBoolean, verifyObject, verifyString, isBool, isNumber, isString, isFunction};