import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ExpandableCard } from '../../components/ExpandableCard';
import { KNOTS, Knot } from '../../data/knots';

const DIFFICULTY_COLORS: Record<string, string> = {
  Enkel: COLORS.success,
  Middels: COLORS.warning,
  Krevende: COLORS.danger,
};

function KnotCard({ knot }: { knot: Knot }) {
  const diffColor = DIFFICULTY_COLORS[knot.difficulty] ?? COLORS.navyMedium;

  return (
    <ExpandableCard
      title={knot.name}
      subtitle={knot.englishName}
      badge={knot.difficulty}
      badgeColor={diffColor}
      headerLeft={
        <View style={styles.knotIcon} accessibilityElementsHidden>
          <Text style={styles.knotIconText}>{knot.icon}</Text>
        </View>
      }
    >
      {/* Uses */}
      <Text style={styles.sectionLabel}>Brukes til</Text>
      {knot.uses.map((use, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bullet} accessibilityElementsHidden>•</Text>
          <Text style={styles.bulletText}>{use}</Text>
        </View>
      ))}

      {/* Steps */}
      <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Slik gjør du det</Text>
      {knot.steps.map((step, i) => (
        <View key={i} style={styles.stepRow}>
          <View
            style={styles.stepNumber}
            accessibilityElementsHidden
          >
            <Text style={styles.stepNumberText}>{i + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>{step.instruction}</Text>
            {step.tip && (
              <View style={styles.stepTip}>
                <Ionicons name="bulb-outline" size={14} color={COLORS.warning} accessibilityElementsHidden />
                <Text style={styles.stepTipText}>{step.tip}</Text>
              </View>
            )}
          </View>
        </View>
      ))}

      {/* Pro tip */}
      <View style={styles.proTipBox}>
        <Ionicons name="star" size={16} color={COLORS.lightBlue} style={{ marginRight: 6 }} accessibilityElementsHidden />
        <Text style={styles.proTipText}>{knot.proTip}</Text>
      </View>

      {/* Warning */}
      {knot.warning && (
        <View style={styles.warningBox}>
          <Ionicons name="warning" size={16} color={COLORS.white} style={{ marginRight: 6 }} accessibilityElementsHidden />
          <Text style={styles.warningText}>{knot.warning}</Text>
        </View>
      )}
    </ExpandableCard>
  );
}

export default function KnotsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Kunnskap om de seks viktigste knutene er alt du trenger for å håndtere fendere, fortøyningslinjer og seil trygt. Trykk på en knute for steg-for-steg-instruksjoner.
          </Text>
        </View>

        {KNOTS.map((knot) => (
          <KnotCard key={knot.id} knot={knot} />
        ))}

        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.footerText}>
            Øv deg på tørr land før du trenger knutene ute på sjøen. Muskkelminne gjør jobben automatisk når det er stress.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  intro: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  introText: {
    color: COLORS.grey,
    fontSize: 14,
    lineHeight: 21,
  },

  knotIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knotIconText: {
    fontSize: 22,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
    marginBottom: 8,
  },

  bulletRow: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 4,
  },
  bullet: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  stepRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.navyMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  stepContent: { flex: 1 },
  stepInstruction: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 21,
  },
  stepTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#FFF8E7',
    borderRadius: 6,
    padding: 8,
    gap: 5,
  },
  stepTipText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.warning,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  proTipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 12,
    marginTop: 14,
  },
  proTipText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.white,
    lineHeight: 19,
  },

  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.white,
    lineHeight: 19,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
});
