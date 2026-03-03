# FocusList for X

A Chrome extension that intercepts navigation to the algorithmic feed on X (formerly Twitter) and redirects you to a hardcoded Focus List. It also hides highly distracting UI elements and automatically opens Google Gemini in an adjacent tab for quick research capabilities.

## Features
- Automatically redirects from `x.com` or `twitter.com` feeds to a designated Focus List.
- Hides distracting "Home," "Explore," "Trends," and other UI elements.
- Opens `gemini.google.com` in an adjacent background tab automatically upon redirection.

## Installation

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top right corner.
3. Click the **Load unpacked** button in the top left.
4. Select the `vibe-apps-monorepo/packages/x-noise-blocker/focus-list-x` directory.
5. The extension is now installed and active!

## Usage: Gemini Split View

When you navigate to `x.com` or `twitter.com`, the extension will automatically redirect you to your Focus List and open Google Gemini in an adjacent tab. To view them together:
1. Right-click on either the X tab or the Gemini tab.
2. Select **Add Tab to New Split View**.
3. You can now use X and Gemini seamlessly side-by-side!
