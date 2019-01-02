import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";
import {Line} from "./line/Line";
import {Vec2} from "../../common/utils/Vec2";
import {TextAlign} from "../workplace/drawingcontext/TextAlign";

const FONT = "normal 24px Helvetica";
const TEXT_FILL = "#343434";
const ZOOM_SCALE = 0.25;

class AnnotationDrawer {
    public static drawLabel(context: IDrawingContext, label: string, position: Vec2) {
        context.setFont(FONT);
        context.setFill(TEXT_FILL);
        context.text(label, position)
    }

    public static drawLineAnnotation(context: IDrawingContext, line: Line) {
        const textTranslate = 25;
        const dirVector = AnnotationDrawer._getLineDir(line);
        const length = AnnotationDrawer._getLineLength(dirVector);
        dirVector.scale(textTranslate / dirVector.radius());
        const textPosition = line.end().add(dirVector);
        context.setTextAlign(TextAlign.center);
        AnnotationDrawer.drawLabel(context, length.toString(), textPosition)
    }

    private static _getLineLength(line: Vec2): number {
        return Math.floor(line.radius() * ZOOM_SCALE);
    }

    private static _getLineDir(line: Line): Vec2 {
        const start = line.start();
        const end = line.end();
        return new Vec2(end.x - start.x, end.y - start.y);
    }
}

export {AnnotationDrawer};