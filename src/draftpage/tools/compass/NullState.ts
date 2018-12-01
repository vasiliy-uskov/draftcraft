import {Vec2} from "../../../common/utils/Vec2";
import {ICompassState} from "./ICompassState";
import {Arc} from "./Arc";
import {GetRadiusState} from "./GetRadiusState";
import {Line} from "../line/Line";
import {IDrawingContext} from "../../workplace/drawingcontext/IDrawingContext";

class NullState implements ICompassState {
    mouseDownHandler(cords: Vec2): ICompassState {
        return new GetRadiusState(cords);
   }

    public mouseMoveHandler(): void {}

    public arc(): Arc|null {
         return null;
    }

    public line(): Line|null {
         return null;
    }

    public redrawState(drawingContext: IDrawingContext) {
        drawingContext.clean();
    }
}

export {NullState}