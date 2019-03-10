import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {IDocumentView} from "./IDocumentView";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";
import {Document} from "../Document";

class DocumentDrawer implements IDocumentView {
	constructor(drawingContext: IDrawingContext) {
		this._drawingContext = drawingContext;
	}

	public updateState(document: Readonly<Document>) {
		const unselectedDraft = document.draft.remove(document.selection);
		this._drawingContext.clean();
		ShapesDrawer.drawDraft(this._drawingContext, unselectedDraft, DrawingParams.linesColor());
		ShapesDrawer.drawDraft(this._drawingContext, document.selection, DrawingParams.selectedLinesColor());
	}

	private _drawingContext: IDrawingContext;
}

export {DocumentDrawer};