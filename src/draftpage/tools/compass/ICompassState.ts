import {Line} from "../line/Line";
import {Arc} from "./Arc";
import {Vec2} from "../../../common/utils/Vec2";

interface ICompassState {
    mouseDownHandler(cord: Vec2): ICompassState|null;
    mouseMoveHandler(cord: Vec2): void;
    arc(): Arc|null;
    line(): Line|null;
}

export {ICompassState}