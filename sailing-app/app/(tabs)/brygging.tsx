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
import { DOCKING_SCENARIOS, DockingScenario } from '../../data/docking';

function WindIcon({ icon }: { icon: string }) {
  return (
    <View style={styles.windIcon} accessibilityElementsHidden>
      <Text style={styles.windIconText}>{icon}</Text>
    </View>
  );
}

function ScenarioCard({ scenario }: { scenario: DockingScenario }) {
  return (
    <ExpandableCard
      title={scenario.title}
      subtitle={scenario.subtitle}
      badge={scenario.difficulty}
      badgeColor={scenario.difficultyColor}
      headerLeft={<WindIcon icon={scenario.icon} />}
    >
      <Text style={styles.description}>{scenario.description}</Text>

      <Text style={styles.sectionLabel}>Fremgangsmåte</Text>

      {scenario.steps.map((step, i) => (
        <View key={i} style={styles.stepRow}>
          <View style={styles.stepNumber} accessibilityElementsHidden>
            <Text style={styles.stepNumberText}>{i + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>{step.instruction}</Text>
            {step.tip && (
              <View style={styles.tipBox}>
                <Ionicons name="bulb-outline" size={14} color={COLORS.warning} accessibilityElementsHidden />
                <Text style={styles.tipText}>{step.tip}</Text>
              </View>
            )}
          </View>
        </View>
      ))}

      <View style={styles.proTipBox}>
        <Ionicons name="star" size={16} color={COLORS.lightBlue} style={{ marginRight: 6 }} accessibilityElementsHidden />
        <Text style={styles.proTipText}>{scenario.proTip}</Text>
      </View>

      {scenario.warning && (
        <View style={styles.warningBox}>
          <Ionicons name="warning" size={16} color={COLORS.white} style={{ marginRight: 6 }} accessibilityElementsHidden />
          <Text style={styles.warningText}>{scenario.warning}</Text>
        </View>
      )}
    </ExpandableCard>
  );
}

export default function DockingScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Grunnprinsipp</Text>
          <Text style={styles.heroText}>
            Legg alltid til MOT vind eller strøm der det er mulig. Da kontrollerer motoren farten og gir deg tid til å reagere. Sakte fart = full kontroll.
          </Text>
          <View style={styles.heroDivider} />
          <View style={styles.heroRule}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.lightBlue} accessibilityElementsHidden />
            <Text style={styles.heroRuleText}>Fendrene ute FØR du starter tilnærmingen</Text>
          </View>
          <View style={styles.heroRule}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.lightBlue} accessibilityElementsHidden />
            <Text style={styles.heroRuleText}>Liner klare og ukveilet på dekk</Text>
          </View>
          <View style={styles.heroRule}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.lightBlue} accessibilityElementsHidden />
            <Text style={styles.heroRuleText}>Avtal roller med de om bord FØR</Text>
          </View>
          <View style={styles.heroRule}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.lightBlue} accessibilityElementsHidden />
            <Text style={styles.heroRuleText}>Er du i tvil – avbryt og prøv igjen</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Scenarier</Text>

        {DOCKING_SCENARIOS.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}

        {/* Fender guide */}
        <View style={styles.fenderCard}>
          <Text style={styles.fenderTitle}>Plassering av fendere</Text>
          <Text style={styles.fenderText}>
            Bruk minst 3 fendere på siden mot bryggen. En på midten (videste punkt), en mot for, en mot akter. Heng dem slik at de dekker det høyeste punktet på bryggen. Justér høyden mens du er fortøyd ved lavvann.
          </Text>
        </View>

        {/* Lines guide */}
        <View style={styles.linesCard}>
          <Text style={styles.linesTitle}>De fire fortøyningslinjene</Text>
          <View style={styles.lineItem}>
            <Text style={styles.lineName}>Forlinje</Text>
            <Text style={styles.lineDesc}>Fra baugen fremover til bryggen – holder baugen</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineName}>Agerlinje</Text>
            <Text style={styles.lineDesc}>Fra akteren bakover til bryggen – holder akteren</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineName}>Forspring</Text>
            <Text style={styles.lineDesc}>Fra baugen bakover – hindrer båten i å gå forover</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineName}>Agerspring</Text>
            <Text style={styles.lineDesc}>Fra akteren fremover – hindrer båten i å gå bakover</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  heroCard: {
    backgroundColor: COLORS.navy,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.lightBlue,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroText: {
    fontSize: 15,
    color: COLORS.white,
    lineHeight: 22,
    fontWeight: '600',
  },
  heroDivider: {
    height: 1,
    backgroundColor: COLORS.navyLight,
    marginVertical: 14,
  },
  heroRule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroRuleText: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 19,
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
  },

  windIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  windIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.navyMedium,
  },

  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 14,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
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
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#FFF8E7',
    borderRadius: 6,
    padding: 8,
    gap: 5,
  },
  tipText: {
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

  fenderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fenderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  fenderText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },

  linesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  linesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  lineItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  lineName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.accent,
    width: 110,
    flexShrink: 0,
  },
  lineDesc: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
