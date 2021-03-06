import {Component} from "../component/Component";
import {TagsName} from "../component/TagsName";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {BemInfo} from "../component/BemInfo";

class Button extends Component {
	constructor({content, bemInfo, icon, blockName}: {
		content?: string,
		icon?: string
		bemInfo?: BemInfo,
		blockName?: string,
	}) {
		super({
			tagName: TagsName.button,
			blockName: "button",
		});
		if (icon && content) {
			this.setContent(icon);
			this.addChild(new Component({
				bemInfo: this.createChildBemInfo('content'),
				content,
			}));
		}
		else {
			this.setContent(icon || content);
		}
		if (icon && !content) {
			this.addBemInfo(new BemInfo("icon-button"));
		}
		if (content && !icon) {
			this.addBemInfo(new BemInfo("content-button"));
		}
		if (blockName) {
			this.addBemInfo(new BemInfo(blockName));
		}
		if (bemInfo) {
			this.addBemInfo(bemInfo);
		}
		this._listen("click", this, (event: Event) => this._clickEvent.dispatch(event));
	}

	clickEvent(): EventDispatcher<Event> {
		return this._clickEvent;
	}

	private _clickEvent: EventDispatcher<Event> = this._createEventDispatcher();
}

export {Button};