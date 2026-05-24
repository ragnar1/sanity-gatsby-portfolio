export interface DockingStep {
  instruction: string;
  tip?: string;
}

export interface DockingScenario {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 'Lett' | 'Middels' | 'Krevende';
  difficultyColor: string;
  description: string;
  steps: DockingStep[];
  proTip: string;
  warning?: string;
}

export const DOCKING_SCENARIOS: DockingScenario[] = [
  {
    id: 'headwind',
    title: 'Mot vinden',
    subtitle: 'Vinden i baugen – det enkle valget',
    icon: '↗',
    difficulty: 'Lett',
    difficultyColor: '#15592E',
    description:
      'Å legge til med vinden i baugen er den mest kontrollerte situasjonen. Motoren gir deg mulighet til å styre presist, og vinden bremser deg naturlig.',
    steps: [
      {
        instruction: 'Planlegg tilnærmingen i god tid. Identifiser vindretningen (se på flagg, bølger, andre båter).',
      },
      {
        instruction: 'Kom inn mot bryggen i sakte fart – ca. 15–30° vinkel mot bryggen.',
        tip: 'Sakte fart = kontroll. Bruk bakk (revers) som din viktigste bremsemetode.',
      },
      {
        instruction: 'Klar en person i baugen med fortøyningsline og fendrene ute på rett side.',
      },
      {
        instruction: 'Når baugen er ca. 2 meter fra bryggen, gir du kort gass i revers for å stoppe farten.',
      },
      {
        instruction: 'Kast eller lever fortøyningslinen til bryggen – begynn alltid med forlinjen.',
        tip: 'Forlinen holder baugen mens du ror aktern inn.',
      },
      {
        instruction: 'Bruk liten fremdrift og ror for å guide akteren inn. Fest agerlinjen.',
      },
    ],
    proTip:
      'Øv deg på å stoppe båten akkurat der du vil i stille vær. Du skal kjenne igjen nøyaktig hvor mye bakk du trenger for å stoppe innen én båtslengde.',
  },
  {
    id: 'tailwind',
    title: 'Med vinden',
    subtitle: 'Vind i akterenden – krever teknikk',
    icon: '↙',
    difficulty: 'Krevende',
    difficultyColor: '#B91C1C',
    description:
      'Med vinden i ryggen skyves du mot bryggen. Vinden hjelper deg inn, men gjør det vanskelig å bremse. God planlegging er avgjørende.',
    steps: [
      {
        instruction: 'Vurder om det finnes en alternativ plass der du kan legge til mot vinden. Prioriter alltid det.',
      },
      {
        instruction: 'Kom inn med svært lav fart – la vinden bære deg inn de siste meterne.',
        tip: 'Du er avhengig av bakk (revers) for å bremse, og den virker dårligere med vind i ryggen.',
      },
      {
        instruction: 'Ha ekstra fendere ute og en person klar i baugen med en fenderline og en person i akteren.',
      },
      {
        instruction: 'Senk farten betraktelig FØR du er innenfor andre båter – du har liten mulighet til å snu.',
      },
      {
        instruction: 'Bruk kraftige bakk-støt for å bremse. Gi baugen til bryggen, kast forlinen ASAP.',
      },
      {
        instruction: 'Fest agerlinjen raskt for å stoppe videre drift.',
        tip: 'En spring-line (diagonal) fra baugen akter til pollaren er effektiv for å stanse drift.',
      },
    ],
    proTip:
      'Øv deg på denne teknikken i stille vær (5–8 knop) for å bygge muskkelminne. Kjenner du at vinden har for mye overtaket – avbryt og prøv igjen i bedre vinkel.',
    warning:
      'Hold alltid minst én fot (30 cm) avstand til naboens båt. En kollisjon koster mer enn en omstart.',
  },
  {
    id: 'crosswind',
    title: 'Sidelengs vind',
    subtitle: 'Vinden presser sideveis',
    icon: '↔',
    difficulty: 'Krevende',
    difficultyColor: '#B91C1C',
    description:
      'Sidelengs vind er den mest krevende situasjonen fordi vinden presser båten mot eller bort fra bryggen, og styringen krever konstant korrigering.',
    steps: [
      {
        instruction: 'Identifiser om vinden blåser deg MOT bryggen (lee-side) eller BORT fra bryggen (luv-side).',
      },
      {
        instruction: 'Vind mot bryggen: kom inn fra le (vindsiden), 45–60° vinkel. Bruk motoren til å bremse og vinden som hjelp.',
        tip: 'Tenk deg at vinden er en usynlig hånd som bringer deg inn.',
      },
      {
        instruction: 'Vind fra bryggen: hold bakk hele veien inn, eller bruk springline-teknikk for å trekke akteren inn.',
      },
      {
        instruction: 'Ha alltid en person klar til å skyve av med foten (ikke hender!) om nødvendig.',
      },
      {
        instruction: 'Fest den linesiden vinden presser mot FØRST – da holder linjen deg fast mens du fikser resten.',
      },
      {
        instruction: 'Bruk springs (diagonale liner) for å hindre at båten glir langs bryggen.',
      },
    ],
    proTip:
      'Se på røyk, flagg og bølgerefleksjoner for å avlese vindretningen nøyaktig FØR du starter tilnærmingen. En klar plan er halvparten av jobben.',
  },
  {
    id: 'current',
    title: 'Strøm ved bryggen',
    subtitle: 'Tidevann og strøm påvirker kursen',
    icon: '〰',
    difficulty: 'Middels',
    difficultyColor: '#92400E',
    description:
      'Strøm oppfører seg som vind, men er usynlig og gjelder for hele vannoverflaten jevnt. Alltid legg til mot strøm der det er mulig.',
    steps: [
      {
        instruction: 'Les strømmen av: se på bøyer, moringer eller andre fortøyde båters peking (baugen peker alltid mot strøm).',
      },
      {
        instruction: 'Forsøk alltid å komme inn MOT strøm – da kontrollerer du farten og kan stoppe med motoren.',
      },
      {
        instruction: 'Strøm med deg: same teknikk som med-vind. Lav fart, mye bakk, klar linje.',
      },
      {
        instruction: 'Husk at strøm kan snu bryggas utenom: vinden kan peke en vei, strøm en annen. Kombiner begge.',
      },
      {
        instruction: 'I trange plasser med sterk strøm: bruk springline som anker og drei båten kontrollert inn.',
      },
    ],
    proTip:
      'Sjekk tidevannstabellen for havnen FØR ankomst på nettsidene til Kartverket (se.no). Da vet du om strømmen er med deg eller mot deg.',
  },
  {
    id: 'tightspace',
    title: 'Trangt mellomrom',
    subtitle: 'Mellom andre båter',
    icon: '⇔',
    difficulty: 'Krevende',
    difficultyColor: '#B91C1C',
    description:
      'Å legge til i et smalt mellomrom krever nøyaktighet, god kommunikasjon og full kontroll over båtens bevegelse.',
    steps: [
      {
        instruction: 'Mål mellomrommet visuelt FØR du starter. Minst én båtbredde + 30 cm fendere på hver side = minimum.',
      },
      {
        instruction: 'Avtal roller: hvem kaster linen, hvem passer fenderne, hvem kommuniserer.',
        tip: 'Bruk tydelige ord: "klar", "litt frem", "bremse" – ikke signaler og ikke gestikulering.',
      },
      {
        instruction: 'Kom inn sakte, nesten i walking pace (gåfart). Er du i tvil, sakte enda mer.',
      },
      {
        instruction: 'Bruk kurven: styr baugen bort fra naboens akterende og la akteren sveipe inn.',
      },
      {
        instruction: 'Kast forlinen først – en person på bryggen kan hjelpe til å justere siste meter.',
      },
      {
        instruction: 'Bruk spring-liner (diagonale liner) for final justering. Det er enklere å trekke en linje enn å manøvrere motor.',
      },
    ],
    proTip:
      'Øv deg på å gå bort og be naboen assistere – de fleste seilere hjelper gjerne, og to par øyne ser mer enn ett.',
    warning:
      'Vær ærlig med deg selv: er mellomrommet for lite? Det er bedre å vente på en større plass enn å skade to båter.',
  },
];
