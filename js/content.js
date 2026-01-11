/**
 * Yespañol - Comprehensive Content Database
 * Vocabulary, Grammar, Lessons - Intermediate to Advanced
 * Goal: Actual fluency, not just basics
 */

const Content = (function() {

    // ==================== VOCABULARY BY THEME ====================
    // Each word has: spanish, english, example, category, difficulty (1-5)

    const vocabulary = {

        // === EVERYDAY ESSENTIALS ===
        everyday: [
            { es: 'desarrollar', en: 'to develop', ex: 'Necesitamos desarrollar nuevas ideas.', diff: 2 },
            { es: 'lograr', en: 'to achieve/manage to', ex: 'Logré terminar el proyecto.', diff: 2 },
            { es: 'realizar', en: 'to carry out (NOT realize)', ex: 'Vamos a realizar una investigación.', diff: 2 },
            { es: 'aprovechar', en: 'to take advantage of', ex: 'Hay que aprovechar cada oportunidad.', diff: 2 },
            { es: 'destacar', en: 'to stand out/highlight', ex: 'Quiero destacar este punto importante.', diff: 2 },
            { es: 'surgir', en: 'to arise/emerge', ex: 'Surgió un problema inesperado.', diff: 3 },
            { es: 'plantear', en: 'to raise/pose (a question)', ex: 'Quiero plantear una duda.', diff: 3 },
            { es: 'abordar', en: 'to address/tackle', ex: 'Debemos abordar este tema con cuidado.', diff: 3 },
            { es: 'sostener', en: 'to sustain/maintain/hold', ex: 'Es difícil sostener esta posición.', diff: 3 },
            { es: 'disponer', en: 'to have available/arrange', ex: 'Disponemos de poco tiempo.', diff: 3 },
            { es: 'proporcionar', en: 'to provide/supply', ex: 'Te proporcionaré toda la información.', diff: 3 },
            { es: 'carecer', en: 'to lack', ex: 'Carece de experiencia.', diff: 3 },
            { es: 'prescindir', en: 'to do without', ex: 'No puedo prescindir de mi café.', diff: 4 },
            { es: 'conllevar', en: 'to entail/involve', ex: 'Este trabajo conlleva mucha responsabilidad.', diff: 4 },
            { es: 'abarcar', en: 'to encompass/cover', ex: 'El estudio abarca varios temas.', diff: 4 },
        ],

        // === CONNECTORS & TRANSITIONS ===
        connectors: [
            { es: 'sin embargo', en: 'however', ex: 'Es difícil; sin embargo, lo intentaré.', diff: 2 },
            { es: 'a pesar de', en: 'despite', ex: 'A pesar de la lluvia, fuimos al parque.', diff: 2 },
            { es: 'no obstante', en: 'nevertheless', ex: 'No obstante, seguimos adelante.', diff: 3 },
            { es: 'por lo tanto', en: 'therefore', ex: 'Llueve, por lo tanto no saldremos.', diff: 2 },
            { es: 'en cuanto a', en: 'as for/regarding', ex: 'En cuanto a tu pregunta...', diff: 2 },
            { es: 'por consiguiente', en: 'consequently', ex: 'Por consiguiente, debemos actuar.', diff: 3 },
            { es: 'puesto que', en: 'since/given that', ex: 'Puesto que no viniste, empezamos sin ti.', diff: 3 },
            { es: 'dado que', en: 'given that', ex: 'Dado que es tarde, mejor mañana.', diff: 3 },
            { es: 'siempre y cuando', en: 'as long as', ex: 'Iré siempre y cuando tú vengas.', diff: 3 },
            { es: 'a menos que', en: 'unless', ex: 'No iré a menos que me invites.', diff: 3 },
            { es: 'de hecho', en: 'in fact', ex: 'De hecho, ya lo sabía.', diff: 2 },
            { es: 'es decir', en: 'that is to say', ex: 'Llegó tarde, es decir, perdió el tren.', diff: 2 },
            { es: 'o sea', en: 'in other words', ex: 'No vino, o sea, no le importa.', diff: 2 },
            { es: 'más bien', en: 'rather', ex: 'No es tonto, más bien perezoso.', diff: 3 },
            { es: 'por cierto', en: 'by the way', ex: 'Por cierto, ¿cómo estás?', diff: 2 },
        ],

        // === EMOTIONS & STATES ===
        emotions: [
            { es: 'agotado/a', en: 'exhausted', ex: 'Estoy agotado después del viaje.', diff: 2 },
            { es: 'asombrado/a', en: 'amazed', ex: 'Quedé asombrado con la noticia.', diff: 2 },
            { es: 'desconcertado/a', en: 'puzzled/bewildered', ex: 'Me dejó desconcertado su respuesta.', diff: 3 },
            { es: 'abrumado/a', en: 'overwhelmed', ex: 'Me siento abrumado con tanto trabajo.', diff: 3 },
            { es: 'aliviado/a', en: 'relieved', ex: 'Estoy aliviado de que todo salió bien.', diff: 2 },
            { es: 'arrepentido/a', en: 'regretful', ex: 'Está arrepentido de sus palabras.', diff: 3 },
            { es: 'agradecido/a', en: 'grateful', ex: 'Estoy muy agradecido por tu ayuda.', diff: 2 },
            { es: 'angustiado/a', en: 'distressed', ex: 'Se siente angustiado por la situación.', diff: 3 },
            { es: 'entusiasmado/a', en: 'excited/enthusiastic', ex: 'Estoy entusiasmado con el proyecto.', diff: 2 },
            { es: 'decepcionado/a', en: 'disappointed', ex: 'Quedé decepcionado con los resultados.', diff: 2 },
            { es: 'conmovido/a', en: 'moved/touched', ex: 'Me sentí conmovido por su historia.', diff: 3 },
            { es: 'hastiado/a', en: 'fed up', ex: 'Estoy hastiado de las mismas excusas.', diff: 4 },
        ],

        // === ABSTRACT CONCEPTS ===
        abstract: [
            { es: 'el ámbito', en: 'field/scope', ex: 'En el ámbito profesional...', diff: 3 },
            { es: 'el enfoque', en: 'approach/focus', ex: 'Necesitamos un nuevo enfoque.', diff: 2 },
            { es: 'el planteamiento', en: 'approach/proposal', ex: 'Tu planteamiento es interesante.', diff: 3 },
            { es: 'el matiz', en: 'nuance', ex: 'Hay un matiz importante aquí.', diff: 4 },
            { es: 'el trasfondo', en: 'background/backdrop', ex: 'El trasfondo político es complejo.', diff: 4 },
            { es: 'la índole', en: 'nature/type', ex: 'Problemas de diversa índole.', diff: 4 },
            { es: 'el alcance', en: 'scope/reach', ex: 'No entiendes el alcance del problema.', diff: 3 },
            { es: 'el vínculo', en: 'bond/link', ex: 'Existe un vínculo entre los dos casos.', diff: 3 },
            { es: 'la pauta', en: 'guideline/pattern', ex: 'Sigue esta pauta de comportamiento.', diff: 3 },
            { es: 'el desenlace', en: 'outcome/ending', ex: 'Nadie esperaba ese desenlace.', diff: 3 },
        ],

        // === RELATIONSHIPS & SOCIAL ===
        relationships: [
            { es: 'llevarse bien/mal', en: 'to get along well/badly', ex: 'Me llevo muy bien con ella.', diff: 2 },
            { es: 'caerle bien/mal', en: 'to like/dislike someone', ex: 'Me cae muy bien tu hermano.', diff: 2 },
            { es: 'echar de menos', en: 'to miss (someone)', ex: 'Te echo mucho de menos.', diff: 2 },
            { es: 'hacer caso', en: 'to pay attention to', ex: 'No me hace caso.', diff: 2 },
            { es: 'darse cuenta', en: 'to realize', ex: 'Me di cuenta de mi error.', diff: 2 },
            { es: 'quedar con', en: 'to meet up with', ex: 'Quedé con María para cenar.', diff: 2 },
            { es: 'contar con', en: 'to count on/rely on', ex: 'Puedes contar conmigo siempre.', diff: 2 },
            { es: 'tener en cuenta', en: 'to take into account', ex: 'Ten en cuenta que está ocupado.', diff: 2 },
            { es: 'dar por hecho', en: 'to take for granted', ex: 'No des por hecho que vendrá.', diff: 3 },
            { es: 'hacer falta', en: 'to be needed', ex: 'Hace falta más tiempo.', diff: 2 },
        ],

        // === WORK & PROFESSIONAL ===
        professional: [
            { es: 'desempeñar', en: 'to perform/carry out', ex: 'Desempeña un papel importante.', diff: 3 },
            { es: 'gestionar', en: 'to manage', ex: 'Gestiona un equipo de diez personas.', diff: 2 },
            { es: 'tramitar', en: 'to process (paperwork)', ex: 'Necesito tramitar el visado.', diff: 3 },
            { es: 'jubilarse', en: 'to retire', ex: 'Se jubiló el año pasado.', diff: 2 },
            { es: 'contratar', en: 'to hire', ex: 'Van a contratar a cinco personas.', diff: 2 },
            { es: 'despedir', en: 'to fire/lay off', ex: 'Despidieron a varios empleados.', diff: 2 },
            { es: 'la nómina', en: 'payroll/paycheck', ex: 'La nómina llega el día 30.', diff: 3 },
            { es: 'el sueldo', en: 'salary', ex: 'El sueldo no es suficiente.', diff: 2 },
            { es: 'la jornada', en: 'workday', ex: 'Trabajo media jornada.', diff: 2 },
            { es: 'el plazo', en: 'deadline', ex: 'El plazo es mañana.', diff: 2 },
        ],

        // === IDIOMS & EXPRESSIONS ===
        idioms: [
            { es: 'estar en las nubes', en: 'to have head in clouds', ex: 'Siempre está en las nubes.', diff: 2 },
            { es: 'meter la pata', en: 'to put foot in mouth', ex: 'Metí la pata en la reunión.', diff: 2 },
            { es: 'quedarse en blanco', en: 'to go blank/draw blank', ex: 'Me quedé en blanco en el examen.', diff: 2 },
            { es: 'tomar el pelo', en: 'to pull someone\'s leg', ex: '¿Me estás tomando el pelo?', diff: 2 },
            { es: 'no tener pelos en la lengua', en: 'to speak bluntly', ex: 'No tiene pelos en la lengua.', diff: 3 },
            { es: 'ser pan comido', en: 'to be a piece of cake', ex: 'Este examen es pan comido.', diff: 2 },
            { es: 'costar un ojo de la cara', en: 'to cost an arm and leg', ex: 'El coche me costó un ojo de la cara.', diff: 3 },
            { es: 'estar hasta las narices', en: 'to be fed up', ex: 'Estoy hasta las narices de esperar.', diff: 3 },
            { es: 'ponerse las pilas', en: 'to get one\'s act together', ex: 'Tienes que ponerte las pilas.', diff: 3 },
            { es: 'tirar la toalla', en: 'to throw in the towel', ex: 'No voy a tirar la toalla.', diff: 2 },
            { es: 'dar en el clavo', en: 'to hit the nail on head', ex: 'Has dado en el clavo.', diff: 3 },
            { es: 'no tener ni idea', en: 'to have no idea', ex: 'No tengo ni idea de qué hablas.', diff: 2 },
            { es: 'echar una mano', en: 'to give a hand', ex: '¿Me echas una mano?', diff: 2 },
            { es: 'pasarlo bomba', en: 'to have a blast', ex: 'Lo pasamos bomba en la fiesta.', diff: 3 },
            { es: 'flipar', en: 'to freak out/be amazed', ex: '¡Estoy flipando!', diff: 3 },
        ],

        // === FALSE FRIENDS ===
        falseFriends: [
            { es: 'actualmente', en: 'currently (NOT actually)', ex: 'Actualmente vivo en Madrid.', diff: 2 },
            { es: 'realizar', en: 'to carry out (NOT realize)', ex: 'Realizamos el proyecto.', diff: 2 },
            { es: 'embarazada', en: 'pregnant (NOT embarrassed)', ex: 'Está embarazada de 6 meses.', diff: 2 },
            { es: 'sensible', en: 'sensitive (NOT sensible)', ex: 'Es muy sensible a las críticas.', diff: 2 },
            { es: 'asistir', en: 'to attend (NOT assist)', ex: 'Asistí a la conferencia.', diff: 2 },
            { es: 'constipado', en: 'having a cold (NOT constipated)', ex: 'Estoy constipado.', diff: 2 },
            { es: 'éxito', en: 'success (NOT exit)', ex: 'La película fue un éxito.', diff: 2 },
            { es: 'pretender', en: 'to try to (NOT pretend)', ex: 'Pretendo acabar hoy.', diff: 3 },
            { es: 'soportar', en: 'to tolerate (NOT support)', ex: 'No soporto el ruido.', diff: 2 },
            { es: 'molestar', en: 'to bother (NOT molest)', ex: 'No quiero molestarte.', diff: 2 },
            { es: 'carpeta', en: 'folder (NOT carpet)', ex: 'Guarda los papeles en la carpeta.', diff: 2 },
            { es: 'lectura', en: 'reading (NOT lecture)', ex: 'Me encanta la lectura.', diff: 2 },
        ],

        // === TRAVEL & PLACES ===
        travel: [
            { es: 'el alojamiento', en: 'accommodation', ex: 'Buscamos alojamiento barato.', diff: 2 },
            { es: 'la estancia', en: 'stay', ex: 'Durante mi estancia en España...', diff: 2 },
            { es: 'el destino', en: 'destination', ex: '¿Cuál es tu destino?', diff: 2 },
            { es: 'la escala', en: 'layover/stopover', ex: 'El vuelo tiene escala en París.', diff: 2 },
            { es: 'el equipaje', en: 'luggage', ex: 'Perdieron mi equipaje.', diff: 2 },
            { es: 'la aduana', en: 'customs', ex: 'Pasamos por la aduana.', diff: 2 },
            { es: 'el pasillo', en: 'aisle', ex: 'Prefiero asiento de pasillo.', diff: 2 },
            { es: 'la ventanilla', en: 'window (seat/counter)', ex: 'Quiero asiento de ventanilla.', diff: 2 },
            { es: 'el mostrador', en: 'counter', ex: 'Acércate al mostrador.', diff: 2 },
            { es: 'la tarjeta de embarque', en: 'boarding pass', ex: 'Muestra tu tarjeta de embarque.', diff: 2 },
        ],
    };

    // ==================== GRAMMAR RULES ====================

    const grammar = {

        serEstar: {
            title: 'Ser vs Estar',
            description: 'The two "to be" verbs - essential for sounding natural',
            rules: [
                {
                    use: 'SER',
                    cases: [
                        { name: 'Identity', ex: 'Soy profesor. / Es mi hermano.', tip: 'WHO someone is' },
                        { name: 'Origin', ex: 'Soy de México.', tip: 'WHERE from' },
                        { name: 'Profession', ex: 'Es médica.', tip: 'WHAT someone does' },
                        { name: 'Material', ex: 'La mesa es de madera.', tip: 'WHAT it\'s made of' },
                        { name: 'Time/Date', ex: 'Son las tres. / Es lunes.', tip: 'WHEN' },
                        { name: 'Inherent traits', ex: 'Es alto. / Es inteligente.', tip: 'Permanent characteristics' },
                        { name: 'Events location', ex: 'La fiesta es en mi casa.', tip: 'WHERE events happen' },
                        { name: 'Possession', ex: 'El libro es mío.', tip: 'Whose it is' },
                    ],
                },
                {
                    use: 'ESTAR',
                    cases: [
                        { name: 'Location', ex: 'Estoy en casa. / Madrid está en España.', tip: 'WHERE someone/thing IS' },
                        { name: 'Temporary states', ex: 'Estoy cansado. / Está enferma.', tip: 'How you FEEL now' },
                        { name: 'Conditions', ex: 'La puerta está abierta.', tip: 'Current state that can change' },
                        { name: 'Progressive tenses', ex: 'Estoy comiendo.', tip: 'ESTAR + gerund' },
                        { name: 'Results of actions', ex: 'El trabajo está hecho.', tip: 'Completed state' },
                        { name: 'Opinions/reactions', ex: 'Está muy bueno. / ¡Está delicioso!', tip: 'Personal reaction' },
                    ],
                },
            ],
            trickyPairs: [
                { ser: 'Es aburrido (boring person)', estar: 'Está aburrido (bored right now)' },
                { ser: 'Es listo (clever)', estar: 'Está listo (ready)' },
                { ser: 'Es rico (wealthy)', estar: 'Está rico (tastes good)' },
                { ser: 'Es malo (bad person)', estar: 'Está malo (sick)' },
                { ser: 'Es vivo (clever/sharp)', estar: 'Está vivo (alive)' },
                { ser: 'Es verde (green color)', estar: 'Está verde (unripe)' },
                { ser: 'Es seguro (safe thing)', estar: 'Está seguro (feels certain)' },
            ],
        },

        porPara: {
            title: 'Por vs Para',
            description: 'Two prepositions that trip up everyone',
            rules: [
                {
                    use: 'POR',
                    cases: [
                        { name: 'Cause/reason', ex: 'Gracias por tu ayuda.', tip: 'Because of' },
                        { name: 'Duration', ex: 'Estudié por tres horas.', tip: 'For (time span)' },
                        { name: 'Movement through', ex: 'Caminamos por el parque.', tip: 'Through/along' },
                        { name: 'Exchange', ex: 'Pagué 20€ por el libro.', tip: 'In exchange for' },
                        { name: 'On behalf of', ex: 'Hablo por todos nosotros.', tip: 'For (representing)' },
                        { name: 'By means of', ex: 'Te llamé por teléfono.', tip: 'Via/by' },
                        { name: 'Multiplication', ex: 'Dos por dos son cuatro.', tip: 'Times' },
                        { name: 'Per', ex: 'Gano 15€ por hora.', tip: 'Per unit' },
                    ],
                },
                {
                    use: 'PARA',
                    cases: [
                        { name: 'Purpose/goal', ex: 'Estudio para aprender.', tip: 'In order to' },
                        { name: 'Recipient', ex: 'Este regalo es para ti.', tip: 'For (person)' },
                        { name: 'Destination', ex: 'Salgo para Madrid.', tip: 'Headed to' },
                        { name: 'Deadline', ex: 'Es para mañana.', tip: 'By (time)' },
                        { name: 'Opinion', ex: 'Para mí, es fácil.', tip: 'In my view' },
                        { name: 'Comparison', ex: 'Para ser joven, sabe mucho.', tip: 'Considering' },
                        { name: 'Employment', ex: 'Trabajo para Google.', tip: 'For (company)' },
                    ],
                },
            ],
            expressions: [
                { exp: 'por favor', meaning: 'please' },
                { exp: 'por supuesto', meaning: 'of course' },
                { exp: 'por fin', meaning: 'finally' },
                { exp: 'por lo menos', meaning: 'at least' },
                { exp: 'por eso', meaning: 'that\'s why' },
                { exp: 'para siempre', meaning: 'forever' },
                { exp: 'para colmo', meaning: 'to top it off' },
                { exp: 'para nada', meaning: 'not at all' },
            ],
        },

        subjunctive: {
            title: 'The Subjunctive',
            description: 'Express wishes, doubts, emotions, and hypotheticals',
            triggers: [
                { category: 'Wishes/Desires', verbs: ['querer que', 'desear que', 'esperar que', 'preferir que'] },
                { category: 'Emotions', verbs: ['alegrarse de que', 'temer que', 'sentir que', 'sorprender que'] },
                { category: 'Doubt/Denial', verbs: ['dudar que', 'no creer que', 'negar que', 'no pensar que'] },
                { category: 'Impersonal expressions', verbs: ['es importante que', 'es necesario que', 'es posible que', 'es mejor que'] },
                { category: 'Requests/Commands', verbs: ['pedir que', 'recomendar que', 'sugerir que', 'aconsejar que'] },
            ],
            conjugation: {
                present: {
                    ar: { yo: '-e', tú: '-es', él: '-e', nosotros: '-emos', ellos: '-en' },
                    er_ir: { yo: '-a', tú: '-as', él: '-a', nosotros: '-amos', ellos: '-an' },
                },
                irregulars: [
                    { verb: 'ser', forms: ['sea', 'seas', 'sea', 'seamos', 'sean'] },
                    { verb: 'estar', forms: ['esté', 'estés', 'esté', 'estemos', 'estén'] },
                    { verb: 'ir', forms: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayan'] },
                    { verb: 'haber', forms: ['haya', 'hayas', 'haya', 'hayamos', 'hayan'] },
                    { verb: 'saber', forms: ['sepa', 'sepas', 'sepa', 'sepamos', 'sepan'] },
                    { verb: 'dar', forms: ['dé', 'des', 'dé', 'demos', 'den'] },
                ],
            },
        },

        pastTenses: {
            title: 'Preterite vs Imperfect',
            description: 'Two past tenses, different uses',
            rules: [
                {
                    use: 'PRETERITE',
                    cases: [
                        { name: 'Completed actions', ex: 'Ayer comí paella.', tip: 'Done and finished' },
                        { name: 'Specific times', ex: 'Llegó a las tres.', tip: 'At a point in time' },
                        { name: 'Chain of events', ex: 'Entró, se sentó y habló.', tip: 'Sequence' },
                        { name: 'Beginning/end', ex: 'La guerra empezó en 1936.', tip: 'Start/finish point' },
                        { name: 'Interrupting action', ex: 'Llamó cuando comía.', tip: 'The interrupter' },
                    ],
                },
                {
                    use: 'IMPERFECT',
                    cases: [
                        { name: 'Ongoing past', ex: 'Llovía mucho.', tip: 'Was happening' },
                        { name: 'Habitual past', ex: 'Siempre comíamos juntos.', tip: 'Used to' },
                        { name: 'Description', ex: 'Era alto y tenía ojos verdes.', tip: 'Setting the scene' },
                        { name: 'Age/time', ex: 'Tenía 20 años. / Eran las 8.', tip: 'Background info' },
                        { name: 'Ongoing when interrupted', ex: 'Comía cuando llamó.', tip: 'The backdrop' },
                        { name: 'Emotions/states', ex: 'Estaba triste.', tip: 'How things were' },
                    ],
                },
            ],
        },
    };

    // ==================== LESSON STRUCTURES ====================

    const lessons = {
        serEstar: {
            id: 'ser-estar',
            title: 'Ser vs Estar',
            phases: [
                {
                    name: 'Learn',
                    type: 'instruction',
                    content: grammar.serEstar,
                },
                {
                    name: 'Practice',
                    type: 'exercises',
                    exercises: [
                        // Fill in the blank
                        { type: 'fill', q: 'Mi madre ___ profesora.', a: 'es', hint: 'profession' },
                        { type: 'fill', q: 'La puerta ___ cerrada.', a: 'está', hint: 'state/condition' },
                        { type: 'fill', q: '¿De dónde ___ tú?', a: 'eres', hint: 'origin' },
                        { type: 'fill', q: 'Hoy ___ muy cansado.', a: 'estoy', hint: 'temporary state' },
                        { type: 'fill', q: 'La fiesta ___ en mi casa.', a: 'es', hint: 'event location' },
                        { type: 'fill', q: 'El café ___ frío.', a: 'está', hint: 'current state' },
                        { type: 'fill', q: 'Mi hermano ___ alto.', a: 'es', hint: 'inherent trait' },
                        { type: 'fill', q: '___ las tres de la tarde.', a: 'Son', hint: 'time' },
                        { type: 'fill', q: 'María ___ enferma hoy.', a: 'está', hint: 'temporary condition' },
                        { type: 'fill', q: 'Este libro ___ muy interesante.', a: 'es', hint: 'characteristic' },

                        // Multiple choice
                        { type: 'choice', q: 'La sopa ___ deliciosa. (reaction)', options: ['es', 'está'], a: 'está' },
                        { type: 'choice', q: 'Juan ___ de Colombia.', options: ['es', 'está'], a: 'es' },
                        { type: 'choice', q: 'Los niños ___ jugando.', options: ['son', 'están'], a: 'están' },
                        { type: 'choice', q: 'Ella ___ abogada.', options: ['es', 'está'], a: 'es' },
                        { type: 'choice', q: 'El museo ___ cerca de aquí.', options: ['es', 'está'], a: 'está' },
                    ],
                },
                {
                    name: 'Tricky Pairs',
                    type: 'pairs',
                    content: grammar.serEstar.trickyPairs,
                },
                {
                    name: 'Challenge',
                    type: 'challenge',
                    exercises: [
                        { type: 'translate', es: 'My brother is tall and is tired today.', en: 'Mi hermano es alto y está cansado hoy.' },
                        { type: 'translate', es: 'The party is at my house and is fun.', en: 'La fiesta es en mi casa y está divertida.' },
                    ],
                },
            ],
        },
    };

    // ==================== READING PASSAGES ====================

    const readings = [
        {
            id: 'cafe',
            title: 'El café de la esquina',
            level: 'intermediate',
            text: `Hay un café en la esquina de mi calle que se ha convertido en mi lugar favorito. No es grande ni lujoso, pero tiene algo especial. Las paredes están cubiertas de fotografías antiguas de la ciudad, y siempre suena música jazz suave.

El dueño se llama Antonio. Tiene unos sesenta años, el pelo canoso y una sonrisa que te hace sentir bienvenido inmediatamente. Llegó de Andalucía hace treinta años y abrió este café con sus ahorros.

"Un café es más que un negocio," me dijo una vez mientras preparaba mi cortado. "Es un lugar donde la gente se encuentra, donde nacen amistades, donde a veces empieza el amor."

Vengo aquí casi todos los días. A veces para trabajar, a veces solo para observar a la gente. Hay clientes habituales: la señora mayor que siempre pide té con leche, el escritor que teclea furiosamente en su portátil, la pareja joven que se mira como si no existiera nadie más en el mundo.

Me pregunto a veces qué historias tendrán todos ellos. Qué les trajo aquí, qué buscan. Quizás, como yo, simplemente buscan un lugar donde sentirse en casa.`,
            questions: [
                { q: '¿Cómo es el café?', options: ['Grande y lujoso', 'Pequeño pero especial', 'Moderno y ruidoso'], a: 1 },
                { q: '¿De dónde es Antonio?', options: ['Madrid', 'Andalucía', 'Barcelona'], a: 1 },
                { q: '¿Qué piensa Antonio sobre los cafés?', options: ['Son solo negocios', 'Son lugares de conexión', 'Son aburridos'], a: 1 },
            ],
            vocabulary: ['convertirse en', 'cubierto de', 'ahorros', 'habitual', 'teclear'],
        },
        {
            id: 'decision',
            title: 'La decisión',
            level: 'intermediate-advanced',
            text: `A pesar de todo lo que había logrado, María se sentía vacía. Tenía el trabajo con el que siempre había soñado, un apartamento bonito en el centro, amigos que la querían. Sin embargo, cada mañana se despertaba con una sensación de que algo faltaba.

Fue durante un viaje a Oaxaca cuando todo cambió. No había planeado ir—surgió la oportunidad y, por primera vez en años, decidió hacer algo sin pensarlo demasiado.

Caminando por las calles empedradas, rodeada de colores que nunca había visto y olores que no podía nombrar, sintió algo que había olvidado: curiosidad. Pura y simple curiosidad por la vida.

Un señor mayor le vendió un libro usado de poesía. "Este libro cambió mi vida," le dijo. "Quizás cambie la tuya."

Esa noche, en su hotel, abrió el libro al azar. El poema hablaba de vivir sin miedo, de soltar lo conocido para encontrar lo verdadero.

Al volver a casa, María tomó una decisión. No sabía exactamente qué iba a hacer, pero sabía que ya no podía seguir viviendo una vida que no sentía suya.

A veces, pensó, hay que perderse para encontrarse.`,
            questions: [
                { q: '¿Qué sentía María a pesar de sus logros?', options: ['Satisfacción', 'Vacío', 'Entusiasmo'], a: 1 },
                { q: '¿Qué redescubrió en Oaxaca?', options: ['Su carrera', 'La curiosidad', 'Un viejo amigo'], a: 1 },
                { q: '¿Qué decidió hacer al final?', options: ['Quedarse igual', 'Cambiar su vida', 'Volver a Oaxaca'], a: 1 },
            ],
            vocabulary: ['a pesar de', 'surgir', 'empedrado', 'soltar', 'al azar'],
        },
    ];

    // ==================== PUBLIC API ====================

    return {
        vocabulary,
        grammar,
        lessons,
        readings,

        // Get vocabulary by category
        getVocab: (category) => vocabulary[category] || [],

        // Get all vocabulary flattened
        getAllVocab: () => Object.values(vocabulary).flat(),

        // Get vocabulary by difficulty
        getVocabByDifficulty: (minDiff, maxDiff) => {
            return Object.values(vocabulary)
                .flat()
                .filter(w => w.diff >= minDiff && w.diff <= maxDiff);
        },

        // Get random vocab items
        getRandomVocab: (count, category = null) => {
            const pool = category ? vocabulary[category] : Object.values(vocabulary).flat();
            const shuffled = [...pool].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        },

        // Get grammar lesson
        getGrammarLesson: (id) => grammar[id],

        // Get reading by ID
        getReading: (id) => readings.find(r => r.id === id),
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Content;
}
