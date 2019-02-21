import {ActionHolder} from "../../../action/ActionHolder";
import {Field} from "./Field";
import {Draft} from "../../../shapes/Draft";
import {IFieldOrganizer} from "./IFieldOrganizer";
import {IFieldView} from "./view/IFieldView";
import {FieldEditApi} from "./FieldEditApi";
import {FieldChangeAction} from "./actions/FieldChangeAction";

class FieldOrganizer implements IFieldOrganizer {
    constructor(fieldView: IFieldView) {
        this._fieldView = fieldView;
    }

    public edit(): Promise<FieldEditApi> {
        let fieldPromise: Promise<Field>;
        let apiPromise = this._editPromise.then(() => {
            let resolve: (f: Field) => void;
            fieldPromise = new Promise<Field>((res) => {
                resolve = res;
            });
            return new FieldEditApi(new Field(this._field.draft, this._field.selection), resolve)
        });
        this._editPromise = apiPromise.then(() => {
            fieldPromise.then((field) => {
                this._actionHolder.execute(new FieldChangeAction(this._field, field));
                this._fieldView.updateState(this._field.draft, this._field.selection);
            })
        });
        return apiPromise;
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
    private _editPromise: Promise<void> = Promise.resolve();
    private _actionHolder = new ActionHolder();
}

export {FieldOrganizer}