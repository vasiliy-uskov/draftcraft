import {ICustomError} from "../_common/http/Exceptions";
import {IErrorDispatcher} from "./IErrorDispatcher";
import {IErrorHandler} from "./model/IErrorHandler";

class ErrorsHandlersQueue implements IErrorDispatcher, IErrorHandler {
    public addErrorHandler(handler: (err: ICustomError) => void) {
        this._lastError && handler(this._lastError);
        this._errorHandlers.push(handler);
    }

    public handleError(err: ICustomError) {
        for (const handelFn of this._errorHandlers) {
            handelFn(err);
        }
        this._lastError = err;
        throw err;
    }

    private _lastError: ICustomError|null = null;
    private _errorHandlers: Array<(err: ICustomError) => void> = [];
}

export {ErrorsHandlersQueue};