import {Disposable} from "../../disposable/Disposable";
import {BemInfo} from "./BemInfo";
import {TagsName} from "./TagsName";
import {toCamelCase} from "../../utils/stringutils";
import {IListenable} from "../../disposable/IListenable";
import {Vec2} from "../../utils/Vec2";
import {FramesController} from "../../animation/FramesController";
import {Size} from "../../utils/Size";

type ConnectionHandlers = {
	onConnected?: () => void,
	onDisconnected?: () => void,
};

class Component extends Disposable implements IListenable {
	constructor(config: {
		baseElement?: HTMLElement,
		tagName?: TagsName,
		blockName?: string,
		bemInfo?: BemInfo,
		content?: string,
		connectionHandlers?: ConnectionHandlers
	}) {
		super();
		this._baseElement = Component._initBaseElement(config.tagName, config.baseElement);
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
		this._initConnectionObserver(config.connectionHandlers)
	}

	public addChild(component: Component | Node) {
		const element = component instanceof Node ? component : component.element();
		this._baseElement.appendChild(element);
	}

	public insertChild(component: Component | Node, position: number) {
		const element = component instanceof Node ? component : component.element();
		this._baseElement.insertBefore(element, this._baseElement.childNodes[position]);
	}

	public removeChild(component: Component | Node) {
		const element = component instanceof Node ? component : component.element();
		this._baseElement.removeChild(element);
	}

	public setContent(content: string) {
		this._baseElement.innerHTML = content;
	}

	public setTextContent(text: string) {
		this.addChild(document.createTextNode(text));
	}

	public removeChildren() {
		const children = Array.from(this._baseElement.children);
		for (const child of children) {
			this.removeChild(child);
		}
	}

	public focus() {
		this._baseElement.focus();
	}

	public blur() {
		this._baseElement.blur();
	}

	public eventTarget(): EventTarget {
		return this._baseElement;
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

	public setSize(size: Size) {
		this.applyStyles({
			width: `${size.width}px`,
			height: `${size.height}px`,
		})
	}

	public setX(width: number) {
		this.setStyle("left", `${width}px`);
	}

	public setY(height: number) {
		this.setStyle("top", `${height}px`);
	}

	public move(position: Vec2) {
		this.setX(position.x);
		this.setY(position.y);
	}

	public getClientRect(): ClientRect {
		return this._baseElement.getBoundingClientRect();
	}

	public applyStyles(stylesList: { [key: string]: string }) {
		for (const style in stylesList) {
			this.setStyle(style, stylesList[style]);
		}
	}

	public createChildBemInfo(elementName: string): BemInfo {
		return new BemInfo(this._bemInfo[0].blockName(), elementName);
	}

	public setStyle(styleName: string, value: string | number) {
		this._computedStyles = null;
		const setStyle = (style: string, value: string | number) => {
			const styles = this._baseElement.style as any as { [key: string]: string }; //setProperty process pointer-events incorrect
			styles[style] = value.toString();
		};
		styleName = toCamelCase(styleName);
		const stylesToSet = [styleName];
		if (!this._baseElement.style.hasOwnProperty(styleName)) {
			stylesToSet.push("Webkit" + styleName.substr(0, 1).toUpperCase() + styleName.substr(1, styleName.length));
			stylesToSet.push("Moz" + styleName.substr(0, 1).toUpperCase() + styleName.substr(1, styleName.length));
			stylesToSet.push("ms" + styleName.substr(0, 1).toUpperCase() + styleName.substr(1, styleName.length));
			stylesToSet.push("O" + styleName.substr(0, 1).toUpperCase() + styleName.substr(1, styleName.length));
		}
		for (const style of stylesToSet) {
			setStyle(style, value);
		}
	}

	public getStyle(style: string): string {
		if (!this._computedStyles) {
			this._computedStyles = getComputedStyle(this._baseElement);
		}
		return this._computedStyles.getPropertyValue(style);
	}

	public setAttribute(atrName: string, atrValue: string) {
		this._baseElement.setAttribute(atrName, atrValue);
		this._computedStyles = null;
	}

	public updateModifier(modifier: string, value: string | number | boolean) {
		this._bemInfo[0].updateModifier(modifier, value);
		this._invalidateClassName()
	}

	public addBemInfo(bemInfo: BemInfo) {
		this._bemInfo.push(bemInfo);
		this._invalidateClassName();
	}

	private _invalidateClassName() {
		this._computedStyles = null;
		let className = "";
		for (const bemInfo of this._bemInfo) {
			className += className ? " " + bemInfo.getClassName() : bemInfo.getClassName();
		}
		this._baseElement.setAttribute("class", className)
	}

	private _initConnectionObserver(connectionHandlers?: ConnectionHandlers) {
		if (!connectionHandlers) {
			return;
		}
		const {onConnected, onDisconnected} = connectionHandlers;
		if (!onConnected && !onDisconnected) {
			return;
		}
		let prevParentNode = this._baseElement.parentNode;
		this._frameHandler = () => {
			const newParentNode = this._baseElement.parentNode;
			if (newParentNode == prevParentNode) {
				return;
			}
			if (newParentNode && onConnected) {
				onConnected();
			} else if (onDisconnected) {
				onDisconnected();
			}
			prevParentNode = newParentNode;
		};
		FramesController.addFrameHandler(this._frameHandler)
	}

	private static _initBaseElement(tagName?: TagsName, baseElement?: HTMLElement): HTMLElement {
		if (baseElement) {
			return baseElement;
		}
		if (tagName || !baseElement) {
			tagName = tagName ? tagName : TagsName.div;
			return document.createElement(tagName);
		}
		throw new Error("Undefined behavior: tagName and baseElement is set");
	}

	protected _destruct() {
		super._destruct();
		FramesController.removeFrameHandler(this._frameHandler)
	}

	private _bemInfo: Array<BemInfo> = [];
	private _baseElement: HTMLElement;
	private _computedStyles: CSSStyleDeclaration | null = null;
	private _frameHandler: (() => void) | null = null;
}

export {Component, ConnectionHandlers}