import {ICustomError} from "../_common/http/Exceptions";

interface IErrorDispatcher {
    addErrorHandler(handler: (err: ICustomError) => void): void;
}

export {IErrorDispatcher};