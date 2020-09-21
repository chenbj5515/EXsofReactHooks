let fnSet = new Set();
export const getTargetElement = target => {
    let targetElement;
    if (typeof target === 'function') {
        targetElement = target();
      } else if ('current' in target) {
        targetElement = target.current;
      } else {
        targetElement = target;
      }
    
      return targetElement;
}
export const factory = (hook, newHook) => {
  hook = fnSet.has(newHook) ? hook : newHook;
}