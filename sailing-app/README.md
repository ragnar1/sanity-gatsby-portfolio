# Seileguiden 🧭

En iOS/iPad-app for seilere som hjelper med sjømerker, knuter, brygging og ankring.

## Funksjoner

| Fane | Innhold |
|------|---------|
| **Sjømerker** | Ta bilde av et sjømerke – AI forklarer det umiddelbart. Innebygd guide med alle IALA-merker inkl. grafisk illustrasjon. |
| **Knuter** | Steg-for-steg-guide til 6 essensielle båtknuter (pullestikk, åttetalsknop, rundtørn m/halvstikk, klyssknyting, dobbelt halvstikk, slippstikk). |
| **Brygging** | Tips for 5 scenarioer: mot vind, med vind, sidelengs vind, strøm og trangt mellomrom. |
| **Ankring** | Guide til valg av ankerplass, ankringsmetode, ankervakt, natt-ankring og dårlig vær – med interaktive sjekklister. |

## Komme i gang

### Alternativ A – Kun iPad (ingen Mac/PC nødvendig)

Dette er den enkleste veien om du bare har iPaden for hånden.

**Forutsetninger**
- Gratis konto på [expo.dev](https://expo.dev) (registrer deg i nettleseren på iPaden)
- Gratis konto på [console.anthropic.com](https://console.anthropic.com) for AI-nøkkelen
- Appen **Expo Go** installert fra App Store på iPaden

**Bygg appen i skyen med EAS Build**

EAS Build kompilerer appen for deg på Expos servere – du trenger ikke installere noe lokalt.

1. Fork eller klon dette repoet til din egen GitHub-konto
2. Gå til [expo.dev](https://expo.dev) i nettleseren → **New project** → koble til GitHub-repoet
3. Åpne prosjektets **Environment variables** i Expo-dashbordet og legg til:
   ```
   EXPO_PUBLIC_ANTHROPIC_API_KEY = <din nøkkel fra console.anthropic.com>
   ```
4. Gå til **Builds** → **New build** → velg plattform **iOS** → profil **development**
5. Når bygget er ferdig (ca. 10–15 min), skann QR-koden i Expo Go på iPaden

> **Merk:** Development build krever at du er logget inn i Expo Go med samme konto.
> For å dele appen med ektefelle/partner: bruk profil **preview** – da får du en installerbar `.ipa`-fil via TestFlight eller direkte link.

---

### Alternativ B – Med Mac hjemme

Raskere utviklingsloop om du har en Mac på samme WiFi-nettverk som iPaden.

**Krav**
- Node.js 18+ ([nodejs.org](https://nodejs.org))
- Expo Go installert på iPaden fra App Store

```bash
cd sailing-app
cp .env.example .env          # legg inn Anthropic-nøkkelen i .env
npm install
npm start
```

Expo skriver ut en QR-kode i terminalen. Åpne **Kamera**-appen på iPaden, pek mot QR-koden, og appen åpner seg i Expo Go. Mac og iPad må være på samme WiFi.

---

### API-nøkkel for sjømerke-AI

Sjømerke-gjenkjenning krever en Anthropic API-nøkkel:

1. Gå til [console.anthropic.com](https://console.anthropic.com) og opprett en gratis konto
2. Under **API Keys** → **Create key**
3. Legg nøkkelen inn som beskrevet i det alternativet du valgte over

Uten nøkkel fungerer alle de andre fanene (knuter, brygging, ankring) normalt – bare AI-gjenkjenningen av sjømerker er utilgjengelig.

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
