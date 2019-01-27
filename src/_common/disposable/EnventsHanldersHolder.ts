import {EventDispatcher} from "./EventDispatcher";

class EventsHandlersHolder {
    addHandler<T>(event: EventDispatcher<T>, handler: (arg: T) => void, id: number) {
        event.addHandler(handler);
        this._handlersCleaner.set(id, () => event.removeHandler(handler));
    }

    removeHandler(id: number) {
        if (this._handlersCleaner.has(id)) {
            this._handlersCleaner.get(id)();
            this._handlersCleaner.delete(id);
        }
    }

    clean() {
        for (const handlerCleaner of this._handlersCleaner.values()) {
            handlerCleaner();
        }
        this._handlersCleaner.clear();
    }

    private _handlersCleaner: Map<number, () => void> = new Map();
}

export {EventsHandlersHolder}