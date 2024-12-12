AngusRecorder
===

- [English Version](README.md)
- [中文版](README_zh.md)

## Introduction

**AngusRecorder** is a plugin specifically designed for Google Chrome browser, aimed at helping developers and testers
easily record and analyze network requests. The recorded results can be directly saved to the [AngusTester](https://www.xcan.cloud) application,
supporting various scenarios including api debugging, scenario testing, and mock request functionality.

## Project Structure

```text
AngusRecorder/
├── public/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── src/
│   ├── components/
│   │   └── Other Vue components can be added...
│   ├── App.vue
│   ├── background.js
│   ├── main.js
│   └── manifest.json
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Init Project

```bash
## Create Vite + Vue3 project
npm init vite@latest AngusRecorder -- --template vue
## Install required dependencies
npm install @vitejs/plugin-vue @crxjs/vite-plugin @types/chrome axios
```

## Build extension

```bash
# After running the following command, the plugin files will be output to the /dist directory.
npm run build
```

## Install extension

1. Open Chrome Browser.
2. Access the Extensions Page: Type chrome://extensions in the address bar and press Enter.
3. Enable Developer Mode: Toggle the "Developer mode" switch in the upper right corner (the switch will turn blue).
4. Load Unpacked Extension: Click the "Load unpacked" button in the upper left corner of the page. In the pop-up file selection window, navigate to your plugin's /dist directory, select it, and click "Select" folder. 
5. Confirm Installation: The extension will automatically load and appear in the list of extensions. 
6. Use the Extension: Click the extension icon in the toolbar to configure and use it.

## References

- Developer Documentation: https://developer.chrome.com/docs/extensions?hl=zh-cn
- Extension Examples: https://github.com/GoogleChrome/chrome-extensions-samples.git