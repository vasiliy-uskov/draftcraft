import {BaseTool} from "./BaseTool";
import {IDrawingContext} from "../drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "../MouseEventDispatcher";
import {IShape} from "./IShape";
import {AddShapeAction} from "../action/AddShapeAction";
import {ShapesHolder} from "../ShapesHolder";

abstract class DrawTool extends BaseTool {
    constructor(drawingContext: IDrawingContext, mouseEventDispatcher: MouseEventDispatcher, shapes: ShapesHolder) {
        super(drawingContext, mouseEventDispatcher);
        this._shapes = shapes;
    }

    public cursor(): string {
        return "crosshair";
    }

    /** @final */
    protected _dispatchAddShapeEvent(shape: IShape) {
        this._dispatchActionCreatedEvent(new AddShapeAction(this._shapes, shape));
    }

    private readonly _shapes: ShapesHolder;
}

export {DrawTool};