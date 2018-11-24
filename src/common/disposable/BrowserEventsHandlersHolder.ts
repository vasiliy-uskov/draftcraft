import {Component} from "../components/component/Component";

class BrowserEventsHandlersHolder {
    constructor(target: Component) {
        this._target = target;
    }

    addHandler(eventType: string, handler: (event: Event) => void, id: number) {
        this._target.element().addEventListener(eventType, handler);
        this._handlersCleaner.set(id, () =>
            this._target.element().removeEventListener(eventType, handler)
        );
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
    private _target: Component;
}

export {BrowserEventsHandlersHolder}