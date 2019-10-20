import {Component} from "../component/Component";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {WorkspaceModel} from "./document/WorkspaceModel";
import {DocumentDrawer} from "./document/view/DocumentDrawer";
import {Draft} from "../../shapes/Draft";
import {Canvas} from "../canvas/Canvas";
import {Size} from "../../utils/Size";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {IWorkspaceModel} from "./document/IWorkspaceModel";

class Workspace extends Component {
	constructor() {
		super({
			blockName: "workspace",
		});

		this._addDisposable(this._resultsCanvas);
		this.addChild(this._resultsCanvas);

		this._addDisposable(this._workingCanvas);
		this.addChild(this._workingCanvas);

		this._eventDispatcher = new MouseEventDispatcher(this._workingCanvas);
		this._addDisposable(this._eventDispatcher);
	}

	public eventDispatcher(): MouseEventDispatcher {
		return this._eventDispatcher;
	}

	public canvasContext(): IDrawingContext {
		return this._workingCanvas.context();
	}

	public model(): IWorkspaceModel {
		return this._documentOrganizer;
	}

	public setBackgroundImage(src: string) {
		this.setStyle("background-image", `url(${src})`);
	}

	public setCanvasSize(size: Size) {
		this.setSize(size);
		this._workingCanvas.setCanvasSize(size);
		this._resultsCanvas.setCanvasSize(size);
	}

	public draft(): Draft {
		return this._documentOrganizer.draft();
	}

	public selection(): Draft {
		return this._documentOrganizer.selection();
	}

	public undo() {
		this._documentOrganizer.undo();
	}

	public redo() {
		this._documentOrganizer.redo();
	}

	public clean() {
		this._documentOrganizer.cleanDocument();
		this._workingCanvas.context().clean();
		this._resultsCanvas.context().clean();
	}

	private _resultsCanvas = new Canvas({
		bemInfo: this.createChildBemInfo("results-canvas"),
		adoptiveSize: true,
	});
	private _workingCanvas = new Canvas({
		bemInfo: this.createChildBemInfo("working-canvas"),
		adoptiveSize: true,
	});
	private _eventDispatcher: MouseEventDispatcher;
	private _documentOrganizer = new WorkspaceModel(new DocumentDrawer(this._resultsCanvas.context()));
}

export {Workspace};