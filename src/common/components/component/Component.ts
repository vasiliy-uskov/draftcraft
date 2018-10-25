import {Disposable} from "../../disposable/Disposable";
import {BemInfo} from "./BemInfo";
import {TagsName} from "../TagsName";
import {toCamelCase} from "../../utils/stringutils";

class Component extends Disposable {
    constructor(config: {
        baseElement?: HTMLElement,
        tagName?: TagsName,
        blockName?: string,
        bemInfo?: BemInfo,
        content?: string,
    }) {
        super();
        this._initBaseElement(config.tagName, config.baseElement);
        if (config.blockName) {
            this._bemInfo.push(new BemInfo(config.blockName));
        }
        if (config.bemInfo) {
            this._bemInfo.push(config.bemInfo);
        }
        if (config.content) {
            this._baseElement.innerHTML = config.content;
        }
        this._invalidateClassName();
    }

    public addChild(component: Component|Node) {
        const element = component instanceof Node ? component : component.element();
        this._baseElement.appendChild(element);
    }

    public insertChild(component: Component|Node, position: number) {
        const element = component instanceof Node ? component : component.element();
        this._baseElement.insertBefore(element, this._baseElement.childNodes[position]);
    }

    public removeChild(component: Component|Node) {
        const element = component instanceof Node ? component : component.element();
        this._baseElement.removeChild(element);
    }

    removeChildren() {
        const children = this._baseElement.children;
        for (let i = 0; i < children.length; ++i) {
            this.removeChild(children[i]);
        }
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

    setTextContent(text: string) {
        this.addChild(document.createTextNode(text));
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
        style = toCamelCase(style);
        const setStyle = (style: string, value: string|number) => this._baseElement.style.setProperty(style, value.toString());
        const stylesToSet = [style];
        if (!this._baseElement.style.hasOwnProperty(style)) {
            stylesToSet.push("Webkit" + style.substr(0, 1).toUpperCase() + style.substr(1, style.length));
            stylesToSet.push("Moz" + style.substr(0, 1).toUpperCase() + style.substr(1, style.length));
            stylesToSet.push("ms" + style.substr(0, 1).toUpperCase() + style.substr(1, style.length));
            stylesToSet.push("O" + style.substr(0, 1).toUpperCase() + style.substr(1, style.length));
        }
        for (const style of stylesToSet) {
            setStyle(style, value);
        }
    }

    public updateModifier(modifier: string, value: string|number|boolean) {
        this._bemInfo[this._bemInfo.length - 1].updateModifier(modifier, value);
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

    private _initBaseElement(tagName?: TagsName, baseElement?: HTMLElement) {
        if (baseElement && tagName) {
            throw new Error("Undefined behavior: tagName and baseElement is set");
        }
        if (baseElement) {
            this._baseElement = baseElement;
        }
        if (tagName || !baseElement) {
            tagName = tagName ? tagName : TagsName.div;
            this._baseElement = document.createElement(tagName);
        }
    }

    _bemInfo: Array<BemInfo> = [];
    _baseElement: HTMLElement;
}

export {Component}