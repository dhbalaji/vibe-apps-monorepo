chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const targetList = "https://x.com/i/lists/2022594617166979299";

  if (changeInfo.url) {
    // If the URL is already the target or doesn't include x.com/twitter.com, do nothing
    if (changeInfo.url.includes(targetList) || (!changeInfo.url.includes("x.com") && !changeInfo.url.includes("twitter.com"))) {
      return;
    }

    // Only redirect if trying to access feed or other parts of x.com/twitter.com
    chrome.tabs.update(tabId, { url: targetList }, () => {
      chrome.tabs.create({ url: "https://gemini.google.com/app", index: tab.index + 1, active: false });
    });
  }
});
