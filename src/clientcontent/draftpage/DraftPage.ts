import {BasePage} from "../../_common/page/BasePage";
import {GameContext} from "../GameContext";
import {Messages} from "../../_common/lng/Messages";
import {PagesType} from "../../_common/page/PagesType";
import {Workplace} from "../../_common/components/workplace/Workplace";
import {Toolbar} from "../../_common/components/toolbar/Toolbar";
import {BackButton} from "../../_common/components/button/BackButton";
import {Button} from "../../_common/components/button/Button";
import {ActionController} from "../../_common/action/ActionController";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";
import {InfoPopup} from "../../_common/components/popup/InfoPopup";
import {TaskView} from "./TaskView";
import {Component} from "../../_common/components/component/Component";
import {ToolsCreator} from "./ToolsCreator";

class DraftPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.DraftPage, hotKeyBinder);

        this._gameContext = gameContext;

        const taskWrapper = new Component({blockName: "task-wrapper"});
        this.addChild(taskWrapper);
        this._addDisposable(this._taskView);
        taskWrapper.addChild(this._taskView);
        this._addHandler(this._taskView.helpRequestEvent(), () => this._helpPopup.open());

        this._addDisposable(this._workplace);
        this.addChild(this._workplace);
        this._addHandler(this._workplace.actionCreatedEvent(), (action: IAction) => {
            this._actionController.execute(action)
        });

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);
        this._addHandler(this._toolbar.toolChangedEvent(), (action: IAction) => {
            this._actionController.execute(action)
        });

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
        this._taskView.setContent(currentLevel.task());
        this._helpPopup.setContent(currentLevel.help());
        this._toolbar.activateFirstTool();
    }

    protected async _beforeClose() {
        this._helpPopup.setActivated(false);
    }

    protected async _afterClose() {
        this._workplace.clean();
    }

    private _gameContext: GameContext;
    private _actionController = new ActionController();
    private _helpPopup = new InfoPopup({blockName: "help-popup"});
    private _workplace = new Workplace(new ToolsCreator());
    private _taskView = new TaskView(this._getMessage("helpButtonHint"));
    private _toolbar = new Toolbar(this._workplace.tools());
}

export {DraftPage};