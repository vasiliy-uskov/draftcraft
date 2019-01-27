import {Line} from "../line/Line";
import {Arc} from "./Arc";
import {Vec2} from "../../../../utils/Vec2";
import {ICompassState} from "./ICompassState";
import {GetAngleState} from "./GetAngleState";
import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {AnnotationDrawer} from "../AnnotationDrawer";

class GetRadiusState implements ICompassState {
    constructor(arcCenterCords: Vec2) {
        this._line = new Line(arcCenterCords, arcCenterCords)
    }

    public mouseDownHandler(cord: Vec2): ICompassState {
        return new GetAngleState(this._line.start(), this._line.end());
    }

    public mouseMoveHandler(cord: Vec2): void {
        this._line.setEnd(cord);
    }

    public line(): Line|null {
        return this._line;
    }

    public arc(): Arc|null {
        return null;
    }

    public redrawState(drawingContext: IDrawingContext) {
        drawingContext.clean();
        this._line.draw(drawingContext);
        AnnotationDrawer.drawLineAnnotation(drawingContext, this._line);
    }

    private _line: Line;
}

export {GetRadiusState}