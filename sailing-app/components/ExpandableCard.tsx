import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  headerLeft?: React.ReactNode;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

export function ExpandableCard({
  title,
  subtitle,
  badge,
  badgeColor = COLORS.navyMedium,
  headerLeft,
  children,
  initiallyOpen = false,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(initiallyOpen);
  const rotation = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    Animated.timing(rotation, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const chevronRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={`${title}${subtitle ? `, ${subtitle}` : ''}`}
        accessibilityHint={open ? 'Trykk for å lukke' : 'Trykk for å åpne'}
        accessibilityState={{ expanded: open }}
        activeOpacity={0.75}
      >
        {headerLeft && <View style={styles.headerLeft}>{headerLeft}</View>}
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.headerRight}>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
          <Animated.Text
            style={[styles.chevron, { transform: [{ rotate: chevronRotation }] }]}
            accessibilityElementsHidden
          >
            ▼
          </Animated.Text>
        </View>
      </TouchableOpacity>

      {open && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 64, // WCAG touch target
  },
  headerLeft: {
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  chevron: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
