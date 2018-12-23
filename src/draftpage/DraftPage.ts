import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../GameContext";
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
import {HelpPopup} from "./popup/HelpPopup";
import {TaskPopup} from "./popup/TaskPopup";
import {BackButton} from "../common/components/button/BackButton";
import {Button} from "../common/components/button/Button";
import {ChangesHolder} from "./ChangesHolder";
import {ActionController} from "../common/action/ActionController";
import {AddChangeAction} from "./action/AddChangeAction";
import {HotKeyBinder} from "../common/hotkeys/HotKeysBinder";
import {ChangeToolAction} from "./action/ChangeToolAction";

class DraftPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.DraftPage, hotKeyBinder);

        this._gameContext =  gameContext;

        this._addHandler(this._changes.invalidateRequestEvent(), this._invalidateResultCanvas.bind(this));

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._addHandler(this._toolbar.toolChoseEvent(), (action: ChangeToolAction) => this._actionController.execute(action));
        const tools = this._createTools();
        this._toolbar.initTools(tools);
        tools.forEach(({tool}) => {
            this._addDisposable(tool);
            this._addHandler(tool.changeEvent(), (change: IChange) => {
                this._actionController.execute(new AddChangeAction(this._changes, change));
            })
        });

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
        this._addHandler(finishButton.clickEvent(), async () => {
            await this._gameContext.setCurrentLevelAnswer(this._getAnswer());
            this._sendChangePageRequest(PagesType.ResultPage);
        });
    }

    protected _initHotKeyBinder(hotKeyBinder: HotKeyBinder) {
        hotKeyBinder.setActionController(this._actionController);
    }

    protected async _beforeOpen() {
        const currentLevel = await this._gameContext.currentLevel();
        this._workplace.setBackgroundImage(currentLevel.img());
        this._taskPopup.setTextContent(currentLevel.task());
        this._helpPopup.setTextContent(currentLevel.help());
        this._taskPopup.setActivated(true);
        this._actionController.clean();
    }

    protected async _beforeClose() {
        this._taskPopup.setActivated(false);
        this._helpPopup.setActivated(false);
        this._changes.clean();
    }

    private _getAnswer(): string {
        const data = [];
        for (const change of this._changes.toArray()) {
            data.push(change.serialize())
        }
        console.log(data, JSON.stringify(data));
        return JSON.stringify(data);
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

    private _invalidateResultCanvas(changes: Array<IChange>) {
        const resultCanvasContext = this._workplace.resultsCanvasContext();
        resultCanvasContext.clean();
        for (const change of changes) {
            change.execute(resultCanvasContext);
        }
    }

    private _gameContext: GameContext;
    private _actionController = new ActionController();
    private _changes = new ChangesHolder();
    private _workplace = new Workplace();
    private _helpPopup = new HelpPopup(this._getMessage("help"));
    private _taskPopup = new TaskPopup(this._getMessage("task"));
    private _toolbar = new Toolbar();
}

export {DraftPage};