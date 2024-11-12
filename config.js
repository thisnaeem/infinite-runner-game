const CONFIG = {
    // Player settings
    INITIAL_JUMP_FORCE: 15,
    GRAVITY: 0.8,
    DOUBLE_JUMP_FORCE: 12,
    
    // Game settings
    INITIAL_GAME_SPEED: 5,
    SPEED_INCREMENT: 0.001,
    OBSTACLE_SPAWN_RATE: 2000,
    COIN_SPAWN_RATE: 3000,
    
    // Scoring
    OBSTACLE_POINTS: 10,
    COIN_POINTS: 5,
    
    // Power-ups
    POWER_UP_DURATION: 5000,
    POWER_UPS: {
        SHIELD: {
            color: '#3b82f6',
            icon: 'shield-outline',
            name: 'Shield'
        }
    }
};