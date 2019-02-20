import {ActionHolder} from "../../../action/ActionHolder";
import {Field} from "./Field";
import {Draft} from "../../../shapes/Draft";
import {AddDraftAction} from "./actions/AddDraftAction";
import {RemoveDraftAction} from "./actions/RemoveDraftAction";
import {AddSelectionAction} from "./actions/AddSelectionAction";
import {RemoveSelectionAction} from "./actions/RemoveSelectionAction";
import {IFieldOrganizer} from "./IFieldOrganizer";
import {IFieldView} from "./view/IFieldView";

class FieldOrganizer implements IFieldOrganizer {
    constructor(fieldView: IFieldView) {
        this._fieldView = fieldView;
    }

    public addDraft(draft: Draft) {
        !draft.empty() && this._actionHolder.execute(new AddDraftAction(this._field, draft));
        this._fieldView.updateState(this._field.draft, this._field.selection)
    }

    public removeDraft(draft: Draft) {
        !draft.empty() && this._actionHolder.execute(new RemoveDraftAction(this._field, draft));
        this._fieldView.updateState(this._field.draft, this._field.selection)
    }

    public addSelection(draft: Draft) {
        !draft.empty() && this._actionHolder.execute(new AddSelectionAction(this._field, draft));
        this._fieldView.updateState(this._field.draft, this._field.selection)
    }

    public removeSelection(draft: Draft) {
        !draft.empty() && this._actionHolder.execute(new RemoveSelectionAction(this._field, draft));
        this._fieldView.updateState(this._field.draft, this._field.selection);
    }

    public undo() {
        this._actionHolder.undo();
        this._fieldView.updateState(this._field.draft, this._field.selection);
    }

    public redo() {
        this._actionHolder.redo();
        this._fieldView.updateState(this._field.draft, this._field.selection);
    }

    public cleanField() {
        this._field = new Field();
        this._actionHolder = new ActionHolder();
    }

    public selection(): Draft {
        return this._field.selection;
    }

    public draft(): Draft {
        return this._field.draft;
    }

    private _fieldView: IFieldView;
    private _field = new Field();
    private _actionHolder = new ActionHolder();
}

export {FieldOrganizer}