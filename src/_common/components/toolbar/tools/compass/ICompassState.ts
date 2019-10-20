import {Arc} from "../../../../shapes/Arc";
import {Vec2} from "../../../../utils/Vec2";

interface ICompassState {
	result(): Arc | null;

	addPoint(cord: Vec2): void;

	getNextState(): ICompassState;
}

export {ICompassState}