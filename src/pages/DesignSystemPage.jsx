import { Link } from 'react-router-dom';
import { Search, Mail, Lock, AlertCircle, ArrowRight, ArrowLeft, Plus, Trash2, Download, Eye, Home, Database } from 'lucide-react';
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

import { FormControlsSection } from '../features/design-system/components/FormControlsSection';
import { NavigationSection } from '../features/design-system/components/NavigationSection';
import { OverlaysSection } from '../features/design-system/components/OverlaysSection';
import { FeedbackSection } from '../features/design-system/components/FeedbackSection';

function SectionTitle({ children }) {
  return <h2 className="text-xl font-bold text-foreground mb-1">{children}</h2>;
}

function SectionDescription({ children }) {
  return <p className="text-sm text-foreground-secondary mb-6">{children}</p>;
}

/**
 * Development-only design system showcase page.
 * Demonstrates all UI components, tokens, themes, bilingual layouts, and state primitives.
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
            <Link to={ROUTE_PATHS.CV_STORE}>
              <Button size="sm" variant="outline" leadingIcon={Database}>
                CV Store
              </Button>
            </Link>
            <Link to={ROUTE_PATHS.HOME}>
              <Button size="sm" variant="ghost" leadingIcon={Home}>
                {t('navigation:home')}
              </Button>
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Colors Section */}
        <section>
          <SectionTitle>{t('designSystem:colorPalette')}</SectionTitle>
          <SectionDescription>{t('designSystem:colorPaletteDesc')}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Deep Slate</span>
                <span className="w-6 h-6 rounded-full bg-primary border border-border" />
              </div>
              <p className="text-xs text-foreground-secondary">{t('designSystem:deepSlateDesc')}</p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Muted Sage</span>
                <span className="w-6 h-6 rounded-full bg-secondary border border-border" />
              </div>
              <p className="text-xs text-foreground-secondary">{t('designSystem:mutedSageDesc')}</p>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Soft Terracotta</span>
                <span className="w-6 h-6 rounded-full bg-accent border border-border" />
              </div>
              <p className="text-xs text-foreground-secondary">{t('designSystem:softTerracottaDesc')}</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <SectionTitle>{t('designSystem:buttons')}</SectionTitle>
          <SectionDescription>{t('designSystem:buttonsDesc')}</SectionDescription>

          <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:variants')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">{t('designSystem:primaryBtn')}</Button>
                <Button variant="secondary">{t('designSystem:secondaryBtn')}</Button>
                <Button variant="outline">{t('designSystem:outlineBtn')}</Button>
                <Button variant="ghost">{t('designSystem:ghostBtn')}</Button>
                <Button variant="danger">{t('designSystem:dangerBtn')}</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:sizes')}</h3>
              <div className="flex flex-wrap items-end gap-3">
                <Button size="sm">{t('designSystem:smallBtn')}</Button>
                <Button size="md">{t('designSystem:mediumBtn')}</Button>
                <Button size="lg">{t('designSystem:largeBtn')}</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:withIcons')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button leadingIcon={Plus}>{t('designSystem:addBtn')}</Button>
                <Button trailingIcon={ActionArrow} variant="secondary">{t('designSystem:continueBtn')}</Button>
                <Button leadingIcon={Download} variant="outline">{t('designSystem:downloadBtn')}</Button>
                <Button leadingIcon={Trash2} variant="danger">{t('designSystem:deleteBtn')}</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:states')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button loading>{t('designSystem:loadingBtn')}</Button>
                <Button disabled>{t('designSystem:disabledBtn')}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <SectionTitle>{t('designSystem:formInputs')}</SectionTitle>
          <SectionDescription>{t('designSystem:formInputsDesc')}</SectionDescription>

          <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t('designSystem:emailLabel')}
                placeholder="name@company.com"
                helperText={t('designSystem:emailHelper')}
                startIcon={Mail}
              />
              <Input
                label={t('designSystem:passwordLabel')}
                type="password"
                placeholder="••••••••"
                error={t('designSystem:passwordError')}
                startIcon={Lock}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t('designSystem:searchLabel')}
                placeholder={t('designSystem:searchPlaceholder')}
                startIcon={Search}
              />
              <Input
                label={t('designSystem:disabledInputLabel')}
                value={t('designSystem:disabledInputValue')}
                disabled
              />
            </div>

            <Textarea
              label={t('designSystem:bioLabel')}
              placeholder={t('designSystem:bioPlaceholder')}
              helperText={t('designSystem:bioHelper')}
              maxLength={200}
              showCount
            />
          </div>
        </section>

        {/* Form Controls Section */}
        <FormControlsSection />

        {/* Navigation Controls Section */}
        <NavigationSection />

        {/* Overlays Section */}
        <OverlaysSection />

        {/* Feedback Section */}
        <FeedbackSection />

        {/* Cards Section */}
        <section>
          <SectionTitle>{t('designSystem:cards')}</SectionTitle>
          <SectionDescription>{t('designSystem:cardsDesc')}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('designSystem:cardTitle1')}</CardTitle>
                <CardDescription>{t('designSystem:cardDesc1')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {t('designSystem:cardContent1')}
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">{t('designSystem:viewDetails')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('designSystem:cardTitle2')}</CardTitle>
                  <Badge variant="success">{t('designSystem:activeBadge')}</Badge>
                </div>
                <CardDescription>{t('designSystem:cardDesc2')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {t('designSystem:cardContent2')}
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="primary" className="w-full">{t('designSystem:editCv')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('designSystem:cardTitle3')}</CardTitle>
                  <Badge variant="warning">{t('designSystem:draftBadge')}</Badge>
                </div>
                <CardDescription>{t('designSystem:cardDesc3')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {t('designSystem:cardContent3')}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline" leadingIcon={Eye} className="flex-1">{t('designSystem:previewBtn')}</Button>
                <Button size="sm" variant="primary" leadingIcon={Plus} className="flex-1">{t('designSystem:createBtn')}</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <SectionTitle>{t('designSystem:badges')}</SectionTitle>
          <SectionDescription>{t('designSystem:badgesDesc')}</SectionDescription>

          <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:badgeVariants')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">{t('designSystem:primaryBadge')}</Badge>
                <Badge variant="secondary">{t('designSystem:secondaryBadge')}</Badge>
                <Badge variant="outline">{t('designSystem:outlineBadge')}</Badge>
                <Badge variant="success">{t('designSystem:successBadge')}</Badge>
                <Badge variant="warning">{t('designSystem:warningBadge')}</Badge>
                <Badge variant="error">{t('designSystem:errorBadge')}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:badgeSizes')}</h3>
              <div className="flex flex-wrap items-end gap-3">
                <Badge size="sm">{t('designSystem:smallBadge')}</Badge>
                <Badge size="md">{t('designSystem:mediumBadge')}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground-secondary">{t('designSystem:badgeWithIcons')}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" icon={AlertCircle}>{t('designSystem:atsMatchBadge')}</Badge>
                <Badge variant="warning" icon={AlertCircle}>{t('designSystem:needsReviewBadge')}</Badge>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
