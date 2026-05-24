# Seileguiden 🧭

En iOS/iPad-app for seilere som hjelper med sjømerker, knuter, brygging og ankring.

## Funksjoner

| Fane | Innhold |
|------|---------|
| **Sjømerker** | Ta bilde av et sjømerke – AI forklarer det umiddelbart. Innebygd guide med alle IALA-merker inkl. grafisk illustrasjon. |
| **Knuter** | Steg-for-steg-guide til 6 essensielle båtknuter (pullestikk, åttetalsknop, rundtørn m/halvstikk, klyssknyting, dobbelt halvstikk, slippstikk). |
| **Brygging** | Tips for 5 scenarioer: mot vind, med vind, sidelengs vind, strøm og trangt mellomrom. |
| **Ankring** | Guide til valg av ankerplass, ankringsmetode, ankervakt, natt-ankring og dårlig vær – med interaktive sjekklister. |

## Oppsett

### Krav
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go-appen på iPhone/iPad (for testing)

### Installasjon

```bash
cd sailing-app
npm install
```

### API-nøkkel (for sjømerke-AI)

1. Kopier `.env.example` til `.env`
2. Legg inn din Anthropic API-nøkkel fra [console.anthropic.com](https://console.anthropic.com)

```bash
cp .env.example .env
# Rediger .env og legg inn nøkkelen
```

### Start

```bash
npm start
```

Skann QR-koden med Expo Go-appen på iPhone/iPad.

## Tilgjengelighet (WCAG)

- Alle tekst/bakgrunn-kombinasjoner møter minimum WCAG AA (4.5:1 kontrastforhold)
- Berøringsmål minimum 44×44 pt
- `accessibilityLabel` og `accessibilityRole` på alle interaktive elementer
- Live regions for dynamisk innhold (AI-analyse)
- Sjekkliste-elementer har `accessibilityRole="checkbox"` og `accessibilityState`

## Teknologi

- **Expo SDK 52** / React Native 0.76
- **Expo Router 4** for filbasert navigasjon
- **react-native-svg** for sjømerke-illustrasjoner
- **Claude API** (claude-sonnet-4-6) for AI-gjenkjenning av sjømerker
- **expo-image-picker** for kamera og galleri
