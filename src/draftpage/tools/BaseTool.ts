import {ITool} from "./ITool";
import {IDrawingContext} from "../workplace/IDrawingContext";
import {MouseEventDispatcher} from "../workplace/MouseEventDispatcher";
import {Disposable} from "../../common/disposable/Disposable";
import {EventDispatcher} from "../../common/disposable/EventDispatcher";
import {IChange} from "./IChange";

abstract class BaseTool extends Disposable implements ITool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher) {
        super();
        this._drawingContext = drawingContext;
        this._mouseEventDispatcher = mouseEventDispatcher;
    }

    public changeEvent(): EventDispatcher<IChange> {
        return this._changeEvent;
    }

    public activate(): void {
        if (this._activated)
        {
            return;
        }
        this._mouseDownHandlerKey = this._addHandler(
            this._mouseEventDispatcher.mouseDownEvent(),
            (event: MouseEvent) => this._mouseDownHandler(event)
        );
        this._mouseMoveHandlerKey = this._addHandler(
            this._mouseEventDispatcher.mouseMoveEvent(),
            (event: MouseEvent) => this._mouseMoveHandler(event)
        );
        this._mouseUpHandlerKey = this._addHandler(
            this._mouseEventDispatcher.mouseUpEvent(),
            (event: MouseEvent) => this._mouseUpHandler(event)
        );
    }

    public deactivate(): void {
        if (!this._activated)
        {
            return;
        }
        this._removeHandler(this._mouseDownHandlerKey);
        this._removeHandler(this._mouseMoveHandlerKey);
        this._removeHandler(this._mouseMoveHandlerKey);
    }

    protected abstract _mouseDownHandler(event: MouseEvent): void;
    protected abstract _mouseUpHandler(event: MouseEvent): void;
    protected abstract _mouseMoveHandler(event: MouseEvent): void;

    /** @final */
    protected _dispatchChangeEvent(change: IChange) {
        this._changeEvent.dispatch(change);
    }

    protected _drawingContext: IDrawingContext;

    private _activated = false;
    private _mouseDownHandlerKey?: number = null;
    private _mouseMoveHandlerKey?: number = null;
    private _mouseUpHandlerKey?: number = null;
    private _changeEvent: EventDispatcher<IChange> = this._createEventDispatcher();
    private _mouseEventDispatcher: MouseEventDispatcher;
}

export {BaseTool}