import {Toaster} from "../_common/components/toasts/Toaster";
import {Disposable} from "../_common/disposable/Disposable";
import {Messages} from "../_common/lng/Messages";
import {BaseCustomError} from "../_common/http/Exceptions";
import {PagesType} from "../_common/page/PagesType";
import {ErrorPage} from "./errorpage/ErrorPage";

class ServerErrorsHandler extends Disposable {
    constructor(messages: Messages) {
        super();
        this._messages = messages;
        this._addDisposable(this._toaster);
    }
    public handleError(error: BaseCustomError) {
        console.error(error);
        const message = error.messageId ? this._messages.getMessage(PagesType.Common, error.messageId) : "";
        if (error.code <  400) {
            this._toaster.showErrorToast(message);
        }
        this._errorPage.open(error.code, message);
    }

    private _messages: Messages;
    private _toaster: Toaster = new Toaster(document.getElementById("toasts-container") as HTMLElement);
    private _errorPage: ErrorPage = new ErrorPage(document.getElementById("error-page") as HTMLElement);
}

export {ServerErrorsHandler};