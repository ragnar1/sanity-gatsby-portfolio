import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IoniconsName, focusedName: IoniconsName) {
  return ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <Ionicons name={focused ? focusedName : name} size={size} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.navy,
          borderTopColor: COLORS.navyLight,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: COLORS.lightBlue,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: { backgroundColor: COLORS.navy },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sjømerker',
          headerTitle: 'Sjømerker',
          tabBarIcon: tabIcon('eye-outline', 'eye'),
          tabBarAccessibilityLabel: 'Sjømerker-fane',
        }}
      />
      <Tabs.Screen
        name="knuter"
        options={{
          title: 'Knuter',
          headerTitle: 'Knuteguide',
          tabBarIcon: tabIcon('infinite-outline', 'infinite'),
          tabBarAccessibilityLabel: 'Knuteguide-fane',
        }}
      />
      <Tabs.Screen
        name="brygging"
        options={{
          title: 'Brygging',
          headerTitle: 'Legge til brygge',
          tabBarIcon: tabIcon('boat-outline', 'boat'),
          tabBarAccessibilityLabel: 'Bryggeguide-fane',
        }}
      />
      <Tabs.Screen
        name="ankring"
        options={{
          title: 'Ankring',
          headerTitle: 'Ankring i uthavn',
          tabBarIcon: tabIcon('anchor-outline', 'anchor'),
          tabBarAccessibilityLabel: 'Ankringsguide-fane',
        }}
      />
    </Tabs>
  );
}
