# Cyber Fireworks Ghost Theme

一个具有赛博烟花背景效果的现代化 Ghost 主题，融合了未来科技感和优雅的设计。

## 特性

### 🎆 赛博烟花效果
- 基于 p5.js 的动态烟花背景
- 可配置的强度级别（低、中、高）
- 性能优化，支持移动设备
- 页面不可见时自动暂停

### 🎨 现代设计
- 响应式设计，支持所有设备
- 深色主题，未来科技感
- 渐变色彩和发光效果
- 流畅的动画和过渡效果

### 📝 内容展示
- 优雅的文章卡片布局
- 文章阅读进度指示器
- 代码块复制功能
- 图片懒加载
- 搜索功能

### ⚙️ 自定义选项
- 可在 Ghost 后台配置烟花效果
- 自定义主色调
- 可开关烟花背景
- 烟花强度调节

## 安装

### 方法一：直接下载
1. 下载主题 ZIP 文件
2. 在 Ghost 后台进入 `Design` > `Theme`
3. 点击 `Upload a theme` 上传 ZIP 文件
4. 激活主题

### 方法二：从源码构建
```bash
# 克隆仓库
git clone https://github.com/theariaki/cyber-fireworks-ghost-theme.git
cd cyber-fireworks-ghost-theme

# 安装依赖
npm install

# 构建主题
npm run build

# 创建 ZIP 包
npm run zip
```

## 开发

### 环境要求
- Node.js 16+
- npm 或 yarn
- Ghost 5.0+

### 开发命令
```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建生产版本
npm run build

# 创建发布包
npm run zip

# 清理构建文件
npm run clean
```

### 项目结构
```
cyber-fireworks-ghost-theme/
├── assets/
│   ├── css/
│   │   └── screen.css          # 主样式文件
│   ├── js/
│   │   ├── main.js             # 主 JavaScript 文件
│   │   └── cyber-fireworks.js  # 烟花效果脚本
│   └── built/                  # 构建输出目录
├── partials/
│   ├── site-header.hbs         # 网站头部
│   └── site-footer.hbs         # 网站底部
├── default.hbs                 # 主布局模板
├── index.hbs                   # 首页模板
├── post.hbs                    # 文章页模板
├── page.hbs                    # 静态页面模板
├── tag.hbs                     # 标签页模板
├── author.hbs                  # 作者页模板
├── package.json                # 主题配置
├── gulpfile.js                 # 构建脚本
└── README.md                   # 说明文档
```

## 自定义配置

### 在 Ghost 后台设置

1. 进入 `Design` > `Theme` > `Customize`
2. 配置以下选项：

#### 烟花效果
- **Enable Fireworks**: 开启/关闭烟花背景效果
- **Fireworks Intensity**: 选择烟花强度（low/medium/high）
- **Primary Color**: 设置主题主色调

#### 网站设置
- **Site Title**: 网站标题
- **Site Description**: 网站描述
- **Logo**: 上传网站 Logo
- **Cover Image**: 设置封面图片

### 代码自定义

#### 修改烟花配置
编辑 `assets/js/cyber-fireworks.js` 中的 `config` 对象：

```javascript
let config = {
    launchInterval: 18,        // 发射间隔
    particleLifespan: 255,     // 粒子生命周期
    explosionSize: 6.5,        // 爆炸尺寸
    particleCountBase: 28,     // 基础粒子数量
    // ... 更多配置选项
};
```

#### 修改颜色方案
编辑 `assets/css/screen.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #ff3366;      /* 主色调 */
    --secondary-color: #00ffcc;    /* 次要色调 */
    --accent-color: #ff9900;       /* 强调色 */
    /* ... 更多颜色变量 */
}
```

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能优化

### 已实现的优化
- CSS 和 JavaScript 压缩
- 图片懒加载
- 烟花粒子数量限制
- 页面不可见时暂停动画
- 响应式图片尺寸

### 建议的优化
- 使用 CDN 托管静态资源
- 启用 Ghost 的图片优化
- 配置适当的缓存策略

## 常见问题

### Q: 烟花效果影响性能怎么办？
A: 可以在主题设置中调低烟花强度或完全关闭烟花效果。

### Q: 如何修改烟花颜色？
A: 编辑 `cyber-fireworks.js` 中的 `psColors` 数组，使用 HSB 颜色值。

### Q: 主题支持会员功能吗？
A: 是的，主题完全支持 Ghost 的会员和订阅功能。

### Q: 如何添加自定义字体？
A: 在 `screen.css` 中的 `:root` 部分修改 `--font-primary` 变量。

## 更新日志

### v1.0.0
- 初始发布
- 赛博烟花背景效果
- 响应式设计
- Ghost 5.0+ 支持

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 支持

如果您喜欢这个主题，请给它一个 ⭐️！

- 🐛 [报告 Bug](https://github.com/theariaki/cyber-fireworks-ghost-theme/issues)
- 💡 [请求功能](https://github.com/theariaki/cyber-fireworks-ghost-theme/issues)
- 📧 [联系作者](mailto:admin@ariaki.me)

## 致谢

- [Ghost](https://ghost.org/) - 优秀的发布平台
- [p5.js](https://p5js.org/) - 创意编程库
- 所有贡献者和用户

---

使用 ❤️ 和 ☕ 制作 by [Ariaki](https://ariaki.me) 