// background.jsにメッセージを送信
chrome.runtime.sendMessage({
    message: 'contextscript.jsから送るメッセージ',
  })
  
  