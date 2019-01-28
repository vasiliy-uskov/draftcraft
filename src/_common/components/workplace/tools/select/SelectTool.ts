import {BaseTool} from "../BaseTool";
import {MouseEventData, MouseEventDispatcher} from "../../MouseEventDispatcher";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {ShapesHolder} from "../../ShapesHolder";
import {SelectAction} from "../../action/SelectAction";
import {Icons} from "../../../Icons";

class SelectTool extends BaseTool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher, shapes: ShapesHolder) {
        super(drawingContext, mouseEventDispatcher);
        this._shapes = shapes;
    }

    public icon(): string {
        return Icons.select();
    }

    public cursor(): string {
        return "pointer";
    }

    protected _mouseDownHandler(data: MouseEventData): void {
        const shape = this._shapes.getShape(data.relativeCords);
        if (shape) {
            this._dispatchActionCreatedEvent(new SelectAction(shape));
        }
    }

    private _shapes: ShapesHolder;
}

export {SelectTool};