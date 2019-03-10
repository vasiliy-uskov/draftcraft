import {createVec2ByPolar, Vec2} from "./Vec2";
import {Transform} from "./Transform";

type Line = {
	start: Vec2,
	end: Vec2,
}

type Arc = {
	center: Vec2,
	radius: number,
	startAngle: number,
	angle: number,
}

function normalizeAngle(angle: number): number {
	return (angle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
}

function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(val, max));
}

function toDegrease(angle: number): number {
	return 180 * angle / Math.PI;
}

function toRadians(angle: number): number {
	return angle / 180 * Math.PI;
}

function compareFloat(n1: number, n2: number): boolean {
	return Math.abs(n1 - n2) < Number.EPSILON;
}

function angleDelta(start: number, end: number): number {
	return end - start + (end < start ? Math.PI * 2 : 0);
}

function pointInCorner(point: Vec2, corner: { startAngle: number, angle: number, center: Vec2 }) {
	if (compareFloat(corner.angle, Math.PI * 2)) {
		return true;
	}
	const start = (new Vec2(
		Math.cos(corner.startAngle),
		Math.sin(corner.startAngle),
	));
	const end = (new Vec2(
		Math.cos(corner.startAngle + corner.angle),
		Math.sin(corner.startAngle + corner.angle),
	));
	point = point.reduce(corner.center);
	if (angleDelta(start.angle(), end.angle()) < Math.PI) {
		return point.x * start.y - point.y * start.x < 0
			&& point.x * end.y - point.y * end.x > 0
	}
	else {
		return !(point.x * start.y - point.y * start.x > 0
			&& point.x * end.y - point.y * end.x < 0)
	}
}

function inRange(num: number, start: number, end: number): boolean {
	return start <= num && num <= end
		|| end <= num && num <= start;
}

function reduceVector(vec: Vec2, reduceStep = 15): Vec2 {
	const angle = toDegrease(vec.angle());
	const reducedAngle = toRadians(Math.round(angle / reduceStep) * reduceStep);
	return createVec2ByPolar(reducedAngle, vec.radius());
}

function reducePoint(points: Array<Vec2>, pointToReduce: Vec2, reduceRadius = 4): Vec2 {
	const reducedPoints = points.filter(
		(point) => point.reduce(pointToReduce).radius() < reduceRadius
	);
	reducedPoints.sort((point1, point2) => point1.radius() - point2.radius());
	return reducedPoints.length ? reducedPoints[0] : pointToReduce;
}

function getLineEquation({start, end}: Line): { a: number, b: number, c: number } {
	return {
		a: start.y - end.y,
		b: end.x - start.x,
		c: start.x * end.y - end.x * start.y,
	}
}

function getLinesIntersection(line1: Line, line2: Line): (Vec2 | null) {
	const {a: a1, b: b1, c: c1} = getLineEquation(line1);
	const {a: a2, b: b2, c: c2} = getLineEquation(line2);
	const determinant = a1 * b2 - b1 * a2;
	if (determinant == 0) {
		return null;
	}
	return new Vec2(
		(b2 * (-c1) - b1 * (-c2)) / determinant,
		(-a2 * (-c1) + a1 * (-c2)) / determinant
	);
}

function getLineAndArcIntersections(line: Line, arc: Arc): (Array<Vec2>) {
	line = {
		start: line.start.reduce(arc.center),
		end: line.end.reduce(arc.center),
	};
	const {a, b} = getLineEquation(line);
	const normal = new Vec2(a, b);
	const intersection = getLinesIntersection({
		start: new Vec2(0, 0),
		end: normal,
	}, line);
	const points = [];
	if (intersection && intersection.radius() == arc.radius) {
		points.push(intersection);
	}
	else if (intersection && intersection.radius() < arc.radius) {
		const intersectionLength = Math.sqrt(arc.radius * arc.radius - intersection.radius() * intersection.radius());
		const normalized = line.end.reduce(line.start).normalize();
		points.push(
			intersection.add(normalized.scale(intersectionLength)).add(arc.center),
			intersection.add(normalized.scale(-intersectionLength)).add(arc.center)
		)
	}
	return points.filter(point => (pointInCorner(point, arc)));
}

function getArcsIntersections(arc1: Arc, arc2: Arc): Array<Vec2> {
	if (arc1.center.equal(arc2.center)
		&& arc1.radius == arc2.radius
		&& arc1.angle == arc2.angle
		&& arc1.startAngle == arc2.startAngle) {
		return [];
	}
	const centersDeltaVec = arc2.center.reduce(arc1.center);
	const points = [];
	if (centersDeltaVec.radius() < arc2.radius + arc1.radius) {
		const angle = Math.acos(
			(centersDeltaVec.radius() * centersDeltaVec.radius() + arc1.radius * arc1.radius - arc2.radius * arc2.radius)
			/ (centersDeltaVec.radius() * arc1.radius * 2)
		);
		points.push(
			Transform.rotate(angle)
				.transform(centersDeltaVec)
				.normalize()
				.scale(arc1.radius)
				.add(arc1.center),
			Transform.rotate(-angle)
				.transform(centersDeltaVec)
				.normalize()
				.scale(arc1.radius)
				.add(arc1.center)
		)
	}
	else if (centersDeltaVec.radius() == arc2.radius + arc1.radius) {
		points.push(
			centersDeltaVec
				.normalize()
				.scale(arc1.radius)
				.add(arc1.center)
		);
	}
	return points.filter(point => pointInCorner(point, arc1) && pointInCorner(point, arc2))
}

function binarySearch(min: number, max: number, inRange: (start: number, end: number) => boolean): number {
	let prevValue = min;
	let value = Math.floor((max - min) / 2);
	while (value != prevValue) {
		if (inRange(min, value)) {
			max = value;
		}
		else {
			min = value;
		}
		prevValue = value;
		value = min + Math.floor((max - min) / 2);
	}
	return value;
}

export {
	normalizeAngle,
	clamp,
	toDegrease,
	toRadians,
	binarySearch,
	compareFloat,
	reduceVector,
	reducePoint,
	pointInCorner,
	getArcsIntersections,
	getLineAndArcIntersections,
	getLinesIntersection,
	inRange,
}