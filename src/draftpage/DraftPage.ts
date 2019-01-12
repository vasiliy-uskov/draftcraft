import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Workplace} from "./workplace/Workplace";
import {Toolbar} from "./toolbar/Toolbar";
import {HelpPopup} from "./popup/HelpPopup";
import {TaskPopup} from "./popup/TaskPopup";
import {BackButton} from "../common/components/button/BackButton";
import {Button} from "../common/components/button/Button";
import {ActionController} from "../common/action/ActionController";
import {HotKeyBinder} from "../common/hotkeys/HotKeysBinder";
import {ChangeToolAction} from "./action/ChangeToolAction";
import {AddChangeAction} from "./action/AddChangeAction";

class DraftPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.DraftPage, hotKeyBinder);

        this._gameContext = gameContext;

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._addHandler(this._toolbar.toolChangedEvent(), (action: ChangeToolAction) => {
            this._actionController.execute(action)
        });

        this._addDisposable(this._workplace);
        this.addChild(this._workplace);
        this._addHandler(this._workplace.changeCreatedEvent(), (action: AddChangeAction) => {
            this._actionController.execute(action)
        });


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
            this._setLevelAnswer();
            this._sendChangePageRequest(PagesType.ResultPage);
        });
    }

    private _setLevelAnswer() {
        this._addClosingParallelTask(() => {
            const answer = this._workplace.getSerializedChanges();
            return this._gameContext.setCurrentLevelAnswer(answer);
        });
    }

    protected _initHotKeyBinder(hotKeyBinder: HotKeyBinder) {
        hotKeyBinder.setActionController(this._actionController);
        hotKeyBinder.setResetHandler(() => this._toolbar.resetTools())
    }

    protected async _beforeOpen() {
        this._actionController.clean();
        const currentLevel = await this._gameContext.currentLevel();
        this._workplace.setBackgroundImage(currentLevel.img());
        this._taskPopup.setTextContent(currentLevel.task());
        this._helpPopup.setTextContent(currentLevel.help());
        this._taskPopup.setActivated(true);
        this._toolbar.activateFirstTool();
    }

    protected async _beforeClose() {
        this._taskPopup.setActivated(false);
        this._helpPopup.setActivated(false);
    }

    protected async _afterClose() {
        this._workplace.clean();
    }

    private _gameContext: GameContext;
    private _actionController = new ActionController();
    private _helpPopup = new HelpPopup(this._getMessage("help"));
    private _taskPopup = new TaskPopup(this._getMessage("task"));
    private _workplace = new Workplace();
    private _toolbar = new Toolbar(this._workplace.tools());
}

export {DraftPage};