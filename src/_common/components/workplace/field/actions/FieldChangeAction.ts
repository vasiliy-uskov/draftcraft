import {Field} from "../Field";
import {Draft} from "../../../../shapes/Draft";

class FieldChangeAction implements IAction {
    constructor(field: Field, newField: Field) {
        this._field = field;
        this._newField = newField;
        this._oldDraft = this._field.draft;
        this._oldSelection = this._field.selection;
    }

    public execute(): void {
        this._field.draft = this._newField.draft;
        this._field.selection = this._newField.selection;
    }

    public unexecute(): void {
        this._field.draft = this._oldDraft;
        this._field.selection = this._oldSelection;
    }

    private readonly _field: Field;
    private readonly _newField: Field;
    private readonly _oldDraft: Draft;
    private readonly _oldSelection: Draft;
}

export {FieldChangeAction}