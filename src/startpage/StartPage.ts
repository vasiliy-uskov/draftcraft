import {BasePage} from "../common/page/BasePage";
import {Component} from "../common/components/component/Component";
import {TagsName} from "../common/components/TagsName";
import {PagesType} from "../common/page/PagesType";
import {Messages} from "../common/lng/Messages";
import {Button} from "../common/components/button/Button";

class StartPage extends BasePage {
    constructor(container: HTMLElement, messages: Messages) {
        super(container, messages, PagesType.StartPage);
        const menu = new Component({
            blockName: "game-menu",
        });
        this.addChild(menu);
        const logo = new Component({
            bemInfo: menu.createChildBemInfo("game-logo"),
        });
        logo.setTextContent(this._getMessage("logo"));
        menu.addChild(logo);

        this._startButton = new Button({
            text: this._getMessage("startButton"),
            bemInfo: menu.createChildBemInfo("start-button")
        });
        menu.addChild(this._startButton);
        this._addDisposable(this._startButton);
        this._addHandler(this._startButton.clickEvent(), () => this._sendChangePageRequest(PagesType.DraftPage));

        this._levelsButton = new Button({
            text: this._getMessage("levelsButton"),
            bemInfo: menu.createChildBemInfo("levels-button")
        });
        menu.addChild(this._levelsButton);
        this._addDisposable(this._levelsButton);
        this._addHandler(this._levelsButton.clickEvent(), () => this._sendChangePageRequest(PagesType.LevelsPage));
    }

    _startButton: Button;
    _levelsButton: Button;
}

export {StartPage};