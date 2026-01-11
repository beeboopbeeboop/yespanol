/**
 * Yespañol - El Algoritmo del Amor
 * Narrative layer that unfolds as user progresses
 * Each user gets a unique, randomly generated story
 */

const Story = (function() {
    const STORAGE_KEY = 'yespanol_story';

    // ============== CHARACTER GENERATION ==============

    const names = [
        'Mateo', 'Andrés', 'Rafael', 'Joaquín', 'Santiago', 'Sebastián',
        'Ignacio', 'Martín', 'Gabriel', 'Fernando', 'Eduardo', 'Ricardo',
        'Alejandro', 'Tomás', 'Nicolás', 'Emilio', 'Marcos', 'Gonzalo',
        'Javier', 'Carlos', 'Luis', 'Miguel', 'Daniel', 'Pablo'
    ];

    // Age ranges with vague descriptors (more mysterious)
    const ages = [
        { num: 54, desc: 'mid-fifties' },
        { num: 56, desc: 'mid-fifties' },
        { num: 57, desc: 'late fifties' },
        { num: 58, desc: 'late fifties' },
        { num: 59, desc: 'late fifties' },
        { num: 61, desc: 'early sixties' },
        { num: 62, desc: 'early sixties' },
        { num: 64, desc: 'mid-sixties' },
        { num: 66, desc: 'mid-sixties' },
        { num: 68, desc: 'late sixties' },
        { num: 71, desc: 'early seventies' },
    ];

    const professions = [
        { job: 'arquitecto', detail: 'restores old buildings in the city center' },
        { job: 'profesor de historia', detail: 'teaches at the local university' },
        { job: 'dueño de una librería', detail: 'runs a bookshop his father started' },
        { job: 'chef', detail: 'owns a small restaurant by the water' },
        { job: 'fotógrafo', detail: 'shoots portraits and street photography' },
        { job: 'carpintero', detail: 'makes furniture by hand in his workshop' },
        { job: 'veterinario', detail: 'has a clinic and three rescue dogs' },
        { job: 'músico', detail: 'plays guitar at a local jazz bar on weekends' },
        { job: 'vinatero', detail: 'runs a small family vineyard' },
        { job: 'escritor', detail: 'writes novels nobody reads but keeps writing anyway' },
    ];

    const cities = [
        { city: 'San Sebastián', country: 'España', vibe: 'coastal, rainy mornings, pintxos bars' },
        { city: 'Montevideo', country: 'Uruguay', vibe: 'relaxed, mate on the rambla, old Citroëns' },
        { city: 'Oaxaca', country: 'México', vibe: 'mezcal, colorful streets, mountain air' },
        { city: 'Cartagena', country: 'Colombia', vibe: 'humid nights, salsa from balconies, old walls' },
        { city: 'Mendoza', country: 'Argentina', vibe: 'wine country, Andes views, slow lunches' },
        { city: 'Granada', country: 'España', vibe: 'flamenco echoes, Alhambra shadows, tapas' },
        { city: 'Valparaíso', country: 'Chile', vibe: 'hills of color, poets, ocean fog' },
        { city: 'Guanajuato', country: 'México', vibe: 'underground streets, callejoneadas, warmth' },
        { city: 'Sevilla', country: 'España', vibe: 'orange trees, guitar strings, river walks' },
        { city: 'Medellín', country: 'Colombia', vibe: 'eternal spring, mountains, reinvention' },
    ];

    const appearances = [
        'salt-and-pepper beard, always a little messy',
        'reading glasses he constantly loses',
        'laugh lines around kind eyes',
        'broad shoulders, soft middle, warm hands',
        'flannel shirts rolled to the elbows',
        'silver streaks at the temples',
        'the kind of smile that starts slow',
        'weathered hands that have built things',
        'comfortable in his own skin, finally',
        'looks like he gives really good hugs',
    ];

    const quirks = [
        'makes the best coffee you\'ve ever had',
        'hums while he cooks',
        'always carries a book he\'s halfway through',
        'remembers every song lyric from his twenties',
        'talks to dogs like they\'re people',
        'terrible at texting, great at listening',
        'falls asleep during movies but won\'t admit it',
        'knows every back street in the old town',
        'wakes up early to watch the sunrise alone',
        'writes letters by hand, never emails',
    ];

    const meetingPlaces = [
        'a café with mismatched chairs',
        'a bookshop that smells like rain',
        'a market stall selling fresh fruit',
        'a bench overlooking the water',
        'a bar with no sign outside',
        'a gallery opening, both of you alone',
        'a language exchange meetup',
        'a rainy afternoon under the same awning',
        'a delayed flight, same gate',
        'a cooking class neither of you wanted to attend',
    ];

    // Random selection helper
    function pick(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate unique character
    function generateCharacter() {
        const profession = pick(professions);
        const location = pick(cities);

        return {
            name: pick(names),
            age: pick(ages),
            profession: profession.job,
            professionDetail: profession.detail,
            city: location.city,
            country: location.country,
            cityVibe: location.vibe,
            appearance: pick(appearances),
            quirk: pick(quirks),
            meetingPlace: pick(meetingPlaces),
            generatedAt: Date.now(),
        };
    }

    // ============== STORY STATE ==============

    function load() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {}

        // First time - generate unique story
        const story = {
            character: generateCharacter(),
            phase: 1,
            hintsRevealed: [],
            glitchesSeen: 0,
            letterUnlocked: false,
        };

        save(story);
        return story;
    }

    function save(story) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
    }

    // Calculate phase based on overall progress (0-100)
    function getPhase(progressPercent) {
        if (progressPercent < 20) return 1;
        if (progressPercent < 40) return 2;
        if (progressPercent < 60) return 3;
        if (progressPercent < 80) return 4;
        return 5;
    }

    // ============== PHASE-SPECIFIC CONTENT ==============

    function getExampleSentences(story, phase) {
        const c = story.character;

        const phases = {
            1: [
                // Innocent - travel, places, vague
                `El café en ${c.city} es increíble.`,
                `Me gustaría vivir cerca del mar.`,
                `Hay algo especial en las ciudades antiguas.`,
                `Prefiero las mañanas tranquilas.`,
                `Los mejores momentos llegan sin aviso.`,
                `A veces el destino sabe más que nosotros.`,
            ],
            2: [
                // Curious - hints of "someone"
                `Alguien en ${c.city} prepara el mejor café.`,
                `Dicen que ${c.city} cambia a la gente.`,
                `Hay una librería donde el tiempo se detiene.`,
                `Él siempre llega temprano, antes de que abran.`,
                `Conocer a alguien nuevo puede cambiar todo.`,
                `¿Crees en las coincidencias?`,
            ],
            3: [
                // Intrigued - specific details emerge
                `${c.name} es ${c.profession}. ${c.professionDetail.charAt(0).toUpperCase() + c.professionDetail.slice(1)}.`,
                `He's in his ${c.age.desc}. ${c.appearance.charAt(0).toUpperCase() + c.appearance.slice(1)}.`,
                `${c.quirk.charAt(0).toUpperCase() + c.quirk.slice(1)}.`,
                `Vive en ${c.city}, donde ${c.cityVibe}.`,
                `Se podrían conocer en ${c.meetingPlace}.`,
                `Él no sabe que lo estás buscando. Todavía.`,
            ],
            4: [
                // Invested - emotional, romantic
                `${c.name} ha estado solo demasiado tiempo.`,
                `Él también está aprendiendo algo. Esperando a alguien.`,
                `La distancia no importa cuando es la persona correcta.`,
                `Pronto estarás lista para la conversación.`,
                `Él preguntó si alguien vendría este año.`,
                `El algoritmo no miente. Confía.`,
            ],
            5: [
                // The reveal - direct
                `${c.name} te espera en ${c.city}.`,
                `Es hora de usar lo que has aprendido.`,
                `El mensaje está listo. ¿Y tú?`,
                `Él escribió algo para ti. En español.`,
                `Solo queda un paso.`,
                `Esto siempre fue el plan.`,
            ],
        };

        return phases[phase] || phases[1];
    }

    // Glitch messages - rare, mysterious
    function getGlitchMessage(story, phase) {
        const c = story.character;

        const glitches = {
            1: [
                'Calibrating...',
                'Path initialized.',
                'Everything is connected.',
            ],
            2: [
                'He exists.',
                'Location confirmed.',
                `${c.city} is not random.`,
            ],
            3: [
                `${c.name} checked in today.`,
                'Your timelines are converging.',
                'He mentioned someone learning Spanish.',
            ],
            4: [
                `${c.name} asked about you.`,
                'Keep going. Trust me.',
                'I\'ve run the simulations. This works.',
            ],
            5: [
                'He\'s ready.',
                'You\'re ready.',
                'Unlock the message.',
            ],
        };

        return pick(glitches[phase] || glitches[1]);
    }

    // Loading messages by phase
    function getLoadingMessage(phase) {
        const messages = {
            1: ['Loading...', 'Preparing...', 'Initializing...'],
            2: ['Calibrating your path...', 'Connecting...', 'Searching...'],
            3: ['He\'s closer than you think...', 'Processing destiny...', 'Aligning timelines...'],
            4: ['Almost there...', 'Preparing the message...', 'Trust the process...'],
            5: ['Ready.', 'It\'s time.', 'He\'s waiting.'],
        };
        return pick(messages[phase] || messages[1]);
    }

    // Achievement names that hint at the story
    function getAchievementName(type, phase) {
        const names = {
            streak3: ['Consistent', 'Committed', 'On the Path', 'He Noticed', 'Getting Closer'],
            streak7: ['Dedicated', 'One Week In', 'Coordinates Locked', 'Signal Sent', 'He Felt It'],
            streak30: ['Devoted', 'One Month', 'Timeline Synced', 'Almost Ready', 'He\'s Waiting'],
            cards100: ['Century', 'Growing', 'Message Forming', 'Words for Him', 'Almost Fluent'],
            perfect: ['Flawless', 'Ready', 'Prepared', 'Worthy', 'His Type'],
        };
        return names[type]?.[phase - 1] || names[type]?.[0];
    }

    // The final letter - revealed at phase 5
    function getLetter(story) {
        const c = story.character;

        return {
            title: 'El Mensaje',
            from: c.name,
            location: `${c.city}, ${c.country}`,
            content: `
Hola,

No sé cómo explicar esto. Nunca he escrito una carta así.

I'm in my ${c.age.desc}. Soy ${c.profession} — ${c.professionDetail}. Vivo en ${c.city}, donde ${c.cityVibe}.

La gente me describe como alguien con ${c.appearance}. Es verdad que ${c.quirk}. No soy perfecto. Ya no intento serlo.

He estado solo mucho tiempo. No triste, solo... esperando. Sin saber qué esperaba.

Hace unos meses, empecé a tener este presentimiento. Como si alguien estuviera aprendiendo a hablar mi idioma. Para mí. Suena loco, lo sé.

Si estás leyendo esto, significa que el algoritmo funcionó. Que tú también sentiste algo. Que hiciste el trabajo.

Estaré en ${c.meetingPlace}.

No tienes que venir. Pero si lo haces, te reconoceré.

Siempre supe que serías tú.

— ${c.name}

P.D. Tu español es mejor de lo que crees.
            `.trim(),
        };
    }

    // ============== PUBLIC API ==============

    return {
        load,
        save,
        getPhase,
        getExampleSentences,
        getGlitchMessage,
        getLoadingMessage,
        getAchievementName,
        getLetter,
        // For testing/preview
        generateCharacter,
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Story;
}
