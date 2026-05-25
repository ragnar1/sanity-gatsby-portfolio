export type SeaMarkType =
  | 'port'
  | 'starboard'
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'danger'
  | 'safewater'
  | 'special';

export interface SeaMark {
  id: string;
  type: SeaMarkType;
  name: string;
  nameFull: string;
  category: 'lateral' | 'cardinal' | 'danger' | 'safewater' | 'special';
  colorDescription: string;
  topmark: string;
  light: string;
  meaning: string;
  advice: string;
}

export const SEAMARKS: SeaMark[] = [
  {
    id: 'port',
    type: 'port',
    name: 'Babordmerke',
    nameFull: 'Lateralt merke – babord (venstre) side',
    category: 'lateral',
    colorDescription: 'Rød',
    topmark: 'Rød sylinder (flat)',
    light: 'Rødt lys – ulike blinkrytmer',
    meaning:
      'Markerer babord (venstre) side av farvannet når du seiler mot havn eller oppover elven (konvensjonell retning).',
    advice:
      'Hold dette røde merket på VENSTRE (babord) side av båten når du seiler inn mot havn. Huskeregel: "Rødt til venstre inn".',
  },
  {
    id: 'starboard',
    type: 'starboard',
    name: 'Styrbordmerke',
    nameFull: 'Lateralt merke – styrbord (høyre) side',
    category: 'lateral',
    colorDescription: 'Grønn',
    topmark: 'Grønn kjegle (spiss opp)',
    light: 'Grønt lys – ulike blinkrytmer',
    meaning:
      'Markerer styrbord (høyre) side av farvannet når du seiler mot havn eller oppover elven.',
    advice:
      'Hold dette grønne merket på HØYRE (styrbord) side av båten når du seiler inn mot havn. Huskeregel: "Grønt til høyre inn".',
  },
  {
    id: 'north',
    type: 'north',
    name: 'Nord kardinalmerke',
    nameFull: 'Kardinalmerke – nordsektoren',
    category: 'cardinal',
    colorDescription: 'Svart over gul',
    topmark: 'To svarte kjegler – begge spiss OPP (↑↑)',
    light: 'Hvitt – kontinuerlig blinker (Q) eller hurtigblinker (VQ)',
    meaning:
      'Passér på NORDSIDEN av merket. Den farlige grunnen eller hindringen befinner seg SYD for merket.',
    advice:
      'Seil NORD for dette merket – hold det på sørsiden av kursen din. Sjekk alltid sjøkartet for nøyaktig plassering av faren.',
  },
  {
    id: 'south',
    type: 'south',
    name: 'Sør kardinalmerke',
    nameFull: 'Kardinalmerke – sørsektoren',
    category: 'cardinal',
    colorDescription: 'Gul over svart',
    topmark: 'To svarte kjegler – begge spiss NED (↓↓)',
    light: 'Hvitt – 6 blink + 1 langt Q(6)+LFl hvert 15. sekund',
    meaning:
      'Passér på SØRSIDEN av merket. Den farlige grunnen eller hindringen befinner seg NORD for merket.',
    advice:
      'Seil SØR for dette merket – hold det på nordsiden av kursen din. Huskeregel: Kjeglene peker ned mot sør.',
  },
  {
    id: 'east',
    type: 'east',
    name: 'Øst kardinalmerke',
    nameFull: 'Kardinalmerke – østsektoren',
    category: 'cardinal',
    colorDescription: 'Svart–gul–svart (tre bånd)',
    topmark: 'To svarte kjegler – base mot base (◆ diamantform)',
    light: 'Hvitt – 3 blink Q(3) hvert 10. sekund',
    meaning:
      'Passér på ØSTSIDEN av merket. Den farlige grunnen eller hindringen befinner seg VEST for merket.',
    advice:
      'Seil ØST for dette merket. Huskeregel: Kjeglene peker ut til sidene = Øst (som E i Egg).',
  },
  {
    id: 'west',
    type: 'west',
    name: 'Vest kardinalmerke',
    nameFull: 'Kardinalmerke – vestsektoren',
    category: 'cardinal',
    colorDescription: 'Gul–svart–gul (tre bånd)',
    topmark: 'To svarte kjegler – topp mot topp (⧖ timeglassform)',
    light: 'Hvitt – 9 blink Q(9) hvert 15. sekund',
    meaning:
      'Passér på VESTSIDEN av merket. Den farlige grunnen eller hindringen befinner seg ØST for merket.',
    advice:
      'Seil VEST for dette merket. Huskeregel: Kjeglene peker inn mot midten = West (som W).',
  },
  {
    id: 'danger',
    type: 'danger',
    name: 'Isolert faremerke',
    nameFull: 'Isolert faremerke',
    category: 'danger',
    colorDescription: 'Svart–rød–svart (tre bånd)',
    topmark: 'To svarte kuler stablede (●●)',
    light: 'Hvitt – 2 blink hvert 5. sekund',
    meaning:
      'Markerer en isolert fare (skjær, grunne, vrak) med sikkert farvann rundt alle sider av merket.',
    advice:
      'FARE! Hold god avstand på ALLE sider. Selve faren befinner seg rett under eller tett ved merket. Sjekk dybdekonturene i sjøkartet.',
  },
  {
    id: 'safewater',
    type: 'safewater',
    name: 'Sikkert vann merke',
    nameFull: 'Sikkert vann merke (midtfarvannsmerke)',
    category: 'safewater',
    colorDescription: 'Røde og hvite vertikale striper',
    topmark: 'Rød kule',
    light: 'Hvitt – morse "A" (·–) hvert 6. sekund',
    meaning:
      'Markerer sikkert navigerbart farvann rundt alle sider. Brukes som innseglingsmerke, midtfarvannsmerke eller som bøye for å markere en midtlinje.',
    advice:
      'Trygt farvann rundt merket. Kan passeres på alle sider – hold likevel trygg avstand. Brukes gjerne som startmerke inn mot havn.',
  },
  {
    id: 'special',
    type: 'special',
    name: 'Spesialmerke',
    nameFull: 'Spesialmerke',
    category: 'special',
    colorDescription: 'Gul',
    topmark: 'Gult X (kryss)',
    light: 'Gult lys – ulike rytmer',
    meaning:
      'Gult merke brukes til å markere spesielle områder eller gjenstander: badeområder, militære øvelsesområder, undervannskabler, ankringsplasser, datainnsamlingsfortøyninger o.l.',
    advice:
      'Les sjøkartet nøye for å finne ut hva dette gule merket markerer i akkurat dette området. Unngå å ankre nær kabler eller militære soner.',
  },
];
