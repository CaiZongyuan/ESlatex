# Zhihu LaTeX Copier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) A simple browser extension to easily copy LaTeX mathematical formulas from Zhihu (知乎) pages.

## Description

Zhihu is a popular Q&A platform where users often share complex mathematical formulas using LaTeX. However, directly copying the underlying LaTeX code can be cumbersome. This extension solves that problem by adding a convenient "Copy LaTeX" button that appears when you hover over a formula.

## Features

* **Easy Copying:** Adds a button to copy LaTeX directly from Zhihu formulas.
* **Hover Activation:** The copy button appears when you hover over a math formula (`span.ztext-math`).
* **Automatic Formatting:** The copied LaTeX code is automatically enclosed in `$` delimiters (e.g., `$E=mc^2$`), ready to be pasted into Markdown or other LaTeX environments.
* **Tag Removal:** Automatically removes `\tag{...}` elements often present in Zhihu formulas before copying.
* **Dynamic Content Support:** Uses `MutationObserver` to work correctly even with dynamically loaded content on Zhihu pages (e.g., scrolling down to load more answers).
* **User Feedback:** The button briefly changes text to "Copied!" after a successful copy.

## Installation

Since this extension is not yet on an official browser store, you can install it manually:

1.  **Download:** Download the extension files (or clone this repository). You will need at least:
    * The JavaScript file (`your_script_name.js` - containing the code you provided).
    * A `manifest.json` file (see **Manifest File** section below).
    * (Optional) An icon file.
2.  **Open Extensions Page:**
    * **Chrome/Edge:** Navigate to `chrome://extensions` or `edge://extensions`.
    * **Firefox:** Navigate to `about:debugging#/runtime/this-firefox`.
3.  **Enable Developer Mode:**
    * **Chrome/Edge:** Toggle the "Developer mode" switch, usually in the top-right corner.
    * **Firefox:** Click "Load Temporary Add-on...".
4.  **Load the Extension:**
    * **Chrome/Edge:** Click "Load unpacked" and select the directory containing the extension files (`manifest.json`, `.js` file).
    * **Firefox:** Select either the `manifest.json` file or the `.zip` file if you packaged it.

The extension should now be installed and active.

## Usage

1.  Navigate to any Zhihu page that contains LaTeX math formulas (e.g., an answer or article).
2.  Hover your mouse cursor over the formula you wish to copy.
3.  A "Copy LaTeX" button will appear slightly above the formula.
    * *Note: The button text is currently in Chinese ("复制LaTeX"). You might want to change this in the code if targeting an English-speaking audience primarily.*
4.  Click the button.
5.  The button text will briefly change to "Copied!" ("已复制!").
6.  The LaTeX code, wrapped in `$ $`, is now copied to your clipboard. Paste it wherever you need it!

## How It Works (Technical Overview)

* The script listens for `mouseover` events on the document.
* When the cursor hovers over a `span.ztext-math` element (used by Zhihu for LaTeX formulas), it extracts the raw LaTeX code from the `data-tex` attribute.
* A button element is dynamically created and positioned near the hovered formula.
* Clicking the button triggers the `copyToClipboard` function, which:
    * Removes any `\tag{...}` using a regular expression.
    * Prepends and appends `$` delimiters.
    * Uses the `navigator.clipboard.writeText` API to copy the formatted text.
* `setTimeout` is used for debouncing hover events and resetting the button text after copying.
* A `MutationObserver` watches the `document.body` for added nodes to ensure the script re-initializes or works correctly if formulas are added to the page dynamically after the initial load.

## Manifest File (`manifest.json`)

You will need to create a `manifest.json` file in the same directory as your JavaScript code for the extension to work. Here is a basic example:

```json
{
  "manifest_version": 3,
  "name": "Zhihu LaTeX Copier",
  "version": "1.0",
  "description": "Easily copy LaTeX formulas from Zhihu pages.",
  "permissions": [
    "clipboardWrite", // Required for navigator.clipboard.writeText
    "activeTab",      // Often sufficient, but storage/scripting might be needed depending on final structure
    "scripting"       // Needed to inject the script
  ],
  "host_permissions": [
    "*://*[.zhihu.com/](https://.zhihu.com/)*" // Restricts the extension to run only on Zhihu domains
  ],
  "content_scripts": [
    {
      "matches": ["*://*[.zhihu.com/](https://.zhihu.com/)*"], // Run on all Zhihu pages
      "js": ["your_script_name.js"], // Replace with the actual name of your JS file
      "css": ["styles.css"] // Optional: Add a CSS file for button styling
    }
  ],
  "icons": {
    "48": "icon48.png", // Optional: Path to an icon
    "128": "icon128.png" // Optional: Path to an icon
  }
}