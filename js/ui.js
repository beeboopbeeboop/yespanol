/**
 * Yespañol - UI Utilities
 * Handles: Confetti, transitions, feedback, haptics, sounds
 */

const YespanolUI = (function() {

    // ==================== CONFETTI ====================
    function confetti(options = {}) {
        const defaults = {
            particleCount: 50,
            spread: 60,
            origin: { x: 0.5, y: 0.6 },
            colors: ['#ff6b4a', '#32d74b', '#ffd60a', '#ff453a', '#5ac8fa'],
            duration: 3000,
        };
        const config = { ...defaults, ...options };

        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < config.particleCount; i++) {
            createParticle(container, config, i);
        }

        setTimeout(() => container.remove(), config.duration);
    }

    function createParticle(container, config, index) {
        const particle = document.createElement('div');
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const size = Math.random() * 10 + 5;
        const startX = config.origin.x * window.innerWidth;
        const startY = config.origin.y * window.innerHeight;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            left: ${startX}px;
            top: ${startY}px;
            opacity: 1;
        `;

        container.appendChild(particle);

        // Animate
        const angle = (Math.random() - 0.5) * config.spread * (Math.PI / 180) - Math.PI / 2;
        const velocity = Math.random() * 500 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        const gravity = 800;
        const rotation = (Math.random() - 0.5) * 720;

        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;

            const x = startX + vx * elapsed;
            const y = startY + vy * elapsed + 0.5 * gravity * elapsed * elapsed;
            const opacity = Math.max(0, 1 - elapsed / (config.duration / 1000));
            const rotate = rotation * elapsed;

            particle.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotate}deg)`;
            particle.style.opacity = opacity;

            if (elapsed < config.duration / 1000) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animate);
    }

    // Big celebration confetti
    function celebrate() {
        confetti({ particleCount: 100, spread: 90 });
        setTimeout(() => confetti({ particleCount: 50, origin: { x: 0.2, y: 0.6 } }), 150);
        setTimeout(() => confetti({ particleCount: 50, origin: { x: 0.8, y: 0.6 } }), 300);
    }

    // ==================== COLOR FLASH FEEDBACK ====================
    function flashFeedback(correct) {
        const flash = document.createElement('div');
        const color = correct ? 'rgba(50, 215, 75, 0.3)' : 'rgba(255, 69, 58, 0.3)';

        flash.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: ${color};
            pointer-events: none;
            z-index: 9998;
            opacity: 1;
            transition: opacity 0.4s ease;
        `;

        document.body.appendChild(flash);

        requestAnimationFrame(() => {
            flash.style.opacity = '0';
        });

        setTimeout(() => flash.remove(), 400);
    }

    // ==================== SHAKE ANIMATION ====================
    function shake(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'shake 0.5s ease';

        // Add keyframes if not exists
        if (!document.querySelector('#shake-keyframes')) {
            const style = document.createElement('style');
            style.id = 'shake-keyframes';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==================== PULSE ANIMATION ====================
    function pulse(element, color = '#32d74b') {
        const originalBoxShadow = element.style.boxShadow;
        element.style.transition = 'box-shadow 0.2s ease';
        element.style.boxShadow = `0 0 0 4px ${color}40, 0 0 20px ${color}60`;

        setTimeout(() => {
            element.style.boxShadow = originalBoxShadow;
        }, 300);
    }

    // ==================== PAGE TRANSITIONS ====================
    function pageTransition(url, direction = 'left') {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #0a0a0f;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        setTimeout(() => {
            window.location.href = url;
        }, 200);
    }

    // ==================== TOAST NOTIFICATIONS ====================
    function toast(message, type = 'info', duration = 3000) {
        // Remove existing toast
        const existing = document.querySelector('.yespanol-toast');
        if (existing) existing.remove();

        const colors = {
            info: '#5ac8fa',
            success: '#32d74b',
            error: '#ff453a',
            warning: '#ffd60a',
        };

        const toast = document.createElement('div');
        toast.className = 'yespanol-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: rgba(30, 30, 35, 0.95);
            color: #fff;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            border-left: 4px solid ${colors[type]};
            backdrop-filter: blur(10px);
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ==================== HAPTIC FEEDBACK ====================
    function haptic(type = 'light') {
        if (!navigator.vibrate) return;

        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30],
            success: [10, 50, 10],
            error: [50, 30, 50],
        };

        navigator.vibrate(patterns[type] || patterns.light);
    }

    // ==================== SOUND EFFECTS ====================
    const sounds = {};

    function loadSound(name, frequency, duration = 0.1, type = 'sine') {
        // Create sounds using Web Audio API (no external files needed)
        sounds[name] = { frequency, duration, type };
    }

    function playSound(name) {
        const profile = typeof Yespanol !== 'undefined' ? Yespanol.load() : { settings: { soundEnabled: true } };
        if (!profile.settings.soundEnabled) return;

        const sound = sounds[name];
        if (!sound) return;

        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            oscillator.type = sound.type;
            oscillator.frequency.value = sound.frequency;
            oscillator.connect(gain);
            gain.connect(ctx.destination);

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + sound.duration);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + sound.duration);
        } catch (e) {
            // Audio not supported
        }
    }

    // Pre-load sounds
    loadSound('correct', 880, 0.15, 'sine');      // High ping
    loadSound('incorrect', 220, 0.2, 'triangle'); // Low buzz
    loadSound('swipe', 440, 0.05, 'sine');        // Quick blip
    loadSound('celebrate', 660, 0.3, 'sine');     // Victory tone

    // ==================== ACHIEVEMENT POPUP ====================
    function showAchievement(achievement) {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 24px;
            padding: 32px 48px;
            text-align: center;
            z-index: 10000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        popup.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 16px;">${achievement.icon}</div>
            <div style="font-size: 0.8rem; color: #ff6b4a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Achievement Unlocked</div>
            <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">${achievement.name}</div>
            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">${achievement.desc}</div>
        `;

        document.body.appendChild(popup);

        // Animate in
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Confetti!
        setTimeout(() => celebrate(), 200);

        // Auto dismiss
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => popup.remove(), 400);
        }, 3000);
    }

    // ==================== SKELETON LOADING ====================
    function skeleton(element) {
        element.classList.add('skeleton-loading');

        if (!document.querySelector('#skeleton-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-styles';
            style.textContent = `
                .skeleton-loading {
                    background: linear-gradient(90deg,
                        rgba(255,255,255,0.05) 25%,
                        rgba(255,255,255,0.1) 50%,
                        rgba(255,255,255,0.05) 75%
                    );
                    background-size: 200% 100%;
                    animation: skeleton-shimmer 1.5s infinite;
                }
                @keyframes skeleton-shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function removeSkeleton(element) {
        element.classList.remove('skeleton-loading');
    }

    // ==================== SWIPE BACK GESTURE ====================
    function enableSwipeBack(callback) {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = Math.abs(endY - startY);

            // Swipe from left edge, moving right, mostly horizontal
            if (startX < 30 && diffX > 100 && diffY < 50) {
                callback();
            }
        });
    }

    // Public API
    return {
        confetti,
        celebrate,
        flashFeedback,
        shake,
        pulse,
        pageTransition,
        toast,
        haptic,
        playSound,
        showAchievement,
        skeleton,
        removeSkeleton,
        enableSwipeBack,
    };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YespanolUI;
}
