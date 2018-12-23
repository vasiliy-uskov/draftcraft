import {IChange} from "./tools/IChange";
import {Disposable} from "../common/disposable/Disposable";
import {EventDispatcher} from "../common/disposable/EventDispatcher";

class ChangesHolder extends Disposable {
    public invalidateRequestEvent(): EventDispatcher<Array<IChange>> {
        return this._invalidateRequestEvent;
    }

    public add(change: IChange) {
        this._changes.add(change);
        this._invalidateRequestEvent.dispatch(this.toArray());
    }

    public toArray(): Array<IChange> {
        return Array(...this._changes.values());
    }

    public delete(change: IChange) {
        const changeExist = this._changes.has(change);
        this._changes.delete(change);
        if (changeExist) {
            this._invalidateRequestEvent.dispatch(this.toArray());
        }
    }

    public clean() {
        this._changes.clear();
        this._invalidateRequestEvent.dispatch(Array(...this._changes.values()));
    }

    private _invalidateRequestEvent: EventDispatcher<Array<IChange>> = this._createEventDispatcher();
    private _changes: Set<IChange> = new Set();
}

export {ChangesHolder};