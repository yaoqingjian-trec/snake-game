# 🐍 贪吃蛇游戏

一个简单有趣的网页贪吃蛇游戏，使用纯 HTML、CSS 和 JavaScript 开发。

## 🎮 游戏特性

- 流畅的贪吃蛇游戏体验
- 分数记录和最高分保存（本地存储）
- 暂停/继续功能
- 响应式设计，支持移动端
- 精美的渐变背景和毛玻璃效果

## 🕹️ 游戏操作

### 电脑端
- **方向键 (↑ ↓ ← →)** 或 **WASD** 控制蛇的移动
- 点击 **开始游戏** 按钮开始
- 点击 **暂停** 按钮暂停/继续游戏

### 手机端
- **滑动操作**：在游戏区域上滑动手指来控制方向
- **虚拟方向键**：使用屏幕下方的方向按钮
- 点击 **开始游戏** 按钮开始
- 点击 **暂停** 按钮暂停/继续游戏

### 游戏规则
- 吃掉红色食物得分（每个食物 +10 分）
- 不要撞到墙壁或自己
- 分数会自动保存到本地存储

## 🚀 本地运行

1. 克隆仓库
```bash
git clone https://github.com/your-username/snake-game.git
cd snake-game
```

2. 直接打开 `index.html` 文件，或者使用本地服务器：
```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js http-server
npx http-server
```

3. 在浏览器中打开 `http://localhost:8000`

## 📦 技术栈

- HTML5 Canvas
- CSS3 (渐变、动画、毛玻璃效果)
- 原生 JavaScript (无依赖)

## 📄 许可证

MIT License

---

享受游戏！🎉
