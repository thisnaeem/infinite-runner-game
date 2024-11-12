class SoundManager {
    constructor() {
        this.sounds = {
            jump: this.createAudio('data:audio/wav;base64,UklGRHwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVgAAAAeAAAAnwAAAP8AAAD/AAAAnwAAAB4AAACfAAAA/wAAAP8AAACfAAAAHgAAAJ8AAAD/AAAA/wAAAJ8AAAAeAAAAnwAAAP8AAAD/AAAAnwAAAB4AAACfAAAA/wAAAP8AAACfAAAA'),
            coin: this.createAudio('data:audio/wav;base64,UklGRHAAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUwAAAAzAAAAywAAAP8AAADLAAAAMwAAAMsAAAD/AAAAywAAADMAAADLAAAA/wAAAMsAAAAzAAAAywAAAP8AAADLAAAAMwAAAMsAAAD/AAAAywAAAA=='),
            powerUp: this.createAudio('data:audio/wav;base64,UklGRIQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWAAAAAfAAAAoAAAAP8AAAD/AAAAoAAAAB8AAACgAAAA/wAAAP8AAACgAAAAHwAAAKAAAAD/AAAA/wAAAKAAAAAfAAAAoAAAAP8AAAD/AAAAoAAAAB8AAACgAAAA/wAAAP8AAACgAAAAHwAAAKAAAAD/AAAA/wAAAKAAAA=='),
            gameOver: this.createAudio('data:audio/wav;base64,UklGRHQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVAAAAAdAAAAmgAAAP0AAAD9AAAAmgAAAB0AAACaAAAA/QAAAP0AAACaAAAAHQAAAJoAAAD9AAAA/QAAAJoAAAAdAAAAmgAAAP0AAAD9AAAAmgAAAB0AAACaAAAA/QAAAA==')
        };
    }

    createAudio(base64) {
        const audio = new Audio(base64);
        audio.volume = 0.3;
        return audio;
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    }
}

const soundManager = new SoundManager();