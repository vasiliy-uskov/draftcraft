import {IShape} from "../tools/IShape";
import {ShapesHolder} from "../ShapesHolder";

class AddShapeAction implements IAction {
    constructor(shapes: ShapesHolder, newShapes: IShape) {
        this._shapes = shapes;
        this._newShape = newShapes;
    }

    public execute(): void {
        this._shapes.add(this._newShape);
    }

    public unexecute(): void {
        this._shapes.delete(this._newShape);
    }

    private readonly _shapes: ShapesHolder;
    private readonly _newShape: IShape;
}

export {AddShapeAction};