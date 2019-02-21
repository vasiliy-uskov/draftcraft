import {Draft} from "../../../shapes/Draft";
import {Field} from "./Field";
import {IFieldEditApi} from "./IFieldOrganizer";

class FieldEditApi implements IFieldEditApi {
    constructor(field: Field, resolve: (field: Field) => void) {
        this._resolve = resolve;
        this._field = field
    }

    public addDraft(draft: Draft) {
        this._field.draft = this._field.draft.add(draft);
    }

    public removeDraft(draft: Draft) {
        this._field.draft = this._field.draft.remove(draft);
        this._field.selection = this._field.selection.remove(draft);
    }

    public addSelection(draft: Draft) {
        this._field.selection = this._field.selection.add(draft);
    }

    public removeSelection(draft: Draft) {
        this._field.selection = this._field.selection.remove(draft);
    }

    public draft(): Draft {
        return this._field.draft
    }

    public selection(): Draft {
        return this._field.selection;
    }

    public commit() {
        this._resolve(this._field);
    }

    private _field: Field;
    private _resolve: (field: Field) => void;
}

export {FieldEditApi};