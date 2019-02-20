import {LineType} from "../LineType";

const DrawingParams = new class {
    public linesColor(): string {return "#555555"}
    public selectedLinesColor(): string {return "#AD731D"}
    public linesWidth(): number {return 2}
    public font():string {return "normal 24px Helvetica"}
    public textFill():string {return "#343434"}
};

type LineConfig = {
    width: number,
    dashStyle: Array<number>,
};

const LinesTypesConfig = new Map<LineType, LineConfig>();
LinesTypesConfig.set(LineType.thickSolid, {
    width: 2,
    dashStyle: [],
});
LinesTypesConfig.set(LineType.thinSolid, {
    width: 1,
    dashStyle: [],
});
LinesTypesConfig.set(LineType.dash, {
    width: 1,
    dashStyle: [20, 10],
});
LinesTypesConfig.set(LineType.dashDotted, {
    width: 1,
    dashStyle: [30, 10, 2, 10],
});

export {DrawingParams, LinesTypesConfig}