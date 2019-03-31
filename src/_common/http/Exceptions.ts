interface ICustomError {
	readonly code: number;
}

class BaseCustomError implements ICustomError {
	constructor(message: string, code: number, stack?: string) {
		this.message = message;
		this.code = code;
		this.stack = stack;
	}

	public toString(): string {
		return `Error ${this.code}: ${this.message}${this.stack ? `\n${this.stack}` : ''}`;
	}

	public readonly message: string;
	public readonly stack?: string;
	public readonly code: number;
}

class HttpRequestFail extends BaseCustomError {
	constructor(message: string, code: number, url: string) {
		super(`${url}\nBad http request "${message}"`, code);
	}
}

class WrongAnswerDataType extends HttpRequestFail {
	constructor(data: string, url: string) {
		super(`wrong answer data type: ${data}`, 500, url);
	}
}

class UnrecognizedHttpRequestError extends HttpRequestFail {
	constructor(code: number, url: string, message: string = "") {
		super(message, code, url);
	}
}

class RequestAbortedError extends HttpRequestFail {
	constructor(code: number, url: string) {
		super("request abort", code, url);
	}
}

class TimeoutRequestFail extends HttpRequestFail {
	constructor(code: number, url: string) {
		super("timeout", code, url);
	}
}

class ValidationError extends BaseCustomError {
	constructor(err: Error, message: string) {
		super(`ValidationFail: ${message}`, 500, err.stack);
	}
}

export {
	ICustomError,
	HttpRequestFail,
	WrongAnswerDataType,
	UnrecognizedHttpRequestError,
	RequestAbortedError,
	TimeoutRequestFail,
	ValidationError
}