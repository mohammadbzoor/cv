import { z } from 'zod';

/**
 * Zod validation schemas for Intelligence Services API responses.
 */

export const analysisResponseSchema = z.object({
  id: z.string().min(1),
  overallScore: z.number().min(0).max(100),
  categories: z.object({
    structure: z.number().min(0).max(100),
    readability: z.number().min(0).max(100),
    impact: z.number().min(0).max(100),
    atsCompatibility: z.number().min(0).max(100),
    completeness: z.number().min(0).max(100),
  }),
  strengths: z.array(
    z.object({
      id: z.string().min(1),
      code: z.string().min(1),
      message: z.string().min(1),
    })
  ),
  weaknesses: z.array(
    z.object({
      id: z.string().min(1),
      code: z.string().min(1),
      message: z.string().min(1),
      fieldPath: z.string().nullable(),
    })
  ),
  recommendations: z.array(
    z.object({
      id: z.string().min(1),
      code: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      fieldPath: z.string().nullable(),
      priority: z.enum(['low', 'medium', 'high']),
    })
  ),
  analyzedAt: z.string(),
  source: z.literal('mock'),
});

export const matchResponseSchema = z.object({
  id: z.string().min(1),
  matchScore: z.number().min(0).max(100),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  keywordSuggestions: z.array(z.string()),
  experienceAlignment: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      status: z.enum(['strong', 'partial', 'missing']),
      explanation: z.string().min(1),
    })
  ),
  recommendations: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      fieldPath: z.string().nullable(),
      priority: z.enum(['low', 'medium', 'high']),
    })
  ),
  summary: z.string(),
  matchedAt: z.string(),
  source: z.literal('mock'),
});

export const suggestionItemSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['replace', 'append', 'remove']),
  fieldPath: z.string().min(1),
  originalValue: z.string(),
  suggestedValue: z.string(),
  reason: z.string().min(1),
  category: z.enum(['clarity', 'impact', 'grammar', 'ats', 'conciseness']),
  status: z.enum(['pending', 'accepted', 'rejected']),
});

export const improvementResponseSchema = z.object({
  id: z.string().min(1),
  suggestions: z.array(suggestionItemSchema),
  summary: z.object({
    total: z.number().min(0),
    highImpact: z.number().min(0),
    categories: z.array(z.string()),
  }),
  improvedAt: z.string(),
  source: z.literal('mock'),
});
