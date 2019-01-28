import {MouseEventDispatcher} from "../MouseEventDispatcher";
import {IDrawingContext} from "../drawingcontext/IDrawingContext";
import {ShapesHolder} from "../ShapesHolder";
import {Component} from "../../component/Component";
import {BaseTool} from "./BaseTool";
import {LineTool} from "./line/LineTool";
import {DotTool} from "./dot/DotTool";
import {CompassTool} from "./compass/CompassTool";
import {EraserTool} from "./eraser/EraserTool";
import {SelectTool} from "./select/SelectTool";


type ToolFactoryConfig = {
    canvasContext: IDrawingContext,
    canvasMouseEventDispatcher: MouseEventDispatcher,
    shapesHolder: ShapesHolder,
    workplaceContainer: Component
}

class ToolFactory {
    constructor({canvasContext, canvasMouseEventDispatcher, shapesHolder, workplaceContainer}: ToolFactoryConfig) {
        this._canvasContext = canvasContext;
        this._mouseEventDispatcher = canvasMouseEventDispatcher;
        this._shapesHolder = shapesHolder;
        this._workplaceContainer = workplaceContainer;
    }

    public createLineTool(): BaseTool {
        return new LineTool(this._canvasContext, this._mouseEventDispatcher, this._shapesHolder);
    }

    public createDotTool(): BaseTool {
        return new DotTool(this._canvasContext, this._mouseEventDispatcher, this._shapesHolder, this._workplaceContainer);
    }

    public createCompassTool(): BaseTool {
        return new CompassTool(this._canvasContext, this._mouseEventDispatcher, this._shapesHolder);
    }

    public createEraserTool(): BaseTool {
        return new EraserTool(this._canvasContext, this._mouseEventDispatcher, this._shapesHolder);
    }

    public createSelectTool(): BaseTool {
        return new SelectTool(this._canvasContext, this._mouseEventDispatcher, this._shapesHolder);
    }

    private readonly _canvasContext: IDrawingContext;
    private readonly _mouseEventDispatcher: MouseEventDispatcher;
    private readonly _shapesHolder: ShapesHolder;
    private readonly _workplaceContainer: Component;
}

export {ToolFactory};