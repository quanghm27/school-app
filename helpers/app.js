import EventRegistry from './EventRegistry'

export default () => {
  const { os } = window.deviceInfo || {}

  const onMessageHandler = e => {
    const { type, payload } = JSON.parse(e.data)
    EventRegistry.emit(type, payload)
  }

  if (os === 'ios') {
    window.addEventListener('message', onMessageHandler)
  } else {
    document.addEventListener('message', onMessageHandler)
  }

  return {
    dispatch: ({ type, payload }) => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }))
      }
    },
    on: (event, callback) => EventRegistry.addListener(event, callback),
  }
}
