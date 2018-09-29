import {EventDispatcher} from "./EventDispatcher";
import {IDisposable} from "./IDisposable";

class Disposable {
    public dispose() {
        this._destruct();
        for (const dependentObject of this._dependentObjects) {
            dependentObject.dispose()
        }
        delete this._dependentObjects;
        for (const handlerCleaner of this._handlerCleaners) {
            handlerCleaner();
        }
        delete this._handlerCleaners;
    }

    protected _destruct() {}

    /** @final */
    protected _createEventDispatcher<T>(): EventDispatcher<T> {
        const dispatcher = new EventDispatcher<T>();
        this._addDisposable(dispatcher);
        return dispatcher;
    }

    /** @final */
    protected _addDisposable(dependentObject: IDisposable) {
        this._dependentObjects.push(dependentObject);
    }

    /** @final */
    protected _addHandler<T>(event: EventDispatcher<T>, handler: (arg: T) => void): number /*event id*/ {
        event.addHandler(handler);
        const handlerCleanerId = this._handlerCleaners.length;
        this._handlerCleaners.push(() => {
            event.removeHandler(handler);
        });
        return handlerCleanerId;
    }

    /** @final */
    protected _removeHandler(eventId: number) {
        if (!this._handlerCleaners.hasOwnProperty(eventId)) {
            throw new Error(`No event with id ${eventId}`);
        }
        this._handlerCleaners[eventId]();
        delete this._handlerCleaners[eventId];
    }

    private _handlerCleaners: Array<() => void> = [];
    private _dependentObjects: Array<IDisposable> = [];
}

export {Disposable}