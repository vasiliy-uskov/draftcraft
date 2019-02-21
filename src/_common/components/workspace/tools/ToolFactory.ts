import {MouseEventDispatcher} from "../MouseEventDispatcher";
import {IDrawingContext} from "../../../drawingcontext/IDrawingContext";
import {Component} from "../../component/Component";
import {BaseTool} from "./BaseTool";
import {LineTool} from "./line/LineTool";
import {DotTool} from "./dot/DotTool";
import {CompassTool} from "./compass/CompassTool";
import {SelectTool} from "./select/SelectTool";
import {IFieldOrganizer} from "../field/IFieldOrganizer";


type ToolFactoryConfig = {
    canvasContext: IDrawingContext,
    canvasMouseEventDispatcher: MouseEventDispatcher,
    fieldOrganizer: IFieldOrganizer,
    workspaceContainer: Component
}

class ToolFactory {
    constructor({canvasContext, canvasMouseEventDispatcher, fieldOrganizer, workspaceContainer}: ToolFactoryConfig) {
        this._canvasContext = canvasContext;
        this._mouseEventDispatcher = canvasMouseEventDispatcher;
        this._fieldOrganizer = fieldOrganizer;
        this._workspaceContainer = workspaceContainer;
    }

    public createLineTool(): BaseTool {
        return new LineTool(this._canvasContext, this._mouseEventDispatcher, this._fieldOrganizer);
    }

    public createDotTool(): BaseTool {
        return new DotTool(this._canvasContext, this._mouseEventDispatcher, this._fieldOrganizer, this._workspaceContainer);
    }

    public createCompassTool(): BaseTool {
        return new CompassTool(this._canvasContext, this._mouseEventDispatcher, this._fieldOrganizer);
    }
    public createSelectTool(): BaseTool {
        return new SelectTool(this._canvasContext, this._mouseEventDispatcher, this._fieldOrganizer);
    }

    private readonly _canvasContext: IDrawingContext;
    private readonly _mouseEventDispatcher: MouseEventDispatcher;
    private readonly _fieldOrganizer: IFieldOrganizer;
    private readonly _workspaceContainer: Component;
}

export {ToolFactory};