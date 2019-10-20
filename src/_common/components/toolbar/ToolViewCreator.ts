import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "../workspace/MouseEventDispatcher";
import {IWorkspaceModel} from "../workspace/document/IWorkspaceModel";
import {Component} from "../component/Component";
import {LineTool} from "./tools/line/LineTool";
import {DotTool} from "./tools/dot/DotTool";
import {CompassTool} from "./tools/compass/CompassTool";
import {MarkTool} from "./tools/marker/MarkTool";
import {MoveTool} from "./tools/move/MoveTool";
import {ToolView} from "./ToolView";
import {Icons} from "../Icons";
import {BemInfo} from "../component/BemInfo";


type ToolCreatorConfig = {
	canvasContext: IDrawingContext,
	canvasMouseEventDispatcher: MouseEventDispatcher,
	documentOrganizer: IWorkspaceModel,
	workspaceContainer: Component,
	createBemInfoFn: () => BemInfo,
}

interface IToolCreator {
	createLineTool(): ToolView;

	createDotTool(): ToolView;

	createCompassTool(): ToolView;

	createMarkTool(): ToolView;

	createMoveTool(): ToolView;
}

class ToolViewCreator implements IToolCreator {
	constructor({canvasContext, canvasMouseEventDispatcher, documentOrganizer, workspaceContainer, createBemInfoFn}: ToolCreatorConfig) {
		this._canvasContext = canvasContext;
		this._mouseEventDispatcher = canvasMouseEventDispatcher;
		this._documentOrganizer = documentOrganizer;
		this._workspaceContainer = workspaceContainer;
		this._createBemInfoFn = createBemInfoFn;
	}

	public createLineTool(): ToolView {
		return new ToolView({
			bemInfo: this._createBemInfoFn(),
			tool: new LineTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer),
			cursor: "crosshair",
			icon: Icons.pencil(),
		});
	}

	public createDotTool(): ToolView {
		return new ToolView({
			bemInfo: this._createBemInfoFn(),
			tool: new DotTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer, this._workspaceContainer),
			cursor: "crosshair",
			icon: Icons.dot(),
		});
	}

	public createCompassTool(): ToolView {
		return new ToolView({
			bemInfo: this._createBemInfoFn(),
			tool: new CompassTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer),
			cursor: "crosshair",
			icon: Icons.compass(),
		});
	}

	public createMarkTool(): ToolView {
		return new ToolView({
			bemInfo: this._createBemInfoFn(),
			tool: new MarkTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer),
			cursor: "pointer",
			icon: Icons.marker(),
		});
	}

	public createMoveTool(): ToolView {
		return new ToolView({
			bemInfo: this._createBemInfoFn(),
			tool: new MoveTool(this._canvasContext, this._mouseEventDispatcher, this._documentOrganizer),
			cursor: "move",
			icon: Icons.move(),
		});
	}

	private readonly _canvasContext: IDrawingContext;
	private readonly _mouseEventDispatcher: MouseEventDispatcher;
	private readonly _documentOrganizer: IWorkspaceModel;
	private readonly _workspaceContainer: Component;
	private readonly _createBemInfoFn: () => BemInfo;
}

export {
	ToolViewCreator,
	IToolCreator,
};