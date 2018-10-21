
function toCamelCase(str: string): string {
    return String(str).replace(/\-([a-z])/g, function(all, match) { return match.toUpperCase(); });
}

export {toCamelCase}