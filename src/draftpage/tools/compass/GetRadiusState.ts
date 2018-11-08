import {Line} from "../line/Line";
import {Arc} from "./Arc";
import {Vec2} from "../../../common/utils/Vec2";
import {ICompassState} from "./ICompassState";
import {GetAngleState} from "./GetAngleState";

class GetRadiusState implements ICompassState {
    constructor(arcCenterCords: Vec2) {
        this._line = new Line(arcCenterCords, arcCenterCords)
    }

    mouseDownHandler(cord: Vec2): ICompassState {
        return new GetAngleState(this._line.start(), this._line.end());
    }

    mouseMoveHandler(cord: Vec2): void {
        this._line.setEnd(cord);
    }

    line(): Line|null {
        return this._line;
    }

    arc(): Arc|null {
        return null;
    }

    private _line: Line;
}

export {GetRadiusState}