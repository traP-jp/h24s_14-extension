alert('ok!')

chrome.runtime.onMessage.addListener(function (message: message, sendResponse) {
  switch (message.method) {
    case 'edit':
      alert('発信成功！')
      break
  }
})
