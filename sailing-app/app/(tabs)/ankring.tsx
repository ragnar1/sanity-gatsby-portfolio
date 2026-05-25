import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ANCHORING_SECTIONS, AnchoringSection, ChecklistItem } from '../../data/anchoring';

function Checklist({ items }: { items: ChecklistItem[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <View style={styles.checklist}>
      <Text style={styles.checklistTitle}>Sjekkliste</Text>
      {items.map((item) => {
        const isChecked = checked.has(item.id);
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.checkItem}
            onPress={() => toggle(item.id)}
            accessibilityRole="checkbox"
            accessibilityLabel={item.text}
            accessibilityState={{ checked: isChecked }}
            activeOpacity={0.75}
          >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <View style={styles.checkTextContainer}>
              <Text style={[styles.checkText, isChecked && styles.checkTextDone]}>
                {item.text}
              </Text>
              {item.critical && !isChecked && (
                <Text style={styles.criticalLabel}>Kritisk</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SectionCard({ section }: { section: AnchoringSection }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
        accessibilityRole="button"
        accessibilityLabel={section.title}
        accessibilityHint={expanded ? 'Trykk for å lukke' : 'Trykk for å åpne'}
        accessibilityState={{ expanded }}
        activeOpacity={0.8}
      >
        <View style={styles.sectionIconWrap} accessibilityElementsHidden>
          <Text style={styles.sectionIcon}>{section.icon}</Text>
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.textSecondary}
          accessibilityElementsHidden
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionBody}>
          <Text style={styles.sectionContent}>{section.content}</Text>

          <Text style={styles.tipsLabel}>Tips og råd</Text>
          {section.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipDot} accessibilityElementsHidden />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}

          {section.checklist && <Checklist items={section.checklist} />}
        </View>
      )}
    </View>
  );
}

export default function AnchoringScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Gyllen regel</Text>
          <Text style={styles.heroText}>
            En god ankerplass + riktig mengde kjede + ankervakt = trygg natt i uthavn.
          </Text>
          <View style={styles.formulaRow}>
            <View style={styles.formulaItem}>
              <Text style={styles.formulaNumber}>5–7×</Text>
              <Text style={styles.formulaLabel}>dybden{'\n'}i kjede</Text>
            </View>
            <View style={styles.formulaDiv} accessibilityElementsHidden>
              <Text style={styles.formulaDivText}>+</Text>
            </View>
            <View style={styles.formulaItem}>
              <Text style={styles.formulaNumber}>20 m</Text>
              <Text style={styles.formulaLabel}>GPS{'\n'}alarm-radius</Text>
            </View>
            <View style={styles.formulaDiv} accessibilityElementsHidden>
              <Text style={styles.formulaDivText}>=</Text>
            </View>
            <View style={styles.formulaItem}>
              <Text style={styles.formulaNumber}>😴</Text>
              <Text style={styles.formulaLabel}>Trygg{'\n'}søvn</Text>
            </View>
          </View>
        </View>

        <Text style={styles.pageHeader}>Seksjoner</Text>

        {ANCHORING_SECTIONS.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}

        <View style={styles.legalCard}>
          <Ionicons name="information-circle" size={20} color={COLORS.accent} style={{ marginRight: 8 }} />
          <Text style={styles.legalText}>
            Ankring er i utgangspunktet tillatt i norsk farvann, men sjekk alltid lokale restriksjoner i sjøkartet (Kartverket sjøkart). Unngå ankring på sjøbunner med ål- og tangenger (vernede områder).
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
    marginBottom: 18,
  },
  formulaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  formulaItem: {
    alignItems: 'center',
    flex: 1,
  },
  formulaNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.lightBlue,
  },
  formulaLabel: {
    fontSize: 11,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 15,
  },
  formulaDiv: {
    paddingHorizontal: 2,
  },
  formulaDivText: {
    fontSize: 20,
    color: COLORS.grey,
    fontWeight: '300',
  },

  pageHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
  },

  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 64,
  },
  sectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionIcon: { fontSize: 20 },
  sectionTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sectionContent: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 12,
  },
  tipsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: 7,
    alignItems: 'flex-start',
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.navyMedium,
    marginRight: 10,
    marginTop: 7,
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 21,
  },

  // Checklist
  checklist: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
  },
  checklistTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 44,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.navyMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkTextContainer: { flex: 1 },
  checkText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  checkTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  criticalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },

  legalCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legalText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
