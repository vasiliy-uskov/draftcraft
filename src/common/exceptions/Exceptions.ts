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
        super("\n" + reason);
        this.code = code;
        this.messageId = messageId;
    }

    public readonly code: number;
    public readonly messageId?: string;
}

class HttpRequestFail extends BaseCustomError {
    constructor(reason: string, code: number, url: string) {
        super(`${url}\nBad http request "${reason}"`, code, getMessageId(code));
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