import { TEMPLATE_CATEGORIES, COMPATIBILITY_LEVELS } from '../../constants/templateConstants';

/**
 * Returns an array of active filter descriptors for rendering removable filter chips.
 *
 * @param {object} params
 * @param {string} params.searchQuery
 * @param {string} params.selectedCategory
 * @param {string} params.selectedCompatibility
 * @param {Function} params.t - translation function
 * @returns {Array<{ id: string, label: string, type: 'search' | 'category' | 'compatibility' }>}
 */
export function getAppliedFilters({ searchQuery, selectedCategory, selectedCompatibility, t }) {
  const chips = [];

  if (searchQuery?.trim()) {
    chips.push({
      id: 'filter-search',
      label: `"${searchQuery.trim()}"`,
      type: 'search',
    });
  }

  if (selectedCategory && selectedCategory !== TEMPLATE_CATEGORIES.ALL) {
    chips.push({
      id: 'filter-category',
      label: t(`categories.${selectedCategory}`, { defaultValue: selectedCategory }),
      type: 'category',
    });
  }

  if (selectedCompatibility && selectedCompatibility !== 'all') {
    chips.push({
      id: 'filter-compatibility',
      label: t(`compatibilityBadges.${selectedCompatibility}`, { defaultValue: selectedCompatibility }),
      type: 'compatibility',
    });
  }

  return chips;
}
