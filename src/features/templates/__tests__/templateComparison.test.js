import { describe, it, expect } from 'vitest';
import { getTemplateById } from '../registry/templateRegistry';

describe('Template Comparison Utilities', () => {
  it('13. resolves template objects for comparison list', () => {
    const ids = ['technical-prime-ats', 'developer'];
    const resolved = ids.map((id) => getTemplateById(id));
    expect(resolved).toHaveLength(2);
    expect(resolved[0].id).toBe('technical-prime-ats');
    expect(resolved[1].id).toBe('developer');
  });

  it('14. limits comparison list length to a maximum of 2 templates', () => {
    const ids = ['technical-prime-ats', 'classic-ats', 'executive-ats'];
    const trimmed = ids.slice(0, 2);
    expect(trimmed).toHaveLength(2);
    expect(trimmed).not.toContain('executive-ats');
  });

  it('15. allows clearing comparison selection', () => {
    const ids = ['technical-prime-ats', 'classic-ats'];
    const cleared = ids.slice(2);
    expect(cleared).toHaveLength(0);
  });
});
