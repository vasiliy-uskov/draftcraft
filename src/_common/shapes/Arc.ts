import {Vec2} from "../utils/Vec2";
import {verifyNumber, verifyObject} from "../utils/typetools";
import {Draft} from "./Draft";
import {LineType} from "./LineType";
import {pointInCorner} from "../utils/mathutils";
import {Transform} from "../utils/Transform";

class Arc {
	constructor(center: Vec2, radius: number, startAngle: number, angle: number, lineType: LineType = LineType.thinSolid) {
		this.center = center;
		this.radius = radius;
		this.startAngle = startAngle;
		this.angle = angle;
		this.lineType = lineType;
	}

	public draft(): Draft {
		return new Draft({arcs: [this], lines: [], dots: []})
	}

	public transform(transformation: Transform): Arc {
		const center = transformation.transform(this.center);
		const start = transformation.transform(
			new Vec2(
				this.center.x + Math.cos(this.startAngle) * this.radius,
				this.center.y + Math.sin(this.startAngle) * this.radius,
			)
		).reduce(center);
		const end = transformation.transform(
			new Vec2(
				this.center.x + Math.cos(this.startAngle + this.angle) * this.radius,
				this.center.y + Math.sin(this.startAngle + this.angle) * this.radius,
			)
		).reduce(center);
		const angle = this.angle;
		return new Arc(
			center,
			Math.min(start.radius(), end.radius()),
			start.angle(),
			angle,
			this.lineType
		);
	}

	public owns(cord: Vec2): boolean {
		const movedToCenterPoint = cord.reduce(this.center);
		const accuracy = 3;
		const situateInCircle =
			movedToCenterPoint.x * movedToCenterPoint.x + movedToCenterPoint.y * movedToCenterPoint.y < (this.radius + accuracy) * (this.radius + accuracy)
			&& movedToCenterPoint.x * movedToCenterPoint.x + movedToCenterPoint.y * movedToCenterPoint.y > (this.radius - accuracy) * (this.radius - accuracy);
		return situateInCircle && pointInCorner(cord, this)
	}

	public serialize(): Object {
		return {
			center: this.center.serialize(),
			angle: this.angle,
			radius: this.radius,
			startAngle: this.startAngle,
			lineType: this.lineType,
		}
	}

	static load(data: any): Arc {
		verifyObject(data);
		verifyNumber(data.radius);
		verifyNumber(data.startAngle);
		verifyNumber(data.angle);
		const center = Vec2.load(data.center);
		return new Arc(center, data.radius, data.startAngle, data.angle);
	}

	readonly angle: number = 0;
	readonly radius: number = 0;
	readonly startAngle: number = 0;
	readonly center: Vec2;
	readonly lineType: LineType;
}

export {Arc}