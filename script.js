// 游戏配置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 20;
const CELL_COUNT = canvas.width / GRID_SIZE;

// 游戏状态
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let direction = {x: 0, y: 0};
let nextDirection = {x: 0, y: 0};
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isPaused = false;
let isGameRunning = false;

// DOM 元素
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

// 初始化最高分显示
highScoreElement.textContent = highScore;

// 绘制函数
function draw() {
    // 清空画布
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#4CAF50';
        } else {
            // 蛇身
            ctx.fillStyle = '#45a049';
        }
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    });

    // 绘制食物
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(
        food.x * GRID_SIZE,
        food.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
    );
}

// 更新游戏状态
function update() {
    if (isPaused || !isGameRunning) return;

    // 应用方向
    direction = {...nextDirection};

    // 计算新蛇头位置
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }

    // 添加新蛇头
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        // 移除蛇尾
        snake.pop();
    }
}

// 检查碰撞
function checkCollision(head) {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
        return true;
    }

    // 检查自身碰撞
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// 生成食物
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * CELL_COUNT),
            y: Math.floor(Math.random() * CELL_COUNT)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

    food = newFood;
}

// 游戏结束
function gameOver() {
    isGameRunning = false;
    clearInterval(gameLoop);
    startBtn.textContent = '重新开始';
    pauseBtn.disabled = true;

    // 更新最高分
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }

    alert(`游戏结束！你的分数: ${score}`);
}

// 游戏循环
function startGameLoop() {
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 100);
}

// 开始游戏
function startGame() {
    if (isGameRunning) {
        // 如果游戏正在运行，先停止
        clearInterval(gameLoop);
    }

    // 重置游戏状态
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    nextDirection = {x: 0, y: 0};
    score = 0;
    isPaused = false;
    isGameRunning = true;
    scoreElement.textContent = score;
    generateFood();
    startBtn.textContent = '重新开始';
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暂停';

    // 开始游戏循环
    startGameLoop();
    draw();
}

// 暂停/继续游戏
function togglePause() {
    if (!isGameRunning) return;

    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
}

// 键盘事件监听
document.addEventListener('keydown', (e) => {
    if (!isGameRunning || isPaused) return;

    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y !== 1) {
                nextDirection = {x: 0, y: -1};
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y !== -1) {
                nextDirection = {x: 0, y: 1};
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x !== 1) {
                nextDirection = {x: -1, y: 0};
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x !== -1) {
                nextDirection = {x: 1, y: 0};
            }
            break;
    }

    // 防止方向键滚动页面
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

// 按钮事件监听
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);

// 初始绘制
draw();
