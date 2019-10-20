import {Vec2} from "../../../../utils/Vec2";
import {GetAngleState} from "./GetAngleState";
import {IDrawingContext} from "../../../../drawingcontext/IDrawingContext";
import {AnnotationDrawer} from "../../../../shapes/drawers/AnnotationDrawer";
import {ShapesDrawer} from "../../../../shapes/drawers/ShapesDrawer";
import {DrawingParams} from "../../../../shapes/drawers/DrawingParams";
import {Line} from "../../../../shapes/Line";
import {Arc} from "../../../../shapes/Arc";
import {ICompassState} from "./ICompassState";

class GetRadiusState implements ICompassState {
	constructor(arcCenterCords: Vec2, drawingContext: IDrawingContext) {
		this._line = new Line(arcCenterCords, arcCenterCords);
		this._drawingContext = drawingContext;
	}

	public result(): Arc | null {
		return null;
	}

	public getNextState(): ICompassState {
		return new GetAngleState(this._line, this._drawingContext);
	}

	public addPoint(cord: Vec2): void {
		this._line = new Line(this._line.start, cord);
		this._redrawState()
	}

	private _redrawState() {
		this._drawingContext.clean();
		ShapesDrawer.drawLine(this._drawingContext, this._line, DrawingParams.linesColor());
		AnnotationDrawer.drawLineAnnotation(this._drawingContext, this._line);
	}

	private readonly _drawingContext: IDrawingContext;
	private _line: Line;
}

export {GetRadiusState}