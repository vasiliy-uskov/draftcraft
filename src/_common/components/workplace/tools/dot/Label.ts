import {Vec2} from "../../../../utils/Vec2";

class Label {
    constructor(position: Vec2, label: string) {
        this._position = position;
        this._label = label;
    }

    public position(): Vec2 {
        return this._position;
    }

    public label(): string {
        return this._label;
    }

    private readonly _position: Vec2;
    private readonly _label: string;
}

export {Label}