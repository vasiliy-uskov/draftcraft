import {ITool} from "../tools/ITool";

class ChangeToolAction {
    constructor(activateFn: (tool: ITool) => void, oldTool: (ITool|null), newTool: ITool) {
        this._oldTool = oldTool;
        this._newTool = newTool;
        this._activateFn = activateFn;
    }

    public execute() {
        this._activateFn(this._newTool);
    }


    public unexecute() {
        if (this._oldTool) {
            this._activateFn(this._oldTool);
        }
    }

    private readonly _oldTool?: ITool;
    private readonly _newTool: ITool;
    private readonly _activateFn: (tool: ITool) => void;
}

export {ChangeToolAction}