import {IDisposable} from "./IDisposable";

class EventDispatcher<T> implements IDisposable {
    addHandler(handler: (arg: T) => void) {
        this._handlers.push(handler);
    }

    removeHandler(handler: (arg: T) => void) {
        const handlerIndex = this._handlers.indexOf(handler);
        this._handlers.splice(handlerIndex, 1);
    }

    dispatch(data?: T) {
        for (const handler of this._handlers) {
            handler(data);
        }
    }

    dispose() {
        this._handlers = [];
    }

    private _handlers: Array<(arg: T) => void> = [];
}

export {EventDispatcher};