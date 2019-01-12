import {ITool} from "./ITool";
import {IDrawingContext} from "../drawingcontext/IDrawingContext";
import {MouseEventData, MouseEventDispatcher} from "../MouseEventDispatcher";
import {Disposable} from "../../../common/disposable/Disposable";
import {EventDispatcher} from "../../../common/disposable/EventDispatcher";
import {IChange} from "./IChange";
import {Vec2} from "../../../common/utils/Vec2";

abstract class BaseTool extends Disposable implements ITool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher) {
        super();
        this._drawingContext = drawingContext;

        this._addHandler(mouseEventDispatcher.mouseDownEvent(), (data: MouseEventData) => this._activated && this._mouseDownHandler(data));
        this._addHandler(mouseEventDispatcher.mouseMoveEvent(), (data: MouseEventData) => this._activated && this._mouseMoveHandler(data));
        this._addHandler(mouseEventDispatcher.mouseUpEvent(),(data: MouseEventData) => this._activated && this._mouseUpHandler(data));
    }

    public abstract icon(): string;

    public changeCreatedEvent(): EventDispatcher<IChange> {
        return this._changeCreatedEvent;
    }

    public activate(): void {
        this._activated = true;
    }

    public deactivate(): void {
        this._activated = false;
        this.reset();
    }

    public reset(): void {}

    protected _mouseDownHandler(data: MouseEventData): void {}
    protected _mouseUpHandler(data: MouseEventData): void {}
    protected _mouseMoveHandler(data: MouseEventData): void {}

    /** @final */
    protected _dispatchChangeEvent(change: IChange) {
        this._changeCreatedEvent.dispatch(change);
    }

    protected _drawingContext: IDrawingContext;

    private _activated = false;
    private _changeCreatedEvent = this._createEventDispatcher<IChange>();
}

export {BaseTool}