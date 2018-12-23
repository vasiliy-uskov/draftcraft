import {IDisposable} from "./IDisposable";
class EventDispatcher<T> implements IDisposable {
    constructor(eventOwner: IDisposable) {
        this._eventOwner = eventOwner;
    }

    public addHandler(handler: (arg: T) => void) {
        this._handlers.add(handler);
    }

    public removeHandler(handler: (arg: T) => void) {
        this._handlers.delete(handler);
    }

    public dispatch(data: T) {
        for (const handler of this._handlers.values()) {
            handler(data);
        }
    }

    public eventOwner(): IDisposable {
        return this._eventOwner;
    }

    public dispose() {
        this._handlers = new Set();
    }

    private _handlers: Set<(arg: T) => void> = new Set();
    private _eventOwner: IDisposable;
}

export {EventDispatcher};