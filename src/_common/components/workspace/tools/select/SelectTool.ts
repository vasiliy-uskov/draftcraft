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
        this._documentOrganizer.edit().then(api => {
            const unselectedDraft = this._documentOrganizer.draft().remove(this._documentOrganizer.selection());
            const selectionToAdd = unselectedDraft.getOwner(data.relativeCords);
            const selectionToRemove = this._documentOrganizer.selection().getOwner(data.relativeCords);
            api.addSelection(selectionToAdd);
            api.removeSelection(selectionToRemove);
            api.commit();
        })
    }
}

export {SelectTool};