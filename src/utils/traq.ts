export const fetchOnPage = async (url: string) => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  if (!tab.id) return

  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async (url) => {
      const res = await fetch(url)
      const json = await res.json()
      console.log(json)
      return json
    },
    args: [url]
  })

  return result[0].result
}
