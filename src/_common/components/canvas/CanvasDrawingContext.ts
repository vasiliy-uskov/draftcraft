import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {Vec2} from "../../utils/Vec2";
import {BoundingRect} from "../../utils/BoundingRect";
import {TextAlign} from "../../drawingcontext/TextAlign";

class CanvasDrawingContext implements IDrawingContext {
	constructor(canvasElement: HTMLCanvasElement) {
		this._context = canvasElement.getContext("2d") as CanvasRenderingContext2D;
		this._context.textBaseline = "middle";
		this._canvasElement = canvasElement;
	}

	public setFill(color: string) {
		if (this._context.fillStyle != color) {
			this._context.fillStyle = color;
		}
	}

	public setStroke(color: string) {
		if (this._context.strokeStyle != color) {
			this._context.strokeStyle = color;
		}
	}

	public setFont(font: string) {
		if (this._context.font != font) {
			this._context.font = font;
		}
	}

	public setLineDash(dashStyle: Array<number>) {
		const oldDashStyle = this._context.getLineDash();
		const dashStylesEquals = dashStyle.length == oldDashStyle.length
			&& oldDashStyle.every((el, index) => el == dashStyle[index]);
		if (!dashStylesEquals) {
			this._context.setLineDash(dashStyle);
		}
	}

	public setStrokeWidth(width: number) {
		if (this._context.lineWidth != width) {
			this._context.lineWidth = width;
		}
	}

	public setTextAlign(align: TextAlign) {
		if (this._context.textAlign != align) {
			this._context.textAlign = align;
		}
	};

	public beginPath() {
		this._context.beginPath();
	}

	public closePath() {
		this._context.closePath();
	}

	public stroke() {
		this._context.stroke();
	}

	public fill() {
		this._context.fill();
	}

	public moveTo(vec: Vec2) {
		this._context.moveTo(vec.x, vec.y);
	}

	public lineTo(vec: Vec2) {
		this._context.lineTo(vec.x, vec.y);
	}

	public arc(center: Vec2, radius: number, startAngle: number, angle: number) {
		this._context.arc(center.x, center.y, radius, startAngle, startAngle + angle, false);
	}

	public rect(rect: BoundingRect) {
		this._context.rect(rect.x, rect.y, rect.width, rect.height);
	}

	public clean(rect?: BoundingRect) {
		if (rect) {
			this._context.clearRect(rect.x, rect.y, rect.width, rect.height);
		} else {
			this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
		}
	}

	public text(str: string, pos1: Vec2, pos2: Vec2 = pos1) {
		const dirVec = new Vec2(pos2.x - pos1.x, pos2.y - pos1.y);
		this._context.save();
		this._context.translate(pos1.x, pos1.y + dirVec.y / 2);
		this._context.rotate(dirVec.angle());
		this._context.fillText(str, -dirVec.x / 2, -dirVec.y / 2);
		this._context.restore();
	}

	private _context: CanvasRenderingContext2D;
	private _canvasElement: HTMLCanvasElement;
}

export {CanvasDrawingContext}