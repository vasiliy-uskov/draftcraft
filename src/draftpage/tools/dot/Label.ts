import {Vec2} from "../../../common/utils/Vec2";
import {IDrawingContext} from "../../workplace/drawingcontext/IDrawingContext";
import {AnnotationDrawer} from "../AnnotationDrawer";

class Label {
    constructor(position: Vec2) {
        this._position = position
    }

    public position(): Vec2 {
        return this._position;
    }

    public label(): string {
        return this._label;
    }

    public setLabel(label: string) {
        this._label = label;
    }

    private _position: Vec2;
    private _label = "";
}

export {Label}