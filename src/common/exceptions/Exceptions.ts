function getMessageId(status: number): string|null {
    switch (Math.floor(status / 100) * 100) {
        case 400:
            return "sessionFailed";
        case 500:
            return "serverIsNotResponse";
    }
    return null
}

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
    constructor(reason: string, code: number) {
        super(`Bad http request ${reason}`, code, getMessageId(code));
    }
}

class WrongAnswerDataType extends HttpRequestFail {
    constructor() {
        super("Wrong answer data type", 500);
    }
}

class UnrecognizedHttpRequestError extends HttpRequestFail {
    constructor(code: number) {
        super("Error", code);
    }
}

class RequestAbortedError extends HttpRequestFail {
    constructor(code: number) {
        super("Request abort", code);
    }
}

class TimeoutRequestFail extends HttpRequestFail {
    constructor(code: number) {
        super("Timeout", code);
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
    ValidationError
}