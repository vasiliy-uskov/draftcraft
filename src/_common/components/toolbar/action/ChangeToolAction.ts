import {ToolView} from "../ToolView";

class ChangeToolAction {
    constructor(tools: Array<ToolView>, newTool: ToolView) {
        this._tools = tools.filter((tool) => tool.activated());
        this._newTool = newTool;
    }

    public execute() {
        this._tools.forEach((tool) => tool.deactivate());
        this._newTool.activate();
    }

    public unexecute() {
        this._newTool.deactivate();
        this._tools.forEach((tool) => tool.activate());
    }

    private readonly _tools: Array<ToolView>;
    private readonly _newTool: ToolView;
}

export {ChangeToolAction}