function verifyObject<T>(a: T): Object {
	return verifyType(a, "object") as any as Object;
}

function verifyArray(a: any): Array<any> {
	if (Array.isArray(a)) {
		return a as Array<any>;
	}
	throw new Error(`Unexpected type: ${typeof a}`);
}

function verifyString(a: any): string {
	return verifyType(a, "string") as string;
}

function verifyBoolean(a: any): boolean {
	return verifyType(a, "boolean") as boolean;
}

function verifyNumber(a: any): number {
	const numb = verifyType(a, "number") as number;
	if (isNaN(numb)) {
		throw new Error("Unexpected not a number number");
	}
	return numb;
}

function verifyType(a: any, type: string): any {
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

function isNull(a: any): boolean {
	return a === null;
}

function verify<T>(a: T) {
	if (a) {
		return a;
	}
	throw new Error(`Verify fail`);
}

export {
	verify,
	verifyNumber,
	verifyBoolean,
	verifyString,
	verifyObject,
	verifyArray,
	isNull,
	isBool,
	isNumber,
	isString,
	isFunction
};