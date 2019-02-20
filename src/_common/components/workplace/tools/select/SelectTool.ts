import {BaseTool} from "../BaseTool";
import {MouseEventData} from "../../MouseEventDispatcher";
import {Icons} from "../../../Icons";

class SelectTool extends BaseTool {
    public icon(): string {
        return Icons.select();
    }

    public cursor(): string {
        return "pointer";
    }

    protected _mouseDownHandler(data: MouseEventData): void {
        const selection = this._fieldOrganizer.selection().getOwner(data.relativeCords);
        this._fieldOrganizer.addSelection(selection)
    }
}

export {SelectTool};