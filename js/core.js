/**
 * Yespañol - Core Learning Engine
 * Handles: User profile, progress, spaced repetition, weak point tracking
 */

const Yespanol = (function() {
    const STORAGE_KEY = 'yespanol_user';
    const BACKUP_KEY = 'yespanol_user_backup';
    const VERSION = '1.1.0';

    // Default user profile
    const defaultProfile = {
        version: VERSION,
        created: null,
        lastVisit: null,

        // User info
        name: '',
        level: 'beginner', // beginner, intermediate, advanced

        // Streak tracking
        streak: 0,
        longestStreak: 0,

        // Overall stats
        totalSessions: 0,
        totalCardsReviewed: 0,
        totalCorrect: 0,
        totalTime: 0, // in seconds

        // Skill levels by category (0-100)
        skills: {
            'ser-estar': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'por-para': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'subjunctive': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'preterite-imperfect': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'vocabulary': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'idioms': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
            'false-friends': { level: 0, correct: 0, attempts: 0, lastPracticed: null },
        },

        // Individual card tracking for spaced repetition
        // key: cardId, value: { ease, interval, nextReview, correct, attempts }
        cards: {},

        // Recent mistakes for review
        recentMistakes: [],

        // Achievements unlocked
        achievements: [],

        // Settings
        settings: {
            soundEnabled: true,
            hapticEnabled: true,
            darkMode: true,
            fontSize: 'medium', // small, medium, large
            dailyGoal: 20, // cards per day
        }
    };

    // Validate profile structure
    function validateProfile(profile) {
        if (!profile || typeof profile !== 'object') return false;
        if (!profile.skills || typeof profile.skills !== 'object') return false;
        if (typeof profile.totalCardsReviewed !== 'number') return false;
        if (typeof profile.streak !== 'number') return false;
        return true;
    }

    // Load user profile with backup recovery
    function load() {
        let profile = null;

        // Try main storage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                profile = JSON.parse(stored);
                if (!validateProfile(profile)) {
                    console.warn('Profile validation failed, trying backup...');
                    profile = null;
                }
            }
        } catch (e) {
            console.error('Failed to load profile:', e);
        }

        // Try backup if main failed
        if (!profile) {
            try {
                const backup = localStorage.getItem(BACKUP_KEY);
                if (backup) {
                    profile = JSON.parse(backup);
                    if (validateProfile(profile)) {
                        console.log('Recovered from backup');
                        // Restore main from backup
                        localStorage.setItem(STORAGE_KEY, backup);
                    } else {
                        profile = null;
                    }
                }
            } catch (e) {
                console.error('Backup recovery failed:', e);
            }
        }

        // Merge with defaults or create new
        if (profile) {
            profile = deepMerge(defaultProfile, profile);
            profile.version = VERSION; // Update version
        } else {
            profile = { ...JSON.parse(JSON.stringify(defaultProfile)), created: Date.now() };
        }

        save(profile);
        return profile;
    }

    // Save user profile with automatic backup
    function save(profile) {
        try {
            profile.lastVisit = Date.now();
            profile.version = VERSION;
            const data = JSON.stringify(profile);

            // Check storage quota (rough estimate)
            if (data.length > 4 * 1024 * 1024) { // 4MB warning
                console.warn('Profile data is getting large:', Math.round(data.length / 1024), 'KB');
            }

            // Save main
            localStorage.setItem(STORAGE_KEY, data);

            // Backup every 5th save (reduce write frequency)
            if (!save._count) save._count = 0;
            save._count++;
            if (save._count % 5 === 0) {
                localStorage.setItem(BACKUP_KEY, data);
            }
        } catch (e) {
            console.error('Failed to save profile:', e);
            // If quota exceeded, try to clean up old card data
            if (e.name === 'QuotaExceededError') {
                cleanupOldData(profile);
            }
        }
    }

    // Clean up old card data if storage is full
    function cleanupOldData(profile) {
        const now = Date.now();
        const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

        // Remove cards not reviewed in 30 days with high ease (well-known)
        let removed = 0;
        for (const [cardId, cardData] of Object.entries(profile.cards)) {
            if (cardData.nextReview < thirtyDaysAgo && cardData.ease > 2.5) {
                delete profile.cards[cardId];
                removed++;
            }
        }

        // Trim recent mistakes to last 20
        if (profile.recentMistakes.length > 20) {
            profile.recentMistakes = profile.recentMistakes.slice(0, 20);
        }

        console.log(`Cleaned up ${removed} old cards`);
    }

    // Deep merge helper
    function deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }

    // Check and update streak
    function updateStreak(profile) {
        const today = new Date().toDateString();
        const lastVisit = profile.lastVisit ? new Date(profile.lastVisit).toDateString() : null;

        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastVisit === yesterday.toDateString()) {
                profile.streak += 1;
            } else if (lastVisit !== today) {
                profile.streak = 1;
            }

            if (profile.streak > profile.longestStreak) {
                profile.longestStreak = profile.streak;
            }
        }

        return profile;
    }

    // Spaced Repetition Algorithm (SM-2 variant)
    function calculateNextReview(card, correct, responseTime) {
        // Default card data
        if (!card.ease) card.ease = 2.5;
        if (!card.interval) card.interval = 0;
        if (!card.repetitions) card.repetitions = 0;

        if (correct) {
            card.repetitions += 1;

            if (card.repetitions === 1) {
                card.interval = 1; // 1 day
            } else if (card.repetitions === 2) {
                card.interval = 3; // 3 days
            } else {
                card.interval = Math.round(card.interval * card.ease);
            }

            // Adjust ease based on response time (faster = easier)
            if (responseTime < 3000) {
                card.ease = Math.min(card.ease + 0.1, 3.0);
            }
        } else {
            card.repetitions = 0;
            card.interval = 0; // Review again soon
            card.ease = Math.max(card.ease - 0.2, 1.3);
        }

        card.nextReview = Date.now() + (card.interval * 24 * 60 * 60 * 1000);
        return card;
    }

    // Record a card attempt
    function recordAttempt(cardId, category, correct, responseTime = 5000) {
        const profile = load();

        // Update overall stats
        profile.totalCardsReviewed += 1;
        if (correct) profile.totalCorrect += 1;

        // Update skill category
        if (profile.skills[category]) {
            profile.skills[category].attempts += 1;
            if (correct) profile.skills[category].correct += 1;
            profile.skills[category].lastPracticed = Date.now();

            // Calculate skill level (0-100)
            const s = profile.skills[category];
            const accuracy = s.attempts > 0 ? (s.correct / s.attempts) : 0;
            const practice = Math.min(s.attempts / 50, 1); // Max out at 50 attempts
            s.level = Math.round((accuracy * 0.7 + practice * 0.3) * 100);
        }

        // Update individual card with spaced repetition
        if (!profile.cards[cardId]) {
            profile.cards[cardId] = { correct: 0, attempts: 0 };
        }
        profile.cards[cardId].attempts += 1;
        if (correct) profile.cards[cardId].correct += 1;
        profile.cards[cardId] = calculateNextReview(profile.cards[cardId], correct, responseTime);

        // Track recent mistakes
        if (!correct) {
            profile.recentMistakes.unshift({ cardId, category, timestamp: Date.now() });
            profile.recentMistakes = profile.recentMistakes.slice(0, 50); // Keep last 50
        }

        // Check achievements
        checkAchievements(profile);

        save(profile);
        return profile;
    }

    // Get cards due for review (spaced repetition)
    function getCardsForReview(allCards, limit = 20) {
        const profile = load();
        const now = Date.now();

        // Sort cards by priority
        const prioritized = allCards.map(card => {
            const cardData = profile.cards[card.id] || {};
            const nextReview = cardData.nextReview || 0;
            const overdue = now - nextReview;

            // Priority: overdue cards first, then new cards, then future cards
            let priority = 0;
            if (!cardData.nextReview) {
                priority = 1000; // New card
            } else if (overdue > 0) {
                priority = 2000 + overdue; // Overdue - higher = more overdue
            } else {
                priority = overdue; // Future - negative value
            }

            return { ...card, priority, cardData };
        });

        // Sort by priority (highest first) and take limit
        prioritized.sort((a, b) => b.priority - a.priority);
        return prioritized.slice(0, limit);
    }

    // Get weakest skills
    function getWeakestSkills(profile, count = 3) {
        const skills = Object.entries(profile.skills)
            .filter(([_, data]) => data.attempts > 0)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => a.level - b.level);

        return skills.slice(0, count);
    }

    // Get strongest skills
    function getStrongestSkills(profile, count = 3) {
        const skills = Object.entries(profile.skills)
            .filter(([_, data]) => data.attempts > 0)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.level - a.level);

        return skills.slice(0, count);
    }

    // Get recommended next lesson
    function getRecommendedLesson(profile) {
        const weakest = getWeakestSkills(profile, 1);

        if (weakest.length === 0) {
            // New user - start with ser-estar
            return { skill: 'ser-estar', reason: 'Start here — the foundation of Spanish.' };
        }

        const skill = weakest[0];
        const reasons = {
            'ser-estar': 'Your "to be" verbs need work.',
            'por-para': 'Let\'s sharpen your por vs para.',
            'subjunctive': 'Subjunctive could use practice.',
            'preterite-imperfect': 'Past tenses need attention.',
            'vocabulary': 'Time to expand your vocabulary.',
            'idioms': 'Let\'s work on sounding more natural.',
            'false-friends': 'Watch out for those tricky words.',
        };

        return { skill: skill.name, reason: reasons[skill.name] || 'Keep practicing!' };
    }

    // Achievement definitions
    const achievementDefs = {
        'first-card': { name: 'First Steps', desc: 'Review your first card', icon: '🎯' },
        'streak-3': { name: 'On a Roll', desc: '3 day streak', icon: '🔥' },
        'streak-7': { name: 'Week Warrior', desc: '7 day streak', icon: '⚡' },
        'streak-30': { name: 'Monthly Master', desc: '30 day streak', icon: '👑' },
        'cards-100': { name: 'Century', desc: 'Review 100 cards', icon: '💯' },
        'cards-500': { name: 'Dedicated', desc: 'Review 500 cards', icon: '📚' },
        'perfect-10': { name: 'Perfect Ten', desc: '10 correct in a row', icon: '✨' },
        'ser-estar-50': { name: 'Being Expert', desc: '50% mastery of ser/estar', icon: '⚖️' },
        'all-skills': { name: 'Well Rounded', desc: 'Practice all skill areas', icon: '🌟' },
    };

    // Check and award achievements
    function checkAchievements(profile) {
        const newAchievements = [];

        if (profile.totalCardsReviewed >= 1 && !profile.achievements.includes('first-card')) {
            profile.achievements.push('first-card');
            newAchievements.push(achievementDefs['first-card']);
        }

        if (profile.streak >= 3 && !profile.achievements.includes('streak-3')) {
            profile.achievements.push('streak-3');
            newAchievements.push(achievementDefs['streak-3']);
        }

        if (profile.streak >= 7 && !profile.achievements.includes('streak-7')) {
            profile.achievements.push('streak-7');
            newAchievements.push(achievementDefs['streak-7']);
        }

        if (profile.totalCardsReviewed >= 100 && !profile.achievements.includes('cards-100')) {
            profile.achievements.push('cards-100');
            newAchievements.push(achievementDefs['cards-100']);
        }

        if (profile.skills['ser-estar'].level >= 50 && !profile.achievements.includes('ser-estar-50')) {
            profile.achievements.push('ser-estar-50');
            newAchievements.push(achievementDefs['ser-estar-50']);
        }

        return newAchievements;
    }

    // Get overall accuracy
    function getAccuracy(profile) {
        if (profile.totalCardsReviewed === 0) return 0;
        return Math.round((profile.totalCorrect / profile.totalCardsReviewed) * 100);
    }

    // Get cards due for review today (from profile)
    function getDueCards(profile) {
        const now = Date.now();
        const dueCards = [];

        for (const [cardId, cardData] of Object.entries(profile.cards)) {
            if (cardData.nextReview && cardData.nextReview <= now) {
                dueCards.push({ id: cardId, ...cardData });
            }
        }

        return dueCards;
    }

    // Format skill name for display
    function formatSkillName(skill) {
        const names = {
            'ser-estar': 'Ser vs Estar',
            'por-para': 'Por vs Para',
            'subjunctive': 'Subjunctive',
            'preterite-imperfect': 'Past Tenses',
            'vocabulary': 'Vocabulary',
            'idioms': 'Idioms',
            'false-friends': 'False Friends',
        };
        return names[skill] || skill;
    }

    // Export user data as JSON string
    function exportData() {
        const profile = load();
        return JSON.stringify({
            exportedAt: Date.now(),
            version: VERSION,
            profile: profile
        }, null, 2);
    }

    // Import user data from JSON string
    function importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            // Validate it's our export format
            if (!data.profile || !validateProfile(data.profile)) {
                return { success: false, error: 'Invalid backup file format' };
            }

            // Backup current before overwriting
            const current = localStorage.getItem(STORAGE_KEY);
            if (current) {
                localStorage.setItem(BACKUP_KEY, current);
            }

            // Merge imported with defaults (handle version differences)
            const imported = deepMerge(defaultProfile, data.profile);
            imported.version = VERSION;
            save(imported);

            return { success: true, profile: imported };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    // Reset all progress (with confirmation)
    function resetProgress(keepSettings = true) {
        const profile = load();

        // Backup before reset
        localStorage.setItem(BACKUP_KEY, JSON.stringify(profile));

        const newProfile = { ...JSON.parse(JSON.stringify(defaultProfile)), created: Date.now() };

        // Optionally keep user settings
        if (keepSettings && profile.settings) {
            newProfile.settings = profile.settings;
        }

        save(newProfile);
        return newProfile;
    }

    // Force backup now
    function forceBackup() {
        const profile = load();
        localStorage.setItem(BACKUP_KEY, JSON.stringify(profile));
        return true;
    }

    // Get storage stats
    function getStorageStats() {
        const main = localStorage.getItem(STORAGE_KEY) || '';
        const backup = localStorage.getItem(BACKUP_KEY) || '';

        return {
            mainSize: main.length,
            backupSize: backup.length,
            totalKB: Math.round((main.length + backup.length) / 1024),
            hasBackup: backup.length > 0
        };
    }

    // Public API
    return {
        load,
        save,
        updateStreak,
        recordAttempt,
        getCardsForReview,
        getDueCards,
        getWeakestSkills,
        getStrongestSkills,
        getRecommendedLesson,
        getAccuracy,
        formatSkillName,
        achievementDefs,
        // Data management
        exportData,
        importData,
        resetProgress,
        forceBackup,
        getStorageStats,
        VERSION,
    };
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Yespanol;
}
