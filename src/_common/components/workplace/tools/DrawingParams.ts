const DrawingParams = new class {
    public linesColor(): string {return "#555555"}
    public selectedLinesColor(): string {return "#AD731D"}
    public linesWidth(): number {return 2}

    public eraserColor(): string {return "#E5E5E5"}
    public eraserBorderColor(): string {return "#B7B7B7"}
    public eraserBorderWidth(): number {return 3}
    public eraserSize(): number {return 20}
    public eraserCornerRounding(): number {return 4}
    public font():string {return "normal 24px Helvetica"}
    public textFill():string {return "#343434"}
};


export {DrawingParams}