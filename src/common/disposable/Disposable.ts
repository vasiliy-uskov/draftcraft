import {EventDispatcher} from "./EventDispatcher";
import {IDisposable} from "./IDisposable";
import {Component} from "../components/component/Component";

class Disposable {
    public dispose() {
        this._destruct();
        this._removeDependency(...this._dependentObjects);
        for (const handlerCleaner of this._handlerCleaners) {
            handlerCleaner();
        }
        for (const dependentObject of this._dependentObjects) {
            dependentObject.dispose()
        }
        delete this._dependentObjects;
        delete this._handlerCleaners;
        delete this._listenedEvents;
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
        this._dependentObjectHandlersIds.set(dependentObject, []);
        this._listenedEvents.set(dependentObject, new Map);
        this._listenedEventsCleaners.set(dependentObject, new Map);
    }

    /** @final */
    protected _removeDisposable(dependentObject: IDisposable) {
        this._removeDependency(dependentObject);
        this._dependentObjects.splice(this._dependentObjects.indexOf(dependentObject), 1);
        dependentObject.dispose();
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

    _addHandlerCallOnce<T>(event: EventDispatcher<T>, handler: (arg: T) => void): number /*event id*/ {
        const id = this._addHandler<T>(event, (arg: T) => {
            handler(arg);
            this._removeHandler(id);
        });
        return id;
    }

    /** @final */
    protected _removeHandler(eventId: number) {
        if (!this._handlerCleaners.hasOwnProperty(eventId)) {
            throw new Error(`No event with id ${eventId}`);
        }
        this._handlerCleaners[eventId]();
        delete this._handlerCleaners[eventId];
        for (const [,ids] of this._dependentObjectHandlersIds) {
            ids.splice(ids.indexOf(eventId), 1);
        }
    }

    protected _listen(type: string, target: Component, handler): number /*event id*/  {
       if (!this._listenedEvents.has(target)) {
           this._listenedEvents.set(target, new Map());
           this._listenedEventsCleaners.set(target, new Map());
       }
       const componentEvents = this._listenedEvents.get(target);
       const componentEventsCleaner = this._listenedEventsCleaners.get(target);
       if (!componentEvents.has(type)) {
           const event = this._createEventDispatcher<Event>();
           componentEvents.set(type, event);
           const dispatchEvent = (browserEvent: Event) => event.dispatch(browserEvent);
           target.element().addEventListener(type, dispatchEvent);
           componentEventsCleaner.set(type, () => {
               target.element().removeEventListener(type, dispatchEvent)
           });
       }
       const handlerId = this._addHandler(componentEvents.get(type), handler);
       if (!this._dependentObjectHandlersIds.has(target)) {
           this._dependentObjectHandlersIds.set(target, [])
       }
       this._dependentObjectHandlersIds.get(target).push(handlerId);
       return handlerId;
    }

    _unlisten(id: number) {
        this._removeHandler(id);
        for (const [dependentObject, ids] of this._dependentObjectHandlersIds) {
            if (!ids.length) {
                this._removeDependency(dependentObject);
            }
        }
    }

    _removeDependency(...dependentObjects: Array<IDisposable>) {
        for (const dependentObject of dependentObjects) {
            for (const handlerId of this._dependentObjectHandlersIds.get(dependentObject)) {
                this._removeHandler(handlerId);
            }
            for (const cleaner of this._listenedEventsCleaners.get(dependentObject).values()) {
                cleaner();
            }
            this._listenedEventsCleaners.delete(dependentObject);
            this._dependentObjectHandlersIds.delete(dependentObject);
            this._listenedEvents.delete(dependentObject);
        }
    }

    private _listenedEvents: Map<IDisposable, Map<string, EventDispatcher<Event>>> = new Map();
    private _listenedEventsCleaners: Map<IDisposable, Map<string, () => void>> = new Map();
    private _dependentObjectHandlersIds: Map<IDisposable, Array<number>> = new Map();
    private _handlerCleaners: Array<() => void> = [];
    private _dependentObjects: Array<IDisposable> = [];
}

export {Disposable}