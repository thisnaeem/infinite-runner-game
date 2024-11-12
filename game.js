class GameManager {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startGame();
    }

    init() {
        this.player = new Player();
        this.obstacleManager = new ObstacleManager();
        this.score = 0;
        this.coins = 0;
        this.gameSpeed = CONFIG.INITIAL_GAME_SPEED;
        this.isGameOver = false;
        this.animationFrameId = null;
        this.intervals = [];
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.player.jump();
                e.preventDefault();
            }
        });

        document.addEventListener('click', () => {
            this.player.jump();
        });

        document.addEventListener('touchstart', (e) => {
            this.player.jump();
            e.preventDefault();
        });
    }

    startGame() {
        // Clear all existing intervals
        this.clearAllIntervals();

        // Set up spawn intervals
        this.intervals.push(setInterval(() => {
            this.obstacleManager.createObstacle();
        }, CONFIG.OBSTACLE_SPAWN_RATE));

        this.intervals.push(setInterval(() => {
            this.obstacleManager.createCoin();
        }, CONFIG.COIN_SPAWN_RATE));

        // Start game loop
        this.gameLoop();
    }

    clearAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    gameLoop = () => {
        if (!this.isGameOver) {
            this.player.update();
            this.obstacleManager.update(this.gameSpeed);

            if (this.obstacleManager.checkCollisions(this.player)) {
                this.handleGameOver();
                return;
            }

            this.gameSpeed += CONFIG.SPEED_INCREMENT;
            document.getElementById('speed').textContent = 
                `${(this.gameSpeed / CONFIG.INITIAL_GAME_SPEED).toFixed(1)}x`;

            this.animationFrameId = requestAnimationFrame(this.gameLoop);
        }
    }

    updateScore(points) {
        this.score += points;
        document.getElementById('score').textContent = this.score;
    }

    collectCoin() {
        this.coins++;
        document.getElementById('coins').textContent = this.coins;
        this.updateScore(CONFIG.COIN_POINTS);
    }

    handleGameOver() {
        this.isGameOver = true;
        this.clearAllIntervals();
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-coins').textContent = this.coins;
        document.getElementById('game-over').style.display = 'block';

        // Add shake effect
        const container = document.getElementById('game-container');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }

    restartGame() {
        // Clean up old game state
        this.clearAllIntervals();
        this.obstacleManager.clear();
        
        // Reset UI
        document.getElementById('score').textContent = '0';
        document.getElementById('coins').textContent = '0';
        document.getElementById('speed').textContent = '1x';
        document.getElementById('game-over').style.display = 'none';
        
        // Initialize new game
        this.init();
        this.startGame();
    }
}

window.addEventListener('load', () => {
    window.gameManager = new GameManager();
});