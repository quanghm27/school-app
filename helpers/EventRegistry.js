class EventRegistry {
  callbacks = {}

  addListener(event, cb) {
    this.callbacks[event] = this.callbacks[event] || []
    this.callbacks[event].push(cb)
    return () => {
      const index = this.callbacks[event].indexOf(cb)
      this.callbacks[event].splice(index, 1)
    }
  }

  emit(event, data) {
    this.callbacks[event] = this.callbacks[event] || []
    this.callbacks[event].forEach(cb => cb(data))
  }
}

export default new EventRegistry()
