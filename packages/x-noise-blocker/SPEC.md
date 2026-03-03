## **Technical Specification: FocusList for X**

### **1. Core Objective**

To intercept any navigation to `x.com` (or `twitter.com`) and redirect the user immediately to a specific, hardcoded List URL, while simultaneously hiding navigation elements that lead back to the algorithmic feed.

### **2. Architecture Overview**

* **Manifest V3:** The modern standard for Chrome Extensions.
* **Background Script (Service Worker):** Handles the URL redirection logic.
* **Content Script:** Injected into the page to inject CSS that hides unwanted UI elements (sidebar, home button, explore tab, etc.).
* **Declarative Net Request:** (Optional but recommended) For high-performance redirection.

---

### **3. File Structure**

```text
focus-list-x/
├── manifest.json
├── background.js
├── styles.css
└── icons/
    ├── icon16.png
    └── icon48.png

```

---

### **4. Detailed Components**

#### **A. Redirection Logic (`background.js`)**

The extension will monitor the browser's navigation. If the URL matches `x.com` but *is not* the specific list URL, it will trigger a redirect. To facilitate research and quick glances, it will also automatically open Google Gemini in an adjacent tab, allowing the user to easily snap them side-by-side using Chrome's Split View.

* **Target URL:** `https://x.com/i/lists/2022594617166979299`
* **Secondary Action:** Open `https://gemini.google.com/app` in a new adjacent tab without switching focus.
* **Logic:** ```javascript
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const targetList = "https://x.com/i/lists/2022594617166979299";

  if (changeInfo.url) {
    if (changeInfo.url.includes(targetList) || (!changeInfo.url.includes("x.com") && !changeInfo.url.includes("twitter.com"))) {
      return;
    }

    chrome.tabs.update(tabId, { url: targetList }, () => {
      chrome.tabs.create({ url: "https://gemini.google.com/app", index: tab.index + 1, active: false });
    });
  }
});
```



#### **B. UI Sanitization (`styles.css`)**

To ensure you don't get distracted once you are on the list page, the content script will hide:

* The **"Home"** button (to prevent clicking back to the feed).
* The **"Explore"** tab.
* The **"Grok"** or **"Premium"** tabs.
* The **"What's happening"** (Trending) sidebar.
* The **"Who to follow"** widgets.

#### **C. Permissions Required (`manifest.json`)**

* `declarativeNetRequest` or `webNavigation`: To handle the heavy lifting of redirects.
* `host_permissions`: Access to `*://x.com/*` and `*://twitter.com/*`.

---

### **5. Implementation Roadmap**

| Phase | Task | Description |
| --- | --- | --- |
| **1** | **Manifest Setup** | Define permissions and match patterns for X. |
| **2** | **Redirect Engine** | Implement the logic to force the List URL as the entry point. |
| **3** | **DOM Cleanup** | Identify the specific CSS selectors for X’s sidebar elements to hide them. |
| **4** | **Testing** | Ensure that navigating to `x.com/home` or `x.com/explore` successfully bounces back to the list. |

---

### **6. Risks & Constraints**

* **X's Dynamic Selectors:** X uses obfuscated CSS classes (e.g., `css-175oi2r`). The extension will need to target elements via `aria-label` (like `aria-label="Home"`) to remain resilient to site updates.
* **Infinite Loops:** The redirect logic must check if the current URL is *already* the target list to avoid a constant refresh loop.

---