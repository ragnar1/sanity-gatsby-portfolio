import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SeaMarkVisual } from '../../components/SeaMarkVisual';
import { SEAMARKS, SeaMark } from '../../data/seamarks';

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? '';

interface AnalysisResult {
  raw: string;
  type?: string;
  meaning?: string;
  advice?: string;
}

function parseAnalysis(raw: string): AnalysisResult {
  const typeMatch = raw.match(/\*\*Type:\*\*\s*(.+)/i);
  const meaningMatch = raw.match(/\*\*Betydning:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
  const adviceMatch = raw.match(/\*\*Navigasjonsråd:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
  return {
    raw,
    type: typeMatch?.[1]?.trim(),
    meaning: meaningMatch?.[1]?.trim(),
    advice: adviceMatch?.[1]?.trim(),
  };
}

async function analyseImage(base64: string): Promise<AnalysisResult> {
  if (!API_KEY) {
    throw new Error('API_KEY_MISSING');
  }
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
            },
            {
              type: 'text',
              text: 'Du er ekspert på maritime sjømerker i IALA System A (brukt i Europa/Norge). Analyser bildet og svar på norsk i dette eksakte formatet:\n\n**Type:** [navn på merket]\n**Betydning:** [1–2 setninger om hva merket markerer]\n**Navigasjonsråd:** [konkret råd om hva skipper bør gjøre]\n\nOm bildet ikke viser et sjømerke, svar: **Type:** Ikke et sjømerke\n**Betydning:** Bildet ser ikke ut til å vise et sjømerke.\n**Navigasjonsråd:** Ta et nytt bilde av sjømerket.',
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = await response.json();
  const text: string = data.content?.[0]?.text ?? '';
  return parseAnalysis(text);
}

function SeaMarkGuideCard({ mark }: { mark: SeaMark }) {
  const [expanded, setExpanded] = useState(false);

  const categoryLabel: Record<string, string> = {
    lateral: 'Lateralt',
    cardinal: 'Kardinalt',
    danger: 'Fare',
    safewater: 'Sikkert vann',
    special: 'Spesial',
  };

  return (
    <View style={styles.guideCard}>
      <TouchableOpacity
        style={styles.guideCardHeader}
        onPress={() => setExpanded(!expanded)}
        accessibilityRole="button"
        accessibilityLabel={mark.name}
        accessibilityHint={expanded ? 'Trykk for å lukke' : 'Trykk for mer info'}
        accessibilityState={{ expanded }}
        activeOpacity={0.8}
      >
        <View style={styles.guideCardVisual}>
          <SeaMarkVisual type={mark.type} size={52} />
        </View>
        <View style={styles.guideCardText}>
          <Text style={styles.guideCardName}>{mark.name}</Text>
          <Text style={styles.guideCardCategory}>{categoryLabel[mark.category]}</Text>
          <Text style={styles.guideCardColors} numberOfLines={1}>
            {mark.colorDescription}
          </Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.textSecondary}
          accessibilityElementsHidden
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.guideCardBody}>
          <View style={styles.guideCardVisualLarge}>
            <SeaMarkVisual type={mark.type} size={100} />
          </View>
          <Text style={styles.guideCardFullName}>{mark.nameFull}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Toppmerke:</Text>
            <Text style={styles.infoValue}>{mark.topmark}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lys:</Text>
            <Text style={styles.infoValue}>{mark.light}</Text>
          </View>

          <View style={styles.meaningBox}>
            <Text style={styles.meaningTitle}>Hva betyr det?</Text>
            <Text style={styles.meaningText}>{mark.meaning}</Text>
          </View>

          <View style={styles.adviceBox}>
            <Ionicons name="compass" size={18} color={COLORS.white} style={{ marginRight: 6 }} />
            <Text style={styles.adviceText}>{mark.advice}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function SeamarksScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async (useCamera: boolean) => {
    setError(null);
    setResult(null);

    if (useCamera) {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Tilgang nektet', 'Kameraet trengs for å ta bilde av sjømerker. Aktiver det i Innstillinger.');
        return;
      }
    }

    const pick = useCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
          base64: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
          base64: true,
        });

    if (pick.canceled || !pick.assets?.[0]) return;

    const asset = pick.assets[0];
    setImageUri(asset.uri);

    if (!asset.base64) {
      setError('Klarte ikke å lese bildet. Prøv igjen.');
      return;
    }

    setAnalysing(true);
    try {
      const analysis = await analyseImage(asset.base64);
      setResult(analysis);
    } catch (e: any) {
      if (e.message === 'API_KEY_MISSING') {
        setError('API-nøkkel mangler. Opprett en .env-fil med EXPO_PUBLIC_ANTHROPIC_API_KEY.');
      } else {
        setError('Klarte ikke å analysere bildet. Sjekk nettverkstilkobling og prøv igjen.');
      }
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scanner card */}
        <View style={styles.scannerCard}>
          <Text style={styles.scannerTitle}>Ta bilde av et sjømerke</Text>
          <Text style={styles.scannerSubtitle}>
            AI-gjenkjenning forklarer hva merket betyr og gir deg navigasjonsråd
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => pickImage(true)}
              accessibilityRole="button"
              accessibilityLabel="Ta bilde med kamera"
              activeOpacity={0.85}
            >
              <Ionicons name="camera" size={24} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Ta bilde</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() => pickImage(false)}
              accessibilityRole="button"
              accessibilityLabel="Velg bilde fra galleri"
              activeOpacity={0.85}
            >
              <Ionicons name="images" size={24} color={COLORS.navyMedium} />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>Fra galleri</Text>
            </TouchableOpacity>
          </View>

          {/* Image preview */}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.preview}
              accessibilityLabel="Valgt bilde for analyse"
            />
          )}

          {/* Loading */}
          {analysing && (
            <View style={styles.loadingBox} accessibilityLiveRegion="polite">
              <ActivityIndicator size="large" color={COLORS.lightBlue} />
              <Text style={styles.loadingText}>Analyserer sjømerke…</Text>
            </View>
          )}

          {/* Error */}
          {error && (
            <View style={styles.errorBox} accessibilityLiveRegion="assertive">
              <Ionicons name="alert-circle" size={20} color={COLORS.white} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Result */}
          {result && !analysing && (
            <View style={styles.resultBox} accessibilityLiveRegion="polite">
              {result.type && (
                <Text style={styles.resultType}>{result.type}</Text>
              )}
              {result.meaning && (
                <>
                  <Text style={styles.resultLabel}>Hva betyr det?</Text>
                  <Text style={styles.resultText}>{result.meaning}</Text>
                </>
              )}
              {result.advice && (
                <View style={styles.resultAdvice}>
                  <Ionicons name="compass" size={18} color={COLORS.lightBlue} style={{ marginRight: 6 }} />
                  <Text style={styles.resultAdviceText}>{result.advice}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Sea mark guide */}
        <Text style={styles.sectionHeader}>Sjømerke-guide</Text>
        <Text style={styles.sectionSubheader}>
          Trykk på et merke for å se farger, toppmerke, lys og navigasjonsråd
        </Text>

        {SEAMARKS.map((mark) => (
          <SeaMarkGuideCard key={mark.id} mark={mark} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  // Scanner
  scannerCard: {
    backgroundColor: COLORS.navy,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  scannerSubtitle: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    minHeight: 52,
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.white,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  actionButtonTextSecondary: {
    color: COLORS.navyMedium,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 16,
    resizeMode: 'cover',
  },
  loadingBox: {
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  loadingText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
  },
  resultBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  resultType: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.lightBlue,
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grey,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  resultText: {
    fontSize: 15,
    color: COLORS.white,
    lineHeight: 22,
    marginBottom: 12,
  },
  resultAdvice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(77,168,255,0.15)',
    borderRadius: 8,
    padding: 10,
  },
  resultAdviceText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 20,
    fontWeight: '600',
  },

  // Guide
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionSubheader: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  guideCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  guideCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    minHeight: 72,
  },
  guideCardVisual: {
    width: 52,
    alignItems: 'center',
    marginRight: 14,
  },
  guideCardText: { flex: 1 },
  guideCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  guideCardCategory: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  guideCardColors: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  guideCardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  guideCardVisualLarge: {
    marginVertical: 16,
    alignItems: 'center',
  },
  guideCardFullName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    width: 90,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  meaningBox: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginTop: 10,
    marginBottom: 8,
  },
  meaningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  adviceBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.navyMedium,
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  adviceText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 20,
    fontWeight: '600',
  },
});
