import { Edit3, CheckCircle, FileText, Lock, Globe, Printer } from 'lucide-react';

export const FEATURE_HIGHLIGHTS = Object.freeze([
  {
    id: 'inline-edit',
    icon: Edit3,
    titleKey: 'home:features.inlineEdit.title',
    descKey: 'home:features.inlineEdit.desc',
  },
  {
    id: 'ats-templates',
    icon: FileText,
    titleKey: 'home:features.atsTemplates.title',
    descKey: 'home:features.atsTemplates.desc',
  },
  {
    id: 'local-privacy',
    icon: Lock,
    titleKey: 'home:features.localPrivacy.title',
    descKey: 'home:features.localPrivacy.desc',
  },
  {
    id: 'bilingual',
    icon: Globe,
    titleKey: 'home:features.bilingual.title',
    descKey: 'home:features.bilingual.desc',
  },
  {
    id: 'print-pdf',
    icon: Printer,
    titleKey: 'home:features.printPdf.title',
    descKey: 'home:features.printPdf.desc',
  },
  {
    id: 'smart-validation',
    icon: CheckCircle,
    titleKey: 'home:features.smartValidation.title',
    descKey: 'home:features.smartValidation.desc',
  },
]);
