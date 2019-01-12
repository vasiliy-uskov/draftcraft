import {IChange} from "../workplace/tools/IChange";
import {ChangesHolder} from "../workplace/ChangesHolder";

class AddChangeAction implements IAction {
    constructor(changes: ChangesHolder, newChange: IChange) {
        this._changes = changes;
        this._newChange = newChange;
    }

    public execute(): void {
        this._changes.add(this._newChange);
    }

    public unexecute(): void {
        this._changes.delete(this._newChange);
    }

    private readonly _changes: ChangesHolder;
    private readonly _newChange: IChange;
}

export {AddChangeAction};