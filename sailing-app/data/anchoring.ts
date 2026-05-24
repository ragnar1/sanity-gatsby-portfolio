export interface ChecklistItem {
  id: string;
  text: string;
  critical?: boolean;
}

export interface AnchoringSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  tips: string[];
  checklist?: ChecklistItem[];
}

export const ANCHORING_SECTIONS: AnchoringSection[] = [
  {
    id: 'choosing',
    title: 'Velg ankerplass',
    icon: '🗺',
    content:
      'Valget av ankerplass er den viktigste beslutningen for en trygg natts søvn. En dårlig ankerplass kan koste deg søvn – eller båten.',
    tips: [
      'Sjekk vindprognosen for natten – vinden kan snu flere ganger.',
      'Velg beskyttet bukt med lav dønning. Åpne viker med langsgående bølger er ubehagelig.',
      'Se etter sandbunn eller mudder i sjøkartet. Steinbunn er vanskelig – ankeret griper dårlig.',
      'Sjekk om det er ankringsrestriksjoner i området (vernede sjøbunner, undervannskabler).',
      'Estimer svingrommet: alle båter i ankervika trenger plass til å svinge rundt ankeret uten å kollidere.',
    ],
    checklist: [
      { id: 'c1', text: 'Sjøkartet viser egnet bunn (sand/mudder)', critical: true },
      { id: 'c2', text: 'Vindprognose sjekket for neste 12 timer' },
      { id: 'c3', text: 'Ingen ankringsrestriksjoner i området' },
      { id: 'c4', text: 'Tilstrekkelig svingromsavstand til andre båter', critical: true },
      { id: 'c5', text: 'Nødhavn eller alternativ plass identifisert' },
    ],
  },
  {
    id: 'method',
    title: 'Ankringsmetode',
    icon: '⚓',
    content:
      'Riktig ankringsteknikk sikrer at ankeret griper ordentlig. Den vanligste feilen er å la ut for lite kjede.',
    tips: [
      'Mål opp kjedens lengde: du trenger 5–7 ganger vanndybden ved høyvann.',
      'Eksempel: 5 meter dybde + 1 meter fribord = 6 m vanndybde × 6 = 36 meter kjede.',
      'Kom alltid inn MOT vind eller strøm (baugen mot vinden) for å ha kontroll.',
      'Senk ankeret sakte til bunns – kast ikke ankeret (det vikler seg).',
      'La ut kjeden mens du lar båten drive bakover i sakte revers.',
      'Gi lett gass i revers og kjenn om ankeret griper (kjenner du "rykket" i kjeden?).',
      'Merk kjeden med tape/maling for å vite nøyaktig hvor mye du har ute.',
    ],
    checklist: [
      { id: 'm1', text: 'Kjedestørrelse beregnet (dybde × 5–7)', critical: true },
      { id: 'm2', text: 'Ankeret renset og klart på baugen' },
      { id: 'm3', text: 'Tilnærming mot vind/strøm planlagt', critical: true },
      { id: 'm4', text: 'Ankeret bekreftet å ha grepet (kjenn rykket)' },
    ],
  },
  {
    id: 'watch',
    title: 'Ankervakt',
    icon: '👁',
    content:
      'Et dragende anker er en av seillivets farligste situasjoner – særlig om natten. Gode rutiner for ankervakt er ikke valgfritt.',
    tips: [
      'Sett GPS-ankervakt (anker-alarm) i navigasjonsappen din – med en radius på ca. 20–30 meter.',
      'Ta inn kompaspeiler på faste punkter på land (molo, kirketårn, fyrtårn) straks etter ankring.',
      'Sjekk peilerne etter 15 og 30 minutter for å bekrefte at ankeret ikke drager.',
      'Kjenner du at ankeret drager: start motoren, vær klar til å lette ankeret.',
      'Om natta: hvert 2–3 timer ut og sjekk peilerne. Bruk vakt-timer.',
      'I sterk vind: ankervakt er obligatorisk og kontinuerlig.',
    ],
    checklist: [
      { id: 'w1', text: 'GPS-ankervakt aktivert (radius 20–30 m)', critical: true },
      { id: 'w2', text: 'Kompaspeilere tatt på minst 2 faste punkt' },
      { id: 'w3', text: 'Ankret bekreftet stabilt etter 15 min' },
      { id: 'w4', text: 'Motor startet og sjekket' },
    ],
  },
  {
    id: 'night',
    title: 'Ankring om natten',
    icon: '🌙',
    content:
      'Natt-ankring gir ekstra krav til lys og sikkerhet. En ankret båt er juridisk pålagt ankerlys.',
    tips: [
      'Heis ankerlys (hvitt rundt lys, synlig 360°) i rigg eller på akterdekket.',
      'Ankerlyset er PÅBUDT etter norsk sjøfartslov – uten det kan du holdes ansvarlig ved kollisjon.',
      'Sjekk at kjeden ikke gnisser mot baugen (gir støy og sliter utstyret) – bruk en ankerdempning.',
      'Informer alle om bord om ankerplass, nødutstyr og hva de skal gjøre om alarm går.',
      'Ha sko og en lykt innen rekkevidde fra køyen.',
      'Kontroller at redningsmidler er lett tilgjengelige.',
    ],
    checklist: [
      { id: 'n1', text: 'Ankerlys (hvitt 360°) heist og fungerende', critical: true },
      { id: 'n2', text: 'Alle om bord informert om ankerplass og nødprosedyre' },
      { id: 'n3', text: 'Redningsmidler tilgjengelige' },
      { id: 'n4', text: 'Kjeden dempert mot gnissing' },
      { id: 'n5', text: 'Lykt og sko ved køyen' },
    ],
  },
  {
    id: 'weather',
    title: 'Ankring i dårlig vær',
    icon: '⛈',
    content:
      'Sterk vind setter store krefter på ankerkjeden og bunnen. Gode forberedelser gjør forskjellen mellom trygg natts søvn og drama.',
    tips: [
      'Øk kjedelengden til 7–10 ganger dybden i sterk vind (over 15–20 knop).',
      'Vurder å sette to ankere i V-formasjon om det er plass – gir bedre holde-kraft.',
      'Sjekk at kjeden ikke er kveilet eller har kryss i bunnen.',
      'Etter sterk vind: dykk (eller bruk undervannskamera) for å sjekke at ankeret fortsatt sitter rett.',
      'Hold dekket ryddig – løse gjenstander og fall må sikres.',
      'Ha redningsvester lett tilgjengelige og sett ankervakt.',
      'Kjenn nødutseglingen: vet du hvor du vil styre om ankeret drager?',
    ],
  },
  {
    id: 'lifting',
    title: 'Lette ankeret',
    icon: '↑',
    content:
      'Å lette ankeret effektivt og trygt sparer rygg og humør. Planlegg bevegelsen FØR du begynner å heise.',
    tips: [
      'Start motoren FØR du begynner å hale inn kjeden – alltid.',
      'Bruk motoren til å drive OVER ankeret mens kjeden hales inn (ikke hale uten fremdrift).',
      'Når kjeden henger rett ned ("ankeret er "opp-og-ned"), gi litt gass fremover for å brekke ankeret løst.',
      'Skvett ned kjeden med sjøvann etter hvert som den kommer inn – ikke ta mørk bunn inn i ankerkassen.',
      'Sjekk ankeret visuelt at det er uskadd og ren fra sjøbunn-materiell.',
      'Stikk ankeret fast i baugen med sikringen på – sjø-svalp kan slå ankeret løst.',
    ],
  },
];
