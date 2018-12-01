const polyfills = () => {
    const w = window as any;
    w.requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || w["msRequestAnimationFrame"] || w["mozRequestAnimationFrame"];
};
export {polyfills};