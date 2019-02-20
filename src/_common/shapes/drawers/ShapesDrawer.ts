import {IDrawingContext} from "../../drawingcontext/IDrawingContext";
import {Arc} from "../Arc";
import {Line} from "../Line";
import {Vec2} from "../../utils/Vec2";
import {Draft} from "../Draft";
import {AnnotationDrawer} from "./AnnotationDrawer";
import {TextAlign} from "../../drawingcontext/TextAlign";
import {LineType} from "../LineType";
import {LinesTypesConfig} from "./DrawingParams";

const DOT_RADIUS = 4;

class ShapesDrawer {
    public static drawArc(drawingContext: IDrawingContext, arc: Arc, color: string) {
        ShapesDrawer._initDrawingContextByLineType(drawingContext, arc.lineType);
        drawingContext.setStroke(color);
        drawingContext.beginPath();
        drawingContext.arc(arc.center, arc.radius, arc.startAngle, arc.angle);
        drawingContext.stroke();
    }

    public static drawLine(drawingContext: IDrawingContext, line: Line, color: string) {
        ShapesDrawer._initDrawingContextByLineType(drawingContext, line.lineType);
        drawingContext.setStroke(color);
        drawingContext.beginPath();
        drawingContext.moveTo(line.start);
        drawingContext.lineTo(line.end);
        drawingContext.stroke();
    }

    public static drawDot(drawingContext: IDrawingContext, position: Vec2, color: string) {
        drawingContext.setFill(color);
        drawingContext.beginPath();
        drawingContext.arc(position, DOT_RADIUS, 0, Math.PI * 2);
        drawingContext.fill();
        drawingContext.closePath();
    }

    public static drawDraft(drawingContext: IDrawingContext, draft: Draft, color: string) {
        const lineTypesComparator = (type1: LineType, type2: LineType) => type1 == type2 ? 0 : type1 < type2 ? -1 : 1;
        const lines = draft.lines.sort((a: Line, b: Line) => lineTypesComparator(a.lineType, b.lineType));
        for (const line of lines) {
            ShapesDrawer.drawLine(drawingContext, line, color);
        }
        const arcs = draft.arcs.sort((a: Arc, b: Arc) => lineTypesComparator(a.lineType, b.lineType));
        for (const arc of arcs) {
            ShapesDrawer.drawArc(drawingContext, arc, color);
        }
        for (const dot of draft.dots) {
            ShapesDrawer.drawDot(drawingContext, dot.position, color);
            drawingContext.setTextAlign(TextAlign.left);
            AnnotationDrawer.drawLabel(drawingContext, dot.label, dot.position.add(new Vec2(0, -15)))
        }
    }

    private static _initDrawingContextByLineType(drawingContext: IDrawingContext, lineType: LineType) {
        const {width, dashStyle} = LinesTypesConfig.get(lineType);
        drawingContext.setStrokeWidth(width);
        drawingContext.setLineDash(dashStyle);
    }
}

export {ShapesDrawer}