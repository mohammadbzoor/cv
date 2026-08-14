import { User, Palette, Globe, Bell, Shield, HardDrive, UserCheck } from 'lucide-react';

export const SETTINGS_SECTIONS = Object.freeze([
  { id: 'profile', icon: User, labelKey: 'settings:sections.profile' },
  { id: 'appearance', icon: Palette, labelKey: 'settings:sections.appearance' },
  { id: 'language', icon: Globe, labelKey: 'settings:sections.language' },
  { id: 'notifications', icon: Bell, labelKey: 'settings:sections.notifications' },
  { id: 'privacy', icon: Shield, labelKey: 'settings:sections.privacy' },
  { id: 'local-data', icon: HardDrive, labelKey: 'settings:sections.localData' },
  { id: 'account', icon: UserCheck, labelKey: 'settings:sections.account' },
]);
