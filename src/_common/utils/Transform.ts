import {Vec2} from "./Vec2";

type TransformConfig = {
	_00: number, _01: number, _02: number,
	_10: number, _11: number, _12: number,
}

class Transform {
	constructor(config: TransformConfig) {
		this._points = config;
	}

	public add(tansform: Transform): Transform {
		const points1 = Object.assign(tansform._points);
		const points2 = Object.assign(this._points);
		points1._00 = points1._00 * points2._00 + points1._01 * points2._10;
		points1._01 = points1._00 * points2._01 + points1._01 * points2._11;
		points1._10 = points1._10 * points2._00 + points1._11 * points2._10;
		points1._11 = points1._10 * points2._01 + points1._11 * points2._11;
		points1._02 = points1._00 * points2._02 + points1._01 * points2._12 + points1._02;
		points1._12 = points1._10 * points2._02 + points1._11 * points2._12 + points1._12;
		this._points = points1;
		return this;
	}

	public rotate(angle: number): Transform {
		return this.add(Transform.rotate(angle));
	}

	public scale(scaleX: number, scaleY: number): Transform {
		return this.add(Transform.scale(scaleX, scaleY));
	}

	public translate(vec: Vec2): Transform {
		return this.add(Transform.translate(vec));
	}

	public transform(vec: Vec2): Vec2 {
		const x = vec.x * this._points._00 + vec.y * this._points._01 + this._points._02;
		const y = vec.x * this._points._10 + vec.y * this._points._11 + this._points._12;
		return new Vec2(x, y);
	}

	public static rotate(angle: number): Transform {
		return new Transform({
			_00: Math.cos(-angle), _01: Math.sin(-angle), _02: 0,
			_10: -Math.sin(-angle), _11: Math.cos(-angle), _12: 0,
		})
	}

	public static scale(scaleX: number, scaleY: number): Transform {
		return new Transform({
			_00: scaleX, _01: 0, _02: 0,
			_10: 0, _11: scaleY, _12: 0,
		})
	}

	public static translate(vec: Vec2): Transform {
		return new Transform({
			_00: 1, _01: 0, _02: vec.x,
			_10: 0, _11: 1, _12: vec.y,
		})
	}

	private _points: TransformConfig;
}

export {Transform};