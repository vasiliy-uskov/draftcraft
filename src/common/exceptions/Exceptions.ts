class BaseCustomError extends Error {
    constructor(reason: string, code: number, messageId?: string) {
        super(reason);
        this.code = code;
        this.messageId = messageId;
    }

    public readonly code: number;
    public readonly messageId?: string;
}

class HttpRequestFail extends BaseCustomError {
    constructor(reason: string, code: number, messageId?: string) {
        super(`Bad http request ${reason}`, code, messageId);
    }
}

class WrongAnswerDataType extends HttpRequestFail {
    constructor() {
        super("Wrong answer data type", 500, "serverIsNotResponse");
    }
}

class UnrecognizedHttpRequestError extends HttpRequestFail {
    constructor(status: number) {
        super("Error", status, "serverIsNotResponse");
    }
}

class RequestAbortedError extends HttpRequestFail {
    constructor() {
        super("Request abort", 300, null);
    }
}

class TimeoutRequestFail extends HttpRequestFail {
    constructor() {
        super("Timeout", 300, null);
    }
}

class IncorrectRequestParams extends BaseCustomError {
    constructor() {
        super("Incorrect request params", 400, "sessionFailed");
    }
}

class ValidationError extends BaseCustomError {
    constructor(message: string) {
        super(`ValidationFail: ${message}`, 500, "serverIsNotResponse");
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