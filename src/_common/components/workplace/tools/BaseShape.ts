import {IShape} from "./IShape";
import {Vec2} from "../../../utils/Vec2";
import {IDrawingContext} from "../drawingcontext/IDrawingContext";
import {Disposable} from "../../../disposable/Disposable";
import {EventDispatcher} from "../../../disposable/EventDispatcher";

abstract class BaseShape extends Disposable implements IShape {
    public setSelected(selected: boolean) {
        this._selected = selected;
        this._changeEvent.dispatch();
    }

    public selected(): boolean {
        return this._selected;
    }

    public changeEvent(): EventDispatcher<void> {
        return this._changeEvent;
    }

    abstract owns(cord: Vec2): boolean;
    abstract draw(drawingContext: IDrawingContext): void;
    abstract serialize(): Object;

    private _selected: boolean = false;
    private _changeEvent = this._createEventDispatcher();
}

export {BaseShape}