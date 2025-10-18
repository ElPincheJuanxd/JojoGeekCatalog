const seriesData = [
    {
        id: 1,
        title: "Berserk",
        poster: "./assets/images/series/berserk.jpg",
        year: "1997-1998",
        genre: ["Acción", "Drama", "Fantasía", "Seinen"],
        seasons: 1,
        studio: "OLM",
        description: "Guts, un mercenario solitario, se une a la Banda del Halcón liderada por el carismático Griffith. Esta oscura y épica historia de venganza, traición y lucha contra el destino se desarrolla en un mundo medieval brutal."
    },
    {
        id: 2,
        title: "Vinland Saga",
        poster: "./assets/images/series/vinland-saga.jpg",
        year: "2019-2023",
        genre: ["Acción", "Drama", "Aventura", "Seinen", "Histórico"],
        seasons: 2,
        studio: "Wit Studio / MAPPA",
        description: "Tras la muerte de su padre a manos del líder vikingo Askeladd, el joven Thorfinn se embarca en un viaje de venganza. La serie explora su transformación de un guerrero sediento de sangre a un hombre que busca un camino pacífico."
    },
    {
        id: 3,
        title: "Solo Leveling",
        poster: "./assets/images/series/solo-leveling.jpg",
        year: "2024-2025",
        genre: ["Manwhas", "Acción", "Fantasía", "Aventura"],
        seasons: 2,
        studio: "A-1 Pictures",
        description: "Sung Jin-Woo, el cazador más débil de rango E, obtiene una habilidad única que le permite subir de nivel sin límites. Aprovechando este poder, se embarca en un viaje para convertirse en el cazador más fuerte mientras descubre secretos sobre las mazmorras."
    },
    {
        id: 4,
        title: "Shuumatsu no Valkyrie",
        poster: "./assets/images/series/shuumatsu-no-valkyrie.jpg",
        year: "2021-2025",
        genre: ["Acción", "Fantasía", "Seinen","Histórico", "Artes Marciales"],
        seasons: 2,
        studio: "Graphinica / Yumeta Company",
        description: "Los dioses deciden destruir a la humanidad, pero una valkiria propone un torneo final: 13 dioses vs. 13 campeones humanos en combates uno a uno para decidir el destino de la humanidad. Tercera temporada anunciada para 2025."
    },
    {
        id: 5,
        title: "Bleach",
        poster: "./assets/images/series/bleach.jpg",
        year: "2004-2012",
        genre: ["Acción", "Aventura", "Fantasía"],
        seasons: 16,
        studio: "Studio Pierrot",
        description: "Ichigo Kurosaki, un estudiante que puede ver fantasmas, obtiene los poderes de un Shinigami (Dios de la Muerte) de Rukia Kuchiki. Debe proteger a los humanos de los espíritus malignos Hollows y guiar las almas al más allá."
    },
    {
        id: 6,
        title: "Baki",
        poster: "./assets/images/series/baki.jpg",
        year: "2018-2023",
        genre: ["Acción", "Deporte", "Seinen", "Artes Marciales"],
        seasons: 4,
        studio: "TMS Entertainment",
        description: "Baki Hanma entrena para superar a su padre, el hombre más fuerte del mundo. La serie sigue sus batallas contra luchadores increíblemente poderosos en torneos de artes marciales brutales."
    },
    {
        id: 7,
        title: "Bastard!! Heavy Metal Dark Fantasy",
        poster: "./assets/images/series/bastard.jpg",
        year: "2022-2023",
        genre: ["Acción", "Fantasía", "Seinen"],
        seasons: 2,
        studio: "Liden Films",
        description: "Dark Schneider, un poderoso hechicero revivido, debe proteger el reino de Metallicana de las fuerzas oscuras en este anime de fantasía oscura con temática heavy metal."
    },
    {
        id: 8,
        title: "Berserk 2016-2017",
        poster: "./assets/images/series/berserk-2016.jpg",
        year: "2016-2017",
        genre: ["Acción", "Drama", "Fantasía", "Seinen"],
        seasons: 2,
        studio: "GEMBA / Millepensee",
        description: "Continuación de la saga de Guts, ahora marcado como sacrificio y acompañado por Puck, en su búsqueda de venganza contra Griffith y los God Hand."
    },
    {
        id: 9,
        title: "Berserk Memorial Edition",
        poster: "./assets/images/series/berserk-memorial.jpg",
        year: "2022",
        genre: ["Acción", "Drama", "Fantasía", "Seinen"],
        seasons: 1,
        studio: "Studio 4°C",
        description: "Edición remasterizada de la trilogía de películas de Berserk con nuevas escenas y mejoras visuales, cubriendo el arco de la Edad Dorada."
    },
    {
        id: 10,
        title: "Black Lagoon",
        poster: "./assets/images/series/black-lagoon.jpg",
        year: "2006-2011",
        genre: ["Acción", "Aventura", "Seinen"],
        seasons: 3,
        studio: "Madhouse",
        description: "Un hombre de negocios japonés es capturado por mercenarios modernos y decide unirse a su tripulación en la peligrosa ciudad de Roanapur."
    },
    {
        id: 11,
        title: "Chainsaw Man",
        poster: "./assets/images/series/chainsaw-man.jpg",
        year: "2022",
        genre: ["Acción", "Fantasía"],
        seasons: 1,
        studio: "MAPPA",
        description: "Denji, un joven pobre que fusiona con su demonio mascota Pochita, se convierte en Chainsaw Man y trabaja cazando demonios para el gobierno."
    },
    {
        id: 12,
        title: "Claymore",
        poster: "./assets/images/series/claymore.jpg",
        year: "2007",
        genre: ["Acción", "Fantasía", "Drama", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "En un mundo medieval, mujeres medio-humanas medio-yoma llamadas Claymores protegen a los humanos de monstruos a cambio de dinero."
    },
    {
        id: 13,
        title: "Cowboy Bebop",
        poster: "./assets/images/series/cowboy-bebop.jpg",
        year: "1998-1999",
        genre: ["Acción", "Aventura", "Ciencia Ficción", "Seinen"],
        seasons: 1,
        studio: "Sunrise",
        description: "Spike Spiegel y su tripulación de cazarrecompensas viajan por el espacio en su nave Bebop en busca de criminales en este clásico del anime."
    },
    {
        id: 14,
        title: "Devilman Crybaby",
        poster: "./assets/images/series/devilman-crybaby.jpg",
        year: "2018",
        genre: ["Acción", "Horror", "Drama", "Seinen"],
        seasons: 1,
        studio: "Science SARU",
        description: "Akira Fudo se fusiona con un demonio para convertirse en Devilman y luchar contra la invasión demoníaca en esta intensa y visceral serie."
    },
    {
        id: 15,
        title: "Dorohedoro",
        poster: "./assets/images/series/dorohedoro.jpg",
        year: "2020",
        genre: ["Acción", "Fantasía", "Comedia", "Seinen"],
        seasons: 1,
        studio: "MAPPA",
        description: "Caiman, con cabeza de reptil, busca recuperar su memoria y encontrar al hechicero que lo transformó en el distrito Hole."
    },
    {
        id: 16,
        title: "Dororo",
        poster: "./assets/images/series/dororo.jpg",
        year: "2019",
        genre: ["Acción", "Aventura", "Fantasía", "Seinen"],
        seasons: 1,
        studio: "MAPPA / Tezuka Productions",
        description: "Hyakkimaru, cuyo cuerpo fue sacrificado a demonios, viaja con el joven ladrón Dororo para recuperar sus partes corporales."
    },
    {
        id: 17,
        title: "Drifters",
        poster: "./assets/images/series/drifters.jpg",
        year: "2016",
        genre: ["Acción", "Fantasía", "Aventura", "Seinen"],
        seasons: 1,
        studio: "Hoods Drifters Studio",
        description: "Guerreros históricos son transportados a un mundo de fantasía donde deben luchar por la supervivencia de las especies humanas."
    },
    {
        id: 18,
        title: "Elfen Lied",
        poster: "./assets/images/series/elfen-lied.jpg",
        year: "2004",
        genre: ["Acción", "Drama", "Horror", "Seinen"],
        seasons: 1,
        studio: "Arms",
        description: "Lucy, una mutante diclonius que escapa de un laboratorio, busca venganza contra la humanidad que la torturó."
    },
    {
        id: 19,
        title: "Ergo Proxy",
        poster: "./assets/images/series/ergo-proxy.jpg",
        year: "2006",
        genre: ["Ciencia Ficción", "Misterio", "Drama", "Seinen"],
        seasons: 1,
        studio: "Manglobe",
        description: "En un futuro post-apocalíptico, la inspectora Re-l Mayer investiga misteriosos asesinatos relacionados con los AutoReivs y Proxies."
    },
    {
        id: 20,
        title: "Gantz",
        poster: "./assets/images/series/gantz.jpg",
        year: "2004",
        genre: ["Acción", "Ciencia Ficción", "Horror", "Seinen"],
        seasons: 2,
        studio: "Gonzo",
        description: "Personas que mueren son transportadas a un juego de caza alienígena donde deben cumplir misiones para sobrevivir."
    },
    {
        id: 21,
        title: "JoJo's Bizarre Adventure",
        poster: "./assets/images/series/jojo-bizarre.jpg",
        year: "2012-2022",
        genre: ["Acción", "Aventura", "Fantasía","Seinen"],
        seasons: 6,
        studio: "David Production",
        description: "La saga de la familia Joestar a través de generaciones, cada una con un protagonista diferente y batallas usando Stands y habilidades únicas."
    },
    {
        id: 22,
        title: "Kengan Ashura",
        poster: "./assets/images/series/kengan-ashura.jpg",
        year: "2019-2023",
        genre: ["Acción", "Deporte", "Seinen", "Artes Marciales"],
        seasons: 2,
        studio: "Larx Entertainment",
        description: "Luchadores corporativos compiten en torneos de artes marciales brutales para decidir contratos empresariales multimillonarios."
    },
    {
        id: 23,
        title: "Killing Bites",
        poster: "./assets/images/series/killing-bites.jpg",
        year: "2018",
        genre: ["Acción", "Ciencia Ficción", "Seinen"],
        seasons: 1,
        studio: "Liden Films",
        description: "Humanos modificados genéticamente con características animales luchan en combates mortales por el control corporativo."
    },
    {
        id: 24,
        title: "Kingdom",
        poster: "./assets/images/series/kingdom.jpg",
        year: "2012-2025",
        genre: ["Acción", "Aventura", "Histórico", "Seinen"],
        seasons: 6,
        studio: "Studio Pierrot",
        description: "Xin, un esclavo, sueña con convertirse en el gran general de China durante el período de los Reinos Combatientes."
    },
    {
        id: 25,
        title: "Serial Experiments Lain",
        poster: "./assets/images/series/serial-experiments-lain.jpg",
        year: "1998",
        genre: ["Ciencia Ficción", "Psicológico", "Drama", "Seinen"],
        seasons: 1,
        studio: "Triangle Staff",
        description: "Lain Iwakura se adentra en el mundo virtual de The Wired, donde descubre misterios sobre la realidad y su propia identidad."
    },
    {
        id: 26,
        title: "Lazarus",
        poster: "./assets/images/series/lazarus.jpg",
        year: "2025",
        genre: ["Acción", "Ciencia Ficción", "Comedia"],
        seasons: 1,
        studio: "MAPPA",
        description: "En 2052, un científico crea una droga que concede inmortalidad, pero debe protegerla de fuerzas que quieren controlarla."
    },
    {
        id: 27,
        title: "Monster",
        poster: "./assets/images/series/monster.jpg",
        year: "2004-2005",
        genre: ["Misterio", "Psicológico", "Drama", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "El Dr. Kenzo Tenma busca redimirse cazando a un psicópata que salvó años atrás, en un thriller psicológico por Europa."
    },
    {
        id: 28,
        title: "One Punch Man",
        poster: "./assets/images/series/one-punch-man.jpg",
        year: "2015-2025",
        genre: ["Acción", "Comedia", "Ciencia Ficción", "Superhéroes", "Seinen"],
        seasons: 3,
        studio: "Madhouse / J.C.Staff",
        description: "Saitama, un héroe que puede derrotar cualquier enemigo de un solo golpe, busca encontrar emoción en sus batallas."
    },
    {
        id: 29,
        title: "Parasyte: The Maxim",
        poster: "./assets/images/series/parasyte.jpg",
        year: "2014-2015",
        genre: ["Acción", "Horror", "Ciencia Ficción", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Shinichi Izumi se fusiona con un parásito alienígena que no pudo tomar su cerebro, y juntos luchan contra otros parásitos."
    },
    {
        id: 30,
        title: "Pluto",
        poster: "./assets/images/series/pluto.jpg",
        year: "2023",
        genre: ["Ciencia Ficción", "Misterio", "Drama", "Seinen"],
        seasons: 1,
        studio: "Studio M2",
        description: "Reinterpretación de 'El robot más fuerte del mundo' de Astro Boy, siguiendo al robot detective Gesicht investigando asesinatos de robots."
    },
    {
        id: 31,
        title: "Samurai Champloo",
        poster: "./assets/images/series/samurai-champloo.jpg",
        year: "2004-2005",
        genre: ["Acción", "Aventura", "Histórico", "Seinen"],
        seasons: 1,
        studio: "Manglobe",
        description: "Dos samuráis de estilos opuestos y una joven viajan por el Japón feudal con hip-hop de fondo en esta obra del director de Cowboy Bebop."
    },
    {
        id: 32,
        title: "Attack on Titan",
        poster: "./assets/images/series/attack-on-titan.jpg",
        year: "2013-2023",
        genre: ["Acción", "Drama", "Fantasía"],
        seasons: 4,
        studio: "Wit Studio / MAPPA",
        description: "La humanidad vive en ciudades amuralladas protegiéndose de Titanes gigantes. Eren Yeager se une al ejército para vengar a su madre."
    },
    {
        id: 33,
        title: "Terra Formars",
        poster: "./assets/images/series/terra-formars.jpg",
        year: "2014-2016",
        genre: ["Acción", "Ciencia Ficción", "Horror", "Seinen"],
        seasons: 2,
        studio: "Liden Films",
        description: "Humanos modificados genéticamente viajan a Marte para luchar contra cucarachas humanoides que evolucionaron en el planeta rojo."
    },
    {
        id: 34,
        title: "Tokyo Ghoul",
        poster: "./assets/images/series/tokyo-ghoul.jpg",
        year: "2014-2018",
        genre: ["Acción", "Horror", "Drama", "Seinen"],
        seasons: 4,
        studio: "Studio Pierrot",
        description: "Ken Kaneki se convierte en medio-ghoul después de un accidente y debe navegar entre el mundo humano y el de los ghouls."
    },
    {
        id: 35,
        title: "Trigun 1998",
        poster: "./assets/images/series/trigun-1998.jpg",
        year: "1998",
        genre: ["Acción", "Aventura", "Ciencia Ficción", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Vash the Stampede, el pistolero más buscado con un precio de $$60,000,000,000, viaja evitando la violencia mientras ayuda a la gente."
    },
    {
        id: 36,
        title: "Trigun Stampede 2022",
        poster: "./assets/images/series/trigun-stampede.jpg",
        year: "2022",
        genre: ["Acción", "Aventura", "Ciencia Ficción"],
        seasons: 1,
        studio: "Orange",
        description: "Reinvención CGI de Trigun que explora los orígenes de Vash the Stampede y los misterios de su pasado."
    },
    {
        id: 37,
        title: "Van Helsing",
        poster: "./assets/images/series/van-helsing.jpg",
        year: "2006-2010",
        genre: ["Acción", "Horror", "Fantasía"],
        seasons: 5,
        studio: "Madhouse",
        description: "Gira en torno a la Orden de Caballeros Protestantes Reales, una organización que fundó Abraham Van Hellsing y que a día de hoy está en manos de sus descendientes. El fin de esta organización es proteger a la Reina y al país de las amenazas sobrenaturales. El actual director de la asociación, Sir Integra Fairbrook Wingates Hellsing, es el último miembro vivo de su familia; por ello, es ayudada en su labor por Walter C. Dornez, el poderoso vampiro Alucard y la ex – policía Seras Victoria."
    },
    {
        id: 38,
        title: "The God of High School",
        poster: "./assets/images/series/god-of-highschool.jpg",
        year: "2020",
        genre: ["Manwhas", "Acción", "Artes Marciales", "Fantasía"],
        seasons: 1,
        studio: "MAPPA",
        description: "Un torneo de artes marciales llamado The God of High School reúne a los luchadores más fuertes de Corea. Jin Mori y otros participantes descubren que el torneo es más de lo que parece mientras luchan por un deseo."
    },
    {
        id: 39,
        title: "Tower of God",
        poster: "./assets/images/series/tower-of-god.jpg", 
        year: "2020",
        genre: ["Manwhas", "Acción", "Fantasía", "Aventura", "Misterio"],
        seasons: 1,
        studio: "Telecom Animation Film",
        description: "Bam, un niño que ha pasado toda su vida solo bajo una misteriosa torre, entra en ella para seguir a su única amiga, Rachel. Dentro, debe superar peligrosas pruebas y hacer aliados para ascender y encontrar la verdad."
    },
    {
        id: 40,
        title: "The Beginning After the End",
        poster: "./assets/images/series/beginning-after-end.jpg",
        year: "2025",
        genre: ["Manwhas", "Fantasía", "Aventura", "Isekai"],
        seasons: 1,
        studio: "A-Cat",
        description: "El Rey Grey ha renacido en un nuevo mundo lleno de magia y criaturas mágicas. Con los recuerdos de su vida pasada y un nuevo nombre, Arthur Leywin intenta navegar esta nueva vida mientras oculta su verdadera identidad."
    },
    {
        id: 41,
        title: "Lookism",
        poster: "./assets/images/series/lookism.jpg",
        year: "2022",
        genre: ["Manwhas", "Drama", "Comedia", "Acción"],
        seasons: 1,
        studio: "Studio Mir",
        description: "Park Hyung Suk, un estudiante de secundaria obeso que sufre acoso escolar, descubre que tiene un segundo cuerpo: alto, guapo y perfecto. Ahora debe navegar entre sus dos vidas mientras enfrenta los desafíos de la escuela y la sociedad."
    },
    {
        id: 43,
        title: "Hit Viral",
        poster: "./assets/images/series/hit-viral.jpg",
        year: "2024",
        genre: ["Drama", "Manwhas", "Suspenso", "Psicológico", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Un creador de contenido en ascenso descubre el lado oscuro de la fama digital cuando uno de sus videos se vuelve viral por razones equivocadas. Atrapado entre la adicción a los likes y la presión de mantener su imagen pública, debe enfrentar las consecuencias de vivir bajo el escrutinio constante de millones de personas mientras su salud mental se deteriora."
    },
    {
        id: 44,
        title: "Battle Game in 5 Seconds",
        poster: "./assets/images/series/battle-game-5-seconds.jpg",
        year: "2021",
        genre: ["Acción", "Suspenso", "Ciencia Ficción", "Superpoderes"],
        seasons: 1,
        studio: "SynergySP / Vega Entertainment",
        description: "Akira Shiroyanagi, un joven amante de los videojuegos, es transportado a una realidad donde debe participar en mortales juegos de batalla. Los participantes obtienen habilidades únicas basadas en lo que su oponente cree que pueden hacer. Akira deberá usar su ingenio y astucia para sobrevivir en este peligroso juego donde las reglas cambian constantemente."
    },
    {
        id: 45,
        title: "Btooom!",
        poster: "./assets/images/series/btooom.jpg",
        year: "2012",
        genre: ["Acción", "Suspenso", "Supervivencia", "Seinen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Ryouta Sakamoto, uno de los mejores jugadores del videojuego de explosiones Btooom!, es transportado misteriosamente a una isla remota donde debe participar en una versión real del juego. Armado solo con bombas y chips BIM, debe luchar por su vida contra otros jugadores mientras busca una manera de escapar y descubrir la verdad detrás de su secuestro."
    },
    {
        id: 46,
        title: "Darwin's Game",
        poster: "./assets/images/series/darwin-game.jpg",
        year: "2020",
        genre: ["Acción", "Suspenso", "Supervivencia", "Superpoderes"],
        seasons: 1,
        studio: "Nexus",
        description: "Kaname Sudo acepta sin saberlo una invitación al 'Darwin's Game', una aplicación móvil que resulta ser un mortal juego de supervivencia. Los jugadores obtienen habilidades únicas llamadas Sigils y deben luchar hasta la muerte. Kaname se une a otros jugadores para sobrevivir y desentrañar los misterios detrás del siniestro juego."
    },
    {
        id: 47,
        title: "Mirai Nikki (Future Diary)",
        poster: "./assets/images/series/mirai-nikki.jpg",
        year: "2011-2012",
        genre: ["Acción", "Psicológico", "Suspenso", "Sobrenatural"],
        seasons: 1,
        studio: "Asread",
        description: "Yukiteru Amano, un estudiante solitario que registra todo en su diario celular, se ve arrastrado a un mortal juego de supervivencia. 12 poseedores de 'Future Diaries' - diarios que predicen el futuro - deben luchar hasta que solo quede uno, quien se convertirá en el dios del espacio y tiempo. Junto a Yuno Gasai, su obsesiva compañera, Yuki lucha por sobrevivir en este juego despiadado."
    },
    {
        id: 48,
        title: "Classroom of the Elite",
        poster: "./assets/images/series/classroom-elite.jpg",
        year: "2017-2024",
        genre: ["Psicológico", "Drama", "Misterio", "Seinen"],
        seasons: 3,
        studio: "Lerche",
        description: "La Escuela Secundaria Tokyo Metropolitan Advanced Nurturing promete el 100% de colocación universitaria y laboral, pero esconde un competitivo sistema de clases. Kiyotaka Ayanokoji, un estudiante de la Clase D aparentemente promedio, oculta un intelecto genial que manipula silenciosamente a sus compañeros mientras desentraña los oscuros secretos del sistema educativo más elitista de Japón."
    },
    {
        id: 49,
        title: "Love Live! School Idol Project",
        poster: "./assets/images/series/love-live.jpg",
        year: "2013-2014",
        genre: ["Música", "Comedia", "Drama", "Escolares"],
        seasons: 2,
        studio: "Sunrise",
        description: "La Academia Otonokizaki está programada para cerrar debido al bajo número de inscripciones. Honoka Kosaka, inspirada por las populares idols escolares, decide formar un grupo de idols con sus amigas para salvar su escuela. Así nace μ's (Muse), cuyo objetivo es ganar el torneo Love Live! y atraer nuevos estudiantes mediante el poder de la música y la amistad."
    },
    {
        id: 50,
        title: "Oshi no Ko",
        poster: "./assets/images/series/oshi-no-ko.jpg",
        year: "2023-2025",
        genre: ["Drama", "Misterio", "Psicológico", "Seinen"],
        seasons: 2,
        studio: "Doga Kobo",
        description: "El ginecólogo Gorou Amemiya atiende a su ídolo, la estrella del pop Ai Hoshino, quien está embarazada. Tras un trágico incidente, Gorou renace como Aquamarine Hoshino, hijo de Ai, y descubre los oscuros secretos detrás de la industria del entretenimiento japonés. Junto a su hermana Ruby, busca desentrañar la verdad detrás del pasado mientras navega por el brutal mundo del espectáculo."
    },
    {
        id: 51,
        title: "Boku no Kokoro no Yabai Yatsu",
        poster: "./assets/images/series/boku-no-kokoro.jpg",
        year: "2023",
        genre: ["Comedia", "Romance", "Recuentos de la vida", "Shonen"],
        seasons: 1,
        studio: "Shin-Ei Animation",
        description: "Ichikawa Kyotaro, un estudiante de secundaria solitario y con pensamientos oscuros, comienza a desarrollar sentimientos por Yamada Anna, la chica más popular de la escuela. La serie sigue su torpe y adorable relación mientras Ichikawa lucha por expresar sus sentimientos."
    },
    {
        id: 52,
        title: "Darling in the Franxx",
        poster: "./assets/images/series/darling-franxx.jpg",
        year: "2018",
        genre: ["Mecha", "Ciencia Ficción", "Drama", "Romance"],
        seasons: 1,
        studio: "Trigger / CloverWorks",
        description: "En un futuro distópico, niños pilotan mechas gigantes llamados Franxx para proteger la humanidad. Hiro, un piloto que no pudo sincronizar con su pareja, conoce a Zero Two, una misteriosa piloto con cuernos, y juntos forman una conexión única que podría cambiar el destino de la humanidad."
    },
    {
        id: 53,
        title: "Nana",
        poster: "./assets/images/series/nana.jpg",
        year: "2006-2007",
        genre: ["Drama", "Música", "Romance", "Recuentos de la vida"],
        seasons: 1,
        studio: "Madhouse",
        description: "Dos mujeres llamadas Nana, con personalidades completamente diferentes, se conocen por casualidad en un tren a Tokyo. Nana Komatsu es una chica dulce que busca amor, mientras que Nana Osaki es una punk rockera que quiere triunfar en la música. Su amistad se desarrolla mientras enfrentan los altibajos de la vida adulta."
    },
    {
        id: 54,
        title: "Horimiya",
        poster: "./assets/images/series/horimiya.jpg",
        year: "2021",
        genre: ["Romance", "Comedia", "Recuentos de la vida", "Shonen"],
        seasons: 1,
        studio: "CloverWorks",
        description: "Kyouko Hori, popular y responsable, e Izumi Miyamura, callado y con pinta de otaku, descubren mutuamente sus secretos fuera de la escuela. Esta revelación inicia una relación especial donde muestran sus verdaderos yoes, desarrollando una dulce historia de amor."
    },
    {
        id: 55,
        title: "Ijiranaide, Nagatoro-san",
        poster: "./assets/images/series/nagatoro.jpg",
        year: "2021-2023",
        genre: ["Comedia", "Romance", "Recuentos de la vida"],
        seasons: 2,
        studio: "Telecom Animation Film",
        description: "Naoto Hachioji, un estudiante tranquilo que disfruta del manga, conoce a Hayase Nagatoro, una chica de primer año que encuentra divertido burlarse de él. Aunque comienza como acoso, su relación evoluciona hacia algo más cercano mientras Nagatoro empuja a Naoto a salir de su zona de confort."
    },
    {
        id: 56,
        title: "Inuyasha",
        poster: "./assets/images/series/inuyasha.jpg",
        year: "2000-2010",
        genre: ["Aventura", "Fantasía", "Romance", "Shonen"],
        seasons: 7,
        studio: "Sunrise",
        description: "Kagome Higurashi, una estudiante moderna, es arrastrada al período Sengoku a través de un pozo. Allí conoce a Inuyasha, un medio demonio, y juntos buscan los fragmentos de la Joya de Cuatro Almas mientras se enfrentan a demonios y desarrollan sentimientos el uno por el otro."
    },
    {
        id: 57,
        title: "Kaguya-sama: Love Is War",
        poster: "./assets/images/series/kaguya-sama.jpg",
        year: "2019-2022",
        genre: ["Comedia", "Romance", "Psicológico"],
        seasons: 3,
        studio: "A-1 Pictures",
        description: "En la Academia Shuchi'in, los geniales estudiantes del consejo estudiantil Kaguya Shinomiya y Miyuki Shirogane están enamorados, pero su orgullo les impide confesarlo. En su lugar, libran batallas psicológicas para hacer que el otro se confiese primero en esta comedia romántica única."
    },
    {
        id: 58,
        title: "The Fragrant Flower Blooms With Dignity",
        poster: "./assets/images/series/fragrant-flower.jpg",
        year: "2025",
        genre: ["Romance", "Drama", "Recuentos de la vida", "Shonen"],
        seasons: 1,
        studio: "CloverWorks",
        description: "Una historia de romance entre estudiantes de dos escuelas con reputaciones completamente diferentes: una escuela de élite y una escuela problemática. La serie explora cómo el amor puede florecer a pesar de las diferencias sociales y los prejuicios."
    },
    {
        id: 59,
        title: "Kusuriya no Hitorigoto",
        poster: "./assets/images/series/kusuriya.jpg",
        year: "2023",
        genre: ["Misterio", "Drama", "Histórico", "Seinen"],
        seasons: 1,
        studio: "TOHO animation STUDIO",
        description: "Maomao, una joven farmacéutica secuestrada y vendida para trabajar en el palacio interior, utiliza sus conocimientos médicos y aguda observación para resolver misteriosos casos mientras mantiene un perfil bajo en el peligroso mundo del harén imperial."
    },
    {
        id: 60,
        title: "Kaichou wa Maid-sama!",
        poster: "./assets/images/series/maid-sama.jpg",
        year: "2010",
        genre: ["Comedia", "Romance", "Shoujo"],
        seasons: 1,
        studio: "J.C.Staff",
        description: "Misaki Ayuzawa es la estricta presidenta del consejo estudiantil en una escuela que antes era solo para chicos. En secreto, trabaja en un café maid para mantener a su familia. Su doble vida se complica cuando Takumi Usui, el chico más popular, descubre su secreto."
    },
    {
        id: 61,
        title: "Masamune-kun no Revenge",
        poster: "./assets/images/series/masamune.jpg",
        year: "2017",
        genre: ["Comedia", "Romance", "Drama", "Shonen"],
        seasons: 1,
        studio: "Silver Link",
        description: "Masamune Makabe fue rechazado cruelmente cuando era niño por una chica rica que lo llamó 'cerdito'. Ahora, transformado en un chico guapo, busca vengarse haciéndose su novio y luego rechazándola, pero los planes no salen como esperaba."
    },
    {
        id: 63,
        title: "Sono Bisque Doll wa Koi wo Suru",
        poster: "./assets/images/series/bisque-doll.jpg",
        year: "2022-2025",
        genre: ["Romance", "Comedia", "Recuentos de la vida"],
        seasons: 2,
        studio: "CloverWorks",
        description: "Wakana Gojo, un estudiante que aspira a convertirse en creador de muñecas tradicionales, conoce a Marin Kitagawa, una compañera de clase popular y otaku. Juntos exploran el mundo del cosplay mientras desarrollan sentimientos el uno por el otro."
    },
    {
        id: 64,
        title: "The Saint's Magic Power is Omnipotent",
        poster: "./assets/images/series/saint-magic.jpg",
        year: "2021-2023",
        genre: ["Fantasía", "Romance", "Drama", "Isekai"],
        seasons: 2,
        studio: "Diomedéa",
        description: "Sei, una oficinista japonesa, es convocada a un mundo de fantasía como una de las dos Santas. Cuando el príncipe elige a la otra, Sei comienza a trabajar en la investigación de magia medicinal, descubriendo sus increíbles habilidades y encontrando el amor verdadero."
    },
    {
        id: 65,
        title: "Tomo-chan wa Onnanoko!",
        poster: "./assets/images/series/tomo-chan.jpg",
        year: "2023",
        genre: ["Comedia", "Romance", "Recuentos de la vida"],
        seasons: 1,
        studio: "Lay-duce",
        description: "Tomo Aizawa, una chica fuerte y atlética, ha sido amiga de Junichiro Kubota desde niños. Ahora en secundaria, Tomo se da cuenta de que está enamorada de Jun, pero él solo la ve como 'uno de los chicos'. Su lucha por hacerle ver su feminidad es el centro de esta comedia romántica."
    },
    {
        id: 67,
        title: "Raise wa Tanin ga Ii",
        poster: "./assets/images/series/raise-wa-tanin.jpg",
        year: "2023",
        genre: ["Drama", "Romance", "Suspenso"],
        seasons: 1,
        studio: "To be announced",
        description: "Yoshino, la nieta de un jefe yakuza, es comprometida con Kirishima, el heredero de una familia rival. Aunque aparenta ser el novio perfecto, Kirishima esconde una personalidad peligrosa y manipuladora en esta intensa historia de romance y crimen."
    },
    {
        id: 68,
        title: "Yamada-kun to Lv999 no Koi wo Suru",
        poster: "./assets/images/series/yamada-lv999.jpg",
        year: "2023",
        genre: ["Romance", "Comedia", "Recuentos de la vida"],
        seasons: 1,
        studio: "Madhouse",
        description: "Akane Kinoshita, una universitaria que juega un MMORPG para superar una ruptura, conoce a Yamada, un jugador profesional indiferente. A pesar de sus personalidades opuestas, desarrollan una relación única que mezcla el mundo virtual con el real."
    },
    {
        id: 69,
        title: "Ashita no Joe",
        poster: "./assets/images/series/ashita-no-joe.jpg",
        year: "1970-1971",
        genre: ["Deporte", "Drama", "Shonen"],
        seasons: 2,
        studio: "Mushi Production",
        description: "Joe Yabuki, un joven delincuente sin rumbo, descubre su pasión por el boxeo bajo la tutela del ex boxeador Danpei. La serie sigue su transformación de un chico problemático a un boxeador profesional, enfrentando numerosos desafíos dentro y fuera del ring en esta obra maestra del anime."
    },
    {
        id: 70,
        title: "Blue Lock",
        poster: "./assets/images/series/blue-lock.jpg",
        year: "2022-2023",
        genre: ["Deporte", "Psicológico", "Shonen"],
        seasons: 1,
        studio: "Eight Bit",
        description: "Tras el fracaso de Japón en la Copa del Mundo, se implementa el proyecto Blue Lock: un programa de entrenamiento extremo diseñado para crear el delantero egoísta definitivo. Yoichi Isagi se une a esta competencia despiadada donde solo uno puede sobrevivir y convertirse en la estrella del fútbol mundial."
    },
    {
        id: 71,
        title: "Blue Lock: Episode Nagi",
        poster: "./assets/images/series/blue-lock-episode-nagi.jpg",
        year: "2024",
        genre: ["Deporte", "Película"],
        seasons: 1,
        studio: "Eight Bit",
        description: "Película que explora la perspectiva de Seishiro Nagi, uno de los talentos más prometedores de Blue Lock. La película muestra su viaje desde ser un estudiante desinteresado hasta convertirse en un genio del fútbol, revelando sus motivaciones y su rivalidad con Reo Mikage."
    },
    {
        id: 72,
        title: "Dumbbell Nan Kilo Moteru?",
        poster: "./assets/images/series/dumbbell-nan-kilo-moteru.jpg",
        year: "2019",
        genre: ["Deporte", "Comedia", "Recuentos de la vida"],
        seasons: 1,
        studio: "Doga Kobo",
        description: "Hibiki Sakura, una estudiante de secundaria que ama comer, decide unirse a un gimnasio para perder peso. Allí conoce a Akemi Soryuin y juntas exploran el mundo del fitness, aprendiendo sobre ejercicios, nutrición y culturismo de manera divertida y educativa."
    },
    {
        id: 73,
        title: "Haikyuu!!",
        poster: "./assets/images/series/haikyuu.jpg",
        year: "2014-2020",
        genre: ["Deporte", "Drama", "Shonen"],
        seasons: 4,
        studio: "Production I.G",
        description: "Shoyo Hinata, un estudiante de preparatoria apasionado por el voleibol a pesar de su baja estatura, se une al equipo de su escuela donde se encuentra con su rival, Tobio Kageyama. Juntos forman una dupla increíble mientras buscan llegar a los campeonatos nacionales."
    },
    {
        id: 74,
        title: "Hajime no Ippo",
        poster: "./assets/images/series/hajime-no-ippo.jpg",
        year: "2000-2002",
        genre: ["Deporte", "Comedia", "Drama", "Shonen"],
        seasons: 3,
        studio: "Madhouse",
        description: "Ippo Makunouchi, un estudiante tímido que sufre bullying, descubre el boxeo cuando es salvado por el campeón Mamoru Takamura. Bajo el entrenamiento del gimnasio Kamogawa, Ippo se transforma en un boxeador profesional mientras enfrenta poderosos oponentes y forja amistades duraderas."
    },
    {
        id: 75,
        title: "Kuroko no Basket",
        poster: "./assets/images/series/kuroko-no-basket.jpg",
        year: "2012-2015",
        genre: ["Deporte", "Shonen"],
        seasons: 3,
        studio: "Production I.G",
        description: "El equipo de baloncesto del Instituto Seirin recluta a Tetsuya Kuroko, el 'jugador fantasma' de la legendaria Generación de Milagros. Junto con Taiga Kagami, forman un dúo formidable que busca derrotar a los excompañeros de Kuroko, cada uno con habilidades sobrehumanas."
    },
    {
        id: 76,
        title: "Kuroko no Basket: The Movie",
        poster: "./assets/images/series/kuroko-no-basket-the-movie.jpg",
        year: "2017",
        genre: ["Deporte", "Película", "Shonen"],
        seasons: 1,
        studio: "Production I.G",
        description: "Película que resume la serie de Kuroko no Basket, mostrando los momentos más importantes del viaje de Kuroko y Kagami, incluyendo sus batallas contra los miembros de la Generación de Milagros. Incluye nuevas escenas y animación mejorada."
    },
    {
        id: 77,
        title: "Slam Dunk",
        poster: "./assets/images/series/slam-dunk.jpg",
        year: "1993-1996",
        genre: ["Deporte", "Comedia", "Drama", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Hanamichi Sakuragi, un problemático estudiante de preparatoria, se une al equipo de baloncesto para impresionar a una chica. A pesar de su completa falta de experiencia, descubre un talento natural y una pasión creciente por el deporte que transforma su vida."
    },
    {
        id: 78,
        title: "The First Slam Dunk",
        poster: "./assets/images/series/the-real-slam-dunk.jpg",
        year: "2022",
        genre: ["Deporte", "Película", "Drama"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Película que continúa la historia de Slam Dunk, centrándose en el partido crucial entre los Shohoku y los campeones nacionales, Sannoh Kogyo. La película explora el pasado de Ryota Miyagi y ofrece una experiencia cinematográfica inmersiva con animación moderna."
    },
    {
        id: 79,
        title: "Sword Art Online",
        poster: "./assets/images/series/sword-art-online.jpg",
        year: "2012-2020",
        genre: ["Acción", "Aventura", "Fantasía", "Romance", "Videojuegos"],
        seasons: 4,
        studio: "A-1 Pictures",
        description: "En el año 2022, los jugadores del VRMMORPG Sword Art Online descubren que no pueden cerrar sesión. Kirito, un jugador experto, debe luchar por sobrevivir y encontrar una manera de liberar a todos los jugadores atrapados, mientras forma vínculos con otros como Asuna."
    },
    {
        id: 80,
        title: "Accel World",
        poster: "./assets/images/series/accel-world.jpg",
        year: "2012",
        genre: ["Acción", "Ciencia Ficción", "Videojuegos", "Romance"],
        seasons: 1,
        studio: "Sunrise",
        description: "Haruyuki, un estudiante con baja autoestima, descubre el programa Brain Burst que acelera la percepción mental. Al unirse a Kuroyukihime, debe luchar en batallas aceleradas para proteger el programa y descubrir sus secretos."
    },
    {
        id: 81,
        title: "No Game No Life",
        poster: "./assets/images/series/no-game-no-life.jpg",
        year: "2014",
        genre: ["Aventura", "Comedia", "Fantasía", "Isekai"],
        seasons: 1,
        studio: "Madhouse",
        description: "Los hermanos hikikomori Sora y Shiro, conocidos como 'Blank', son transportados a un mundo donde todo se decide mediante juegos. Usando su ingenio, buscan conquistar las 16 razas y desafiar al Dios Tet."
    },
    {
        id: 82,
        title: "DanMachi",
        poster: "./assets/images/series/danmachi.jpg",
        year: "2015-2023",
        genre: ["Aventura", "Fantasía", "Acción", "Romance"],
        seasons: 4,
        studio: "J.C.Staff",
        description: "Bell Cranel, el único miembro de la familia Hestia, explora el misterioso calabozo de Orario para volverse más fuerte y impresionar a la poderosa aventurera Ais Wallenstein, mientras descubre secretos sobre su pasado."
    },
    {
        id: 83,
        title: "Re:Zero - Starting Life in Another World",
        poster: "./assets/images/series/rezero.jpg",
        year: "2016-2021",
        genre: ["Drama", "Fantasía", "Suspenso", "Isekai", "Psicológico"],
        seasons: 2,
        studio: "White Fox",
        description: "Subaru Natsuki es transportado a un mundo de fantasía donde descubre que tiene la habilidad 'Return by Death', volviendo en el tiempo al morir. Debe usar este poder para proteger a sus seres queridos mientras enfrenta horribles destinos."
    },
    {
        id: 84,
        title: "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
        poster: "./assets/images/series/ansatsusha-isekai.jpg",
        year: "2021",
        genre: ["Acción", "Fantasía", "Isekai", "Seinen"],
        seasons: 1,
        studio: "SILVER LINK., Studio Palette",
        description: "El mejor asesino del mundo es reencarnado en un mundo de fantasía con la misión de matar al héroe que destruirá el mundo. Usando sus conocimientos modernos y habilidades de asesinato, debe cumplir su misión mientras navega la vida noble."
    },
    {
        id: 85,
        title: "Kenja no Mago",
        poster: "./assets/images/series/kenja-no-mago.jpg",
        year: "2019",
        genre: ["Acción", "Comedia", "Fantasía", "Isekai"],
        seasons: 1,
        studio: "SILVER LINK.",
        description: "Un joven muere en un accidente y renace en un mundo de magia como Shin, criado por el sabio Merlin. Aunque poderoso mago, carece de sentido común, llevándolo a crear inventos revolucionarios mientras protege el reino."
    },
    {
        id: 86,
        title: "Overlord",
        poster: "./assets/images/series/overlord.jpg",
        year: "2015-2022",
        genre: ["Acción", "Fantasía", "Isekai", "Seinen"],
        seasons: 4,
        studio: "Madhouse",
        description: "Cuando el juego DMMORPG Yggdrasil cierra sus servidores, el jugador Momonga permanece atrapado como su personaje no-muerto. Decidido a descubrir qué pasó, usa su poder para conquistar este nuevo mundo con sus NPCs ahora vivientes."
    },
    {
        id: 87,
        title: "Arifureta: From Commonplace to World's Strongest",
        poster: "./assets/images/series/arifureta.jpg",
        year: "2019-2022",
        genre: ["Acción", "Aventura", "Fantasía", "Isekai", "Harem"],
        seasons: 2,
        studio: "Asread / Studio Mother",
        description: "Hajime Nagumo y su clase son transportados a un mundo de fantasía. Mientras todos obtienen poderosas habilidades, Hajime recibe una habilidad de fabricación considerada inútil. Tras ser traicionado, cae al abismo donde se transforma en un guerrero despiadado."
    },
    {
        id: 88,
        title: "Dead Mount Death Play",
        poster: "./assets/images/series/dead-mount-play.jpg",
        year: "2023",
        genre: ["Acción", "Sobrenatural", "Fantasía", "Seinen"],
        seasons: 1,
        studio: "Geek Toys",
        description: "Un poderoso nigromante es derrotado en su mundo de fantasía y reencarna en el cuerpo de un joven asesinado en el Tokyo moderno. Debe adaptarse a esta nueva vida mientras lidia con organizaciones criminales y seres sobrenaturales."
    },
    {
        id: 89,
        title: "Kono Subarashii Sekai ni Shukufuku wo!",
        poster: "./assets/images/series/konosuba.jpg",
        year: "2016-2017",
        genre: ["Comedia", "Aventura", "Fantasía", "Isekai", "Parodia"],
        seasons: 2,
        studio: "Studio Deen",
        description: "Kazuma Sato muere de manera ridícula y es reencarnado en un mundo de fantasía con la diosa inútil Aqua. Forma un grupo con la maga explosiva Megumin y la cruzadora masoquista Darkness, viviendo aventuras caóticas y cómicas."
    },
    {
        id: 90,
        title: "Log Horizon",
        poster: "./assets/images/series/log-horizon.jpg",
        year: "2013-2021",
        genre: ["Aventura", "Fantasía", "Videojuegos"],
        seasons: 3,
        studio: "Studio Deen",
        description: "Miles de jugadores quedan atrapados en el juego MMORPG Elder Tale. El estratega Shiroe usa su intelecto para establecer orden y sociedad en este nuevo mundo, enfrentándose a desafíos políticos y de supervivencia."
    },
    {
        id: 91,
        title: "Maou Gakuin no Futekigousha",
        poster: "./assets/images/series/maou-gakuin.jpg",
        year: "2020-2023",
        genre: ["Acción", "Fantasía", "Escolares", "Isekai"],
        seasons: 2,
        studio: "SILVER LINK.",
        description: "Anos Voldigoad, el Rey Demonio que dividió el mundo, reencarna 2000 años después. Inscrito en una academia para demonios, debe demostrar su identidad mientras enfrenta conspiraciones y enemigos que dudan de su poder."
    },
    {
        id: 92,
        title: "Mushoku Tensei: Jobless Reincarnation",
        poster: "./assets/images/series/mushoku-tensei.jpg",
        year: "2021-2024",
        genre: ["Drama", "Aventura", "Fantasía", "Isekai", "Recuentos de la vida"],
        seasons: 2,
        studio: "Studio Bind",
        description: "Un desempleado de 34 años muere y reencarna en un mundo de fantasía como Rudeus Greyrat. Decidido a vivir sin arrepentimientos, utiliza su conocimiento anterior para convertirse en un poderoso mago mientras experimenta el crecimiento y el amor."
    },
    {
        id: 93,
        title: "Plunderer",
        poster: "./assets/images/series/plunderer.jpg",
        year: "2020",
        genre: ["Acción", "Aventura", "Fantasía", "Ciencia Ficción"],
        seasons: 1,
        studio: "Geek Toys",
        description: "En un mundo donde los humanos tienen números en sus cuerpos que disminuyen según sus creencias, la cadete Hina busca al Legendario Red Baron mientras descubre oscuros secretos sobre su sociedad."
    },
    {
        id: 94,
        title: "Re:Monster",
        poster: "./assets/images/series/remonster.jpg",
        year: "2024",
        genre: ["Acción", "Fantasía", "Isekai", "Seinen"],
        seasons: 1,
        studio: "Studio Deen",
        description: "Un hombre es reencarnado como un goblin en un mundo de fantasía. Usando su habilidad para evolucionar al consumir a sus enemigos, asciende en la cadena alimenticia mientras construye su propia tribu de monstruos."
    },
    {
        id: 95,
        title: "Tate no Yuusha no Nariagari",
        poster: "./assets/images/series/tate-no-yuusha.jpg",
        year: "2019-2025",
        genre: ["Acción", "Aventura", "Drama", "Fantasía", "Isekai"],
        seasons: 4,
        studio: "Kinema Citrus",
        description: "Naofumi Iwatani es convocado como el Héroe del Escudo a un mundo de fantasía, pero es traicionado y despreciado. Determinado a sobrevivir, se embarca en un viaje para demostrar su valía mientras lucha contra las Olas de la Catástrofe."
    },
    {
        id: 96,
        title: "The Eminence in Shadow",
        poster: "./assets/images/series/eminence-in-shadow.jpg",
        year: "2022-2023",
        genre: ["Acción", "Comedia", "Fantasía", "Isekai"],
        seasons: 2,
        studio: "Nexus",
        description: "Cid Kagenou ha entrenado toda su vida para convertirse en el maestro de las sombras, pero muere y reencarna en un mundo de fantasía donde crea una organización secreta para combatir un culto oscuro... que resulta ser real."
    },
    {
        id: 97,
        title: "Youjo Senki",
        poster: "./assets/images/series/youjo-senki.jpg",
        year: "2017",
        genre: ["Acción", "Fantasía", "Isekai", "Seinen"],
        seasons: 1,
        studio: "Nut",
        description: "Un ateo ejecutivo japonés es reencarnado como Tanya von Degurechaff, una niña en un mundo alternativo similar a la Europa de la Primera Guerra Mundial. Usando su intelecto y magia, asciende en el ejército imperial mientras lucha contra una entidad que llama 'Ser X'."
    },
    {
        id: 98,
        title: "Tensei shitara Slime Datta Ken",
        poster: "./assets/images/series/tensei-slime.jpg",
        year: "2018-2024",
        genre: ["Acción", "Comedia", "Fantasía", "Isekai"],
        seasons: 3,
        studio: "Eight Bit",
        description: "Satoru Mikami es apuñalado y reencarna como un slime en un mundo de fantasía. Nombrado Rimuru Tempest, adquiere habilidades únicas y busca crear una sociedad donde monstruos y humanos puedan coexistir pacíficamente."
    },
    {
        id: 99,
        title: "Asobi Asobase",
        poster: "./assets/images/series/asobi-asobase.jpg",
        year: "2018",
        genre: ["Comedia", "Escolares", "Recuentos de la vida"],
        seasons: 1,
        studio: "Lerche",
        description: "Tres estudiantes de secundaria con personalidades completamente diferentes forman el 'Club de Juegos' donde pasan sus tardes jugando juegos absurdos y participando en situaciones cada vez más hilarantes y caóticas."
    },
    {
        id: 100,
        title: "Baka to Test to Shoukanjuu",
        poster: "./assets/images/series/baka-to-test-to-shoukanjuu.jpg",
        year: "2010-2011",
        genre: ["Comedia", "Fantasía", "Romance", "Escolares"],
        seasons: 2,
        studio: "SILVER LINK.",
        description: "En una escuela donde los exámenes determinan todo, los estudiantes pueden invocar avatares para batallar. Akihisa Yoshii y sus amigos del salón F, la clase más baja, desafían a las clases superiores en batallas épicas y cómicas."
    },
    {
        id: 101,
        title: "Bocchi the Rock!",
        poster: "./assets/images/series/bocchi-the-rock.jpg",
        year: "2022",
        genre: ["Comedia", "Música", "Recuentos de la vida", "Shonen"],
        seasons: 1,
        studio: "CloverWorks",
        description: "Hitori 'Bocchi' Gotoh, una guitarrista extremadamente tímida y con ansiedad social, sueña con unirse a una banda. Su vida cambia cuando es reclutada por la baterista Nijika Ijichi para unirse a 'Kessoku Band'."
    },
    {
        id: 102,
        title: "Buddy Daddies",
        poster: "./assets/images/series/buddy-daddies.jpeg",
        year: "2023",
        genre: ["Comedia", "Acción", "Recuentos de la vida"],
        seasons: 1,
        studio: "P.A. Works",
        description: "Dos asesinos profesionales, Kazuki y Rei, ven sus vidas transformadas cuando encuentran a una niña pequeña llamada Miri durante una misión de Navidad. Juntos forman una familia no convencional mientras equilibran el cuidado infantil con su trabajo mortal."
    },
    {
        id: 103,
        title: "Detroit Metal City",
        poster: "./assets/images/series/detroit-metal-city.jpg",
        year: "2008",
        genre: ["Comedia", "Música", "Parodia", "Seinen"],
        seasons: 1,
        studio: "Studio 4°C",
        description: "Soichi Negishi es un joven amable que ama la música pop sueca, pero por destino se convierte en Johannes Krauser II, el vocalista satánico de la banda de death metal Detroit Metal City. La serie sigue su doble vida llena de absurdos contrastes."
    },
    {
        id: 104,
        title: "Dungeon Meshi",
        poster: "./assets/images/series/dungeon-meshi-delicious-in-dungeon.jpg",
        year: "2024",
        genre: ["Comedia", "Fantasía", "Aventura", "Cocina"],
        seasons: 1,
        studio: "Trigger",
        description: "Laios y su grupo de aventureros exploran una mazmorra cuando su hermana es devorada por un dragón. Sin dinero para provisiones, deciden cocinar y comer monstruos de la mazmorra en su búsqueda por rescatarla."
    },
    {
        id: 105,
        title: "Gokushufudou",
        poster: "./assets/images/series/gokushufudo.jpg",
        year: "2021-2023",
        genre: ["Comedia", "Recuentos de la vida", "Seinen"],
        seasons: 2,
        studio: "J.C.Staff",
        description: "Tatsu, el legendario ex-yakuza conocido como 'El Dragón Inmortal', se retira del crimen para convertirse en amo de casa. Su vida doméstica está llena de situaciones cómicas debido a su apariencia intimidante y sus métodos poco convencionales."
    },
    {
        id: 106,
        title: "Grand Blue",
        poster: "./assets/images/series/grand-blue.jpg",
        year: "2025",
        genre: ["Comedia", "Recuentos de la vida", "Ecchi"],
        seasons: 2,
        studio: "Zero-G",
        description: "Iori Kitahara se muda a la costa para asistir a la universidad y se une al club de buceo, que resulta estar más interesado en beber y hacer travesuras que en el buceo. Una comedia universitaria sobre amistad, alcohol y situaciones absurdas."
    },
    {
        id: 107,
        title: "Nanbaka",
        poster: "./assets/images/series/nanbaka.jpg",
        year: "2016-2017",
        genre: ["Comedia", "Acción", "Shonen"],
        seasons: 2,
        studio: "Satelight",
        description: "Cuatro prisioneros con talentos únicos para escapar están encarcelados en la prisión más segura del mundo. La serie sigue sus intentos cómicos de escape y sus interacciones con los guardias en esta colorida comedia carcelaria."
    },
    {
        id: 108,
        title: "Spy × Family",
        poster: "./assets/images/series/spy-x-family.jpg",
        year: "2022-2025",
        genre: ["Comedia", "Acción", "Recuentos de la vida", "Shonen"],
        seasons: 3,
        studio: "Wit Studio / CloverWorks",
        description: "Loid Forger, un espía de élite, forma una familia falsa para completar una misión. Sin saberlo, su 'esposa' Yor es una asesina y su 'hija' Anya es una telépata. Juntos forman una familia disfuncional que oculta increíbles secretos."
    },
    {
        id: 109,
        title: "Zom 100: Zombie ni Naru made ni Shitai 100 no Koto",
        poster: "./assets/images/series/zom-100-bucket-list.jpg",
        year: "2023",
        genre: ["Comedia", "Horror", "Acción", "Supervivencia", "Seinen"],
        seasons: 1,
        studio: "Bug Films",
        description: "Akira Tendo, un asalariado explotado, encuentra nueva libertad cuando un apocalipsis zombie llega a Tokyo. En lugar de entrar en pánico, crea una lista de 100 cosas que quiere hacer antes de convertirse en zombie, redescubriendo la alegría de vivir."
    },
    {
        id: 110,
        title: "Code Geass: Lelouch of the Rebellion",
        poster: "./assets/images/series/code-geass.jpg",
        year: "2006-2008",
        genre: ["Mecha", "Ciencia Ficción", "Psicológico", "Drama"],
        seasons: 2,
        studio: "Sunrise",
        description: "Lelouch vi Britannia, un príncipe exiliado, obtiene el poder del Geass que le permite dar órdenes absolutas. Usando su intelecto y este poder, lidera una rebelión contra el Santo Imperio de Britannia para crear un mundo mejor para su hermana."
    },
    {
        id: 111,
        title: "Hyōka",
        poster: "./assets/images/series/hyoka.jpg",
        year: "2012",
        genre: ["Misterio", "Drama", "Recuentos de la vida", "Escolares"],
        seasons: 1,
        studio: "Kyoto Animation",
        description: "Hōtarō Oreki, un estudiante que prioriza conservar energía, es obligado a unirse al Club de Literatura Clásica. Junto a Eru Chitanda, resuelve misterios cotidianos que despiertan su curiosidad en esta serie de misterio y descubrimiento personal."
    },
    {
        id: 112,
        title: "Junji Ito Collection",
        poster: "./assets/images/series/junji-ito-collection.jpg",
        year: "2018",
        genre: ["Horror", "Sobrenatural", "Psicológico"],
        seasons: 1,
        studio: "Studio Deen",
        description: "Una colección de historias de horror del maestro del manga Junji Ito. Cada episodio presenta múltiples cuentos de terror que exploran lo macabro, lo surrealista y lo psicológicamente perturbador."
    },
    {
        id: 113,
        title: "Junji Ito Maniac: Japanese Tales of the Macabre",
        poster: "./assets/images/series/junji-ito-maniac.jpg",
        year: "2023",
        genre: ["Horror", "Sobrenatural", "Psicológico"],
        seasons: 1,
        studio: "Studio Deen",
        description: "Segunda adaptación animada de las obras de Junji Ito, presentando historias seleccionadas por fans de todo el mundo. Incluye cuentos clásicos y menos conocidos del maestro del horror japonés."
    },
    {
        id: 114,
        title: "Lord of the Mysteries",
        poster: "./assets/images/series/lord-of-mysteries.jpg",
        year: "2025",
        genre: ["Misterio", "Fantasía", "Sobrenatural", "Suspenso", "Seinen"],
        seasons: 1,
        studio: "B.CMay Pictures",
        description: "Zhou Mingrui se transporta a un mundo steampunk victoriano donde descubre una sociedad secreta de seres sobrenaturales. Como Klein Moretti, debe navegar entre rituales místicos y conspiraciones mientras busca una manera de regresar a casa."
    },
    {
        id: 115,
        title: "Neon Genesis Evangelion",
        poster: "./assets/images/series/neon-genesis-evangelion.jpg",
        year: "1995-1996",
        genre: ["Mecha", "Psicológico", "Ciencia Ficción", "Drama"],
        seasons: 1,
        studio: "Gainax",
        description: "En un mundo post-apocalíptico, Shinji Ikari es reclutado por su padre para pilotar el Evangelion Unit-01 y luchar contra misteriosos seres llamados Ángeles. La serie explora la depresión, la identidad y la naturaleza humana en medio de batallas épicas."
    },
    {
        id: 116,
        title: "Rozen Maiden",
        poster: "./assets/images/series/rozen-maiden.jpg",
        year: "2005-2006",
        genre: ["Fantasía", "Drama", "Acción"],
        seasons: 2,
        studio: "Nomad",
        description: "Jun Sakurada, un hikikomori, recibe una muñeca misteriosa llamada Shinku que cobra vida. Se ve envuelto en el 'Juego de Alice', una batalla entre muñecas vivientes que buscan convertirse en la muñeca perfecta: Alice."
    },
    {
        id: 117,
        title: "Rozen Maiden (Original)",
        poster: "./assets/images/series/rozen-maiden-old.jpg",
        year: "2004",
        genre: ["Fantasía", "Drama", "Acción"],
        seasons: 1,
        studio: "Nomad",
        description: "Adaptación original que presenta la historia de Jun Sakurada y su encuentro con las muñecas vivientes Rozen Maiden, comenzando su participación en el misterioso Juego de Alice."
    },
    {
        id: 118,
        title: "Satsuriku no Tenshi",
        poster: "./assets/images/series/satsuriku-no-tenshi.jpg",
        year: "2018",
        genre: ["Horror", "Psicológico", "Suspenso", "Misterio"],
        seasons: 1,
        studio: "J.C.Staff",
        description: "Rachel Gardner despierta en el sótano de un edificio abandonado sin recuerdos. Conoce a Zack, un asesino psicópata, y juntos ascienden a través de los pisos, enfrentando sus oscuros pasados y buscando escapar."
    },
    {
        id: 119,
        title: "Shoshimin Series",
        poster: "./assets/images/series/shoshimin-series.jpg",
        year: "2024",
        genre: ["Misterio", "Drama", "Recuentos de la vida", "Escolares"],
        seasons: 1,
        studio: "Lapin Track",
        description: "Una serie de misterio que sigue a estudiantes de secundaria que resuelven casos intrigantes en su vida cotidiana, combinando elementos de drama escolar con suspenso psicológico."
    },
    {
        id: 120,
        title: "Takopi's Original Sin",
        poster: "./assets/images/series/takopis-original-sin.jpg",
        year: "2025",
        genre: ["Psicológico", "Drama", "Fantasía"],
        seasons: 1,
        studio: "Enishiya",
        description: "Takopi, un alienígena inocente, llega a la Tierra para hacer feliz a la humana Shizuka. Sin embargo, sus buenas intenciones desencadenan una serie de eventos trágicos que exploran la naturaleza del sufrimiento y la redención."
    },
    {
        id: 121,
        title: "Tomodachi Game",
        poster: "./assets/images/series/tomodachi-game.jpg",
        year: "2022",
        genre: ["Psicológico", "Misterio", "Suspenso"],
        seasons: 1,
        studio: "Okuruto Noboru",
        description: "Cinco amigos son secuestrados y forzados a participar en el 'Tomodachi Game', un juego que prueba sus lazos de amistad a través de pruebas psicológicas extremas. Yuichi Katagiri debe usar su astucia para proteger a sus amigos mientras descubre traiciones."
    },
    {
        id: 122,
        title: "Uzumaki",
        poster: "./assets/images/series/uzumaki.jpg",
        year: "2024",
        genre: ["Horror", "Psicológico", "Sobrenatural", "Misterio"],
        seasons: 1,
        studio: "Production I.G",
        description: "Adaptación del manga de Junji Ito sobre un pueblo consumido por una obsesión sobrenatural con espirales. Kirie Goshima y su novio Shuichi Saito intentan sobrevivir mientras los habitantes caen en la locura espiral."
    },
    {
        id: 123,
        title: "Ansatsu Kyoushitsu",
        poster: "./assets/images/series/assassination-classroom.jpg",
        year: "2015-2016",
        genre: ["Comedia", "Acción", "Escolares", "Ciencia Ficción", "Drama"],
        seasons: 2,
        studio: "Lerche",
        description: "Una poderosa criatura amarilla llamada Koro-sensei destruye la luna y amenaza con destruir la Tierra. Como última esperanza, es asignado como profesor de la clase 3-E donde los estudiantes deben asesinarlo antes de graduarse. Pero Koro-sensei resulta ser el mejor maestro que jamás hayan tenido."
    },
    {
        id: 124,
        title: "To Be Hero X",
        poster: "./assets/images/series/to-be-hero-x.jpg",
        year: "2025",
        genre: ["Acción", "Superhéroes", "Drama", "Ciencia Ficción", "Psicológico"],
        seasons: 1,
        studio: "BeDream / Pb Animation / Studio LAN / Paper Plane Animation Studio",
        description: "En un mundo donde los superhéroes obtienen sus poderes de la confianza del público, diez héroes de élite compiten cada dos años por el título de 'X' - el héroe número uno con el Índice de Confianza más alto. Sus habilidades dependen directamente de la fe que la gente deposita en ellos, haciendo que el poder sea volátil y los rankings cambien constantemente en este intenso drama de superhéroes."
    },
    {
        id: 125,
        title: "Ninja Kamui",
        poster: "./assets/images/series/ninja-kamui.jpg",
        year: "2024",
        genre: ["Acción", "Ciencia Ficción", "Seinen"],
        seasons: 1,
        studio: "Sola Entertainment / E&H Production",
        description: "Joe Higan es un ex-ninja que escapó de su clan para vivir una vida pacífica con su familia. Cuando su pasado lo alcanza y su familia es asesinada, regresa como Ninja Kamui para vengarse, utilizando técnicas ninja ancestrales combinadas con tecnología moderna."
    },
    {
        id: 126,
        title: "Invincible",
        poster: "./assets/images/series/invincible.jpg",
        year: "2021-2026",
        genre: ["Acción", "Superhéroes", "Drama", "Ciencia Ficción", "Seinen"],
        seasons: 4,
        studio: "Skybound Entertainment",
        description: "Mark Grayson es un adolescente normal cuyo padre es el superhéroe más poderoso de la Tierra, Omni-Man. Cuando Mark desarrolla sus propios poderes, descubre oscuros secretos sobre su herencia y debe enfrentarse a amenazas que desafían todo lo que creía saber sobre el heroísmo."
    },
    {
        id: 127,
        title: "Soul Eater",
        poster: "./assets/images/series/soul-eater.jpg",
        year: "2008-2009",
        genre: ["Acción", "Fantasía", "Comedia", "Shonen"],
        seasons: 1,
        studio: "Bones",
        description: "En la Escuela de Armas y Meisters, los estudiantes aprenden a cazar almas de seres malignos. Maka Albarn y su arma Soul Eater buscan convertir a Soul en una 'Death Scythe' recolectando 99 almas malvadas y 1 de bruja."
    },
    {
        id: 128,
        title: "Tokyo Revengers",
        poster: "./assets/images/series/tokyo-revengers.jpg",
        year: "2021-2023",
        genre: ["Acción", "Drama", "Shonen"],
        seasons: 3,
        studio: "Liden Films",
        description: "Takemichi Hanagaki descubre que puede viajar en el tiempo 12 años atrás para salvar a su ex-novia de ser asesinada. Se infiltra en la pandilla Tokyo Manji para cambiar el pasado y evitar tragedias futuras."
    },
    {
        id: 129,
        title: "Toriko",
        poster: "./assets/images/series/toriko.jpg",
        year: "2011-2014",
        genre: ["Aventura", "Acción", "Comedia", "Cocina", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "En un mundo donde los ingredientes gourmet son extremadamente valiosos, Toriko es un 'Cazador de Alimentos' que busca ingredientes raros y peligrosos mientras crea el menú perfecto con su chef compañero Komatsu."
    },
    {
        id: 130,
        title: "Undead Unluck",
        poster: "./assets/images/series/undead-unluck.jpg",
        year: "2023-2024",
        genre: ["Acción", "Comedia", "Sobrenatural", "Shonen"],
        seasons: 1,
        studio: "David Production",
        description: "Fuko Izumi posee la habilidad de causar mala suerte a quien la toque. Conoce a Andy, un inmortal que busca morir, y juntos forman un dúo único mientras se enfrentan a una organización que gobierna el mundo."
    },
    {
        id: 131,
        title: "Wind Breaker",
        poster: "./assets/images/series/wind-breaker.jpg",
        year: "2024-2025",
        genre: ["Acción", "Escolares", "Deporte", "Shonen"],
        seasons: 2,
        studio: "CloverWorks",
        description: "Haruka Sakura se transfiere a una escuela conocida por sus fuertes luchadores. Busca convertirse en el más fuerte, pero descubre que sus nuevos compañeros protegen el pueblo como héroes locales."
    },
    {
        id: 132,
        title: "Hokuto no Ken",
        poster: "./assets/images/series/hokuto-no-ken-old.jpg",
        year: "1984-1987",
        genre: ["Acción", "Aventura", "Post-apocalíptico", "Shonen"],
        seasons: 2,
        studio: "Toei Animation",
        description: "Kenshiro, maestro del arte marcial Hokuto Shinken, recorre la Tierra post-apocalíptica para rescatar a su novia secuestrada, enfrentándose a guerreros despiadados en un mundo devastado."
    },
    {
        id: 133,
        title: "Hunter x Hunter",
        poster: "./assets/images/series/hunter-x-hunter.jpg",
        year: "2011-2014",
        genre: ["Aventura", "Acción", "Fantasía", "Shonen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Gon Freecss descubre que su padre, a quien creía muerto, es uno de los legendarios Hunters. Se embarca en un viaje para convertirse en Hunter y encontrar a su padre, haciendo amigos y enfrentando desafíos increíbles."
    },
    {
        id: 134,
        title: "Jigoku Sensei Nube",
        poster: "./assets/images/series/jigoku-sensei-nube.jpg",
        year: "2025",
        genre: ["Horror", "Comedia", "Sobrenatural", "Shonen"],
        seasons: 1,
        studio: "Kai",
        description: "El maestro Nube posee un poder espiritual en su mano que usa para proteger a sus estudiantes de fantasmas y demonios mientras resuelve misterios sobrenaturales en su escuela."
    },
    {
        id: 135,
        title: "Jujutsu Kaisen",
        poster: "./assets/images/series/jujutsu-kaisen.jpg",
        year: "2020-2024",
        genre: ["Acción", "Fantasía", "Horror", "Shonen"],
        seasons: 2,
        studio: "MAPPA",
        description: "Yuji Itadori se traga el dedo de un poderoso hechicero maldito para salvar a sus amigos, convirtiéndose en el anfitrión de Sukuna. Se une al Colegio Técnico de Jujutsu para combatir maldiciones y controlar su nuevo poder."
    },
    {
        id: 136,
        title: "Kaiju No. 8",
        poster: "./assets/images/series/kaiju-no-8.jpg",
        year: "2024-2025",
        genre: ["Acción", "Ciencia Ficción", "Monstruos", "Shonen"],
        seasons: 2,
        studio: "Production I.G",
        description: "Kafka Hibino sueña con unirse a la Fuerza de Defensa contra Kaijus, pero trabaja limpiando después de las batallas. Cuando un kaiju pequeño lo infecta, obtiene la capacidad de transformarse en un poderoso kaiju humanoide."
    },
    {
        id: 137,
        title: "Kimetsu no Yaiba",
        poster: "./assets/images/series/kimetsu-no-yaiba.jpg",
        year: "2019-2023",
        genre: ["Acción", "Fantasía", "Histórico", "Shonen"],
        seasons: 4,
        studio: "ufotable",
        description: "Tanjiro Kamado se convierte en cazador de demonios después de que su familia es masacrada y su hermana Nezuko se transforme en demonio. Busca una cura para ella mientras combate demonios en el Japón feudal."
    },
    {
        id: 138,
        title: "Magi: The Labyrinth of Magic",
        poster: "./assets/images/series/magi-in-the-laberinth.jpg",
        year: "2012-2014",
        genre: ["Aventura", "Fantasía", "Acción", "Shonen"],
        seasons: 2,
        studio: "A-1 Pictures",
        description: "Aladdin, Alibaba y Morgiana exploran misteriosas mazmorras llenas de tesoros y peligros en un mundo inspirado en Las Mil y Una Noches, mientras descubren sus destinos como Magi y dueños de Djinn."
    },
    {
        id: 139,
        title: "Mashle: Magic and Muscles",
        poster: "./assets/images/series/mashle.jpg",
        year: "2023-2024",
        genre: ["Comedia", "Fantasía", "Acción", "Shonen"],
        seasons: 2,
        studio: "A-1 Pictures",
        description: "En un mundo donde la magia lo es todo, Mash Burnedead nace sin poderes mágicos pero con fuerza física sobrehumana. Debe ingresar a una academia de magia y convertirse en 'Elegido Divino' para proteger su vida pacífica."
    },
    {
        id: 140,
        title: "Mob Psycho 100",
        poster: "./assets/images/series/mob-psycho.jpg",
        year: "2016-2022",
        genre: ["Acción", "Comedia", "Sobrenatural", "Shonen"],
        seasons: 3,
        studio: "Bones",
        description: "Shigeo 'Mob' Kageyama es un poderoso psíquico que suprime sus emociones para controlar su poder. Trabaja para el fraudulento exorcista Arataka Reigen mientras enfrenta espíritus malvados y otros psíquicos."
    },
    {
        id: 141,
        title: "My Hero Academia: Vigilantes",
        poster: "./assets/images/series/my-hero-academia-vigilantes.jpg",
        year: "2025",
        genre: ["Acción", "Superhéroes", "Drama", "Shonen"],
        seasons: 1,
        studio: "To be announced",
        description: "Spin-off de My Hero Academia que sigue a Koichi Haimawari, un universitario con poderes menores que se convierte en héroe callejero en los bajos fondos de la sociedad de héroes, operando fuera de la ley."
    },
    {
        id: 142,
        title: "Nanatsu no Taizai",
        poster: "./assets/images/series/nanatsu-no-taizai.jpg",
        year: "2014-2021",
        genre: ["Acción", "Aventura", "Fantasía", "Shonen"],
        seasons: 5,
        studio: "Studio Deen / A-1 Pictures",
        description: "Los Siete Pecados Capitales, un grupo de caballeros criminales, son convocados para salvar el reino de Liones de los Caballeros Sagrados que han tomado el control. Meliodas lidera el grupo mientras buscan redención."
    },
    {
        id: 143,
        title: "Naruto",
        poster: "./assets/images/series/naruto.jpg",
        year: "2002-2007",
        genre: ["Acción", "Aventura", "Artes Marciales", "Shonen"],
        seasons: 1,
        studio: "Studio Pierrot",
        description: "Naruto Uzumaki, un joven ninja marginado que contiene al Zorro de Nueve Colas en su interior, sueña con convertirse en Hokage para ganar el reconocimiento de seu aldea mientras forma equipo con Sasuke y Sakura."
    },
    {
        id: 144,
        title: "Naruto: Shippuden",
        poster: "./assets/images/series/naruto-shippuden.jpg",
        year: "2007-2017",
        genre: ["Acción", "Aventura", "Drama", "Shonen"],
        seasons: 1,
        studio: "Studio Pierrot",
        description: "Dos años y medio después de dejar la aldea, Naruto regresa más fuerte para enfrentar la organización Akatsuki y salvar a Sasuke del camino de la venganza, mientras el mundo se prepara para la Cuarta Guerra Ninja."
    },
    {
        id: 145,
        title: "One Piece",
        poster: "./assets/images/series/one-piece.jpeg",
        year: "1999-presente",
        genre: ["Aventura", "Acción", "Fantasía", "Comedia", "Shonen"],
        seasons: 20,
        studio: "Toei Animation",
        description: "Monkey D. Luffy y su tripulación de piratas navegan por los mares en busca del tesoro legendario 'One Piece' para convertirse en el próximo Rey de los Piratas, enfrentándose a la Marina y otros piratas."
    },
    {
        id: 146,
        title: "Ousama Ranking",
        poster: "./assets/images/series/ousma-ranking.jpg",
        year: "2021-2023",
        genre: ["Aventura", "Fantasía", "Drama", "Shonen"],
        seasons: 2,
        studio: "Wit Studio",
        description: "Bojji, un príncipe sordo y débil, sueña con convertirse en el rey más grande a pesar de las burlas. Con la ayuda de su amigo Kage, un sobreviviente de una tribu asesinada, se embarca en un viaje para demostrar su valía."
    },
    {
        id: 147,
        title: "Ragna Crimson",
        poster: "./assets/images/series/ragna-crimson.jpeg",
        year: "2023-2024",
        genre: ["Acción", "Fantasía", "Drama", "Shonen"],
        seasons: 1,
        studio: "SILVER LINK.",
        description: "Ragna jura vengarse de los dragones después de presenciar la destrucción que causan. Viaja al pasado y se une a su yo más joven para eliminar a los dragones antes de que destruyan el mundo."
    },
    {
        id: 148,
        title: "Rurouni Kenshin",
        poster: "./assets/images/series/rurouni-kenshin.jpg",
        year: "1996-1998",
        genre: ["Acción", "Histórico", "Drama", "Shonen"],
        seasons: 1,
        studio: "Studio Gallop / Studio Deen",
        description: "Himura Kenshin, un antiguo asesino conocido como 'Battosai', recorre el Japón Meiji con una espada inversa, jurando nunca más matar mientras protege a los inocentes de su violento pasado."
    },
    {
        id: 149,
        title: "Sakamoto Days",
        poster: "./assets/images/series/sakamoto-days.jpg",
        year: "2025",
        genre: ["Acción", "Comedia", "Shonen", "Recuentos de la vida"],
        seasons: 1,
        studio: "To be announced",
        description: "Taro Sakamoto, el legendario asesino más temido, se retira para llevar una vida pacífica como dueño de una tienda. Pero su pasado lo alcanza cuando antiguos colegas y enemigos vienen a desafiarlo."
    },
    {
        id: 150,
        title: "Ao no Exorcist",
        poster: "./assets/images/series/ao-no-exorcist.jpg",
        year: "2011-2017",
        genre: ["Acción", "Fantasía", "Sobrenatural", "Shonen"],
        seasons: 3,
        studio: "A-1 Pictures",
        description: "Rin Okumura descubre que es hijo de Satanás y decide convertirse en exorcista para derrotar a su padre. Se une a la Academia Verdadera Cruz mientras controla sus poderes demoníacos."
    },
    {
        id: 151,
        title: "Black Clover",
        poster: "./assets/images/series/black-clover.jpg",
        year: "2017-2021",
        genre: ["Acción", "Fantasía", "Aventura", "Shonen"],
        seasons: 4,
        studio: "Studio Pierrot",
        description: "Asta, un niño sin magia en un mundo donde todos la poseen, sueña con convertirse en el Rey Mago. Cuando recibe un raro grimorio de anti-magia, se une a los Toros Negros para alcanzar su objetivo."
    },
    {
        id: 152,
        title: "Bleach: Thousand Year Blood War",
        poster: "./assets/images/series/bleach-thousand-years-blood-war.jpg",
        year: "2022-2026",
        genre: ["Acción", "Fantasía", "Sobrenatural", "Shonen"],
        seasons: 4,
        studio: "Studio Pierrot",
        description: "Ichigo Kurosaki y los Shinigami enfrentan su mayor amenaza: el Imperio Quincy y su líder Yhwach, quien busca destruir el Mundo de las Almas y el Mundo de los Vivos en la guerra final."
    },
    {
        id: 153,
        title: "My Hero Academia",
        poster: "./assets/images/series/boku-no-hero-academia.jpg",
        year: "2016-2025",
        genre: ["Acción", "Superhéroes", "Drama", "Shonen"],
        seasons: 8,
        studio: "Bones",
        description: "Izuku Midoriya, un niño sin poderes en un mundo donde el 80% de la población tiene superpoderes, hereda el poder de All Might y se une a la U.A. High School para convertirse en el próximo símbolo de la paz."
    },
    {
        id: 154,
        title: "Dandadan",
        poster: "./assets/images/series/dadadan.jpeg",
        year: "2024-2025",
        genre: ["Acción", "Comedia", "Sobrenatural", "Ciencia Ficción", "Shonen"],
        seasons: 2,
        studio: "Science SARU",
        description: "Momo Ayase cree en fantasmas pero no en aliens, mientras que Okarun cree en aliens pero no en fantasmas. Juntos investigan lo paranormal y se ven envueltos en batallas contra ambos fenómenos."
    },
    {
        id: 155,
        title: "Death Note",
        poster: "./assets/images/series/death-note.jpg",
        year: "2006-2007",
        genre: ["Misterio", "Psicológico", "Sobrenatural", "Shonen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Light Yagami encuentra un cuaderno que le permite matar a cualquiera cuyo nombre escriba en él. Como 'Kira', busca crear un mundo perfecto, mientras el detective L intenta capturarlo en un duelo de intelectos."
    },
    {
        id: 156,
        title: "Dr. Stone",
        poster: "./assets/images/series/dr-stone.jpg",
        year: "2019-2025",
        genre: ["Ciencia Ficción", "Aventura", "Comedia", "Shonen"],
        seasons: 4,
        studio: "TMS Entertainment",
        description: "Tras 3,700 años de estar petrificados, Senku Ishigami despierta en un mundo primitivo y usa la ciencia para reconstruir la civilización, enfrentándose a quienes prefieren mantener el nuevo statu quo."
    },
    {
        id: 157,
        title: "Dragon Ball",
        poster: "./assets/images/series/dragon-ball.jpg",
        year: "1986-1989",
        genre: ["Aventura", "Artes Marciales", "Comedia", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Goku, un niño con cola de mono y fuerza sobrehumana, se une a Bulma en la búsqueda de las Esferas del Dragón, enfrentándose a villanos y participando en torneos de artes marciales mientras descubre su origen Saiyajin."
    },
    {
        id: 158,
        title: "Dragon Ball Daima",
        poster: "./assets/images/series/dragon-ball-daima.jpg",
        year: "2024",
        genre: ["Aventura", "Acción", "Fantasía", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Goku y sus amigos son transformados en niños por un hechizo misterioso. Deben viajar a un nuevo mundo para recuperar sus cuerpos adultos mientras enfrentan nuevos enemigos y exploran lugares desconocidos."
    },
    {
        id: 159,
        title: "Dragon Ball GT",
        poster: "./assets/images/series/dragon-ball-qt.jpg",
        year: "1996-1997",
        genre: ["Aventura", "Acción", "Ciencia Ficción", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Goku es convertido en niño por las Esferas del Dragón Negras y viaja por el universo con Pan y Trunks para recuperarlas antes de que la Tierra sea destruida."
    },
    {
        id: 160,
        title: "Dragon Ball Super",
        poster: "./assets/images/series/dragon-ball-super.jpg",
        year: "2015-2018",
        genre: ["Acción", "Aventura", "Ciencia Ficción", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Después de derrotar a Majin Buu, Goku y sus amigos protegen la Tierra de nuevas amenazas como los dioses de la destrucción, universos paralelos y el Torneo del Poder que decide el destino de múltiples universos."
    },
    {
        id: 161,
        title: "Dragon Ball Z",
        poster: "./assets/images/series/dragon-ball-z.jpg",
        year: "1989-1996",
        genre: ["Acción", "Aventura", "Ciencia Ficción", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Goku descubre que es un Saiyajin y protege la Tierra de amenazas cada vez más poderosas, incluyendo Saiyajins, Namekianos, androides y criaturas mágicas mientras alcanza nuevas transformaciones."
    },
    {
        id: 162,
        title: "Fairy Tail",
        poster: "./assets/images/series/fairy-tail.jpg",
        year: "2009-2019",
        genre: ["Acción", "Aventura", "Fantasía", "Comedia", "Shonen"],
        seasons: 9,
        studio: "A-1 Pictures / Bridge / CloverWorks",
        description: "Lucy Heartfilia se une al gremio de magos Fairy Tail, donde forma equipo con Natsu Dragneel y Happy. Juntos realizan misiones mientras defienden su gremio y forjan lazos de amistad inquebrantables."
    },
    {
        id: 163,
        title: "Fire Force",
        poster: "./assets/images/series/fire-force.jpg",
        year: "2019-2026",
        genre: ["Acción", "Ciencia Ficción", "Sobrenatural", "Shonen", "Fantasía"],
        seasons: 3,
        studio: "David Production",
        description: "En un mundo donde la combustión espontánea convierte a las personas en llamas, Shinra Kusakabe se une a la Brigada de Bomberos Especial 8 para combatir estas amenazas y descubrir la verdad detrás de su pasado."
    },
    {
        id: 164,
        title: "Frieren: Beyond Journey's End",
        poster: "./assets/images/series/frieren-beyonds-journey.jpg",
        year: "2023-2024",
        genre: ["Fantasía", "Aventura", "Drama", "Shonen"],
        seasons: 1,
        studio: "Madhouse",
        description: "Frieren, una elfa maga que derrotó al Rey Demonio con su grupo de héroes, emprende un nuevo viaje para comprender mejor a la humanidad después de ver cómo el tiempo afecta a sus compañeros mortales."
    },
    {
        id: 165,
        title: "Fullmetal Alchemist: Brotherhood",
        poster: "./assets/images/series/full-metal-alchemist-brotherhood.jpg",
        year: "2009-2010",
        genre: ["Acción", "Aventura", "Drama", "Fantasía", "Shonen"],
        seasons: 1,
        studio: "Bones",
        description: "Los hermanos Edward y Alphonse Elric buscan la Piedra Filosofal para restaurar sus cuerpos después de un fallido intento de resucitar a su madre mediante alquimia, descubriendo una conspiración a nivel nacional."
    },
    {
        id: 166,
        title: "Gachiakuta",
        poster: "./assets/images/series/gachiakuta.jpg",
        year: "2025",
        genre: ["Acción", "Fantasía", "Aventura", "Shonen"],
        seasons: 1,
        studio: "Bones",
        description: "Rudo, un niño acusado de un crimen que no cometió, es desterrado al abismo donde descubre un mundo de basura y debe luchar por su supervivencia usando guantes que le permiten manipular objetos desechados."
    },
    {
        id: 167,
        title: "Gintama",
        poster: "./assets/images/series/gintama.jpg",
        year: "2006-2018",
        genre: ["Comedia", "Acción", "Ciencia Ficción", "Parodia", "Shonen"],
        seasons: 8,
        studio: "Sunrise",
        description: "En un Japón feudal alternativo invadido por aliens, Gintoki Sakata y su grupo realizan trabajos ocasionales mientras se meten en situaciones absurdas, combinando comedia paródica con acción seria."
    },
    {
        id: 168,
        title: "Hokuto no Ken Movies",
        poster: "./assets/images/series/hokuto-no-ken-movies.jpg",
        year: "1986",
        genre: ["Acción", "Película", "Post-apocalíptico", "Shonen"],
        seasons: 1,
        studio: "Toei Animation",
        description: "Adaptación cinematográfica del clásico manga donde Kenshiro recorre la Tierra post-apocalíptica usando su arte marcial mortal Hokuto Shinken para proteger a los inocentes y enfrentar a sus hermanos adoptivos."
    },
    {
        id: 169,
        title: "Hell's Paradise",
        poster: "./assets/images/series/hells-paradise.jpg",
        year: "2023",
        genre: ["Acción", "Fantasía", "Sobrenatural", "Seinen"],
        seasons: 1,
        studio: "MAPPA",
        description: "Gabimaru el Vacío, un ninja asesino legendario, es capturado y condenado a muerte. Se le ofrece una oportunidad de perdón si encuentra el elixir de la vida en una isla misteriosa llena de criaturas sobrenaturales y otros criminales peligrosos."
    },
    {
        id: 170,
        title: "Jujutsu Kaisen 0",
        poster: "./assets/images/series/jujutsu-kaisen-0.jpg",
        year: "2021",
        genre: ["Acción", "Fantasía", "Horror", "Película", "Shonen"],
        parts: 1,
        studio: "MAPPA",
        description: "Yuta Okkotsu es un estudiante de secundaria que está siendo atormentado por el espíritu de su amiga de la infancia Rika. Se une al Colegio Técnico de Jujutsu para controlar su poder y romper la maldición, mientras se enfrenta a una organización que busca liberar a todos los hechiceros malditos."
    },
    {
        id: 171,
        title: "Amnesia",
        poster: "./assets/images/series/amnesia.jpg",
        year: "2013",
        genre: ["Misterio", "Romance", "Drama", "Josei"],
        seasons: 1,
        studio: "Brain's Base",
        description: "Una joven despierta sin memoria de quién es y descubre que está involucrada en un misterioso triángulo amoroso. Debe recuperar sus recuerdos mientras navega relaciones peligrosas y descubre secretos oscuros sobre su pasado."
    },
    {
        id: 172,
        title: "Dance with Devils",
        poster: "./assets/images/series/dance-with-devils.jpg",
        year: "2015",
        genre: ["Fantasía", "Misterio", "Romance", "Musical", "Josei"],
        seasons: 1,
        studio: "Brain's Base",
        description: "Ritsuka Tachibana, una estudiante de secundaria, se ve envuelta en una batalla entre demonios y exorcistas cuando su madre es secuestrada. Los líderes del consejo estudiantil, que en realidad son demonios, compiten por su corazón y un poderoso grimorio que ella posee."
    },
    {
        id: 173,
        title: "Diabolik Lovers",
        poster: "./assets/images/series/diabolik-lovers.jpg",
        year: "2013-2015",
        genre: ["Horror", "Romance", "Josei"],
        seasons: 2,
        studio: "Zexcs",
        description: "Yui Komori es enviada a vivir con la familia Sakamaki, seis hermanos vampiros sádicos y sedientos de sangre. Atrapada en su mansión, debe sobrevivir mientras cada hermano intenta hacerla su propia novia de sangre en esta oscura historia de romance vampírico."
    },
    {
        id: 174,
        title: "Hiiro no Kakera",
        poster: "./assets/images/series/hiiro-no-kakera.jpg",
        year: "2012",
        genre: ["Fantasía", "Romance", "Sobrenatural", "Josei"],
        seasons: 2,
        studio: "Studio Deen",
        description: "Tamaki Kasuga se muda con su abuela a un pequeño pueblo donde descubre que es la descendiente de una princesa con poderes especiales. Debe proteger el Sello que mantiene a raya a los espíritus malignos con la ayuda de cinco guardianes masculinos, cada uno con habilidades únicas."
    },
    {
        id: 175,
        title: "Norn9",
        poster: "./assets/images/series/norn9.jpg",
        year: "2016",
        genre: ["Ciencia Ficción", "Romance", "Fantasía", "Josei"],
        seasons: 1,
        studio: "Telecom Animation Film",
        description: "Tres chicas con poderes especiales y nueve jóvenes viajan a bordo de la nave Norn para completar una misteriosa misión. En este viaje a través del tiempo, cada personaje desarrolla relaciones complejas mientras descubren secretos sobre sus habilidades y el propósito de su viaje."
    },
    {
        id: 176,
        title: "BlazBlue: Alter Memory",
        poster: "./assets/images/series/blazblue-alter-memory.jpg",
        year: "2013",
        genre: ["Acción", "Ciencia Ficción", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "TeamKG / Hoods Entertainment",
        description: "Adaptación del popular juego de lucha que sigue a Ragna the Bloodedge en su búsqueda para destruir el Imperio Novus Orbis Librarium mientras es perseguido por varios individuos y organizaciones que buscan su cabeza."
    },
    {
        id: 177,
        title: "Castlevania",
        poster: "./assets/images/series/castlevania.jpg",
        year: "2017-2021",
        genre: ["Acción", "Horror", "Fantasía", "Videojuegos"],
        seasons: 4,
        studio: "Powerhouse Animation Studios",
        description: "Tras la muerte de su esposa a manos de la Iglesia, el vampiro Vlad Dracula Tepes declara la guerra a la humanidad. Trevor Belmont, el último descendiente de la familia de cazavampiros, se une a la maga Sypha Belnades y al hijo medio vampiro de Dracula, Alucard, para enfrentarse a él."
    },
    {
        id: 178,
        title: "Castlevania: Nocturne",
        poster: "./assets/images/series/castlevania-nocturne.jpg",
        year: "2023",
        genre: ["Acción", "Horror", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "Powerhouse Animation Studios",
        description: "Secuela de Castlevania ambientada durante la Revolución Francesa. Richter Belmont, descendiente de Trevor y Sypha, y la maga Maria Renard se enfrentan a una secta vampírica que planea acabar con la luz del sol y sumir al mundo en la oscuridad eterna."
    },
    {
        id: 179,
        title: "Cyberpunk: Edgerunners",
        poster: "./assets/images/series/cyberpunk-edgerunners.jpg",
        year: "2022",
        genre: ["Ciencia Ficción", "Acción", "Drama", "Videojuegos"],
        seasons: 1,
        studio: "Trigger",
        description: "En la distópica Night City, un joven callejero llamado David Martínez sobrevive tras perder a su madre instalándose un implante militar ilegal. Se une a los Edgerunners, mercenarios fuera de la ley, mientras lucha por mantenerse vivo en una ciudad consumida por la violencia y el ciberware."
    },
    {
        id: 180,
        title: "Danganronpa: The Animation",
        poster: "./assets/images/series/danganronpa-the-animation.jpg",
        year: "2013",
        genre: ["Misterio", "Psicológico", "Suspenso", "Videojuegos"],
        seasons: 1,
        studio: "Lerche",
        description: "Makoto Naegi y otros 14 estudiantes de élite son encerrados en la Academia de la Esperanza por el siniestro Monokuma. Para escapar, deben participar en un juego mortal donde el único modo de salir es asesinar a un compañero sin ser descubierto en el juicio de clase."
    },
    {
        id: 181,
        title: "Devil May Cry (2006)",
        poster: "./assets/images/series/devil-may-cry-2006.jpg",
        year: "2006",
        genre: ["Acción", "Horror", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "Madhouse",
        description: "Dante, un cazador de demonios mitad humano mitad demonio, dirige la agencia 'Devil May Cry'. Junto a su compañera Lady, acepta trabajos para eliminar demonios que amenazan el mundo humano, enfrentándose a poderosos enemigos sobrenaturales."
    },
    {
        id: 182,
        title: "Devil May Cry (2025)",
        poster: "./assets/images/series/devil-may-cry-2025.jpg",
        year: "2025",
        genre: ["Acción", "Horror", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "Studio Mir",
        description: "Nueva adaptación de la franquicia de Devil May Cry que seguirá las aventuras de Dante, Nero y otros personajes icónicos con animación moderna y fidelidad mejorada a los videojuegos. Desarrollada por el renombrado Studio Mir."
    },
    {
        id: 183,
        title: "Fate/stay night: Heaven's Feel",
        poster: "./assets/images/series/fate-stay-night-heavens-feel.jpg",
        year: "2017-2020",
        genre: ["Acción", "Fantasía", "Drama", "Sobrenatural", "Videojuegos"],
        seasons: 3,
        studio: "ufotable",
        description: "Trilogía de películas que adapta la tercera y más oscura ruta del juego visual Fate/stay night. Shirou Emiya se ve envuelto en la Guerra del Santo Grial mientras intenta proteger a Sakura Matou, revelando secretos oscuros sobre su pasado y la verdad detrás de la guerra."
    },
    {
        id: 184,
        title: "Fate/stay night: Unlimited Blade Works",
        poster: "./assets/images/series/fate-stay-night-unlimited-blade-works.jpg",
        year: "2014-2015",
        genre: ["Acción", "Fantasía", "Sobrenatural", "Videojuegos"],
        seasons: 2,
        studio: "ufotable",
        description: "Adaptación de la segunda ruta del juego visual que sigue a Shirou Emiya y Rin Tohsaka mientras participan en la Guerra del Santo Grial. Shirou debe enfrentarse a su ideal de justicia mientras lucha junto a su Servant, Saber, contra otros magos y sus Servants."
    },
    {
        id: 185,
        title: "Fate/Zero",
        poster: "./assets/images/series/fate-zero.jpg",
        year: "2011-2012",
        genre: ["Acción", "Fantasía", "Drama", "Sobrenatural", "Videojuegos"],
        seasons: 2,
        studio: "ufotable",
        description: "Precuela de Fate/stay night que narra la Cuarta Guerra del Santo Grial. Siete magos y sus Servants, espíritus heroicos de leyendas, luchan por el Santo Grial, un artefacto que puede conceder cualquier deseo. La serie explora los oscuros orígenes de la guerra."
    },
    {
        id: 186,
        title: "Final Fantasy: Brotherhood",
        poster: "./assets/images/series/final-fantasy-brotherhood.jpg",
        year: "2016",
        genre: ["Fantasía", "Acción", "Aventura", "Videojuegos"],
        seasons: 1,
        studio: "Square Enix",
        description: "Serie de cortos animados que expanden el universo de Final Fantasy XV, explorando los lazos de amistad entre Noctis y sus compañeros Gladiolus, Ignis y Prompto antes de los eventos principales del juego."
    },
    {
        id: 187,
        title: "God Eater",
        poster: "./assets/images/series/god-eater.jpg",
        year: "2015-2016",
        genre: ["Acción", "Ciencia Ficción", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "ufotable",
        description: "En un mundo post-apocalíptico devastado por monstruos llamados Aragami, la humanidad sobrevive en bases fortificadas. Lenka Utsugi se une a los God Eaters, guerreros que usan armas especiales para devorar a los Aragami y proteger a la humanidad de la extinción."
    },
    {
        id: 188,
        title: "Arcane: League of Legends",
        poster: "./assets/images/series/league-of-legends-arcane.jpg",
        year: "2021-2024",
        genre: ["Acción", "Ciencia Ficción", "Drama", "Fantasía", "Videojuegos"],
        seasons: 2,
        studio: "Fortiche Production",
        description: "Ambientada en el universo de League of Legends, la serie sigue los orígenes de dos legendarias campeonas de Piltover y las tensiones entre estas dos ciudades gemelas. Hermanas separadas por la guerra se convierten en rivales en un conflicto que amenaza con destruir ambas ciudades."
    },
    {
        id: 189,
        title: "NieR:Automata Ver1.1a",
        poster: "./assets/images/series/nier-automata-ver-1-1.jpg",
        year: "2023",
        genre: ["Acción", "Ciencia Ficción", "Drama", "Filosófico", "Videojuegos"],
        seasons: 1,
        studio: "A-1 Pictures",
        description: "Adaptación del aclamado videojuego que sigue a androides de combate 2B, 9S y A2 mientras luchan para recuperar la Tierra de máquinas invasoras creadas por alienígenas. La serie explora temas de existencia, conciencia y humanidad en un mundo post-apocalíptico."
    },
    {
        id: 190,
        title: "Persona 3 The Movie",
        poster: "./assets/images/series/persona-3.jpg",
        year: "2013-2016",
        genre: ["Fantasía", "Drama", "Psicológico", "Sobrenatural", "Videojuegos"],
        seasons: 4,
        studio: "A-1 Pictures",
        description: "Serie de películas que adapta el videojuego Persona 3. Un estudiante de transferencia se une a SEES, un grupo que investiga la Hora Oscura, un tiempo misterioso entre días donde aparecen sombras que amenazan a la humanidad, usando sus Personas para luchar."
    },
    {
        id: 191,
        title: "Persona 4: The Animation",
        poster: "./assets/images/series/persona-4.jpg",
        year: "2011-2012",
        genre: ["Misterio", "Fantasía", "Sobrenatural", "Videojuegos"],
        seasons: 1,
        studio: "A-1 Pictures",
        description: "Yu Narukami se muda al pueblo de Inaba y forma equipo con nuevos amigos para investigar una serie de misteriosos asesinatos relacionados con un mundo dentro de los televisores. Deben usar sus Personas para resolver el caso antes de que más víctimas caigan."
    },
    {
        id: 192,
        title: "Persona 5: The Animation",
        poster: "./assets/images/series/persona-5.jpg",
        year: "2018",
        genre: ["Acción", "Fantasía", "Misterio", "Videojuegos"],
        seasons: 1,
        studio: "CloverWorks",
        description: "Ren Amamiya, un estudiante transferido con un récord criminal, forma los Phantom Thieves, un grupo que puede entrar en el Metaverso para cambiar los corazones corruptos de adultos malvados. Luchan por la justicia mientras equilibran su vida escolar y sus identidades secretas."
    },
    {
        id: 193,
        title: "Scarlet Nexus",
        poster: "./assets/images/series/scarlet-nexus.jpg",
        year: "2021",
        genre: ["Acción", "Ciencia Ficción", "Fantasía", "Videojuegos"],
        seasons: 1,
        studio: "Sunrise",
        description: "En un futuro donde la humanidad desarrolla poderes psiónicos, Yuito Sumeragi y Kasane Randall se unen a la Organización de Supresión de Otros para proteger a la humanidad de los Otros, criaturas que descienden de la Floristalaxia y son atraídas por los cerebros humanos."
    },
    {
        id: 194,
        title: "Jurassic World Saga",
        poster: "./assets/images/series/jurassic-world.jpg",
        year: "2015-2022",
        genre: ["Ciencia Ficción", "Aventura", "Acción", "Película"],
        seasons: 1,
        parts: 6,
        studio: "Universal Pictures",
        description: "La saga de Jurassic World continúa la historia del parque temático de dinosaurios, explorando las consecuencias de revivir criaturas prehistóricas en el mundo moderno. Desde la reapertura del parque hasta la coexistencia global con dinosaurios, la franquicia combina acción, aventura y preguntas éticas sobre la ingeniería genética."
    },
    {
        id: 195,
        title: "Harry Potter Film Series",
        poster: "./assets/images/series/harry-potter-films.jpg", 
        year: "2001-2011",
        genre: ["Fantasía", "Aventura", "Drama", "Película"],
        seasons: 1,
        parts: 8,
        studio: "Warner Bros. Pictures",
        description: "La épica adaptación cinematográfica de la serie de libros de J.K. Rowling. Sigue el viaje de Harry Potter, un joven mago que descubre su legado y se enfrenta al oscuro mago Lord Voldemort. A lo largo de 8 películas, Harry y sus amigos Hermione y Ron crecen mientras enfrentan peligros, descubren secretos y luchan por el mundo mágico en el Colegio Hogwarts de Magia y Hechicería."
    },
    {
        id: 196, 
        title: "The Dark Knight Trilogy",
        poster: "./assets/images/series/batman-the-dark-knight.jpg",
        year: "2005-2012",
        genre: ["Acción", "Drama", "Película", "Superhéroes"],
        seasons: 1,
        parts: 3,
        studio: "Warner Bros. Pictures",
        description: "La aclamada trilogía de Christopher Nolan que reinventa al Caballero de la Noche. Bruce Wayne regresa a Gotham City para convertirse en Batman y enfrentar criminales como Ra's al Ghul, el Joker y Bane. Una visión realista y oscura del superhéroe que explora temas de justicia, caos y redención en una ciudad corrupta que necesita un guardián."
    },
    {
        id: 207,
        title: "Alien Saga",
        poster: "./assets/images/series/alien-saga.jpg",
        year: "1979-2017",
        genre: ["Ciencia Ficción", "Horror", "Thriller", "Película"],
        seasons: 1,
        parts: 8,
        studio: "20th Century Studios",
        description: "La icónica saga de ciencia ficción y horror que sigue la lucha de la humanidad contra la letal especie Xenomorfo. Desde el terror claustrofóbico en la nave Nostromo hasta las batallas interestelares, la franquicia explora temas de supervivencia, corporaciones malvadas y la naturaleza del miedo en el espacio profundo."
    },
    {
        id: 208,
        title: "Avatar Saga",
        poster: "./assets/images/series/avatar.jpg",
        year: "2009-presente",
        genre: ["Ciencia Ficción", "Aventura", "Fantasía", "Película"],
        seasons: 1,
        parts: 5,
        studio: "20th Century Studios",
        description: "La épica saga cinematográfica que transporta al espectador al mundo alienígena de Pandora. Sigue la historia de Jake Sully, un marine que se une al pueblo Na'vi y se convierte en parte de su lucha para proteger su hogar de la destrucción humana. Una experiencia visual revolucionaria sobre ecología, colonialismo y conexión espiritual."
    },
    {
        id: 209,
        title: "Cloverfield Saga",
        poster: "./assets/images/series/cloverfield.jpg",
        year: "2008-2018",
        genre: ["Ciencia Ficción", "Horror", "Found Footage", "Película"],
        seasons: 1,
        parts: 3,
        studio: "Bad Robot Productions",
        description: "Saga de películas de ciencia ficción y horror conectadas a través de un universo compartido pero con narrativas independientes. Desde el ataque de un monstruo gigante en Nueva York hasta experimentos dimensionales y apocalipsis espaciales, cada película ofrece una perspectiva única sobre eventos catastróficos a través del estilo found footage."
    },
    {
        id: 210,
        title: "Monsterverse",
        poster: "./assets/images/series/monsterverse.jpg",
        year: "2014-presente",
        genre: ["Ciencia Ficción", "Acción", "Película", "Monstruos"],
        seasons: 1,
        parts: 6,
        studio: "Legendary Pictures",
        description: "El universo cinematográfico que reúne a los titanes más icónicos de Toho y crea nuevas leyendas. Godzilla, Kong y otras criaturas titánicas luchan por el dominio mientras la humanidad intenta sobrevivir en un mundo donde los dioses caminan entre nosotros. Una épica batalla por el equilibrio natural del planeta."
    },
    {
        id: 211,
        title: "Predator Saga",
        poster: "./assets/images/series/predator-saga.jpg",
        year: "1987-presente",
        genre: ["Ciencia Ficción", "Acción", "Horror", "Película"],
        seasons: 1,
        parts: 7,
        studio: "20th Century Studios",
        description: "La brutal saga de caza intergaláctica sigue a los Yautja, una raza alienígena que visita la Tierra para cazar a las especies más peligrosas como trofeo. Desde las junglas de Centroamérica hasta el espacio exterior, humanos y depredadores se enfrentan en batallas de ingenio, fuerza y supervivencia."
    },
    {
        id: 212,
        title: "Rocky Saga",
        poster: "./assets/images/series/rocky.jpg",
        year: "1976-2018",
        genre: ["Drama", "Deporte", "Acción", "Película"],
        seasons: 1,
        parts: 9,
        studio: "Metro-Goldwyn-Mayer",
        description: "La inspiradora saga boxística que sigue la vida de Rocky Balboa, desde su humilde comienzo como matón de Philadelphia hasta convertirse en campeón mundial y leyenda. Una historia sobre perseverancia, amor, amistad y la lucha por alcanzar los sueños contra todo pronóstico."
    },
    {
        id: 213,
        title: "Spider-Man Sam Raimi Trilogy",
        poster: "./assets/images/series/spider-man-sam-raimi.jpg",
        year: "2002-2007",
        genre: ["Acción", "Superhéroes", "Drama", "Película"],
        seasons: 1,
        parts: 3,
        studio: "Columbia Pictures",
        description: "La trilogía dirigida por Sam Raimi que definió al Spider-Man moderno. Tobey Maguire interpreta a Peter Parker en su viaje para equilibrar la vida como estudiante, fotógrafo y superhéroe mientras enfrenta villanos icónicos como el Duende Verde, Doctor Octopus y Venom."
    },
    {
        id: 214,
        title: "The Amazing Spider-Man Saga",
        poster: "./assets/images/series/the-amazing-spider-man.jpg",
        year: "2012-2014",
        genre: ["Acción", "Superhéroes", "Ciencia Ficción", "Película"],
        seasons: 1,
        parts: 2,
        studio: "Columbia Pictures",
        description: "El reinicio de la franquicia Spider-Man con Andrew Garfield como el trepamuros. Explora los orígenes del héroe con un enfoque moderno, profundizando en el misterio de la desaparición de sus padres y presentando una relación más desarrollada con Gwen Stacy."
    },
    {
        id: 215,
        title: "Fantastic Four Saga",
        poster: "./assets/images/series/the-fanstastic-four.jpg",
        year: "2005-2007",
        genre: ["Ciencia Ficción", "Superhéroes", "Aventura", "Película"],
        seasons: 1,
        parts: 4,
        studio: "20th Century Studios",
        description: "La saga del primer equipo de superhéroes de Marvel Comics. Cuatro astronautas que adquieren poderes extraordinarios tras una exposición a rayos cósmicos deben aprender a trabajar juntos como familia mientras protegen al mundo de amenazas cósmicas y dimensionales."
    },
    {
        id: 216,
        title: "The Lord of the Rings Saga",
        poster: "./assets/images/series/the-lord-of-the-rings.jpg",
        year: "2001-2003",
        genre: ["Fantasía", "Aventura", "Película"],
        seasons: 1,
        parts: 3,
        studio: "New Line Cinema",
        description: "La épica adaptación cinematográfica de la obra maestra de J.R.R. Tolkien. Sigue la misión del hobbit Frodo Baggins para destruir el Anillo Único en los fuegos del Monte del Destino, mientras ejércitos se movilizan para la guerra en la Tierra Media. Una obra maestra del cine fantástico."
    },
    {
        id: 217,
        title: "Transformers Saga",
        poster: "./assets/images/series/transformers.jpg",
        year: "2007-presente",
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Película"],
        seasons: 1,
        parts: 8,
        studio: "Paramount Pictures",
        description: "La espectacular saga de robots alienígenas que pueden transformarse en vehículos. La guerra milenaria entre los Autobots y Decepticons llega a la Tierra, donde humanos comunes se ven envueltos en una batalla cósmica por la supervivencia y el control de los recursos del planeta."
    },
    {
        id: 218,
        title: "X-Men Saga",
        poster: "./assets/images/series/x-men-2.jpg",
        year: "2000-2020",
        genre: ["Ciencia Ficción", "Superhéroes", "Acción", "Película"],
        seasons: 1,
        parts: 13,
        studio: "20th Century Studios",
        description: "El extenso universo cinematográfico de los mutantes de Marvel. Sigue a los X-Men, un grupo de humanos evolucionados con habilidades sobrenaturales, en su lucha por la coexistencia pacífica entre mutantes y humanos, mientras enfrentan amenazas como Magneto y la Hermandad de Mutantes."
    },
    {
        id: 219,
        title: "X-Men: First Class Era",
        poster: "./assets/images/series/x-men-first.jpg",
        year: "2011-2019",
        genre: ["Ciencia Ficción", "Superhéroes", "Drama", "Película"],
        seasons: 1,
        parts: 4,
        studio: "20th Century Studios",
        description: "La línea temporal reinventada de X-Men que explora los orígenes del equipo y las complejas relaciones entre el Profesor X y Magneto en los años 60-90. Una mirada fresca al universo mutante con un elenco renovado y narrativas que redefinen el destino de los personajes."
    },
    {
        id: 220,
        title: "UCM - Fase 1: La Era de los Vengadores",
        poster: "./assets/images/series/ucm-fase-1.jpg",
        year: "2008-2012", 
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Superhéroes", "Película"],
        seasons: 1,
        parts: 6,
        studio: "Marvel Studios",
        description: "La Fase 1 del Universo Cinematográfico de Marvel establece los cimientos del universo compartido más grande del cine. Comenzando con 'Iron Man' en 2008, esta saga introduce a los héroes fundamentales: Tony Stark como Iron Man, Bruce Banner como Hulk, Thor el Dios del Trueno, y Steve Rogers como Capitán América. La fase culmina con 'The Avengers', donde Nick Fury reúne a estos héroes para formar el primer equipo de superhéroes y enfrentar la amenaza de Loki y los Chitauri. Una masterclass en construcción de universo cinematográfico que revolucionó la industria del cine."
    },
    {
        id: 221,
        title: "UCM - Fase 2: La Era de Ultrón",
        poster: "./assets/images/series/ucm-fase-2.jpg", 
        year: "2013-2015",
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Superhéroes", "Película"],
        seasons: 1,
        parts: 6,
        studio: "Marvel Studios", 
        description: "La Fase 2 expande el Universo Cinematográfico de Marvel explorando las consecuencias de los eventos de Nueva York. Los héroes enfrentan nuevas amenazas mientras lidian con sus propios demonios: Tony Stark con el síndrome de estrés post-traumático, Steve Rogers adaptándose al mundo moderno, y Thor protegiendo los Nueve Reinos. La fase introduce a los Guardianes de la Galaxia, expandiendo el universo al cosmos, y culmina con 'Avengers: Age of Ultron', donde la inteligencia artificial creada para proteger la Tierra se convierte en su mayor amenaza. Una fase que profundiza en el desarrollo de personajes mientras prepara el escenario para el infinito."
    },
    {
        id: 222,
        title: "UCM - Fase 3: La Saga del Infinito", 
        poster: "./assets/images/series/ucm-fase-3.jpg",
        year: "2016-2019",
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Superhéroes", "Película"],
        seasons: 1,
        parts: 11,
        studio: "Marvel Studios",
        description: "La Fase 3 del Universo Cinematográfico de Marvel representa la culminación épica de 11 años de narrativa interconectada. Comenzando con la fractura de los Vengadores en 'Civil War', esta fase expande el universo introduciendo nuevos héroes como Black Panther, Spider-Man y Doctor Strange, mientras desarrolla arcos emocionales profundos para personajes establecidos. La saga alcanza su punto culminante con 'Avengers: Infinity War' y 'Avengers: Endgame', donde los héroes se enfrentan a Thanos en la batalla definitiva por el destino del universo. Una obra maestra de storytelling cinematográfico que redefine lo posible en el cine de superhéroes, combinando acción espectacular con profundidad emocional y consecuencias permanentes."
    },
    {
        id: 223,
        title: "UCM - Fase 4: El Multiverso Se Abre",
        poster: "./assets/images/series/ucm-fase-4.jpg",
        year: "2021-2022", 
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Superhéroes", "Película"],
        seasons: 1,
        parts: 6,
        studio: "Marvel Studios",
        description: "La Fase 4 marca el comienzo de una nueva era para el Universo Cinematográfico de Marvel, explorando las consecuencias de 'Avengers: Endgame' y abriendo las puertas del multiverso. Esta fase introduce nuevos héroes como Shang-Chi y los Eternales, mientras profundiza en el legado de personajes establecidos. Con 'Spider-Man: No Way Home' rompiendo las barreras dimensionales y 'Doctor Strange en el Multiverso de la Locura' explorando realidades alternativas, el UCM se expande de maneras nunca antes imaginadas. Una fase de transición que establece las bases para futuras sagas mientras honra el pasado, combinando historias íntimas con conceptos cósmicos monumentales."
    },
    {
        id: 224,
        title: "UCM - Fase 5: La Saga del Multiverso",
        poster: "./assets/images/series/ucm-fase-5.jpg",
        year: "2023-2025", 
        genre: ["Ciencia Ficción", "Acción", "Aventura", "Superhéroes", "Película"],
        seasons: 1,
        parts: 6,
        studio: "Marvel Studios",
        description: "La Fase 5 acelera la narrativa del Multiverso mientras introduce el próximo gran antagonista: Kang el Conquistador. Comenzando con 'Ant-Man and the Wasp: Quantumania' que presenta oficialmente la amenaza multiversal, esta fase explora los límites de la realidad y las consecuencias de alterar las líneas temporales. Con el emocionante cierre de los Guardianes de la Galaxia, la llegada altamente anticipada de Deadpool al UCM, y el renacimiento del Capitán América, la Fase 5 mezcla conclusiones emotivas con nuevos comienzos épicos. Una fase que construye directamente hacia 'Avengers: The Kang Dynasty' y 'Secret Wars', prometiendo ser una de las más ambiciosas del universo cinematográfico."
    },
    // 🐭 CHI RUAN
{
    id: 225,
    title: "Chiruan",
    poster: "./assets/images/series/chiruan.jpg",
    year: "2016",
    genre: ["Comedia", "Parodia", "Histórico"],
    seasons: 1,
    studio: "LandQ studios",
    description: "Basada en el Manga del mismo Nombre(comparte universo con Shuumatsu no Valkyrie), basada en el grupo del Shinsegumi que ellos aparecen en la 10ma Ronda de Shuumatsu no Valkyrie , especialmente su líder y representante Okita Souji."
},

// 🐟 BANANA FISH
{
    id: 226,
    title: "Banana Fish",
    poster: "./assets/images/series/banana-fish.jpg",
    year: "2018",
    genre: ["Acción", "Drama", "Crimen", "Shoujo", "Suspenso"],
    seasons: 1,
    studio: "MAPPA",
    description: "Una intensa y emocional historia de crimen y redención ambientada en Nueva York. Ash Lynx, un joven y carismático líder de pandillas, investiga el misterio detrás de 'Banana Fish', una droga que llevó a su hermano mayor a la locura. Cuando conoce a Eiji Okumura, un fotógrafo japonés, su vida da un giro inesperado. La serie explora temas oscuros como el crimen organizado, la corrupción política y el trauma, mientras desarrolla una profunda conexión entre sus protagonistas."
},

// 🌌 HEROIC AGE
{
    id: 227,
    title: "Heroic Age",
    poster: "./assets/images/series/heroic-age.jpg",
    year: "2007",
    genre: ["Ciencia Ficción", "Mecha", "Aventura", "Espacial", "Shonen"],
    seasons: 1,
    studio: "Xebec",
    description: "En un futuro lejano, la humanidad vive al borde de la extinción, acosada por razas alienígenas superiores. La princesa Deianeira busca al héroe legendario que puede salvar a la humanidad según una antigua profecía. Encuentra a Age, un joven salvaje con increíbles poderes que puede pilotar poderosas unidades de combate. Juntos emprenden un épico viaje interestelar para cumplir la profecía y asegurar el futuro de la humanidad en una galaxia llena de peligros."
},

// 🚀 TENGEN TOPPA GURREN LAGANN
{
    id: 228,
    title: "Tengen Toppa Gurren Lagann",
    poster: "./assets/images/series/gurren-lagann.jpg",
    year: "2007",
    genre: ["Mecha", "Acción", "Ciencia Ficción", "Aventura", "Shonen"],
    seasons: 1,
    studio: "Gainax",
    description: "¡¡PERFORA EL CIELO CON TU DRILL!! En un futuro donde la humanidad vive bajo tierra, Simon y Kamina descubren un misterioso mecha y emergen a la superficie. Lo que comienza como una simple aventura se convierte en una épica batalla por la supervivencia humana contra el tiránico Lord Genome. Con mechas que se combinan en formas cada vez más grandes y poderosas, la serie lleva el concepto de 'sobrepasar límites' a extremos cósmicos. Una obra maestra sobre perseverancia, amistad y creer en lo imposible."
},

// 🐺 BEASTARS
{
    id: 229,
    title: "Beastars",
    poster: "./assets/images/series/beastars.jpg",
    year: "2019-2021",
    genre: ["Drama", "Psicológico", "Recuentos de la vida", "Seinen", "Misterio"],
    seasons: 2,
    studio: "Orange",
    description: "En un mundo de animales antropomórficos donde carnívoros y herbívoros coexisten en una sociedad tensa, Legoshi, un lobo gris alto y tímido, lucha con sus instintos depredadores. Cuando ocurre un asesinato en su escuela, se ve envuelto en una compleja red de relaciones inter-especies, prejuicios y deseos prohibidos. La serie explora profundamente temas de identidad, instinto vs. civilización, y las complejidades de la convivencia en una sociedad dividida por diferencias biológicas."
},
// 🌟 FUMETSU NO ANATA E (TO YOUR ETERNITY)
{
    id: 230,
    title: "Fumetsu no Anata e",
    poster: "./assets/images/series/fumetsu-no-anata-e.jpg",
    year: "2021-2023",
    genre: ["Drama", "Fantasía", "Aventura", "Psicológico", "Seinen"],
    seasons: 2,
    studio: "Brain's Base",
    description: "Una conmovedora y profunda exploración de la existencia humana a través de los ojos de un ser inmortal. Comenzando como una esfera, luego una roca, un lobo y finalmente adoptando forma humana, 'Fushi' es una entidad misteriosa enviada a la Tierra que puede tomar la forma de cualquier cosa que lo haya impactado emocionalmente. A través de sus encuentros con humanos, Fushi experimenta el amor, la pérdida, la alegría y el dolor, mientras descubre el verdadero significado de la vida y la mortalidad. Una obra maestra emocional que cuestiona qué nos hace humanos."
}
];

// ✅ SISTEMA DE NOTICIAS CON DATOS REALES (MANTENIDO)
const noticiasData = [
      {
        id: 1,
        titulo: "Invencible Temporada 4 Confirmada para 2026",
        tipo: "noticia",
        imagen: "./assets/images/noticias/invincible-season-4-Return.jpg",
        resumen: "Mark Grayson regresa con más acción y dilemas cósmicos en la nueva temporada programada para 2026",
        contenido: `Amazon Prime Video ha confirmado oficialmente el renovado de Invencible para una cuarta temporada, programada para estrenarse en 2026.

La nueva temporada continuará adaptando el aclamado cómic de Robert Kirkman, Cory Walker y Ryan Ottley, explorando las consecuencias de los eventos de la temporada 3 y el desarrollo de Mark Grayson como el héroe que debe equilibrar su vida personal con sus responsabilidades cósmicas.

"Estamos emocionados de llevar a los fans más profundamente en el universo de Invencible", declaró Kirkman. "La temporada 4 explorará territorios que cambiarán fundamentalmente a nuestros personajes y el mundo que habitan".

La producción mantendrá el elenco principal de voces, incluyendo a Steven Yeun como Mark Grayson/Invencible, J.K. Simmons como Nolan Grayson/Omni-Man y Sandra Oh como Debbie Grayson.`,
        videoId: null,
        fecha: "2025-01-15",
        seriesRelacionadas: [126],
        destacada: true,
        vistas: 0
    },
    {
    id: 2,
    titulo: "¡La Leyenda Cobra Vida! 'Steel Ball Run' Confirmada como Serie Anime Oficial",
    tipo: "noticia", 
    imagen: "./assets/images/noticias/steel-ball-run-anuncio.jpg",
    resumen: "Warner Bros. Japan y David Production anuncian oficialmente la adaptación al anime de JoJo's Bizarre Adventure: Steel Ball Run.",
    contenido: `Tokio, Japón – Warner Bros. Japan y David Production han confirmado oficialmente la adaptación al anime de JoJo's Bizarre Adventure: Steel Ball Run, la aclamada Parte 7 del manga de Hirohiko Araki.

La serie marcará un nuevo comienzo en el universo JoJo, transportándonos al año 1890 en una Norteamérica salvaje durante la carrera ecuestre "Steel Ball Run". Los protagonistas, Johnny Joestar y Gyro Zeppeli, se embarcarán en una épica aventura que involucra partes del cadáver de un santo con poderes sobrenaturales.

El anuncio incluyó un teaser tráiler que muestra los vastos paisajes desérticos y el sistema de poderes "Spin" que reemplaza a los Hamon. La producción enfrenta el desafío de adaptar las complejas batallas con Stands y las escenas de carrera ecuestre, considerándose un formato de temporadas largas para respetar los 24 volúmenes del manga original.

La noticia ha generado euforia en redes sociales, con fans celebrando este anuncio largamente esperado que promete ser una de las experiencias anime más ambiciosas de los próximos años.`,
    videoId: null,
    fecha: "2025-01-20",
    seriesRelacionadas: [21],
    destacada: true,
    vistas: 0
},
{
    id: 3,
    titulo: "Baki-Dou Llegará a Netflix en 2026 con Miyamoto Musashi como Nuevo Rival",
    tipo: "noticia", 
    imagen: "./assets/images/noticias/baki-dou-netflix.jpg",
    resumen: "La nueva temporada Baki-Dou se estrenará en Netflix en 2026, presentando al legendario espadachín Miyamoto Musashi como el nuevo antagonista.",
    contenido: `Netflix ha confirmado oficialmente que Baki-Dou llegará a su plataforma en 2026, continuando la épica saga de artes marciales tras la gran pelea entre Baki Hanma y su padre Yujiro.

La nueva temporada, producida una vez más por TMS Entertainment, introducirá a uno de los antagonistas más esperados: Miyamoto Musashi. El legendario espadachín japonés será revivido a través de un proceso de clonación utilizando tejido de su espina dorsal, infundido con su alma y recuerdos originales.

**La Trama: Un Guerrero Legendario en la Era Moderna**

Tras la conclusión de la batalla padre-hijo, Baki y los demás luchadores enfrentan un vacío y aburrimiento insoportable. Esta paz se rompe cuando Musashi es liberado en el mundo moderno, representando una amenaza letal que desafiará a los combatientes más fuertes del planeta.

El encuentro entre las técnicas de lucha modernas y el estilo de espada mortal de Musashi promete algunas de las batallas más intensas y sangrientas de la franquicia hasta la fecha.

Los fans pueden esperar la misma acción brutal y sobrehumana que caracteriza a la serie, ahora con el añadido de un rival histórico que pondrá a prueba los límites de todos los luchadores.`,
    videoId: null,
    fecha: "2025-01-20",
    seriesRelacionadas: [6], // ID de Baki
    destacada: true,
    vistas: 0
},
{
    id: 4,
    titulo: "Jujutsu Kaisen Temporada 3 Confirmada para Enero 2026: Adaptará el Arco 'Culling Game'",
    tipo: "noticia", 
    imagen: "./assets/images/noticias/jujutsu-kaisen-season-3.jpg",
    resumen: "La tercera temporada de Jujutsu Kaisen se estrenará en enero de 2026 y adaptará el intenso arco del 'Juego de la Exterminación'.",
    contenido: `Studio MAPPA ha confirmado oficialmente que la tercera temporada de Jujutsu Kaisen se estrenará en enero de 2026, adaptando el esperado arco del "Culling Game" (Juego de la Exterminación).

La producción ya está en marcha, con los actores de voz grabando sus diálogos. La temporada cubrirá los arcos "Exterminio de Itadori", "Preparación Perfecta" y el inicio del "Culling Game".

**Tras los Eventos de Shibuya**

La trama continúa después del devastador Incidente de Shibuya: con Satoru Gojo sellado y los hechiceros diezmados, el villano Kenjaku inicia un mortal battle royale que se desarrolla en múltiples colonias por todo Japón.

Yuji Itadori y Megumi Fushiguro se adentran en el juego para rescatar a Tsumiki, mientras Yuta Okkotsu regresa con la misión de ejecutar a Yuji, pero también para ayudar a liberar a Gojo con la ayuda de Hana Kurusu, poseída por el antiguo hechicero "Ángel".

**Avance en Cines**

Los fans podrán ver un adelanto en noviembre de 2025 con el lanzamiento de una película de compilación que incluirá los dos primeros episodios de la temporada 3.`,
    videoId: null,
    fecha: "2025-01-20",
    seriesRelacionadas: [135], // ID de Jujutsu Kaisen
    destacada: true,
    vistas: 0
}
];

// DIAGNÓSTICO - Verificar que data.js se carga correctamente
console.log('✅ data.js cargado correctamente');
console.log('📺 Series cargadas:', seriesData.length);
console.log('📰 Noticias cargadas:', noticiasData.length);