export interface KnotStep {
  instruction: string;
  tip?: string;
}

export interface Knot {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  difficulty: 'Enkel' | 'Middels' | 'Krevende';
  uses: string[];
  steps: KnotStep[];
  proTip: string;
  warning?: string;
}

export const KNOTS: Knot[] = [
  {
    id: 'bowline',
    name: 'Pullestikk',
    englishName: 'Bowline',
    icon: '🔵',
    difficulty: 'Middels',
    uses: [
      'Feste fortøyningsline til fortøyningsring eller pollare',
      'Lage en fast, ikke-glidende løkke i enden av et tau',
      'Feste fender-tau til rekka',
    ],
    steps: [
      {
        instruction: 'Hold tauet i venstre hånd med 40–50 cm "hale" (arbeidsenden) mot deg.',
      },
      {
        instruction: 'Lag en liten løkke på standen (tauets lange del) ved å legge enden over standen – "hullet i treet".',
        tip: 'Løkken skal ligge flat og peke mot deg.',
      },
      {
        instruction: 'Tre arbeidsenden opp gjennom den lille løkken – "kaninen kommer opp av hullet".',
      },
      {
        instruction: 'Før arbeidsenden RUNDT bak standen (tauets lange del) – "kaninen løper rundt treet".',
      },
      {
        instruction: 'Tre arbeidsenden ned gjennom den lille løkken igjen – "kaninen hopper tilbake i hullet".',
      },
      {
        instruction: 'Hold fast i begge sider av den store løkken og trekk standen for å stramme til.',
        tip: 'La arbeidsenden stikke ut minst 10 cm for sikkerhet.',
      },
    ],
    proTip: 'En ferdig pullestikk er sterk og løsnes lett selv etter stor belastning – bare trykk på knuten bakfra og vri den store løkken.',
  },
  {
    id: 'figureeight',
    name: 'Åttetalsknop',
    englishName: 'Figure Eight',
    icon: '8️⃣',
    difficulty: 'Enkel',
    uses: [
      'Stoppknop – hindrer tauet i å løpe gjennom en blokk eller skjøte',
      'Enden av skjøter, fall og skjøter på seil',
      'Sikring av tau i gjennomføringer',
    ],
    steps: [
      {
        instruction: 'Ta tak i tauet med ca. 25 cm arbeidsende. Legg arbeidsenden over standen slik at det danner en løkke.',
      },
      {
        instruction: 'Før arbeidsenden UNDER og bak standen (snu en halv gang).',
        tip: 'Du skal nå se et tall 8 liggende på siden.',
      },
      {
        instruction: 'Tre arbeidsenden ned gjennom den øverste løkken (der du begynte), ovenfra og ned.',
      },
      {
        instruction: 'Stram til ved å trekke i begge ender – knuten skal ligne på et 8-tall.',
      },
    ],
    proTip: 'Åttetalsknopen er enkel å sjekke: den ferdige knuten skal alltid se ut som tallet 8. Er formen feil, start om igjen.',
  },
  {
    id: 'roundturn',
    name: 'Rundtørn med to halvstikk',
    englishName: 'Round Turn and Two Half Hitches',
    icon: '🔗',
    difficulty: 'Enkel',
    uses: [
      'Feste fender til livline eller rekke',
      'Feste tau til ringbolter og fortøyningsringer',
      'Sikker fortøyning til pollare når man ønsker å kunne justere lengden',
    ],
    steps: [
      {
        instruction: 'Før tauet RUNDT gjenstanden (ring, rekke, pollare) to hele omganger – dette er "rundtørnen".',
        tip: 'De to omgangene fordeler lasten og gir god friksjon.',
      },
      {
        instruction: 'Lag den første halvstikken: kryss arbeidsenden over standen og tre den gjennom løkken nedenfra.',
      },
      {
        instruction: 'Lag den andre halvstikken: gjenta i nøyaktig samme retning – kryss over standen og tre gjennom løkken.',
        tip: 'Begge halvstikkene må gå i samme retning for at knuten skal holde.',
      },
      {
        instruction: 'Stram begge halvstikkene godt til mot rundtørnen.',
      },
    ],
    proTip: 'Denne knuten er en av de mest pålitelige for båtbruk. Vil du raskt løsne fenderens lengde, løsner du bare halvstikkene mens rundtørnen holder lasten.',
  },
  {
    id: 'cleathitch',
    name: 'Klyssknyting',
    englishName: 'Cleat Hitch',
    icon: '⚓',
    difficulty: 'Enkel',
    uses: [
      'Feste fortøyningsline til klyss (fortøyningsklyss)',
      'Feste fall og skjøter til klyss',
      'Den viktigste praktiske knuten ved bryggene',
    ],
    steps: [
      {
        instruction: 'Leg tauet rundt klyssens base én full omgang – start fra enden bort fra kraften.',
        tip: 'Tauet skal gå under hornet (spissen) nærmest deg.',
      },
      {
        instruction: 'Kryss tauet diagonalt over klyssen til det andre hornet (en figur-8-bevegelse).',
      },
      {
        instruction: 'Kryss tilbake under det første hornet igjen – du danner en 8-talls figur.',
      },
      {
        instruction: 'Lag en løkke av tauet, vend den om (halvdreiing) og heng løkken over det siste hornet.',
        tip: 'Denne siste halvstikken låser knuten.',
      },
      {
        instruction: 'Stram til og la tauenden henge langs klyssen.',
      },
    ],
    proTip: 'Alltid start rundgangen i retning BORT fra belastningen – da strammes knuten av lasten i stedet for å slites løs.',
    warning: 'Ikke la tauet gå rundt mer enn 2–3 ganger rundt klyssen – da kan det bli umulig å løsne under press.',
  },
  {
    id: 'clovehitch',
    name: 'Dobbelt halvstikk',
    englishName: 'Clove Hitch',
    icon: '🪢',
    difficulty: 'Enkel',
    uses: [
      'Feste fender raskt til livline',
      'Midlertidig fortøyning til pollare eller ring',
      'Feste tau til master og spirer',
    ],
    steps: [
      {
        instruction: 'Legg tauet over gjenstanden (ring, rekke) slik at arbeidsenden henger ned på din side.',
      },
      {
        instruction: 'Kryss arbeidsenden over standen og legg den over gjenstanden igjen – litt til siden av den første omgangen.',
      },
      {
        instruction: 'Tre arbeidsenden inn under den andre omgangen (mellom tau og gjenstand).',
      },
      {
        instruction: 'Stram til ved å trekke jevnt i begge ender.',
        tip: 'Knuten skal ha et X-mønster synlig.',
      },
    ],
    proTip: 'Øv deg på å kaste dobbelt halvstikk med én hånd over en pollare – da sparer du tid og fingre ved brygging i sterk vind.',
    warning: 'Dobbelt halvstikk kan gli under varierende laster. Bruk rundtørn med to halvstikk for permanente forbindelser.',
  },
  {
    id: 'slippedknot',
    name: 'Slippstikk',
    englishName: 'Slipped Bowline',
    icon: '⚡',
    difficulty: 'Middels',
    uses: [
      'Fortøyning der du trenger rask løsning',
      'Fenderline du vil løsne én-hånds fra dekk',
      'Sikring av seil som skal strykes raskt',
    ],
    steps: [
      {
        instruction: 'Lag de tre første stegene i en vanlig pullestikk: liten løkke, kaninen opp, rundt treet.',
      },
      {
        instruction: 'I stedet for å tre selve tauenden gjennom den lille løkken: fold tauenden dobbelt og tre LØKKEN gjennom.',
        tip: 'Den doble løkken stikker ut på utsiden av knuten.',
      },
      {
        instruction: 'Stram til knuten med den lille løkken godt inne.',
      },
      {
        instruction: 'For å løsne: trekk hardt i den stikkende løkken – knuten løser seg umiddelbart.',
      },
    ],
    proTip: 'Merk den stikkende løkken med rødt tape eller en knute for å finne den raskt under stress. Ideell for spring- og agterfortøyning.',
  },
];
