import {Component} from "../../_common/components/component/Component";
import {BasePage} from "../../_common/page/BasePage";
import {Messages} from "../../_common/lng/Messages";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";
import {PagesType} from "../../_common/page/PagesType";
import {ICustomError} from "../../_common/http/Exceptions";
import {IErrorDispatcher} from "../IErrorDispatcher";

class ErrorPage extends BasePage {
    constructor(container: HTMLElement, errorDispatcher: IErrorDispatcher, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.ErrorPage, hotKeyBinder);
        const content = new Component({blockName: "content"});
        content.addChild(this._codeView);
        content.addChild(this._message);
        this.addChild(content);
        errorDispatcher.addErrorHandler((err: ICustomError) => {
            this._code = err.code;
            this._sendChangePageRequest(PagesType.ErrorPage);
        });
    }

    protected async _beforeOpen(): Promise<void> {
        if (!this._code) {
            return;
        }
        this._codeView.updateModifier('500', this._code - this._code % 100 == 500);
        this._codeView.updateModifier('400', this._code - this._code % 100 == 400);
        this._codeView.setContent(this._code.toString());
        const message = this._getMessage(this._getMessageId(this._code));
        this._message.setContent(message);
        this.setStyle("display", "block");
    }

    private _getMessageId(code: number): string {
        switch (Math.floor(code / 100) * 100) {
            case 400:
                return "sessionFailed";
            case 500:
                return "serverIsNotResponse";
        }
        return "";
    }

    
    private _message = new Component({blockName: "message"});
    private _codeView = new Component({blockName: "error-code"});
    private _code: number|null = null;
}

export {ErrorPage};