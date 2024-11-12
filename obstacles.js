class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.coins = [];
        this.gameContainer = document.getElementById('game-container');
    }

    createObstacle() {
        if (gameManager.isGameOver) return;

        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        this.gameContainer.appendChild(obstacle);

        const height = Math.random() * 30 + 40;
        obstacle.style.height = `${height}px`;
        obstacle.style.right = '0px'; // Start from right side

        this.obstacles.push({
            element: obstacle,
            position: 0, // Start from 0 and increase
            passed: false
        });
    }

    createCoin() {
        if (gameManager.isGameOver) return;

        const coin = document.createElement('div');
        coin.className = 'coin';
        this.gameContainer.appendChild(coin);

        const height = Math.random() * 100 + 50;
        coin.style.bottom = `${height}px`;
        coin.style.right = '0px'; // Start from right side

        this.coins.push({
            element: coin,
            position: 0, // Start from 0 and increase
            collected: false
        });
    }

    update(gameSpeed) {
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.position += gameSpeed;

            if (obstacle.position > 850) { // Past the left side of container
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                if (!obstacle.passed) {
                    gameManager.updateScore(CONFIG.OBSTACLE_POINTS);
                }
            } else {
                obstacle.element.style.right = `${obstacle.position}px`;
            }
        }

        // Update coins
        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            coin.position += gameSpeed;

            if (coin.position > 850) { // Past the left side of container
                coin.element.remove();
                this.coins.splice(i, 1);
            } else {
                coin.element.style.right = `${coin.position}px`;
            }
        }
    }

    checkCollisions(player) {
        const playerRect = player.element.getBoundingClientRect();

        // Check obstacle collisions
        for (const obstacle of this.obstacles) {
            if (!obstacle.passed) {
                const obstacleRect = obstacle.element.getBoundingClientRect();
                if (this.isColliding(playerRect, obstacleRect)) {
                    if (player.hit()) {
                        return true;
                    }
                }
            }
        }

        // Check coin collisions
        for (const coin of this.coins) {
            if (!coin.collected) {
                const coinRect = coin.element.getBoundingClientRect();
                if (this.isColliding(playerRect, coinRect)) {
                    coin.collected = true;
                    coin.element.style.opacity = '0';
                    setTimeout(() => coin.element.remove(), 200);
                    gameManager.collectCoin();
                }
            }
        }

        return false;
    }

    isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left + 10 ||
                rect1.left > rect2.right - 10 ||
                rect1.bottom < rect2.top + 10 ||
                rect1.top > rect2.bottom - 10);
    }

    clear() {
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.coins.forEach(coin => coin.element.remove());
        this.obstacles = [];
        this.coins = [];
    }
}