import {Component} from "../component/Component";
import {Toast, ToastType} from "./Toast";

class Toaster extends Component {
    constructor(container: HTMLElement) {
        super({
            baseElement: container,
            blockName: "toaster",
        });
    }

    public showErrorToast(message: string) {
        this._createToast(ToastType.error, message).show();
    }

    private _createToast(type: ToastType, message: string): Toast {
        const newToast = new Toast(type, message);
        this._addDisposable(newToast);
        this._addHandlerCallOnce(newToast.hideEvent(), () => {
            this.removeChild(newToast);
            this._removeDisposable(newToast);
        });
        this.insertChild(newToast, 0);
        return newToast;
    }
}

export {Toaster}