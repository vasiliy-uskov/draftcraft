import {Field} from "../Field";
import {Draft} from "../../../../shapes/Draft";

class AddDraftAction implements IAction {
    constructor(field: Field, draft: Draft) {
        this._field = field;
        this._prevDraft = this._field.draft;
        this._newDraft = this._field.draft.add(draft);
    }

    public execute(): void {
        this._field.draft = this._newDraft;
    }

    public unexecute(): void {
        this._field.draft = this._prevDraft;
    }

    private readonly _field: Field;
    private readonly _prevDraft: Draft;
    private readonly _newDraft: Draft;
}

export {AddDraftAction}