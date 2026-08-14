export function HomeSectionHeader({ eyebrow, title, description, centered = true }) {
  return (
    <div className={`space-y-2 max-w-2xl ${centered ? 'mx-auto text-center' : 'text-start'}`}>
      {eyebrow && (
        <div className="inline-block px-3 py-1 bg-primary-subtle text-primary text-[11px] font-bold rounded-md uppercase tracking-wider">
          {eyebrow}
        </div>
      )}

      {title && (
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
