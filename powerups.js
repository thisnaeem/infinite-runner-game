class PowerUpManager {
    constructor() {
        this.activeEffects = new Set();
        this.indicator = document.getElementById('power-up-indicator');
    }

    activate(type) {
        const powerUp = CONFIG.POWER_UPS[type];
        this.activeEffects.add(type);
        
        // Show indicator
        this.indicator.innerHTML = `
            <ion-icon name="${powerUp.icon}"></ion-icon>
            ${powerUp.name}
        `;
        this.indicator.style.display = 'flex';
        this.indicator.style.background = powerUp.color;

        // Apply effect
        switch (type) {
            case 'SHIELD':
                gameManager.player.activateShield();
                break;
            case 'SLOW_TIME':
                gameManager.gameSpeed *= 0.5;
                break;
            case 'MAGNET':
                // Magnet effect is handled in obstacle manager
                break;
        }

        // Remove effect after duration
        setTimeout(() => {
            this.deactivate(type);
        }, CONFIG.POWER_UP_DURATION);
    }

    deactivate(type) {
        this.activeEffects.delete(type);
        
        // Remove effect
        switch (type) {
            case 'SHIELD':
                gameManager.player.deactivateShield();
                break;
            case 'SLOW_TIME':
                gameManager.gameSpeed *= 2;
                break;
        }

        // Hide indicator if no active effects
        if (this.activeEffects.size === 0) {
            this.indicator.style.display = 'none';
        }
    }

    clear() {
        this.activeEffects.clear();
        this.indicator.style.display = 'none';
    }

    hasPowerUp(type) {
        return this.activeEffects.has(type);
    }
}