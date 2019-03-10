import {BasePage} from "../../_common/page/BasePage";
import {Component} from "../../_common/components/component/Component";
import {PagesType} from "../../_common/page/PagesType";
import {Messages} from "../../_common/lng/Messages";
import {Button} from "../../_common/components/button/Button";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";

class StartPage extends BasePage {
	constructor(container: HTMLElement, messages: Messages, hotKeyBinder: HotKeyBinder) {
		super(container, messages, PagesType.StartPage, hotKeyBinder);
		const menu = new Component({
			blockName: "game-menu",
		});
		this.addChild(menu);
		const logo = new Component({
			bemInfo: menu.createChildBemInfo("game-logo"),
		});
		logo.setTextContent(this._getMessage("logo"));
		menu.addChild(logo);

		const startButton = new Button({
			content: this._getMessage("startButton"),
			bemInfo: menu.createChildBemInfo("start-button")
		});
		menu.addChild(startButton);
		this._addDisposable(startButton);
		this._addHandler(startButton.clickEvent(), () => this._sendChangePageRequest(PagesType.DraftPage));

		const levelsButton = new Button({
			content: this._getMessage("levelsButton"),
			bemInfo: menu.createChildBemInfo("levels-button")
		});
		menu.addChild(levelsButton);
		this._addDisposable(levelsButton);
		this._addHandler(levelsButton.clickEvent(), () => this._sendChangePageRequest(PagesType.LevelsPage));
	}
}

export {StartPage};