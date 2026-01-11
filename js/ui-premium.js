/**
 * Yespañol Premium UI
 * Award-winning iOS-quality interactions
 */

const UI = (function() {
    'use strict';

    // ============================================
    // HAPTIC FEEDBACK
    // ============================================
    const Haptics = {
        light() {
            if ('vibrate' in navigator) navigator.vibrate(10);
        },
        medium() {
            if ('vibrate' in navigator) navigator.vibrate(20);
        },
        heavy() {
            if ('vibrate' in navigator) navigator.vibrate([30, 10, 30]);
        },
        success() {
            if ('vibrate' in navigator) navigator.vibrate([10, 50, 20]);
        },
        error() {
            if ('vibrate' in navigator) navigator.vibrate([50, 30, 50, 30, 50]);
        },
        selection() {
            if ('vibrate' in navigator) navigator.vibrate(5);
        }
    };

    // ============================================
    // SOUND EFFECTS
    // ============================================
    const Sounds = {
        _ctx: null,
        _enabled: true,

        init() {
            try {
                this._ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) {}
        },

        _play(freq, duration, type = 'sine', volume = 0.1) {
            if (!this._enabled || !this._ctx) return;
            try {
                const osc = this._ctx.createOscillator();
                const gain = this._ctx.createGain();
                osc.connect(gain);
                gain.connect(this._ctx.destination);
                osc.frequency.value = freq;
                osc.type = type;
                gain.gain.setValueAtTime(volume, this._ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this._ctx.currentTime + duration);
                osc.start();
                osc.stop(this._ctx.currentTime + duration);
            } catch(e) {}
        },

        tap() { this._play(600, 0.05); },
        success() {
            this._play(523, 0.1);
            setTimeout(() => this._play(659, 0.1), 100);
            setTimeout(() => this._play(784, 0.15), 200);
        },
        error() {
            this._play(200, 0.15, 'square', 0.08);
        },
        complete() {
            this._play(440, 0.1);
            setTimeout(() => this._play(550, 0.1), 80);
            setTimeout(() => this._play(660, 0.1), 160);
            setTimeout(() => this._play(880, 0.2), 240);
        },
        levelUp() {
            [523, 587, 659, 698, 784, 880].forEach((freq, i) => {
                setTimeout(() => this._play(freq, 0.12), i * 60);
            });
        },

        toggle(enabled) {
            this._enabled = enabled;
        }
    };

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    const Toast = {
        _container: null,

        _getContainer() {
            if (!this._container) {
                this._container = document.createElement('div');
                this._container.className = 'toast-container';
                document.body.appendChild(this._container);
            }
            return this._container;
        },

        show({ title, message, type = 'info', duration = 3000, icon }) {
            const container = this._getContainer();
            const toast = document.createElement('div');

            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };

            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <span class="toast-icon">${icon || icons[type]}</span>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    ${message ? `<div class="toast-message">${message}</div>` : ''}
                </div>
            `;

            container.appendChild(toast);
            Haptics.light();

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-20px)';
                toast.style.transition = 'all 300ms ease-out';
                setTimeout(() => toast.remove(), 300);
            }, duration);

            return toast;
        },

        success(message, title = 'Success') {
            return this.show({ title, message, type: 'success' });
        },

        error(message, title = 'Error') {
            return this.show({ title, message, type: 'error' });
        },

        info(message, title) {
            return this.show({ title, message, type: 'info' });
        }
    };

    // ============================================
    // CONFETTI CELEBRATION
    // ============================================
    const Confetti = {
        colors: ['#ff6b4a', '#30d158', '#ffd60a', '#bf5af2', '#64d2ff', '#ff375f'],

        burst(options = {}) {
            const {
                count = 50,
                spread = 70,
                origin = { x: 0.5, y: 0.5 }
            } = options;

            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
            `;
            document.body.appendChild(container);

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const size = Math.random() * 10 + 5;
                const angle = (Math.random() - 0.5) * spread;
                const velocity = Math.random() * 500 + 300;
                const spin = Math.random() * 720 - 360;

                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    left: ${origin.x * 100}%;
                    top: ${origin.y * 100}%;
                    transform: translate(-50%, -50%);
                    opacity: 1;
                `;

                container.appendChild(particle);

                // Animate
                const startTime = Date.now();
                const duration = 2000 + Math.random() * 1000;
                const startX = origin.x * window.innerWidth;
                const startY = origin.y * window.innerHeight;

                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;

                    if (progress >= 1) {
                        particle.remove();
                        return;
                    }

                    const gravity = 0.5;
                    const x = startX + Math.sin(angle * Math.PI / 180) * velocity * progress;
                    const y = startY - Math.cos(angle * Math.PI / 180) * velocity * progress + gravity * elapsed * elapsed * 0.001;
                    const rotation = spin * progress;
                    const opacity = 1 - progress;

                    particle.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotation}deg)`;
                    particle.style.opacity = opacity;

                    requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
            }

            Haptics.success();
            Sounds.complete();

            setTimeout(() => container.remove(), 4000);
        },

        rain(duration = 3000) {
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
            `;
            document.body.appendChild(container);

            const interval = setInterval(() => {
                const particle = document.createElement('div');
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                const size = Math.random() * 8 + 4;
                const x = Math.random() * 100;
                const fallDuration = Math.random() * 2 + 2;

                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    left: ${x}%;
                    top: -20px;
                    animation: confetti-fall ${fallDuration}s linear forwards;
                `;

                container.appendChild(particle);
                setTimeout(() => particle.remove(), fallDuration * 1000);
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                setTimeout(() => container.remove(), 3000);
            }, duration);
        }
    };

    // ============================================
    // ACHIEVEMENT POPUP
    // ============================================
    const Achievement = {
        show({ icon, title, description }) {
            // Remove any existing popup
            document.querySelector('.achievement-popup')?.remove();

            const popup = document.createElement('div');
            popup.className = 'achievement-popup';
            popup.innerHTML = `
                <div class="achievement-icon">${icon}</div>
                <div class="achievement-label">Achievement Unlocked</div>
                <div class="achievement-title">${title}</div>
                <div class="achievement-desc">${description}</div>
            `;

            document.body.appendChild(popup);

            // Trigger animations
            requestAnimationFrame(() => {
                popup.classList.add('show');
            });

            Confetti.burst({ count: 30, origin: { x: 0.5, y: 0.4 } });
            Sounds.levelUp();

            // Auto-dismiss
            setTimeout(() => {
                popup.classList.remove('show');
                setTimeout(() => popup.remove(), 400);
            }, 3500);
        }
    };

    // ============================================
    // BOTTOM SHEET
    // ============================================
    const Sheet = {
        _overlay: null,
        _sheet: null,
        _startY: 0,
        _currentY: 0,

        show(content, options = {}) {
            const { title, onClose } = options;

            this.hide();

            this._overlay = document.createElement('div');
            this._overlay.className = 'sheet-overlay';

            this._sheet = document.createElement('div');
            this._sheet.className = 'sheet';
            this._sheet.innerHTML = `
                <div class="sheet-handle"></div>
                ${title ? `<div class="text-title-3 mb-4">${title}</div>` : ''}
                <div class="sheet-content">${content}</div>
            `;

            document.body.appendChild(this._overlay);
            document.body.appendChild(this._sheet);

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Open animation
            requestAnimationFrame(() => {
                this._overlay.classList.add('open');
                this._sheet.classList.add('open');
            });

            // Close on overlay tap
            this._overlay.addEventListener('click', () => {
                this.hide();
                onClose?.();
            });

            // Swipe to dismiss
            this._setupSwipeToDismiss(onClose);

            Haptics.medium();

            return this._sheet.querySelector('.sheet-content');
        },

        _setupSwipeToDismiss(onClose) {
            const handle = this._sheet.querySelector('.sheet-handle');

            const onStart = (e) => {
                this._startY = e.touches ? e.touches[0].clientY : e.clientY;
                this._sheet.style.transition = 'none';
            };

            const onMove = (e) => {
                this._currentY = (e.touches ? e.touches[0].clientY : e.clientY) - this._startY;
                if (this._currentY > 0) {
                    this._sheet.style.transform = `translateY(${this._currentY}px)`;
                }
            };

            const onEnd = () => {
                this._sheet.style.transition = '';
                if (this._currentY > 100) {
                    this.hide();
                    onClose?.();
                } else {
                    this._sheet.style.transform = '';
                }
                this._currentY = 0;
            };

            handle.addEventListener('touchstart', onStart, { passive: true });
            handle.addEventListener('touchmove', onMove, { passive: true });
            handle.addEventListener('touchend', onEnd);
            handle.addEventListener('mousedown', onStart);
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        },

        hide() {
            if (this._overlay) {
                this._overlay.classList.remove('open');
                setTimeout(() => this._overlay?.remove(), 300);
            }
            if (this._sheet) {
                this._sheet.classList.remove('open');
                setTimeout(() => this._sheet?.remove(), 400);
            }
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // PAGE TRANSITIONS
    // ============================================
    const Transition = {
        to(url, direction = 'forward') {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed; inset: 0; background: var(--bg-primary);
                z-index: 10000; opacity: 0;
                transition: opacity 200ms ease-out;
            `;
            document.body.appendChild(overlay);

            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });

            setTimeout(() => {
                window.location.href = url;
            }, 200);
        },

        fromHistory() {
            // Fade in on page load
            document.body.style.opacity = '0';
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 200ms ease-out';
                document.body.style.opacity = '1';
            });
        }
    };

    // ============================================
    // SKELETON LOADING
    // ============================================
    const Skeleton = {
        card(count = 1) {
            return Array(count).fill(`
                <div class="card p-4 mb-4">
                    <div class="skeleton skeleton-text" style="width: 40%; height: 12px;"></div>
                    <div class="skeleton skeleton-text mt-4" style="height: 24px;"></div>
                    <div class="skeleton skeleton-text" style="width: 80%;"></div>
                </div>
            `).join('');
        },

        list(count = 5) {
            return Array(count).fill(`
                <div class="flex items-center gap-3 p-4">
                    <div class="skeleton skeleton-circle" style="width: 44px; height: 44px;"></div>
                    <div class="flex-1">
                        <div class="skeleton skeleton-text" style="width: 60%;"></div>
                        <div class="skeleton skeleton-text" style="width: 40%;"></div>
                    </div>
                </div>
            `).join('');
        },

        grid(count = 4) {
            return `<div class="card-grid">${
                Array(count).fill(`
                    <div class="card p-4">
                        <div class="skeleton" style="width: 40px; height: 40px; border-radius: 10px;"></div>
                        <div class="skeleton skeleton-text mt-4" style="width: 70%;"></div>
                        <div class="skeleton skeleton-text" style="width: 50%;"></div>
                    </div>
                `).join('')
            }</div>`;
        }
    };

    // ============================================
    // PULL TO REFRESH
    // ============================================
    const PullToRefresh = {
        _startY: 0,
        _pulling: false,
        _onRefresh: null,

        init(onRefresh) {
            this._onRefresh = onRefresh;

            let indicator = document.querySelector('.pull-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'pull-indicator';
                indicator.innerHTML = `
                    <div class="pull-spinner animate-spin" style="
                        width: 24px; height: 24px;
                        border: 2px solid var(--bg-tertiary);
                        border-top-color: var(--accent);
                        border-radius: 50%;
                    "></div>
                `;
                indicator.style.cssText = `
                    position: fixed; top: 0; left: 0; right: 0;
                    display: flex; justify-content: center; padding: 60px 0 20px;
                    transform: translateY(-100%); transition: transform 200ms;
                    z-index: 50;
                `;
                document.body.prepend(indicator);
            }

            document.addEventListener('touchstart', (e) => {
                if (window.scrollY === 0) {
                    this._startY = e.touches[0].clientY;
                    this._pulling = true;
                }
            }, { passive: true });

            document.addEventListener('touchmove', (e) => {
                if (!this._pulling) return;
                const y = e.touches[0].clientY - this._startY;
                if (y > 0 && y < 150) {
                    indicator.style.transform = `translateY(${y - 100}px)`;
                }
            }, { passive: true });

            document.addEventListener('touchend', () => {
                if (!this._pulling) return;
                const currentY = parseFloat(indicator.style.transform.match(/-?\d+/)?.[0] || -100);
                if (currentY > -20) {
                    indicator.style.transform = 'translateY(0)';
                    Haptics.medium();
                    this._onRefresh?.();
                    setTimeout(() => {
                        indicator.style.transform = 'translateY(-100%)';
                    }, 1000);
                } else {
                    indicator.style.transform = 'translateY(-100%)';
                }
                this._pulling = false;
            });
        }
    };

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    const Ripple = {
        attach(selector = '.btn, .card-interactive') {
            document.querySelectorAll(selector).forEach(el => {
                if (el.dataset.ripple) return;
                el.dataset.ripple = 'true';
                el.style.position = 'relative';
                el.style.overflow = 'hidden';

                el.addEventListener('click', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const ripple = document.createElement('span');
                    ripple.style.cssText = `
                        position: absolute;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple-effect 600ms ease-out;
                        pointer-events: none;
                        width: 100px; height: 100px;
                        left: ${x - 50}px;
                        top: ${y - 50}px;
                    `;

                    el.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });
        }
    };

    // Add ripple animation to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PROGRESS RING
    // ============================================
    const ProgressRing = {
        create(percent, size = 60, stroke = 4) {
            const radius = (size - stroke) / 2;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percent / 100) * circumference;

            return `
                <svg class="progress-ring" width="${size}" height="${size}">
                    <circle class="progress-ring-bg"
                        stroke-width="${stroke}"
                        fill="transparent"
                        r="${radius}"
                        cx="${size / 2}"
                        cy="${size / 2}"
                    />
                    <circle class="progress-ring-fill"
                        stroke-width="${stroke}"
                        fill="transparent"
                        r="${radius}"
                        cx="${size / 2}"
                        cy="${size / 2}"
                        stroke-dasharray="${circumference} ${circumference}"
                        stroke-dashoffset="${offset}"
                    />
                </svg>
            `;
        },

        update(element, percent) {
            const circle = element.querySelector('.progress-ring-fill');
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        // Initialize sounds on first interaction
        document.addEventListener('touchstart', () => Sounds.init(), { once: true });
        document.addEventListener('click', () => Sounds.init(), { once: true });

        // Page transition effect
        Transition.fromHistory();

        // Attach ripple effects
        setTimeout(() => Ripple.attach(), 100);

        // Re-attach ripples when DOM changes
        const observer = new MutationObserver(() => Ripple.attach());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Auto-init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        Haptics,
        Sounds,
        Toast,
        Confetti,
        Achievement,
        Sheet,
        Transition,
        Skeleton,
        PullToRefresh,
        Ripple,
        ProgressRing,
        init
    };
})();

// Make globally available
window.UI = UI;
