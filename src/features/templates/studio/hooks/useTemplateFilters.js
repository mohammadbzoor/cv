import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TEMPLATE_CATEGORIES } from '../../constants/templateConstants';
import { getAppliedFilters } from '../utils/getAppliedFilters';

export function useTemplateFilters(allTemplates = []) {
  const { t } = useTranslation('templates');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(TEMPLATE_CATEGORIES.ALL);
  const [selectedCompatibility, setSelectedCompatibility] = useState('all');

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(TEMPLATE_CATEGORIES.ALL);
    setSelectedCompatibility('all');
  }, []);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCategory !== TEMPLATE_CATEGORIES.ALL || selectedCompatibility !== 'all'
  );

  const appliedFilters = useMemo(() => {
    return getAppliedFilters({ searchQuery, selectedCategory, selectedCompatibility, t });
  }, [searchQuery, selectedCategory, selectedCompatibility, t]);

  const removeFilterChip = useCallback((filterType) => {
    if (filterType === 'search') setSearchQuery('');
    if (filterType === 'category') setSelectedCategory(TEMPLATE_CATEGORIES.ALL);
    if (filterType === 'compatibility') setSelectedCompatibility('all');
  }, []);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((item) => {
      const name = t(item.nameKey, { defaultValue: item.id }).toLowerCase();
      const desc = t(item.descriptionKey, { defaultValue: '' }).toLowerCase();
      const roles = (item.recommendedFor || []).join(' ').toLowerCase();
      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !q || name.includes(q) || desc.includes(q) || roles.includes(q) || item.category.includes(q);

      const matchesCategory =
        selectedCategory === TEMPLATE_CATEGORIES.ALL || item.category === selectedCategory;

      const matchesCompatibility =
        selectedCompatibility === 'all' || item.compatibilityLevel === selectedCompatibility;

      return matchesSearch && matchesCategory && matchesCompatibility;
    });
  }, [allTemplates, searchQuery, selectedCategory, selectedCompatibility, t]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCompatibility,
    setSelectedCompatibility,
    clearFilters,
    hasActiveFilters,
    appliedFilters,
    removeFilterChip,
    filteredTemplates,
  };
}
