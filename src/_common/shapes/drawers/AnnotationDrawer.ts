import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {Vec2} from "../../utils/Vec2";
import {TextAlign} from "../../drawingcontext/TextAlign";
import {DrawingParams} from "./DrawingParams";
import {Line} from "../Line";

class AnnotationDrawer {
	public static drawLabel(context: IDrawingContext, label: string, position: Vec2) {
		context.setFont(DrawingParams.font());
		context.setFill(DrawingParams.textFill());
		context.text(label, position)
	}

	public static drawLineAnnotation(context: IDrawingContext, line: Line) {
		const textTranslate = 25;
		let dirVector = line.end.reduce(line.start).normalize();
		const length = Math.floor(line.length());
		const textPosition = line.end.add(dirVector.scale(textTranslate));
		context.setTextAlign(TextAlign.center);
		AnnotationDrawer.drawLabel(context, length.toString(), textPosition)
	}
}

export {AnnotationDrawer};