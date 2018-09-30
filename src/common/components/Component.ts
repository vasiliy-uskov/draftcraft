import {Disposable} from "../disposable/Disposable";
import {BemInfo} from "./BemInfo";

class Component extends Disposable {
    constructor(config: {
        baseElement?: HTMLElement,
        tagName?: string,
        className?: string,
        bemInfo?: BemInfo,
    }) {
        super();
        this._initBaseElement(config.tagName, config.baseElement);
        if (config.className) {
            this._bemInfo.push(new BemInfo(config.className));
        }
        if (config.bemInfo) {
            this._bemInfo.push(config.bemInfo);
        }
        this._invalidateClassName();
    }

    public addChild(child: HTMLElement) {
        this._baseElement.appendChild(child);
    }

    public insertChild(child: HTMLElement, position: number) {
        this._baseElement.insertBefore(child, this._baseElement.childNodes[position]);
    }

    public removeChild(child: HTMLElement) {
        this._baseElement.removeChild(child);
    }

    public element(): HTMLElement {
        return this._baseElement;
    }

    public width(): number {
        return this._baseElement.offsetWidth;
    }

    public height(): number {
        return this._baseElement.offsetHeight;
    }

    public x(): number {
        return this._baseElement.offsetLeft;
    }

    public y(): number {
        return this._baseElement.offsetTop;
    }

    public setWidth(width: number) {
        this.setStyle("width", `${width}px`);
    }

    public setHeight(height: number) {
        this.setStyle("height", `${height}px`);
    }

    public getClientRect(): ClientRect {
        return this._baseElement.getBoundingClientRect();
    }

    public applyStyles(stylesList: {[key:string]: string}) {
        for (const style in stylesList) {
            this.setStyle(style, <string>(stylesList[style]));
        }
    }

    public createChildBemInfo(elementName: string): BemInfo {
        return new BemInfo(this._bemInfo[0].blockName(), elementName);
    }

    public setStyle(style: string, value: string|number) {
        const prevStyle = this._baseElement.getAttribute("style");
        this._baseElement.setAttribute("style", prevStyle + ";" + `${style}: ${value}`);
    }

    public updateModifier(modifier: string, value: string|number|boolean) {
        this._bemInfo[0].updateModifier(modifier, value);
        this._invalidateClassName()
    }

    public addBemInfo(bemInfo: BemInfo) {
        this._bemInfo.push(bemInfo);
        this._invalidateClassName();
    }

    private _invalidateClassName() {
        let className = "";
        for (const bemInfo of this._bemInfo) {
            className += className ? " " + bemInfo.getClassName() : bemInfo.getClassName();
        }
        this._baseElement.setAttribute("class", className)
    }

    private _initBaseElement(tagName?: string, baseElement?: HTMLElement) {
        if (baseElement && tagName) {
            throw new Error("Undefined behavior: tagName and baseElement is set");
        }
        else if (!baseElement && !tagName) {
            throw new Error("Undefined behavior: tagName and baseElement is unset");
        }
        if (baseElement) {
            this._baseElement = baseElement;
        }
        if (tagName) {
            this._baseElement = document.createElement(tagName);
        }
    }

    _bemInfo: Array<BemInfo> = [];
    _baseElement: HTMLElement;
}

export {Component}