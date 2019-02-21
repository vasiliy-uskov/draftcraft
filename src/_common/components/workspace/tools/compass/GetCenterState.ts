import {Vec2} from "../../../../utils/Vec2";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {ICompassState} from "./ICompassState";
import {GetRadiusState} from "./GetRadiusState";
import {verify} from "../../../../utils/typetools";
import {Arc} from "../../../../shapes/Arc";

class GetCenterState implements ICompassState{
    constructor(drawingContext: IDrawingContext) {
        this._drawingContext = drawingContext;
        this._drawingContext.clean();
    }

    public result(): Arc | null {
        return null;
    }

    public getNextState(): ICompassState {
        return new GetRadiusState(verify(this._center), this._drawingContext)
    }

    public addPoint(cord: Vec2): void {
        this._center = cord;
    }

    private readonly _drawingContext: IDrawingContext;
    private _center: Vec2;
}

export {GetCenterState}