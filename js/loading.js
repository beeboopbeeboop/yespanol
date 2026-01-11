/**
 * Yespañol - Loading Screen with Spanish Facts
 * Beautiful, informative loading states
 */

const YespanolLoading = (function() {

    // Fascinating facts about Spanish
    const spanishFacts = [
        {
            fact: "Spanish is the 4th most spoken language in the world",
            detail: "Over 580 million people speak Spanish globally"
        },
        {
            fact: "Spanish has over 100,000 words",
            detail: "Though most native speakers only use about 10,000"
        },
        {
            fact: "The ñ is uniquely Spanish",
            detail: "It originated in the 12th century as a shorthand for 'nn'"
        },
        {
            fact: "Spanish and English share 30-40% of their vocabulary",
            detail: "Thanks to Latin roots — these are called cognates"
        },
        {
            fact: "The Royal Spanish Academy was founded in 1713",
            detail: "They still publish the official Spanish dictionary today"
        },
        {
            fact: "Spanish is an official language in 21 countries",
            detail: "From Spain to Equatorial Guinea in Africa"
        },
        {
            fact: "The longest Spanish word has 23 letters",
            detail: "Electroencefalografista — one who operates EEG machines"
        },
        {
            fact: "Spanish has two past tenses English doesn't",
            detail: "The preterite and imperfect express different aspects of past actions"
        },
        {
            fact: "¡ and ¿ are unique to Spanish",
            detail: "They help readers know a question or exclamation is coming"
        },
        {
            fact: "Spanish has Arabic influences",
            detail: "About 4,000 Spanish words come from Arabic, like 'almohada' (pillow)"
        },
        {
            fact: "The letter 'e' is the most common in Spanish",
            detail: "Followed by 'a' — that's why Spanish sounds so melodic"
        },
        {
            fact: "Spanish has only 5 vowel sounds",
            detail: "English has 12-14, making Spanish easier to pronounce"
        },
        {
            fact: "Cervantes invented over 9,000 words",
            detail: "The author of Don Quixote enriched Spanish tremendously"
        },
        {
            fact: "Spanish is the most phonetic major language",
            detail: "Words are spelled exactly as they sound — no silent letters"
        },
        {
            fact: "In 100 years, the US may have the most Spanish speakers",
            detail: "It's already the 2nd largest Spanish-speaking country"
        },
        {
            fact: "Spanish has two verbs for 'to be'",
            detail: "Ser and estar — one of the trickiest concepts for learners"
        },
        {
            fact: "The subjunctive mood is still alive in Spanish",
            detail: "It's used daily to express doubt, desire, and emotion"
        },
        {
            fact: "Spanish speakers talk faster than English speakers",
            detail: "About 7.82 syllables per second vs 6.19 for English"
        },
        {
            fact: "The word 'gringo' might come from 'green go'",
            detail: "Allegedly shouted at US soldiers in green uniforms — though this is debated"
        },
        {
            fact: "Spanish uses fewer words than English to say the same thing",
            detail: "Spanish translations are typically 15-25% shorter"
        }
    ];

    // Loading messages that fit the app's vibe
    const loadingMessages = [
        "Preparing your lesson...",
        "Loading vocabulary...",
        "Calibrating difficulty...",
        "Personalizing your path...",
        "Warming up the neurons...",
        "Gathering wisdom...",
        "Almost there...",
        "One moment..."
    ];

    // Story mode loading messages
    const storyLoadingMessages = [
        "Searching for connections...",
        "Calibrating the algorithm...",
        "Analyzing your progress...",
        "Something is aligning...",
        "The path is forming...",
        "Trust the process..."
    ];

    // Get random item from array
    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Create and show loading screen
    function show(options = {}) {
        const {
            type = 'default', // 'default', 'story', 'fact'
            message = null,
            duration = null, // null = manual hide, number = auto-hide after ms
            onComplete = null
        } = options;

        // Remove existing loading screen if any
        hide();

        const overlay = document.createElement('div');
        overlay.id = 'yespanol-loading';
        overlay.className = 'loading-overlay';

        let content = '';

        if (type === 'fact') {
            const factData = pick(spanishFacts);
            content = `
                <div class="loading-content loading-fact">
                    <div class="loading-spinner"></div>
                    <div class="loading-fact-text">
                        <div class="fact-main">${factData.fact}</div>
                        <div class="fact-detail">${factData.detail}</div>
                    </div>
                </div>
            `;
        } else if (type === 'story') {
            content = `
                <div class="loading-content loading-story">
                    <div class="loading-pulse"></div>
                    <div class="loading-message">${message || pick(storyLoadingMessages)}</div>
                </div>
            `;
        } else {
            content = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <div class="loading-message">${message || pick(loadingMessages)}</div>
                </div>
            `;
        }

        overlay.innerHTML = content;

        // Add styles if not already added
        if (!document.getElementById('yespanol-loading-styles')) {
            const styles = document.createElement('style');
            styles.id = 'yespanol-loading-styles';
            styles.textContent = `
                .loading-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(10, 10, 15, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .loading-overlay.visible { opacity: 1; }

                .loading-content {
                    text-align: center;
                    padding: 40px;
                    max-width: 320px;
                }

                .loading-spinner {
                    width: 48px; height: 48px;
                    margin: 0 auto 24px;
                    border: 3px solid rgba(255, 255, 255, 0.1);
                    border-top-color: #ff6b4a;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                .loading-pulse {
                    width: 64px; height: 64px;
                    margin: 0 auto 24px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(147, 112, 219, 0.3) 0%, transparent 70%);
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.5;
                        box-shadow: 0 0 30px rgba(147, 112, 219, 0.3);
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 1;
                        box-shadow: 0 0 60px rgba(147, 112, 219, 0.5);
                    }
                }

                .loading-message {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 500;
                }

                .loading-story .loading-message {
                    color: #9370db;
                    font-style: italic;
                }

                .loading-fact .loading-fact-text {
                    margin-top: 20px;
                }

                .fact-main {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #f5f5f7;
                    margin-bottom: 8px;
                    line-height: 1.4;
                }

                .fact-detail {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.5;
                }

                /* Progress loading variant */
                .loading-progress {
                    width: 200px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    margin: 24px auto 0;
                    overflow: hidden;
                }

                .loading-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff6b4a, #ff8a6a);
                    border-radius: 2px;
                    width: 0%;
                    transition: width 0.3s ease;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });

        // Auto-hide if duration specified
        if (duration) {
            setTimeout(() => {
                hide();
                if (onComplete) onComplete();
            }, duration);
        }

        return overlay;
    }

    // Hide loading screen
    function hide() {
        const overlay = document.getElementById('yespanol-loading');
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // Show loading with fact (convenience method)
    function showFact(duration = 2000) {
        return show({ type: 'fact', duration });
    }

    // Show story-mode loading
    function showStory(message = null, duration = null) {
        return show({ type: 'story', message, duration });
    }

    // Show with progress bar
    function showProgress(message = null) {
        const overlay = show({ message: message || 'Loading...' });

        // Add progress bar
        const content = overlay.querySelector('.loading-content');
        const progressHtml = `
            <div class="loading-progress">
                <div class="loading-progress-fill" id="loading-progress-fill"></div>
            </div>
        `;
        content.insertAdjacentHTML('beforeend', progressHtml);

        return {
            overlay,
            setProgress: (percent) => {
                const fill = document.getElementById('loading-progress-fill');
                if (fill) fill.style.width = percent + '%';
            },
            complete: () => {
                const fill = document.getElementById('loading-progress-fill');
                if (fill) fill.style.width = '100%';
                setTimeout(hide, 300);
            }
        };
    }

    // Get a random fact
    function getRandomFact() {
        return pick(spanishFacts);
    }

    // Public API
    return {
        show,
        hide,
        showFact,
        showStory,
        showProgress,
        getRandomFact,
        facts: spanishFacts
    };
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YespanolLoading;
}
