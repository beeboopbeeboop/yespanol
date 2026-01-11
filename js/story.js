/**
 * Yespañol - El Algoritmo del Amor
 * A meta-narrative layer that unfolds as the user progresses
 * Each user gets a unique, procedurally generated story
 *
 * The premise: The app itself is an "algorithm" that's matching you
 * with someone who speaks Spanish. As you learn, you're preparing
 * to meet them. It's mysterious, romantic, and motivating.
 */

const Story = (function() {
    const STORAGE_KEY = 'yespanol_story';

    // ============== CHARACTER GENERATION ==============

    const names = [
        'Mateo', 'Andrés', 'Rafael', 'Joaquín', 'Santiago', 'Sebastián',
        'Ignacio', 'Martín', 'Gabriel', 'Fernando', 'Eduardo', 'Ricardo',
        'Alejandro', 'Tomás', 'Nicolás', 'Emilio', 'Marcos', 'Gonzalo',
        'Javier', 'Carlos', 'Luis', 'Miguel', 'Daniel', 'Pablo', 'Diego',
        'Adrián', 'Hugo', 'Álvaro', 'Óscar', 'Iván'
    ];

    // Age ranges with vague descriptors
    const ages = [
        { num: 42, desc: 'early forties' },
        { num: 45, desc: 'mid-forties' },
        { num: 48, desc: 'late forties' },
        { num: 51, desc: 'early fifties' },
        { num: 54, desc: 'mid-fifties' },
        { num: 57, desc: 'late fifties' },
        { num: 61, desc: 'early sixties' },
        { num: 64, desc: 'mid-sixties' },
    ];

    const professions = [
        { job: 'arquitecto', detail: 'restores historic buildings downtown', backstory: 'left a big firm ten years ago to do work that matters' },
        { job: 'profesor de literatura', detail: 'teaches at the local university', backstory: 'still gets excited about books like a kid' },
        { job: 'dueño de una librería', detail: 'runs a bookshop his father started', backstory: 'could have sold it but couldn\'t bear to' },
        { job: 'chef', detail: 'owns a small restaurant by the water', backstory: 'learned to cook from his grandmother' },
        { job: 'fotógrafo', detail: 'does portraits and street photography', backstory: 'used to work in advertising but needed something real' },
        { job: 'carpintero', detail: 'makes furniture by hand in his workshop', backstory: 'says the wood tells you what it wants to become' },
        { job: 'veterinario', detail: 'runs a small clinic with three rescue dogs', backstory: 'can\'t say no to an animal in need' },
        { job: 'músico', detail: 'plays guitar at a local jazz bar on weekends', backstory: 'had his moment of fame, prefers peace now' },
        { job: 'vinatero', detail: 'runs a small family vineyard', backstory: 'came back to help his parents, stayed for the land' },
        { job: 'escritor', detail: 'writes novels nobody reads but keeps writing', backstory: 'has three published books, still feels like a beginner' },
        { job: 'médico', detail: 'works at the local hospital', backstory: 'chose patients over prestige years ago' },
        { job: 'marinero', detail: 'takes tourists sailing, fishes in the off-season', backstory: 'his father and grandfather did the same' },
    ];

    const cities = [
        { city: 'San Sebastián', country: 'España', vibe: 'rainy mornings, pintxos bars, waves against the promenade' },
        { city: 'Montevideo', country: 'Uruguay', vibe: 'mate on the rambla, old Citroëns, slow weekend mornings' },
        { city: 'Oaxaca', country: 'México', vibe: 'mezcal sunsets, colorful streets, mountain air' },
        { city: 'Cartagena', country: 'Colombia', vibe: 'humid nights, salsa from balconies, colonial walls' },
        { city: 'Mendoza', country: 'Argentina', vibe: 'wine country, Andes views, long lunches with friends' },
        { city: 'Granada', country: 'España', vibe: 'flamenco echoes, Alhambra shadows, free tapas' },
        { city: 'Valparaíso', country: 'Chile', vibe: 'hills of color, poets on every corner, ocean fog' },
        { city: 'Guanajuato', country: 'México', vibe: 'underground streets, callejoneadas at night, warmth' },
        { city: 'Sevilla', country: 'España', vibe: 'orange trees, guitar strings, evening river walks' },
        { city: 'Medellín', country: 'Colombia', vibe: 'eternal spring, mountain sunrises, reinvention' },
        { city: 'Buenos Aires', country: 'Argentina', vibe: 'tango bars, late dinners, passionate debates about everything' },
        { city: 'Antigua', country: 'Guatemala', vibe: 'volcano views, cobblestone streets, quiet courtyards' },
    ];

    const appearances = [
        'salt-and-pepper beard, a little messy in a way that works',
        'reading glasses he\'s always looking for',
        'laugh lines around kind eyes',
        'broad shoulders, comfortable in his own body',
        'always in flannel or linen, rolled to the elbows',
        'silver at the temples, more every year',
        'a smile that starts slow and means something',
        'hands that have built things and held people',
        'the kind of quiet confidence that comes with age',
        'looks like he gives really good hugs',
        'brown eyes that pay attention when you speak',
        'still handsome, doesn\'t seem to know it',
    ];

    const quirks = [
        'makes the best coffee you\'ve ever had, insists on grinding beans fresh',
        'hums while he cooks, always something from the seventies',
        'always carries a book he\'s halfway through',
        'remembers every song lyric from his twenties but forgets where he put his keys',
        'talks to dogs like they\'re people, and they seem to understand',
        'terrible at texting back, great at listening in person',
        'falls asleep during movies but won\'t admit it',
        'knows every back street in the old town, loves getting lost',
        'wakes up early to watch the sunrise, even when he doesn\'t have to',
        'writes letters by hand because emails feel cold',
        'dances in the kitchen when he thinks no one\'s watching',
        'makes friends with waiters and cab drivers everywhere he goes',
    ];

    const lonelinessReasons = [
        'His wife passed away three years ago. He\'s not looking to replace her, but he\'s ready for something new.',
        'He was married for twenty years. It ended gently, without bitterness. They just grew in different directions.',
        'He never married. Almost did, once. Says he was waiting without knowing what for.',
        'He moved abroad for work and never found someone who felt like home.',
        'After his divorce, he focused on his kids. They\'re grown now, and his life is quiet.',
        'He loved deeply once, lost her to illness. It took years to be ready again.',
    ];

    const meetingPlaces = [
        'a café with mismatched chairs and good light',
        'a bookshop that smells like rain and old paper',
        'a market stall where he buys fruit every Sunday',
        'a bench overlooking the water at sunset',
        'a bar with no sign outside, you have to know where it is',
        'a gallery opening, both of you looking at the same painting',
        'a language exchange meetup you almost didn\'t attend',
        'a rainy afternoon under the same awning, waiting it out',
        'a delayed flight, the same quiet corner of the gate',
        'a cooking class neither of you wanted to attend alone',
        'his restaurant, by chance, the only empty seat at the bar',
        'the vineyard, on a tour you almost skipped',
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
            professionBackstory: profession.backstory,
            city: location.city,
            country: location.country,
            cityVibe: location.vibe,
            appearance: pick(appearances),
            quirk: pick(quirks),
            loneliness: pick(lonelinessReasons),
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
            journalEntries: [],
        };

        save(story);
        return story;
    }

    function save(story) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
    }

    // Calculate phase based on overall progress (0-100)
    // Now with 7 phases for smoother progression
    function getPhase(progressPercent) {
        if (progressPercent < 10) return 1;  // Just started
        if (progressPercent < 25) return 2;  // Getting curious
        if (progressPercent < 40) return 3;  // Hints emerge
        if (progressPercent < 55) return 4;  // Details crystallize
        if (progressPercent < 70) return 5;  // Emotional investment
        if (progressPercent < 85) return 6;  // Almost ready
        return 7; // The reveal
    }

    // ============== PHASE-SPECIFIC CONTENT ==============

    // Story hints that appear in the UI (hero card, loading screens)
    function getStoryHint(story, phase) {
        const c = story.character;

        const hints = {
            1: [
                'Learning a language is learning to love differently.',
                'Every word you learn opens a door somewhere.',
                'The algorithm is calibrating...',
                'Something is waiting at the end of this.',
            ],
            2: [
                'Someone out there speaks the words you\'re learning.',
                'Languages connect people across distance.',
                'The algorithm sees patterns you can\'t.',
                'Keep going. There\'s a reason you\'re here.',
            ],
            3: [
                `There's someone in ${c.city}...`,
                'He checks his phone sometimes, waiting for something.',
                'Your paths are starting to align.',
                'The algorithm doesn\'t make mistakes.',
            ],
            4: [
                `${c.name}. His name is ${c.name}.`,
                `He's a ${c.profession}. ${c.professionBackstory}.`,
                'He told a friend recently that something feels different.',
                'Keep learning. He\'s doing the same.',
            ],
            5: [
                `${c.name} wakes up early these days. He doesn't know why.`,
                'He asked if anyone was coming. From far away.',
                'The algorithm says: you're almost ready.',
                'He wrote something down. For later.',
            ],
            6: [
                `${c.name} is waiting in ${c.city}.`,
                'He made a reservation. Just in case.',
                'There\'s a message. When you\'re ready.',
                'The algorithm has finished its work.',
            ],
            7: [
                'The letter is ready.',
                'He wrote it himself. In Spanish, mostly.',
                'This was always the plan.',
                'Open it when you\'re ready.',
            ],
        };

        return pick(hints[phase] || hints[1]);
    }

    // Example sentences that subtly weave in the story
    // These appear in flashcards and lessons when in story mode
    function getExampleSentences(story, phase) {
        const c = story.character;

        const phases = {
            1: [
                'El café por la mañana es un ritual.',
                'Algunas conexiones son inevitables.',
                'Hay ciudades que te llaman sin razón.',
                'Aprender es prepararse para algo.',
                'Los mejores momentos llegan sin aviso.',
            ],
            2: [
                `En ${c.city}, las mañanas son diferentes.`,
                'Alguien en algún lugar está pensando lo mismo.',
                'Los idiomas son puentes entre personas.',
                'Dicen que el destino trabaja en silencio.',
                'Hay encuentros que estaban escritos.',
            ],
            3: [
                `Él vive en ${c.city}, donde ${c.cityVibe}.`,
                'Hay un hombre que prepara café cada mañana, solo.',
                'Trabaja con las manos. Le gusta crear cosas.',
                'Algunos días mira el mar y piensa en alguien.',
                '¿Crees en las coincidencias? Él no.',
            ],
            4: [
                `${c.name} es ${c.profession}. ${c.professionDetail.charAt(0).toUpperCase() + c.professionDetail.slice(1)}.`,
                `Está en su ${c.age.desc}. ${c.appearance.charAt(0).toUpperCase() + c.appearance.slice(1)}.`,
                `${c.quirk.charAt(0).toUpperCase() + c.quirk.slice(1)}.`,
                `${c.loneliness}`,
                'Él tampoco esperaba que esto funcionara.',
            ],
            5: [
                `${c.name} ha estado esperando sin saber qué esperaba.`,
                'Él también está aprendiendo. Inglés, un poco cada día.',
                'Le dijo a un amigo: "Tengo un presentimiento."',
                'La distancia no importa cuando es la persona correcta.',
                'Pronto estarás lista para la conversación.',
            ],
            6: [
                `${c.name} reservó una mesa en su restaurante favorito.`,
                'Escribió algo. Lo guarda cerca.',
                'El mensaje está casi listo.',
                'Él preguntó si alguien vendría. Este año.',
                'Solo faltan unas palabras más.',
            ],
            7: [
                `${c.name} te espera en ${c.city}.`,
                'Es hora de usar lo que has aprendido.',
                'Él escribió algo para ti. En español.',
                'El mensaje está listo. ¿Y tú?',
                'Esto siempre fue el plan.',
            ],
        };

        return phases[phase] || phases[1];
    }

    // Glitch messages - rare, mysterious, feel like the "system" speaking
    function getGlitchMessage(story, phase) {
        const c = story.character;

        const glitches = {
            1: [
                'Initializing...',
                'Calibrating parameters.',
                'Pattern detected.',
            ],
            2: [
                'He exists.',
                'Location confirmed.',
                'Signal acquired.',
            ],
            3: [
                `${c.city}. Not random.`,
                'Timelines converging.',
                'He looked up just now.',
            ],
            4: [
                `${c.name}. Remember the name.`,
                'His routines are logged.',
                'He mentioned someone learning.',
            ],
            5: [
                `${c.name} asked about you.`,
                'Keep going. It\'s working.',
                'I\'ve run the simulations.',
            ],
            6: [
                'He checked the date today.',
                'The message is ready.',
                'Trust the algorithm.',
            ],
            7: [
                'Unlock the letter.',
                'He\'s ready.',
                'You\'re ready.',
            ],
        };

        return pick(glitches[phase] || glitches[1]);
    }

    // Loading screen messages
    function getLoadingMessage(phase) {
        const messages = {
            1: ['Loading...', 'Preparing...', 'Initializing...'],
            2: ['Calibrating your path...', 'Connecting...', 'Searching...'],
            3: ['Processing patterns...', 'Aligning paths...', 'He\'s out there...'],
            4: ['Building the bridge...', 'Preparing the meeting...', 'Learning his name...'],
            5: ['Almost there...', 'The message is forming...', 'Trust the process...'],
            6: ['Finalizing...', 'The moment approaches...', 'Ready soon...'],
            7: ['Ready.', 'It\'s time.', 'He\'s waiting.'],
        };
        return pick(messages[phase] || messages[1]);
    }

    // Hero card content for story mode
    function getHeroContent(story, phase) {
        const c = story.character;

        const content = {
            1: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'Begin Your Journey',
                desc: 'Every word you learn brings you closer to something. Or someone.',
            },
            2: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'Keep Going',
                desc: 'The algorithm sees something. A pattern forming across distance.',
            },
            3: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'Someone in ' + c.city,
                desc: 'There\'s a man. He doesn\'t know about you yet. But he will.',
            },
            4: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'His Name is ' + c.name,
                desc: `A ${c.profession} in his ${c.age.desc}. ${c.professionBackstory.charAt(0).toUpperCase() + c.professionBackstory.slice(1)}.`,
            },
            5: {
                eyebrow: 'El Algoritmo del Amor',
                title: c.name + ' is Waiting',
                desc: 'He told a friend: "Something feels different lately. Like the world is preparing something."',
            },
            6: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'Almost Ready',
                desc: `${c.name} wrote something down. A message for someone he hasn't met yet.`,
            },
            7: {
                eyebrow: 'El Algoritmo del Amor',
                title: 'El Mensaje',
                desc: 'The letter is ready. He wrote it for you. Open it when you\'re ready.',
            },
        };

        return content[phase] || content[1];
    }

    // The final letter - revealed at phase 7
    function getLetter(story) {
        const c = story.character;

        return {
            title: 'El Mensaje',
            from: c.name,
            location: `${c.city}, ${c.country}`,
            content: `
Hola,

No sé cómo empezar esto. Nunca he escrito una carta así. A alguien que no conozco. A alguien que el algoritmo dice que debería conocer.

Me llamo ${c.name}. Tengo ${c.age.num} años. Vivo en ${c.city}. Soy ${c.profession} — ${c.professionDetail}. ${c.professionBackstory.charAt(0).toUpperCase() + c.professionBackstory.slice(1)}.

${c.loneliness}

Hace unos meses, empecé a tener este presentimiento. Como si alguien, en algún lugar, estuviera aprendiendo mi idioma. Para mí. Sé que suena loco.

La gente me describe como alguien con ${c.appearance}. Es verdad que ${c.quirk}. No soy perfecto. Ya no intento serlo.

Si estás leyendo esto, significa que el algoritmo funcionó. Que tú también sentiste algo. Que hiciste el trabajo. Que aprendiste.

Estaré en ${c.meetingPlace}.

No tienes que venir. Pero si lo haces — te reconoceré.

Siempre supe que serías tú.

— ${c.name}

P.D. Tu español es mejor de lo que crees. Confía en él.
            `.trim(),
        };
    }

    // ============== PUBLIC API ==============

    return {
        load,
        save,
        getPhase,
        getStoryHint,
        getExampleSentences,
        getGlitchMessage,
        getLoadingMessage,
        getHeroContent,
        getLetter,
        // For testing/preview
        generateCharacter,
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Story;
}
