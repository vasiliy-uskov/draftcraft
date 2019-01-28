import {IShape} from "./tools/IShape";
import {Disposable} from "../../disposable/Disposable";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {Iterator} from "../../iterator/Iterator";
import {Vec2} from "../../utils/Vec2";

class ShapesHolder extends Disposable {
    public changeEvent(): EventDispatcher<void> {
        return this._changeEvent;
    }

    public add(shape: IShape) {
        this._shapes.add(shape);
        this._addHandler(shape.changeEvent(), () => this._changeEvent.dispatch());
        this._changeEvent.dispatch();
    }

    public delete(shape: IShape) {
        this._removeDependency(shape);
        this._shapes.delete(shape);
        this._changeEvent.dispatch();
    }

    public clear() {
        this._shapes.clear();
        this._changeEvent.dispatch();
    }

    public getShape(cord: Vec2): IShape|null {
        const shapes = Array(...this._shapes).reverse();
        for (const shape of shapes) {
            if (shape.owns(cord)) {
                return shape;
            }
        }
        return null;
    }

    [Symbol.iterator]() {
        return new Iterator(this._shapes);
    }


    private _shapes = new Set<IShape>();
    private _changeEvent = this._createEventDispatcher();
}

export {ShapesHolder};