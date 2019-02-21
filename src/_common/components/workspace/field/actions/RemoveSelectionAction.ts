import {Field} from "../Field";
import {Draft} from "../../../../shapes/Draft";

class RemoveSelectionAction implements IAction {
    constructor(field: Field, selection: Draft) {
        this._field = field;
        this._prevSelection = this._field.selection;
        this._newSelection = this._field.selection.remove(selection);
    }

    public execute(): void {
        this._field.selection = this._newSelection;
    }

    public unexecute(): void {
        this._field.selection = this._prevSelection;
    }

    private readonly _field: Field;
    private readonly _prevSelection: Draft;
    private readonly _newSelection: Draft;
}

export {RemoveSelectionAction}