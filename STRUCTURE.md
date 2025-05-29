# Cyber Fireworks Ghost Theme 文件结构

```
cyber-fireworks-ghost-theme/
├── 📁 assets/                      # 静态资源目录
│   ├── 📁 css/                     # 样式文件
│   │   └── 📄 screen.css          # 主样式文件 (12000+ 行)
│   ├── 📁 js/                      # JavaScript 文件
│   │   ├── 📄 main.js             # 主题功能脚本 (300+ 行)
│   │   └── 📄 cyber-fireworks.js  # 赛博烟花效果 (400+ 行)
│   └── 📁 built/                   # 构建输出目录 (自动生成)
│       ├── 📄 screen.css          # 编译后的 CSS
│       ├── 📄 main.js             # 编译后的 JS
│       └── 📄 cyber-fireworks.js  # 编译后的烟花脚本
│
├── 📁 partials/                    # 模板片段
│   ├── 📄 site-header.hbs         # 网站头部 (导航、搜索、菜单)
│   └── 📄 site-footer.hbs         # 网站底部 (链接、版权、社交)
│
├── 📄 default.hbs                  # 主布局模板 (HTML 框架)
├── 📄 index.hbs                    # 首页模板 (文章列表)
├── 📄 post.hbs                     # 文章页模板 (详细内容)
├── 📄 page.hbs                     # 静态页面模板
├── 📄 tag.hbs                      # 标签归档页模板
├── 📄 author.hbs                   # 作者页面模板
│
├── 📄 package.json                 # Ghost 主题配置
├── 📄 package-dev.json            # 开发依赖配置
├── 📄 gulpfile.js                  # 构建脚本
├── 📄 README.md                    # 详细说明文档
└── 📄 STRUCTURE.md                # 本文件

📊 统计信息:
- 总文件数: 15+
- 代码行数: 15000+
- 支持的 Ghost 版本: 5.0+
- 响应式设计: ✅
- 性能优化: ✅
- 作者: Ariaki (https://ariaki.me)
```

## 核心功能文件

### 🎨 样式文件 (`assets/css/screen.css`)
- **CSS 变量系统**: 完整的颜色和尺寸定义
- **响应式布局**: 支持移动端和桌面端
- **赛博风格**: 渐变、发光、透明效果
- **组件样式**: 卡片、按钮、表单等
- **动画效果**: 平滑过渡和交互反馈

### ⚡ JavaScript 功能 (`assets/js/main.js`)
- **移动端菜单**: 响应式导航
- **搜索功能**: 实时搜索界面
- **滚动效果**: 头部隐藏/显示
- **懒加载**: 图片性能优化
- **阅读进度**: 文章阅读指示器
- **代码复制**: 一键复制代码块

### 🎆 烟花效果 (`assets/js/cyber-fireworks.js`)
- **p5.js 集成**: 基于 Canvas 的动画
- **性能优化**: 粒子数量控制
- **配置系统**: 可调节强度和样式
- **响应式**: 自适应屏幕尺寸
- **电源管理**: 页面不可见时暂停

## 模板文件详解

### 🏗️ 主布局 (`default.hbs`)
- **HTML5 结构**: 语义化标签
- **Meta 标签**: SEO 和社交媒体优化
- **资源加载**: CSS/JS 文件引入
- **主题设置**: 烟花开关和配置
- **响应式设计**: 视口和字体配置

### 🏠 首页 (`index.hbs`)
- **英雄区域**: 站点标题和描述
- **文章网格**: 响应式卡片布局
- **分页功能**: 文章列表分页
- **CTA 区域**: 订阅号召行动

### 📝 文章页 (`post.hbs`)
- **文章头部**: 标题、作者、日期
- **内容区域**: 富文本内容展示
- **相关文章**: 同标签推荐
- **作者卡片**: 作者信息展示
- **评论系统**: Ghost 评论集成

### 📄 页面模板 (`page.hbs`)
- **简洁布局**: 静态页面优化
- **内容聚焦**: 无干扰阅读体验
- **订阅引导**: 会员功能集成

### 🏷️ 归档页面 (`tag.hbs`, `author.hbs`)
- **归档头部**: 标签/作者信息
- **文章列表**: 筛选后的内容
- **统计信息**: 文章数量展示

### 🧩 模板片段 (`partials/`)
- **头部导航**: Logo、菜单、搜索
- **底部信息**: 链接、版权、社交

## 构建系统

### 📦 Gulp 任务 (`gulpfile.js`)
- **CSS 处理**: PostCSS + Autoprefixer + 压缩
- **JS 处理**: 合并 + 压缩 + Source Maps
- **实时重载**: 开发时自动刷新
- **打包功能**: 生成可上传的 ZIP

### ⚙️ 开发工作流
```bash
npm install          # 安装依赖
npm run dev          # 开发模式
npm run build        # 构建生产版本
npm run zip          # 创建发布包
```

## 主题特色

### 🎨 视觉设计
- **深色主题**: 未来科技感
- **霓虹色彩**: PlayStation 风格配色
- **玻璃形态**: 模糊背景效果
- **渐变元素**: 多彩过渡效果

### 🚀 性能优化
- **资源压缩**: CSS/JS 文件最小化
- **图片懒加载**: 提升页面加载速度
- **缓存策略**: 浏览器缓存优化
- **响应式图片**: 自适应图片尺寸

### 📱 响应式设计
- **移动优先**: Mobile-first 设计理念
- **触摸友好**: 适合移动端操作
- **自适应布局**: 支持各种屏幕尺寸
- **性能考量**: 移动端性能优化

### ♿ 可访问性
- **键盘导航**: 支持键盘操作
- **屏幕阅读器**: 语义化标签
- **对比度**: 符合 WCAG 标准
- **焦点指示**: 清晰的焦点样式

## 自定义指南

### 🎨 颜色定制
在 `screen.css` 中修改 CSS 变量:
```css
:root {
    --primary-color: #ff3366;    /* 主色调 */
    --secondary-color: #00ffcc;  /* 次要色 */
    --accent-color: #ff9900;     /* 强调色 */
}
```

### 🎆 烟花配置
在 `cyber-fireworks.js` 中调整参数:
```javascript
let config = {
    launchInterval: 18,       // 发射频率
    explosionSize: 6.5,       // 爆炸大小
    particleCountBase: 28,    // 粒子数量
};
```

### 📝 内容设置
在 Ghost 后台 Design > Theme 中配置:
- 烟花效果开关
- 烟花强度调节
- 主题色彩设置

## 浏览器支持

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| IE | 11 | ❌ 不支持 |

## 技术栈

- **Ghost CMS**: 5.0+
- **p5.js**: 烟花动画库
- **Gulp**: 构建工具
- **PostCSS**: CSS 处理
- **ES6+**: 现代 JavaScript
- **CSS Grid**: 布局系统
- **CSS Variables**: 主题系统

## 联系作者

- **作者**: Ariaki
- **邮箱**: admin@ariaki.me
- **网站**: https://ariaki.me
- **GitHub**: https://github.com/theariaki