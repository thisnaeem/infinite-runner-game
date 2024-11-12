class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.y = 0;
        this.velocity = 0;
        this.isJumping = false;
        this.hasShield = false;
    }

    jump() {
        if (!gameManager.isGameOver && !this.isJumping) {
            this.isJumping = true;
            this.velocity = -CONFIG.INITIAL_JUMP_FORCE;
            this.updatePosition();
        }
    }

    update() {
        if (this.isJumping) {
            this.velocity += CONFIG.GRAVITY;
            this.y += this.velocity;

            if (this.y >= 0) {
                this.y = 0;
                this.velocity = 0;
                this.isJumping = false;
            }

            this.updatePosition();
        }
    }

    updatePosition() {
        this.element.style.transform = `translateY(${this.y}px)`;
    }

    reset() {
        this.y = 0;
        this.velocity = 0;
        this.isJumping = false;
        this.hasShield = false;
        this.updatePosition();
    }

    hit() {
        if (this.hasShield) {
            this.hasShield = false;
            return false;
        }
        return true;
    }
}