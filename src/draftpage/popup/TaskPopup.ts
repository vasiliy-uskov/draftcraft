import {InfoPopup} from "./InfoPopup";


class TaskPopup extends InfoPopup {
    constructor(title: string) {
        super({blockName: "task-popup", title})
    }

    protected _closedExpandedPopupPosition(): number {
        return this._notExpandedHeight - this._popup.height();
    }
}

export {TaskPopup};