chrome.runtime.onMessage.addListener(function (request) {
  chrome.storage.local.set({ data: request.message })
})
