import { CompendiumCondition } from '../../schema/wiki/compendium/compendium-condition.schema';

// Los catorce estados de la wiki. Los textos (nombre, etiqueta, descripción,
// viñetas y la tabla del Agotamiento) son copia literal de
// src/app/pages/wiki/pages/compendium/rules/game-rules-data.ts del front, de
// Thu1 y Adrián: no se reescriben aquí. Lo único nuestro es `mechanics`.
//
// Asustado, Influenciado y Oculto llevan `mechanics` vacío a propósito:
// dependen de la posición y de la línea de visión, y la ficha no sabe eso. Se
// marcan y se leen, pero no restan solos. Agarrado, igual, salvo la Velocidad
// 0, que es plana: la Desventaja al atacar a otros depende de a quién atacas.
//
// La ficha aplica los campos que tocan las tiradas del jugador (speedZero,
// las Desventajas propias, autoFailStrDexSaves) y enseña sin aplicarlos los
// del máster y los que dependen de la prueba (ver el schema).
//
// Tampoco tienen campo «No puedes hablar» (Incapacitado) ni «Sueltas los
// objetos que sostienes» (Inconsciente): la ficha no aplica ninguna de las
// dos, y un campo que nadie lee parece aplicado y no lo está.
export const DEFAULT_CONDITIONS: Partial<CompendiumCondition>[] = [
  {
    slug: 'agarrado',
    name: 'Agarrado',
    category: 'FISICO',
    badge: 'Velocidad 0',
    icon: 'front_hand',
    description:
      'Estás sujeto físicamente por una criatura o un elemento que limita tu movimiento.',
    effects: [
      'Tu Velocidad es 0 y no puede aumentar por ningún medio.',
      'Tienes Desventaja en las tiradas de ataque contra criaturas distintas de quien te agarra.',
      'La criatura que te agarra puede arrastrarte o transportarte. Cada pie recorrido le cuesta 2 pies de movimiento.',
      'Liberarse: Puedes utilizar tu Acción para realizar una prueba de Fuerza (Atletismo) o Destreza (Acrobacias) contra la CD del agarre. La condición también termina si quien te agarra queda Incapacitado o si dejas de estar a su alcance.',
    ],
    mechanics: {
      speedZero: true,
    },
    isDefault: true,
  },
  {
    slug: 'agotamiento',
    name: 'Agotamiento',
    category: 'FISICO',
    badge: '1 a 6 Niveles',
    icon: 'battery_alert',
    description:
      'El Agotamiento representa el deterioro físico y mental provocado por heridas, esfuerzos extremos, falta de descanso u otras circunstancias.',
    effects: [
      'Niveles de Agotamiento: Una criatura puede acumular hasta 6 niveles. Cada nivel impone una penalización acumulativa de −1 a todas sus Pruebas de d20 y reduce su Velocidad en 5 pies.',
      'Muerte por Agotamiento: Una criatura que alcanza 6 niveles de Agotamiento muere de forma automática.',
      'Recuperación: Al finalizar un Descanso Largo, reduces tu nivel de Agotamiento en 1. Los Descansos Cortos no reducen el Agotamiento.',
      'Agotamiento por Heridas: Cuando una criatura reducida a 0 Puntos de Golpe queda estable o recupera al menos 1 Punto de Golpe, obtiene 1 nivel de Agotamiento. Una misma caída a 0 Puntos de Golpe solo puede provocar un nivel de Agotamiento, aunque la criatura se estabilice y posteriormente recupere la consciencia.',
    ],
    table: {
      headers: [
        'Nivel de Agotamiento',
        'Penalizador a Pruebas d20',
        'Reducción de Velocidad',
      ],
      rows: [
        ['Nivel 1', '−1 a todas las pruebas de d20', '−5 pies'],
        ['Nivel 2', '−2 a todas las pruebas de d20', '−10 pies'],
        ['Nivel 3', '−3 a todas las pruebas de d20', '−15 pies'],
        ['Nivel 4', '−4 a todas las pruebas de d20', '−20 pies'],
        ['Nivel 5', '−5 a todas las pruebas de d20', '−25 pies'],
        ['Nivel 6', 'Muerte Inmediata de la criatura', '—'],
      ],
    },
    mechanics: {
      levels: [
        {
          level: 1,
          d20Modifier: -1,
          speedModifier: -5,
        },
        {
          level: 2,
          d20Modifier: -2,
          speedModifier: -10,
        },
        {
          level: 3,
          d20Modifier: -3,
          speedModifier: -15,
        },
        {
          level: 4,
          d20Modifier: -4,
          speedModifier: -20,
        },
        {
          level: 5,
          d20Modifier: -5,
          speedModifier: -25,
        },
        {
          level: 6,
          death: true,
        },
      ],
    },
    isDefault: true,
  },
  {
    slug: 'asustado',
    name: 'Asustado',
    category: 'SENSORIAL',
    badge: 'Desventaja al ver la fuente',
    icon: 'psychology_alt',
    description: 'Experimentas un miedo intenso hacia una amenaza concreta.',
    effects: [
      'Tienes Desventaja en las pruebas de característica y tiradas de ataque mientras puedas ver la fuente de tu miedo.',
      'No puedes acercarte voluntariamente a la fuente de tu miedo.',
    ],
    mechanics: {},
    isDefault: true,
  },
  {
    slug: 'aturdido',
    name: 'Aturdido',
    category: 'INCAPACITANTE',
    badge: 'Incapacitado · Vel 0',
    icon: 'flare',
    description: 'Te encuentras temporalmente desorientado o conmocionado.',
    effects: [
      'Estás Incapacitado.',
      'Tu Velocidad es 0.',
      'Fallas automáticamente las Tiradas de Salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen Ventaja.',
    ],
    mechanics: {
      implies: ['incapacitado'],
      speedZero: true,
      autoFailStrDexSaves: true,
      advantageForAttackersAgainstYou: true,
    },
    isDefault: true,
  },
  {
    slug: 'cegado',
    name: 'Cegado',
    category: 'SENSORIAL',
    badge: 'Desventaja Ataque · Falla Visión',
    icon: 'visibility_off',
    description:
      'No puedes utilizar la vista debido a una lesión, oscuridad u otra circunstancia.',
    effects: [
      'Fallas automáticamente las pruebas de característica que requieran visión.',
      'Tus tiradas de ataque tienen Desventaja.',
      'Las tiradas de ataque contra ti tienen Ventaja.',
    ],
    mechanics: {
      autoFailSightChecks: true,
      disadvantageOnAttacks: true,
      advantageForAttackersAgainstYou: true,
    },
    isDefault: true,
  },
  {
    slug: 'derribado',
    name: 'Derribado',
    category: 'FISICO',
    badge: 'En el Suelo',
    icon: 'airline_seat_flat',
    description: 'Has perdido el equilibrio y te encuentras en el suelo.',
    effects: [
      'Solo puedes desplazarte arrastrándote o levantarte.',
      'Levantarte cuesta una cantidad de movimiento igual a la mitad de tu Velocidad, redondeada hacia abajo. No puedes hacerlo si tu Velocidad es 0.',
      'Tus tiradas de ataque tienen Desventaja.',
      'Las tiradas de ataque contra ti tienen Ventaja si el atacante está a 5 pies o menos de ti. Si está a más de 5 pies, los ataques tienen Desventaja.',
    ],
    mechanics: {
      disadvantageOnAttacks: true,
      advantageForAttackersWithin5ft: true,
      disadvantageForAttackersBeyond5ft: true,
    },
    isDefault: true,
  },
  {
    slug: 'ensordecido',
    name: 'Ensordecido',
    category: 'SENSORIAL',
    badge: 'Falla Audición',
    icon: 'hearing_disabled',
    description:
      'No puedes oír debido a una lesión, un ruido intenso u otra circunstancia.',
    effects: [
      'Fallas automáticamente las pruebas de característica que requieran audición.',
    ],
    mechanics: {
      autoFailHearingChecks: true,
    },
    isDefault: true,
  },
  {
    slug: 'envenenado',
    name: 'Envenenado',
    category: 'FISICO',
    badge: 'Desventaja Ataque y Pruebas',
    icon: 'science',
    description:
      'Sufres los efectos de un veneno, toxina o sustancia perjudicial.',
    effects: [
      'Tienes Desventaja en las tiradas de ataque y en las pruebas de característica.',
    ],
    mechanics: {
      disadvantageOnAttacks: true,
      disadvantageOnAbilityChecks: true,
    },
    isDefault: true,
  },
  {
    slug: 'incapacitado',
    name: 'Incapacitado',
    category: 'INCAPACITANTE',
    badge: 'Sin Acciones ni Concentración',
    icon: 'block',
    description:
      'No puedes actuar con normalidad debido a una alteración física o mental grave.',
    effects: [
      'No puedes realizar Acciones, Acciones Adicionales ni Reacciones.',
      'No puedes mantener la Concentración.',
      'No puedes hablar.',
      'Tienes Desventaja en tu tirada de Iniciativa si estás Incapacitado cuando la realizas.',
    ],
    mechanics: {
      noActions: true,
      noConcentration: true,
      disadvantageOnInitiative: true,
    },
    isDefault: true,
  },
  {
    slug: 'inconsciente',
    name: 'Inconsciente',
    category: 'INCAPACITANTE',
    badge: 'Incapacitado & Derribado',
    icon: 'hotel',
    description:
      'Has perdido el conocimiento y no puedes percibir ni reaccionar a tu entorno.',
    effects: [
      'Estás Incapacitado y Derribado.',
      'Sueltas los objetos que sostienes.',
      'No eres consciente de tu entorno.',
      'Tu Velocidad es 0 y no puede aumentar.',
      'Fallas automáticamente las Tiradas de Salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen Ventaja.',
      'Cualquier ataque que te impacte es un Golpe Crítico si el atacante está a 5 pies o menos de ti.',
      'Recuperación: Cuando recuperas la consciencia, dejas de estar Inconsciente, pero permaneces Derribado.',
    ],
    mechanics: {
      implies: ['incapacitado', 'derribado'],
      speedZero: true,
      autoFailStrDexSaves: true,
      advantageForAttackersAgainstYou: true,
      critsAgainstYouWithin5ft: true,
    },
    isDefault: true,
  },
  {
    slug: 'influenciado',
    name: 'Influenciado',
    category: 'SENSORIAL',
    badge: 'Disposición Favorable',
    icon: 'sentiment_satisfied_alt',
    description:
      'Muestras una disposición favorable hacia otra criatura debido a la persuasión, el engaño o una manipulación psicológica.',
    effects: [
      'La criatura que provoca esta condición tiene Ventaja en las pruebas de característica para interactuar socialmente contigo.',
      'No puedes atacarla voluntariamente, salvo que represente una amenaza evidente para ti o tus aliados.',
      'No estás obligado a obedecer sus órdenes ni a actuar contra tus intereses fundamentales.',
      'Finalización: La condición termina cuando desaparece el efecto que la provoca o cuando la criatura favorecida actúa de forma claramente hostil contra ti o tus aliados.',
      'Aplicación: Las pruebas de habilidades sociales no provocan automáticamente esta condición. Solo puede imponerse mediante capacidades específicas o circunstancias excepcionales determinadas por el Director de Juego.',
    ],
    mechanics: {},
    isDefault: true,
  },
  {
    slug: 'oculto',
    name: 'Oculto',
    category: 'SENSORIAL',
    badge: 'Ventaja Ataque / No Localizado',
    icon: 'lens_blur',
    description:
      'Has evitado ser detectado mediante el sigilo, la cobertura, la oscuridad u otras circunstancias apropiadas.',
    effects: [
      'Tienes Ventaja en las tiradas de ataque contra criaturas que no hayan descubierto tu posición.',
      'Las criaturas que desconozcan tu posición tienen Desventaja en las tiradas de ataque contra ti, siempre que puedan intentar localizarte.',
      'No puedes ser objetivo de efectos que requieran verte mientras permanezcas fuera de la vista.',
      'Las criaturas que no hayan detectado tu presencia desconocen tu posición exacta.',
      'Iniciativa: Tienes Ventaja en tu tirada de Iniciativa si comienzas el combate sin haber sido detectado.',
      'Descubrimiento: Una criatura puede descubrirte mediante su Percepción Pasiva o una prueba de Sabiduría (Percepción), siguiendo las reglas de Esconderse y siempre que pueda percibir indicios de tu presencia.',
      'Finalización: La condición termina cuando eres descubierto, realizas una tirada de ataque, produces un sonido claramente audible o abandonas una posición que te permita permanecer escondido.',
      'Aclaración: Estar Oculto no significa ser físicamente invisible.',
    ],
    mechanics: {},
    isDefault: true,
  },
  {
    slug: 'paralizado',
    name: 'Paralizado',
    category: 'INCAPACITANTE',
    badge: 'Incapacitado · Críticos a 5 pies',
    icon: 'lock',
    description:
      'Has perdido temporalmente el control de tus movimientos debido a una lesión, toxina u otra alteración grave.',
    effects: [
      'Estás Incapacitado.',
      'Tu Velocidad es 0.',
      'Fallas automáticamente las Tiradas de Salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen Ventaja.',
      'Cualquier ataque que te impacte es un Golpe Crítico si el atacante está a 5 pies o menos de ti.',
    ],
    mechanics: {
      implies: ['incapacitado'],
      speedZero: true,
      autoFailStrDexSaves: true,
      advantageForAttackersAgainstYou: true,
      critsAgainstYouWithin5ft: true,
    },
    isDefault: true,
  },
  {
    slug: 'restringido',
    name: 'Restringido',
    category: 'FISICO',
    badge: 'Velocidad 0 · Desventaja',
    icon: 'link',
    description:
      'Tus movimientos están limitados por cuerdas, redes, obstáculos u otros medios de inmovilización.',
    effects: [
      'Tu Velocidad es 0 y no puede aumentar.',
      'Tus tiradas de ataque tienen Desventaja.',
      'Las tiradas de ataque contra ti tienen Ventaja.',
      'Tienes Desventaja en las Tiradas de Salvación de Destreza.',
    ],
    mechanics: {
      speedZero: true,
      disadvantageOnAttacks: true,
      advantageForAttackersAgainstYou: true,
      disadvantageOnDexSaves: true,
    },
    isDefault: true,
  },
];
