import type { PositionStatus } from '@/lib/supabase/types';

/**
 * Core scoring engine for The Visio Index.
 * Normalizes raw metrics, applies weights, and produces composite scores.
 */

/** Normalize a value to 0-100 scale using min-max normalization */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

/** Apply weighted scoring to dimension scores */
export function compositeScore(
  scores: Record<string, number>,
  weights: Record<string, number>
): number {
  let total = 0;
  let weightSum = 0;

  for (const [dimension, weight] of Object.entries(weights)) {
    const score = scores[dimension];
    if (score !== undefined) {
      total += score * weight;
      weightSum += weight;
    }
  }

  if (weightSum === 0) return 0;
  return Math.round((total / weightSum) * 100) / 100;
}

/** Determine position change status */
export function getPositionStatus(
  currentRank: number,
  previousRank: number | null,
  isNewEntry: boolean
): PositionStatus {
  if (isNewEntry) return 'new';
  if (previousRank === null) return 're_entry';
  if (currentRank < previousRank) {
    // Big jump (5+ positions) = hot shot
    if (previousRank - currentRank >= 5) return 'hot_shot';
    return 'up';
  }
  if (currentRank > previousRank) return 'down';
  return 'steady';
}

/** Get the rank change delta (positive = improved) */
export function getRankDelta(currentRank: number, previousRank: number | null): number | null {
  if (previousRank === null) return null;
  return previousRank - currentRank;
}

/** Format a composite score for display */
export function formatScore(score: number): string {
  return score.toFixed(1);
}

/** Get the current chart week (Monday start) */
export function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}
