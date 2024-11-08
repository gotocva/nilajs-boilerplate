import { EventEmitter } from 'events';

class EventPolicy extends EventEmitter {
  // Trigger an event by name with the associated data
  triggerEvent(eventName, data) {
    this.emit(eventName, data);
  }

  // Subscribe to an event with a specific listener
  onEvent(eventName, listener) {
    this.on(eventName, listener);
  }

  // Optionally, we could add additional policies here (e.g., event once, event throttling, etc.)
}

export default new EventPolicy();