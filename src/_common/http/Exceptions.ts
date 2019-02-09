interface ICustomError {
    readonly code: number;
}

class BaseCustomError extends Error implements ICustomError {
    constructor(reason: string, code: number) {
        super("\n" + reason);
        this.code = code;
    }

    public readonly code: number;
}

class HttpRequestFail extends BaseCustomError {
    constructor(reason: string, code: number, url: string) {
        super(`${url}\nBad http request "${reason}"`, code);
    }
}

class WrongAnswerDataType extends HttpRequestFail {
    constructor(data: string, url: string) {
        super(`wrong answer data type: ${data}`, 500, url);
    }
}

class UnrecognizedHttpRequestError extends HttpRequestFail {
    constructor(code: number, url: string) {
        super("error", code, url);
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
    constructor(message: string) {
        super(`ValidationFail: ${message}`, 500);
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