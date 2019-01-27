import {HttpRequestFail, RequestAbortedError, TimeoutRequestFail, UnrecognizedHttpRequestError, WrongAnswerDataType} from "./Exceptions";

enum RequestType {
    POST = "POST",
    GET = "GET",
}

class AjaxHelper {
    public static post(url: string, data: Object): Promise<Object> {
        return AjaxHelper.request(RequestType.POST, url, data);
    }

    public static get(url: string, data: Object): Promise<Object> {
        return AjaxHelper.request(RequestType.GET, url, data);
    }

    private static request(requestType: RequestType, url: string, data: Object): Promise<Object> {
        return new Promise((resolve: (data: Object) => void, reject: (err: HttpRequestFail) => void) => {
            const xhr = new XMLHttpRequest();
            xhr.open(requestType, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            let loadHandler: () => void;
            let baseErrHandler: (err: HttpRequestFail) => void;
            let errHandler = () => baseErrHandler(new UnrecognizedHttpRequestError(xhr.status, url));
            let abortHandler = () => baseErrHandler(new RequestAbortedError(xhr.status, url));
            let timeoutHandler = () => baseErrHandler(new TimeoutRequestFail(xhr.status, url));
            const removeHandlers = () => {
                xhr.removeEventListener("error", errHandler);
                xhr.removeEventListener("abort", abortHandler);
                xhr.removeEventListener("timeout", timeoutHandler);
                xhr.removeEventListener("load", loadHandler);
            };
            baseErrHandler = (err: HttpRequestFail) => {
                removeHandlers();
                reject(err);
            };
            loadHandler = () => {
                removeHandlers();
                if (Math.floor(xhr.status / 100) != 2) {
                    reject(new UnrecognizedHttpRequestError(xhr.status, url));
                }
                if (xhr.responseText === "") {
                    resolve({});
                }
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                }
                catch {
                    reject(new WrongAnswerDataType(xhr.responseText, url));
                }
                if (data) {
                    resolve(data);
                }
            };

            xhr.addEventListener("error", errHandler);
            xhr.addEventListener("abort", abortHandler);
            xhr.addEventListener("timeout", timeoutHandler);
            xhr.addEventListener("load", loadHandler);
            xhr.send(JSON.stringify(data));
        })
    }
}

export {AjaxHelper};