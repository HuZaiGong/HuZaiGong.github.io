# 🍎 毛玻璃苹果风个人介绍页

一个采用现代 Glassmorphism（毛玻璃）设计风格的个人介绍页面，灵感来源于 macOS Big Sur 及后续版本的设计语言。

![Glassmorphism Design](https://img.shields.io/badge/design-Glassmorphism-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特性亮点

- 🎨 **苹果风格设计** - 采用 macOS 系统的设计语言和美学原则
- 💎 **毛玻璃效果** - 使用 `backdrop-filter` 实现真实的背景模糊效果
- 🌈 **动态渐变背景** - 流畅的多色渐变动画，营造生动视觉体验
- 📱 **完全响应式** - 完美适配桌面、平板和移动设备
- ♿ **可访问性优化** - 支持键盘导航和减少动画偏好
- 🚀 **性能优化** - 使用 CSS 变量和硬件加速动画
- 🎭 **微交互效果** - 按钮波纹、视差滚动、悬浮动画等精致细节

## 📁 项目结构

```
├── index.html          # 主 HTML 文件，包含语义化结构和注释
├── styles.css          # 样式表，包含所有 CSS 样式和动画
├── script.js           # JavaScript 交互逻辑和增强功能
└── README.md           # 项目说明文档
```

## 🚀 快速开始

### 方法一：直接打开

直接在浏览器中打开 `index.html` 文件即可预览效果。

```bash
# Mac/Linux
open index.html

# Windows
start index.html
```

### 方法二：使用本地服务器

推荐使用本地服务器以获得最佳体验：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需安装 http-server)
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

## 🎨 自定义指南

### 修改个人信息

编辑 `index.html` 文件中的相应内容：

```html
<!-- 修改姓名 -->
<h1 class="name">你的名字</h1>

<!-- 修改职位 -->
<p class="title">你的职位</p>

<!-- 修改头像 -->
<img src="你的头像图片路径" alt="用户头像" class="avatar">

<!-- 修改技能标签 -->
<span class="skill-tag">你的技能</span>

<!-- 修改社交链接 -->
<a href="你的 GitHub 地址" class="social-link">...</a>
```

### 调整配色方案

在 `styles.css` 中修改 CSS 变量：

```css
:root {
    /* 主色调渐变 */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    /* 背景渐变色 */
    --bg-gradient-1: #667eea;
    --bg-gradient-2: #764ba2;
    --bg-gradient-3: #f093fb;
    --bg-gradient-4: #4facfe;
    
    /* 毛玻璃参数 */
    --glass-bg: rgba(255, 255, 255, 0.25);
    --backdrop-blur: blur(12px);
}
```

### 调整毛玻璃强度

```css
:root {
    /* 增加不透明度 - 更少的透明感 */
    --glass-bg: rgba(255, 255, 255, 0.4);
    
    /* 增加模糊值 - 更强的模糊效果 */
    --backdrop-blur: blur(20px);
    
    /* 调整边框透明度 */
    --glass-border: rgba(255, 255, 255, 0.5);
}
```

## 🛠️ 技术栈

- **HTML5** - 语义化标签和可访问性结构
- **CSS3** - Flexbox 布局、CSS 变量、动画、backdrop-filter
- **JavaScript (ES6+)** - 原生 JS，无外部依赖
- **SVG** - 矢量图标，清晰缩放

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 备注 |
|--------|---------|------|
| Chrome | 76+ | 完整支持 |
| Firefox | 103+ | 完整支持 |
| Safari | 9+ | 需要 -webkit 前缀 |
| Edge | 79+ | 完整支持 |

**降级方案**：对于不支持 `backdrop-filter` 的浏览器，JavaScript 会自动应用半透明背景作为降级方案。

## 📱 响应式断点

```css
/* 桌面端 */
> 768px   - 标准布局

/* 平板端 */
≤ 768px   - 中等屏幕优化

/* 移动端 */
≤ 480px   - 小屏幕优化
```

## 🎯 主要功能详解

### 1. 毛玻璃效果实现

```css
.glass-card {
    background: rgba(255, 255, 255, 0.25);      /* 半透明背景 */
    backdrop-filter: blur(12px);                /* 背景模糊 */
    -webkit-backdrop-filter: blur(12px);        /* Safari 支持 */
    border: 1px solid rgba(255, 255, 255, 0.3); /* 微妙边框 */
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### 2. 动态渐变背景

```css
body {
    background: linear-gradient(-45deg, 
                var(--bg-gradient-1), 
                var(--bg-gradient-2), 
                var(--bg-gradient-3), 
                var(--bg-gradient-4));
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
}
```

### 3. 视差滚动效果

JavaScript 监听鼠标移动，为背景元素应用不同的偏移量，创造深度层次感。

### 4. 按钮波纹效果

点击按钮时，在点击位置创建扩散的圆形波纹动画。

## 🔧 开发建议

### 代码规范

- 所有 CSS 类名使用 kebab-case（短横线命名）
- JavaScript 函数使用 camelCase（驼峰命名）
- 保持代码注释清晰详细

### 性能优化

1. 使用 CSS 变量减少重复代码
2. 动画使用 `transform` 和 `opacity` 触发 GPU 加速
3. 图片使用现代格式（WebP）和适当压缩
4. 按需加载非关键资源

### 可访问性

- 所有交互元素都有 `:focus` 状态
- 支持键盘导航（Tab 键切换）
- 尊重用户的 `prefers-reduced-motion` 偏好
- 使用语义化 HTML 标签

## 📝 更新日志

### v1.0.0
- ✨ 初始版本发布
- 🎨 完整的毛玻璃设计风格
- 📱 响应式布局支持
- ♿ 可访问性优化
- 🚀 性能优化

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 设计灵感来自 Apple Human Interface Guidelines
- 头像由 [DiceBear](https://dicebear.com/) 提供
- 图标为内联 SVG，无需外部依赖

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 Email: example@email.com
- 💼 LinkedIn: [个人资料](#)
- 🐦 Twitter: [@username](#)

---

**Made with ❤️ using Glassmorphism Design**
