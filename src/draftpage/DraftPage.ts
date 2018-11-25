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
import {EraserTool} from "./tools/eraser/EraserTool";
import {InfoPopup} from "./popup/InfoPopup";
import {HelpPopup} from "./popup/HelpPopup";
import {TaskPopup} from "./popup/TaskPopup";
import {BackButton} from "../common/components/button/BackButton";
import {Button} from "../common/components/button/Button";

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

        this._addDisposable(this._taskPopup);
        this.addChild(this._taskPopup);

        this._addDisposable(this._helpPopup);
        this.addChild(this._helpPopup);

        const backButton = new BackButton();
        this._addDisposable(backButton);
        this.addChild(backButton);
        this._addHandler(backButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));

        const finishButton = new Button({
            blockName: "finish-button",
            content: this._getMessage("finishButton"),
        });
        this._addDisposable(finishButton);
        this.addChild(finishButton);
        this._addHandler(finishButton.clickEvent(), () => {
            const data = [];
            for (const change of this._changes) {
                data.push(change.serialize())
            }
            this._gameContext.setCurrentLevelAnswer(JSON.stringify(data));
            this._sendChangePageRequest(PagesType.ResultPage)
        });
    }

    protected _beforeOpen() {
        const currentLevel = this._gameContext.currentLevel();
        this._workplace.setBackgroundImage(currentLevel.img());
        this._taskPopup.setTextContent(currentLevel.task());
        this._helpPopup.setTextContent(currentLevel.help());
        this._taskPopup.setActivated(true);
    }

    protected _beforeClose() {
        this._taskPopup.setActivated(false);
        this._helpPopup.setActivated(false);
        this._changes = [];
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
        const eraserTool =  new EraserTool(this._workplace.workingCanvasContext(), this._workplace.canvasMouseEventDispatcher());
        this._addDisposable(eraserTool);
        return [{
            icon: Icons.line(),
            tool: lineTool,
        }, {
            icon: Icons.compass(),
            tool: compassTool,
        }, {
            icon: Icons.eraser(),
            tool: eraserTool,
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

    private _invalidateResultCanvas() {
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
    private _helpPopup: InfoPopup = new HelpPopup(this._getMessage("help"));
    private _taskPopup: InfoPopup = new TaskPopup(this._getMessage("task"));
    private _toolbar: Toolbar<ITool> = new Toolbar();
}

export {DraftPage};