import {Draft} from "../../../../shapes/Draft";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {IDocumentView} from "./IDocumentView";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";

class DocumentDrawer implements IDocumentView {
    constructor(drawingContext: IDrawingContext) {
        this._drawingContext = drawingContext;
    }

    public updateState(draft: Draft, selection: Draft) {
        const unselectedDraft = draft.remove(selection);
        this._drawingContext.clean();
        ShapesDrawer.drawDraft(this._drawingContext, unselectedDraft, DrawingParams.linesColor());
        ShapesDrawer.drawDraft(this._drawingContext, selection, DrawingParams.selectedLinesColor());
    }

    private _drawingContext: IDrawingContext;
}

export {DocumentDrawer};