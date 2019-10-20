import {IDocumentEditApi} from "../../../workspace/document/IWorkspaceModel";
import {Draft} from "../../../../shapes/Draft";
import {Vec2} from "../../../../utils/Vec2";
import {Transform} from "../../../../utils/Transform";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";

type MoveSessionConfig = {
	documentApi: IDocumentEditApi,
	selectedDraft: Draft,
	drawingContext: IDrawingContext,
}

class MoveSession {
	constructor({documentApi, selectedDraft, drawingContext}: MoveSessionConfig) {
		this._documentApi = documentApi;
		this._selectedDraft = selectedDraft;
		this._drawingContext = drawingContext;
		this._documentApi
			.removeDraft(this._selectedDraft)
			.updateView();
		this._drawTransformedDraft();
	}

	public move(dir: Vec2) {
		this._transformation.add(Transform.translate(dir));
		this._drawTransformedDraft()
	}

	public reset() {
		this._drawingContext.clean();
		this._documentApi.reset();
	}

	public commit() {
		this._drawingContext.clean();
		const transformedDraft = this._transformedDraft();
		this._documentApi
			.addDraft(transformedDraft)
			.markDraft(transformedDraft)
			.commit();
	}

	private _drawTransformedDraft() {
		this._drawingContext.clean();
		ShapesDrawer.drawDraft(
			this._drawingContext,
			this._transformedDraft(),
			DrawingParams.markedLinesColor()
		);
	}

	private _transformedDraft(): Draft {
		return this._selectedDraft.transform(this._transformation);
	}

	private _drawingContext: IDrawingContext;
	private _documentApi: IDocumentEditApi;
	private _selectedDraft: Draft;
	private _transformation = Transform.scale(1, 1);
}

export {MoveSession};