import {EventDispatcher} from "./EventDispatcher";
import {IDisposable} from "./IDisposable";
import {BrowserEventsHandlersHolder} from "./BrowserEventsHandlersHolder";
import {EventsHandlersHolder} from "./EnventsHanldersHolder";
import {IListenable} from "./IListenable";

class Disposable {
    public dispose() {
        this._destruct();
        for (const holder of this._browserEventsHandlersHolders.values()) {
            holder.clean();
        }
        this._browserEventsHandlersHolders.clear();
        for (const holder of this._eventsHandlersHolders.values()) {
            holder.clean();
        }
        this._eventsHandlersHolders.clear();
        for (const dependentObj of this._dependentObjects.values()) {
            dependentObj.dispose();
        }
    }

    protected _destruct() {}

    /** @final */
    protected _createEventDispatcher<T>(parentEvent?: EventDispatcher<T>): EventDispatcher<T> {
        const dispatcher = new EventDispatcher<T>(this);
        this._addDisposable(dispatcher);
        if (parentEvent) {
            this._addHandler(parentEvent, (arg: T) => dispatcher.dispatch(arg));
        }
        return dispatcher;
    }

    /** @final */
    protected _addDisposable(dependentObject: IDisposable) {
        this._dependentObjects.add(dependentObject);
    }

    /** @final */
    protected _removeDisposable(dependentObject: IDisposable) {
        this._dependentObjects.delete(dependentObject);
        this._removeDependency(dependentObject);
        dependentObject.dispose();
    }

    /** @final */
    protected _addHandler<T>(event: EventDispatcher<T>, handler: (arg: T) => void): number /*event id*/ {
        this._handlersId++;
        const owner = event.eventOwner();
        if (!this._eventsHandlersHolders.has(owner)) {
            this._eventsHandlersHolders.set(owner, new EventsHandlersHolder());
        }
        this._eventsHandlersHolders.get(owner).addHandler(event, handler, this._handlersId);
        return this._handlersId;
    }

    _addHandlerCallOnce<T>(event: EventDispatcher<T>, handler: (arg: T) => void): number /*event id*/ {
        const id = this._addHandler<T>(event, (arg: T) => {
            handler(arg);
            this._removeHandler(id);
        });
        return id;
    }

    /** @final */
    protected _removeHandler(id: number) {
        for (const handlersHolder of this._eventsHandlersHolders.values()) {
            handlersHolder.removeHandler(id);
        }
    }

    protected _listen(type: string, target: IListenable, handler: (event: Event) => void): number /*event id*/  {
        this._handlersId++;
        if (!this._eventsHandlersHolders.has(target)) {
            this._browserEventsHandlersHolders.set(target, new BrowserEventsHandlersHolder(target));
        }
        this._browserEventsHandlersHolders.get(target).addHandler(type, handler, this._handlersId);
        return this._handlersId;
    }

    protected _listenOnce(type: string, target: IListenable, handler: (event: Event) => void): number /*event id*/  {
        const id = this._listen(type, target,(arg: Event) => {
            handler(arg);
            this._unlisten(id);
        });
        return id;
    }

    /** @final */
    protected _unlisten(id: number) {
        for (const handlersHolder of this._browserEventsHandlersHolders.values()) {
            handlersHolder.removeHandler(id);
        }
    }

    /** @final */
    protected _removeDependency(...dependentObjects: Array<IDisposable>) {
        for (const dependentObject of dependentObjects) {
            if (this._browserEventsHandlersHolders.has(dependentObject)){
                this._browserEventsHandlersHolders.get(dependentObject).clean();
            }
            if (this._eventsHandlersHolders.has(dependentObject)){
                this._eventsHandlersHolders.get(dependentObject).clean();
            }
        }
    }

    private _dependentObjects: Set<IDisposable> = new Set();
    private _browserEventsHandlersHolders: Map<IDisposable, BrowserEventsHandlersHolder> = new Map();
    private _eventsHandlersHolders: Map<IDisposable, EventsHandlersHolder> = new Map();
    private _handlersId: number = 0;
}

export {Disposable}