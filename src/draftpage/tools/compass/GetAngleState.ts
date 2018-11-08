import {Line} from "../line/Line";
import {Arc} from "./Arc";
import {Vec2} from "../../../common/utils/Vec2";
import {ICompassState} from "./ICompassState";

class GetAngleState implements ICompassState {
    constructor(arcCenterCords: Vec2, arcStartCord: Vec2) {
        this._line = new Line(arcCenterCords, arcStartCord);
        this._arc = new Arc(arcCenterCords, arcStartCord, arcStartCord);
    }

    mouseDownHandler(cord: Vec2): ICompassState|null {
        return null;
    }

    mouseMoveHandler(cord: Vec2): void {
        const arcCenter = this._arc.center();
        const mousePointer = new Vec2(
            cord.x - arcCenter.x,
            cord.y - arcCenter.y
        );
        const radiusScale = this._arc.radius() / mousePointer.radius();
        mousePointer.x *= radiusScale;
        mousePointer.y *= radiusScale;
        this._arc.setArcEndVec(mousePointer);
        this._line.setEnd(
            new Vec2(
                mousePointer.x + arcCenter.x,
                mousePointer.y + arcCenter.y
            )
        );
    }

    line(): Line|null {
        return this._line;
    }

    arc(): Arc|null {
        return this._arc;
    }

    private _line: Line;
    private _arc: Arc;
}

export {GetAngleState}