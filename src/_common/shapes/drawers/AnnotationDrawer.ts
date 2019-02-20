import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {Vec2} from "../../utils/Vec2";
import {TextAlign} from "../../drawingcontext/TextAlign";
import {DrawingParams} from "./DrawingParams";
import {Line} from "../Line";

const METRICS_SCALE = 0.25;

class AnnotationDrawer {
    public static drawLabel(context: IDrawingContext, label: string, position: Vec2) {
        context.setFont(DrawingParams.font());
        context.setFill(DrawingParams.textFill());
        context.text(label, position)
    }

    public static drawLineAnnotation(context: IDrawingContext, line: Line) {
        const textTranslate = 25;
        let dirVector = AnnotationDrawer._getLineDir(line);
        const length = AnnotationDrawer._getLineLength(dirVector);
        dirVector.scale(textTranslate / dirVector.radius());
        const textPosition = line.end.add(dirVector);
        context.setTextAlign(TextAlign.center);
        AnnotationDrawer.drawLabel(context, length.toString(), textPosition)
    }

    private static _getLineLength(line: Vec2): number {
        return Math.floor(line.radius() * METRICS_SCALE);
    }

    private static _getLineDir(line: Line): Vec2 {
        const start = line.start;
        const end = line.end;
        return new Vec2(end.x - start.x, end.y - start.y);
    }
}

export {AnnotationDrawer};