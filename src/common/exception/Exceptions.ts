class BaseCustomError extends Error {
    constructor(reason: string, code: number) {
        super(reason);
        this.code = code;
    }

    public readonly code: number;
}

class HttpRequestFail extends BaseCustomError {
    constructor(reason: string, code: number) {
        super(`Bad http request ${reason}`, code);
    }
}

class WrongAnswerDataType extends HttpRequestFail {
    constructor() {
        super("Wrong answer data type", 500);
    }
}

class UnrecognizedHttpRequestError extends HttpRequestFail {
    constructor(status: number) {
        super("Error", status);
    }
}

class RequestAbortedError extends HttpRequestFail {
    constructor() {
        super("Request abort", 300);
    }
}

class TimeoutRequestFail extends HttpRequestFail {
    constructor() {
        super("Timeout", 300);
    }
}

class IncorrectRequestParams extends BaseCustomError {
    constructor() {
        super("Incorrect request params", 400);
    }
}

class ValidationError extends BaseCustomError {
    constructor(message: string) {
        super(`ValidationFail: ${message}`, 500);
    }
}

export {
    BaseCustomError,
    HttpRequestFail,
    WrongAnswerDataType,
    UnrecognizedHttpRequestError,
    RequestAbortedError,
    TimeoutRequestFail,
    IncorrectRequestParams,
    ValidationError
}