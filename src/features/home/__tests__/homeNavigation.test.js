import { describe, it, expect } from 'vitest';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { ROUTE_PATHS } from '../../../app/routePaths';

describe('Home & App Navigation Constants', () => {
  it('6. defines valid navigation paths matching ROUTE_PATHS', () => {
    NAVIGATION_ITEMS.forEach((item) => {
      expect(Object.values(ROUTE_PATHS)).toContain(item.path);
    });
  });

  it('7. contains primary navigation links for desktop and mobile', () => {
    const desktopItems = NAVIGATION_ITEMS.filter((i) => i.showInDesktop);
    expect(desktopItems.length).toBeGreaterThanOrEqual(5);
  });
});
