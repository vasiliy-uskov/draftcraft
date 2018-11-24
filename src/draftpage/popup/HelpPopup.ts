import {InfoPopup} from "./InfoPopup";

class HelpPopup extends InfoPopup {
    constructor(title: string) {
        super({blockName: "help-popup", title});
    }

    protected _closedExpandedPopupPosition(): number {
        return this.height() - this._notExpandedHeight;
    }
}

export {HelpPopup};