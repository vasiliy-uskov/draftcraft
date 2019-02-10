import {binarySearch} from "./mathutils";

function toCamelCase(str: string): string {
    return String(str).replace(/-([a-z])/g, (all: string, match: string) => { return match.toUpperCase(); });
}

const ELLIPSIS = '…';
const canvas = document.createElement("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

function truncate(str: string, font: string, width: number): string {
    context.font = font;
    const result = (len: number) => len == str.length ? str : str.substr(0, len) + ELLIPSIS;
    const measureText = (length: number) => context.measureText(result(length)).width;
    if (measureText(str.length) <= width) {
        return str;
    }
    return result(
        binarySearch(
            0, str.length,
            (start: number, end: number) =>
                measureText(start) > width && width < measureText(end)
        )
    );
}

export {toCamelCase, truncate}