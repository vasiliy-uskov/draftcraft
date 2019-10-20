import {Vec2} from "../utils/Vec2";
import {verifyObject, verifyString} from "../utils/typetools";
import {Draft} from "./Draft";
import {Transform} from "../utils/Transform";

class LabeledDot {
	constructor(position: Vec2, label: string) {
		this.position = position;
		this.label = label;
	}

	public draft(): Draft {
		return new Draft({arcs: [], lines: [], dots: [this]})
	}

	public transform(transformation: Transform): LabeledDot {
		return new LabeledDot(
			transformation.transform(this.position),
			this.label,
		)
	}

	public owns(cord: Vec2): boolean {
		cord = cord.reduce(this.position);
		const accuracy = 5;
		return cord.x * cord.x + cord.y * cord.y < accuracy * accuracy;
	}

	public serialize(): Object {
		return {
			position: this.position.serialize(),
			label: this.label,
		};
	}

	static load(data: any): LabeledDot {
		verifyObject(data);
		const start = Vec2.load(data.position);
		return new LabeledDot(start, verifyString(data.label));
	}

	public readonly position: Vec2;
	public readonly label: string;
}

export {LabeledDot}