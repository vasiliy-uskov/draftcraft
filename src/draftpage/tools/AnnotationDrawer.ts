import {IDrawingContext} from "../workplace/drawingcontext/IDrawingContext";
import {Line} from "./line/Line";
import {Vec2} from "../../common/utils/Vec2";
import {TextAlign} from "../workplace/drawingcontext/TextAlign";

const FONT = "normal 24px Helvetica";
const TEXT_FILL = "#343434";

class AnnotationDrawer {
    static drawLineAnnotation(context: IDrawingContext, line: Line) {
        const textTranslate = 25;
        const dirVector = AnnotationDrawer._getLineDir(line);
        const length = Math.floor(dirVector.radius());
        dirVector.scale(textTranslate / dirVector.radius());
        const textPosition = line.end().add(dirVector);
        context.setFont(FONT);
        context.setFill(TEXT_FILL);
        context.setTextAlign(TextAlign.center);
        context.text(length.toString(), textPosition)
    }

    private static _getLineDir(line: Line): Vec2 {
        const start = line.start();
        const end = line.end();
        return new Vec2(end.x - start.x, end.y - start.y);
    }
}

export {AnnotationDrawer};