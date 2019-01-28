import {IShape} from "../tools/IShape";

class SelectAction implements IAction {
    constructor(shape: IShape) {
        this._shape = shape;
        this._selected = this._shape.selected();
    }

    public execute(): void {
        this._shape.setSelected(!this._selected);
    }

    public unexecute(): void {
        this._shape.setSelected(this._selected);
    }

    private readonly _shape: IShape;
    private readonly _selected: boolean;
}

export {SelectAction};