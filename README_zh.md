AngusRecorder
===

- [English Version](README.md)
- [中文版](README_zh.md)

## 介绍

**AngusRecorder**是一款专为Google Chrome浏览器设计的插件，旨在帮助开发者和测试人员轻松录制和分析网络请求。录制的结果可以直接保存到 [AngusTester](https://www.xcan.cloud) 应用中，支持多种场景，包括API调试. 场景测试和模拟请求等功能。

## 项目结构

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

## 初始化项目

```bash
## 创建 Vite + Vue3 项目
npm init vite@latest AngusRecorder -- --template vue
## 安装必须的依赖
npm install @vitejs/plugin-vue @crxjs/vite-plugin @types/chrome axios
```

## 构建插件

```bash
# 运行以下命令后，插件文件将会输出到 /dist 目录
npm run build
```

## 安装插件

1. 打开 Chrome 浏览器。
2. 进入扩展程序页面：在地址栏中输入 chrome://extensions 并按 Enter。
3. 启用开发者模式：在右上角，打开“开发者模式”开关（开关会变为蓝色）。
4. 点击页面左上角的“加载已解压的扩展程序”按钮：选择 /dist 目录，在弹出的文件选择窗口中，导航到你的插件所在的 /dist 目录，选择该目录，然后击“选择文件夹”。
5. 确认安装：插件会自动加载并出现在扩展程序列表中。
6. 使用插件：点击工具栏中的插件图标进行配置和使用。

## 参考

- 开发者文档：https://developer.chrome.com/docs/extensions?hl=zh-cn
- 扩展示例：https://github.com/GoogleChrome/chrome-extensions-samples.git