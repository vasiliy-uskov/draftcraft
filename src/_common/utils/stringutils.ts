
function toCamelCase(str: string): string {
    return String(str).replace(/-([a-z])/g, (all: string, match: string) => { return match.toUpperCase(); });
}

export {toCamelCase}