import {Field} from "../Field";
import {Draft} from "../../../../shapes/Draft";

class RemoveDraftAction implements IAction {
    constructor(field: Field, draft: Draft) {
        this._field = field;
        this._prevDraft = this._field.draft;
        this._prevSelection = this._field.selection;
        this._newDraft = this._field.draft.remove(draft);
        this._newSelection = this._field.selection.remove(draft);
    }

    public execute(): void {
        this._field.draft = this._newDraft;
        this._field.selection = this._newSelection;
    }

    public unexecute(): void {
        this._field.draft = this._prevDraft;
        this._field.selection = this._prevSelection;
    }

    private readonly _field: Field;
    private readonly _prevDraft: Draft;
    private readonly _newDraft: Draft;
    private readonly _prevSelection: Draft;
    private readonly _newSelection: Draft;
}

export {RemoveDraftAction}