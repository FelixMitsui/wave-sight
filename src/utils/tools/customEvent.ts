
const event = new Event('sessionStorageChange');

export function triggerSessionStorageChange() {
    window.dispatchEvent(event);
}