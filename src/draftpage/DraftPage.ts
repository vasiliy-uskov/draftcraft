import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Workplace} from "./workplace/Workplace";
import {Toolbar} from "./tools/Toolbar";
import {ITool} from "./tools/ITool";
import {Icons} from "../common/components/Icons";
import {LineTool} from "./tools/line/LineTool";
import {IChange} from "./tools/IChange";
import {CompassTool} from "./tools/compass/CompassTool";

class DraftPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages) {
        super(container, messages, PagesType.DraftPage);

        this._gameContext =  gameContext;

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._addHandler(this._toolbar.toolChoseEvent(), (tool: ITool) => this._setCurrentTool(tool));
        const tools = this._createTools();
        this._toolbar.initTools(tools);
        this._addToolsHandler(tools.map((el) => el.tool));

        this._addDisposable(this._workplace);
        this.addChild(this._workplace);

    }

    protected _beforeOpen() {
        this._workplace.setBackgroundImage(this._gameContext.currentLevel().img());
    }

    private _setCurrentTool(tool: ITool): void {
        if (this._currentTool) {
            this._currentTool.deactivate();
        }
        this._currentTool = tool;
        this._currentTool.activate();
    }

    private _createTools(): Array<{icon: string, tool: ITool}> {
        const lineTool = new LineTool(this._workplace.workingCanvasContext(), this._workplace.canvasMouseEventDispatcher());
        this._addDisposable(lineTool);
        const compassTool =  new CompassTool(this._workplace.workingCanvasContext(), this._workplace.canvasMouseEventDispatcher());
        this._addDisposable(compassTool);
        return [{
            icon: Icons.line(),
            tool: lineTool,
        }, {
            icon: Icons.compass(),
            tool: compassTool,
        }];
    }

    private _addToolsHandler(tools: Array<ITool>) {
        for (const tool of tools) {
            this._addHandler(tool.changeEvent(), (change: IChange) => {
                this._changes.push(change);
                this._invalidateResultCanvas();
            })
        }
    }

    _invalidateResultCanvas() {
        const resultCanvasContext = this._workplace.resultsCanvasContext();
        resultCanvasContext.clean();
        for (const change of this._changes) {
            change.execute(resultCanvasContext);
        }
    }

    private _currentTool?: ITool;
    private _gameContext: GameContext;
    private _changes: Array<IChange> = [];
    private _workplace: Workplace = new Workplace();
    private _toolbar: Toolbar<ITool> = new Toolbar();
}

export {DraftPage};