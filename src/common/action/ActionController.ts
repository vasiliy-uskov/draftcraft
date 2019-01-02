import {ArrIterator} from "../iterator/ArrIterator";

class ActionController {
    public execute(action: IAction) {
        this._currentAction.insert(action).value().execute();
        this._currentAction.next().deleteTail();
    }

    public redo(): void {
        if (this._currentAction.value()) {
            this._currentAction.value().execute();
            this._currentAction.next();
        }
    }

    public undo(): void {
        this._currentAction.prev();
        if (this._currentAction.value()) {
            this._currentAction.value().unexecute();
        }
    }

    public clean(): void {
        this._actions.splice(0, this._actions.length);
        this._currentAction = new ArrIterator<IAction>(0, this._actions);
    }

    private readonly _actions: Array<IAction> = [];
    private _currentAction = new ArrIterator<IAction>(0, this._actions);
}

export {ActionController};