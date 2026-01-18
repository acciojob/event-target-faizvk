class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    // Set prevents duplicate callbacks automatically
    this.listeners.get(event).add(callback);
  }

  removeEventListener(event, callback) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).delete(callback);

    // Optional cleanup if no listeners remain
    if (this.listeners.get(event).size === 0) {
      this.listeners.delete(event);
    }
  }

  dispatchEvent(event) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).forEach(callback => {
      callback();
    });
  }
}
