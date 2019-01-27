import {Component} from "../../_common/components/component/Component";

class ErrorPage extends Component {
    constructor(baseElement: HTMLElement) {
        super({baseElement, blockName: "page"});
        const content = new Component({blockName: "content"});
        content.addChild(this._code);
        content.addChild(this._message);
        this.addChild(content);
    }

    public open(code: number, message: string) {
        this._code.updateModifier('500', code - code % 100 == 500);
        this._code.updateModifier('400', code - code % 100 == 400);
        this._code.setContent(code.toString());
        this._message.setContent(message);
        this.setStyle("display", "block");
    }

    public hide() {
        this.setStyle("display", "");
    }

    private _message = new Component({blockName: "message"});
    private _code = new Component({blockName: "error-code"});
}

export {ErrorPage};