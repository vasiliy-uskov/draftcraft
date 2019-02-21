import {MouseEventDispatcher} from "../MouseEventDispatcher";
import {IDrawingContext} from "../../../drawingcontext/IDrawingContext";
import {Component} from "../../component/Component";
import {BaseTool} from "./BaseTool";
import {LineTool} from "./line/LineTool";
import {DotTool} from "./dot/DotTool";
import {CompassTool} from "./compass/CompassTool";
import {SelectTool} from "./select/SelectTool";
import {IDocumentOrganizer} from "../document/IDocumentOrganizer";


type ToolFactoryConfig = {
    canvasContext: IDrawingContext,
    canvasMouseEventDispatcher: MouseEventDispatcher,
    documentOrganizer: IDocumentOrganizer,
    workspaceContainer: Component
}

class ToolFactory {
    constructor({canvasContext, canvasMouseEventDispatcher, documentOrganizer, workspaceContainer}: ToolFactoryConfig) {
        this._canvasContext = canvasContext;
        this._mouseEventDispatcher = canvasMouseEventDispatcher;
        this._documentOrganizer = documentOrganizer;
        this._workspaceContainer = workspaceContainer;
    }

    public createLineTool(): BaseTool {
        return new LineTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer);
    }

    public createDotTool(): BaseTool {
        return new DotTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer, this._workspaceContainer);
    }

    public createCompassTool(): BaseTool {
        return new CompassTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer);
    }
    public createSelectTool(): BaseTool {
        return new SelectTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer);
    }

    private readonly _canvasContext: IDrawingContext;
    private readonly _mouseEventDispatcher: MouseEventDispatcher;
    private readonly _documentOrganizer: IDocumentOrganizer;
    private readonly _workspaceContainer: Component;
}

export {ToolFactory};