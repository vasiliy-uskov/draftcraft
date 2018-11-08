import {Vec2} from "../../../common/utils/Vec2";
import {ICompassState} from "./ICompassState";
import {Arc} from "./Arc";
import {GetRadiusState} from "./GetRadiusState";
import {Line} from "../line/Line";

class NullState implements ICompassState {
    mouseDownHandler(cords: Vec2): ICompassState {
        return new GetRadiusState(cords);
   }

   mouseMoveHandler(): void {}

   arc(): Arc|null {
        return null;
   }

   line(): Line|null {
        return null;
   }
}

export {NullState}