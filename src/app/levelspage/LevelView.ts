import {Component} from "../../_common/components/component/Component";
import {Level} from "../model/Level";
import {Icons} from "../../_common/components/Icons";
import {truncate} from "../../_common/utils/stringutils";

class LevelView extends Component {
    constructor(level: Level, index: number) {
        super({
            blockName: "level",
            connectionHandlers: {
                onConnected: () => this._truncateTitle(),
            },
        });
        const flipper = new Component({
            bemInfo: this.createChildBemInfo("flipper"),
        });
        this.addChild(flipper);
        const contentWrapper = new Component({
            bemInfo: this.createChildBemInfo("content-wrapper"),
        });
        flipper.addChild(contentWrapper);
        this._title = level.title;
        contentWrapper.addChild(new Component({
            bemInfo: this.createChildBemInfo("index"),
            content: index.toString()
        }));
        this._titleView = new Component({
            bemInfo: this.createChildBemInfo("title"),
        });
        contentWrapper.addChild(this._titleView);
        this.updateModifier("passed", level.passed);
        if (level.passed) {
            const passIcon = new Component({
                bemInfo: this.createChildBemInfo("pass-icon"),
                content: Icons.accept(),
            });
            flipper.addChild(passIcon);
        }
    }

    private _truncateTitle() {
        const width = this._titleView.width();
        const height = this._titleView.height();
        const font = this.getStyle('font');
        const lineHeight = parseFloat(this.getStyle('line-height'));
        const titleWidth = Math.floor(width * Math.floor(height / lineHeight));
        const title = truncate(this._title, font, titleWidth);
        this._titleView.setContent(title);
        if (this._title != title) {
            this._titleView.setAttribute('title', this._title);
        }
    }

    private readonly _titleView: Component;
    private readonly _title: string;
}

export {LevelView}