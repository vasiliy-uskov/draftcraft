import {Component} from "../component/Component";
import {MouseEventDispatcher} from "../workspace/MouseEventDispatcher";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {IWorkspaceModel} from "../workspace/document/IWorkspaceModel";

interface IWorkspace extends Component {
	eventDispatcher(): MouseEventDispatcher;

	canvasContext(): IDrawingContext;

	model(): IWorkspaceModel;
}

export {
	IWorkspace,
}