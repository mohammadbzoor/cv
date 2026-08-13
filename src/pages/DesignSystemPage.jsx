import { Link } from 'react-router-dom';
import { Search, Mail, Lock, AlertCircle, ArrowRight, ArrowLeft, Plus, Trash2, Download, Eye, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATHS } from '../app/routePaths';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../hooks/useLanguage';

function SectionTitle({ children }) {
  return <h2 className="text-xl font-bold text-foreground mb-1">{children}</h2>;
}

function SectionDescription({ children }) {
  return <p className="text-sm text-foreground-secondary mb-6">{children}</p>;
}

/**
 * Development-only design system showcase page.
 * Demonstrates all UI components, variants, states, design tokens, and bilingual (ar/en) layouts.
 */
export default function DesignSystemPage() {
  const { t } = useTranslation(['designSystem', 'navigation', 'common']);
  const { isRTL } = useLanguage();

  const ActionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-app-bg text-foreground font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">{t('designSystem:title')}</h1>
            <Badge variant="primary" size="sm">{t('designSystem:devPhase')}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to={ROUTE_PATHS.HOME}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>{t('navigation:home')}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">

        {/* === THEME TOGGLE & LANGUAGE SWITCHER === */}
        <section>
          <SectionTitle>{t('designSystem:themeToggleSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:themeToggleSectionDesc')}</SectionDescription>
          <div className="bg-surface rounded-xl border border-border p-6 flex items-center gap-4 flex-wrap">
            <ThemeToggle />
            <LanguageSwitcher />
            <span className="text-sm text-foreground-secondary">{t('designSystem:themeToggleInstruction')}</span>
          </div>
        </section>

        {/* === DESIGN TOKENS === */}
        <section>
          <SectionTitle>{t('designSystem:tokensSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:tokensSectionDesc')}</SectionDescription>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: 'Primary', cls: 'bg-primary' },
              { label: 'Primary Hover', cls: 'bg-primary-hover' },
              { label: 'Primary Subtle', cls: 'bg-primary-subtle' },
              { label: 'Secondary', cls: 'bg-secondary' },
              { label: 'Secondary Hover', cls: 'bg-secondary-hover' },
              { label: 'Secondary Subtle', cls: 'bg-secondary-subtle' },
              { label: 'Accent', cls: 'bg-accent' },
              { label: 'Accent Hover', cls: 'bg-accent-hover' },
              { label: 'Accent Subtle', cls: 'bg-accent-subtle' },
              { label: 'Success', cls: 'bg-success' },
              { label: 'Warning', cls: 'bg-warning' },
              { label: 'Danger', cls: 'bg-danger' },
              { label: 'Surface', cls: 'bg-surface' },
              { label: 'Surface Elevated', cls: 'bg-surface-elevated' },
              { label: 'Surface Muted', cls: 'bg-surface-muted' },
              { label: 'App Background', cls: 'bg-app-bg' },
            ].map(({ label, cls }) => (
              <div key={label} className="rounded-lg border border-border overflow-hidden">
                <div className={`h-12 ${cls}`} />
                <div className="px-3 py-2 bg-surface">
                  <span className="text-xs text-foreground-secondary font-mono">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === TYPOGRAPHY === */}
        <section>
          <SectionTitle>{t('designSystem:typographySectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:typographySectionDesc')}</SectionDescription>
          <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
            <p className="text-3xl font-extrabold text-foreground">{t('designSystem:headingMain')}</p>
            <p className="text-2xl font-bold text-foreground">{t('designSystem:headingSecondary')}</p>
            <p className="text-xl font-bold text-foreground">{t('designSystem:headingSub')}</p>
            <p className="text-lg font-semibold text-foreground">{t('designSystem:headingSmall')}</p>
            <p className="text-base text-foreground">{t('designSystem:bodyText')}</p>
            <p className="text-sm text-foreground-secondary">{t('designSystem:secondaryText')}</p>
            <p className="text-xs text-foreground-muted">{t('designSystem:mutedText')}</p>
          </div>
        </section>

        {/* === BUTTONS === */}
        <section>
          <SectionTitle>{t('designSystem:buttonsSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:buttonsSectionDesc')}</SectionDescription>

          <div className="space-y-8">
            {/* Variants */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:variantsSub')}</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">{t('designSystem:primaryBtn')}</Button>
                <Button variant="secondary">{t('designSystem:secondaryBtn')}</Button>
                <Button variant="outline">{t('designSystem:outlineBtn')}</Button>
                <Button variant="ghost">{t('designSystem:ghostBtn')}</Button>
                <Button variant="danger">{t('designSystem:dangerBtn')}</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:sizesSub')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">{t('designSystem:btnSmall')}</Button>
                <Button size="md">{t('designSystem:btnMedium')}</Button>
                <Button size="lg">{t('designSystem:btnLarge')}</Button>
                <Button size="icon" aria-label="Add item">
                  <Plus className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:withIconsSub')}</h3>
              <div className="flex flex-wrap gap-3">
                <Button leadingIcon={Download}>{t('designSystem:download')}</Button>
                <Button variant="secondary" trailingIcon={ActionArrow}>{t('designSystem:next')}</Button>
                <Button variant="danger" leadingIcon={Trash2}>{t('designSystem:delete')}</Button>
                <Button variant="outline" leadingIcon={Eye}>{t('designSystem:preview')}</Button>
              </div>
            </div>

            {/* States */}
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:statesSub')}</h3>
              <div className="flex flex-wrap gap-3">
                <Button loading>{t('designSystem:loadingBtn')}</Button>
                <Button variant="secondary" loading>{t('designSystem:savingBtn')}</Button>
                <Button disabled>{t('designSystem:disabledBtn')}</Button>
                <Button variant="outline" disabled>{t('designSystem:disabledOutline')}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* === INPUT === */}
        <section>
          <SectionTitle>{t('designSystem:inputSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:inputSectionDesc')}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Input
                label={t('designSystem:fullNameLabel')}
                placeholder={t('designSystem:fullNamePlaceholder')}
                helperText={t('designSystem:fullNameHelper')}
              />
              <Input
                label={t('designSystem:emailLabel')}
                type="email"
                placeholder={t('designSystem:emailPlaceholder')}
                startIcon={Mail}
                required
              />
              <Input
                label={t('designSystem:passwordLabel')}
                type="password"
                placeholder="••••••••"
                startIcon={Lock}
                endIcon={Eye}
              />
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Input
                label={t('designSystem:searchLabel')}
                placeholder={t('designSystem:searchPlaceholder')}
                startIcon={Search}
                helperText={t('designSystem:searchHelper')}
              />
              <Input
                label={t('designSystem:jobTitleLabel')}
                placeholder={t('designSystem:jobTitlePlaceholder')}
                error={t('designSystem:requiredFieldError')}
                endIcon={AlertCircle}
                required
              />
              <Input
                label={t('designSystem:disabledInputLabel')}
                placeholder={t('designSystem:disabledInputPlaceholder')}
                disabled
              />
            </div>
          </div>
        </section>

        {/* === TEXTAREA === */}
        <section>
          <SectionTitle>{t('designSystem:textareaSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:textareaSectionDesc')}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Textarea
                label={t('designSystem:summaryLabel')}
                placeholder={t('designSystem:summaryPlaceholder')}
                helperText={t('designSystem:summaryHelper')}
              />
              <Textarea
                label={t('designSystem:charLimitLabel')}
                placeholder={t('designSystem:charLimitPlaceholder')}
                maxLength={200}
                showCharacterCount
                defaultValue={t('designSystem:charLimitDefault')}
              />
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
              <Textarea
                label={t('designSystem:notesErrorLabel')}
                placeholder="..."
                error={t('designSystem:notesErrorMsg')}
              />
              <Textarea
                label={t('designSystem:disabledInputLabel')}
                placeholder={t('designSystem:disabledInputPlaceholder')}
                disabled
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* === CARDS === */}
        <section>
          <SectionTitle>{t('designSystem:cardsSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:cardsSectionDesc')}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>{t('designSystem:defaultCardTitle')}</CardTitle>
                <CardDescription>{t('designSystem:defaultCardDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">{t('designSystem:defaultCardContent')}</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">{t('designSystem:cardAction')}</Button>
                <Button size="sm" variant="ghost">{t('designSystem:cardCancel')}</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>{t('designSystem:elevatedCardTitle')}</CardTitle>
                <CardDescription>{t('designSystem:elevatedCardDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">{t('designSystem:elevatedCardContent')}</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">{t('designSystem:viewDetails')}</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>{t('designSystem:outlinedCardTitle')}</CardTitle>
                <CardDescription>{t('designSystem:outlinedCardDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">{t('designSystem:outlinedCardContent')}</p>
              </CardContent>
            </Card>

            <Card variant="muted">
              <CardHeader>
                <CardTitle>{t('designSystem:mutedCardTitle')}</CardTitle>
                <CardDescription>{t('designSystem:mutedCardDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">{t('designSystem:mutedCardContent')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* === BADGES === */}
        <section>
          <SectionTitle>{t('designSystem:badgesSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:badgesSectionDesc')}</SectionDescription>

          <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary mb-3">{t('designSystem:mediumSize')}</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">{t('designSystem:badgeNeutral')}</Badge>
                <Badge variant="primary">{t('designSystem:badgePrimary')}</Badge>
                <Badge variant="secondary">{t('designSystem:badgeSecondary')}</Badge>
                <Badge variant="success">{t('designSystem:badgeSuccess')}</Badge>
                <Badge variant="warning">{t('designSystem:badgeWarning')}</Badge>
                <Badge variant="danger">{t('designSystem:badgeDanger')}</Badge>
                <Badge variant="accent">{t('designSystem:badgeAccent')}</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary mb-3">{t('designSystem:smallSize')}</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral" size="sm">{t('designSystem:badgeNeutral')}</Badge>
                <Badge variant="primary" size="sm">{t('designSystem:badgePrimary')}</Badge>
                <Badge variant="secondary" size="sm">{t('designSystem:badgeSecondary')}</Badge>
                <Badge variant="success" size="sm">{t('designSystem:badgeSuccess')}</Badge>
                <Badge variant="warning" size="sm">{t('designSystem:badgeWarning')}</Badge>
                <Badge variant="danger" size="sm">{t('designSystem:badgeDanger')}</Badge>
                <Badge variant="accent" size="sm">{t('designSystem:badgeAccent')}</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* === BILINGUAL & LTR CV FIELD TEST === */}
        <section>
          <SectionTitle>{t('designSystem:bilingualTestSectionTitle')}</SectionTitle>
          <SectionDescription>{t('designSystem:bilingualTestSectionDesc')}</SectionDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interface Direction & Text Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">
                  {t('designSystem:rtlTestParagraph')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button leadingIcon={Plus} size="sm">{t('designSystem:cardAction')}</Button>
                  <Input placeholder={t('designSystem:searchPlaceholder')} startIcon={Search} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('designSystem:futureCvFieldTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label={t('designSystem:jobTitleLabel')}
                  value="Full Stack Developer"
                  dir="ltr"
                  lang="en"
                  readOnly
                  helperText={t('designSystem:futureCvFieldHelper')}
                />
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-foreground-muted">
          <p>{t('designSystem:footerText')}</p>
        </div>
      </footer>
    </div>
  );
}
