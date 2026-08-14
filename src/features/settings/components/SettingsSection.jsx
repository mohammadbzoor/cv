export function SettingsSection({ id, title, description, children }) {
  return (
    <section id={id} className="space-y-4 pb-8 border-b border-border/60 last:border-b-0 last:pb-0">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {description && <p className="text-xs text-foreground-secondary">{description}</p>}
      </div>
      <div className="pt-2">{children}</div>
    </section>
  );
}
