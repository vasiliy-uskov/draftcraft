import {IShape} from "./tools/IShape";
import {Disposable} from "../../disposable/Disposable";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {Iterator} from "../../iterator/Iterator";

class ShapesHolder extends Disposable {
    public changeEvent(): EventDispatcher<void> {
        return this._changeEvent;
    }

    public add(shape: IShape) {
        this._shapes.add(shape);
        this._changeEvent.dispatch();
    }

    public delete(shape: IShape) {
        this._shapes.delete(shape);
        this._changeEvent.dispatch();
    }

    public clear() {
        this._shapes.clear();
        this._changeEvent.dispatch();
    }

    [Symbol.iterator]() {
        return new Iterator(this._shapes);
    }


    private _shapes = new Set<IShape>();
    private _changeEvent = this._createEventDispatcher();
}

export {ShapesHolder};