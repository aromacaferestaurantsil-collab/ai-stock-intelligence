import type { ScoreComponent, ScoreResult } from "./index";
export const FUNDAMENTAL_WEIGHTS = { profitability: 25, growth: 20, financialHealth: 20, valuation: 20, cashFlowQuality: 15 } as const;
export const TECHNICAL_WEIGHTS = { trend: 30, momentum: 25, volume: 15, indicators: 15, volatility: 15 } as const;
export type MetricInput = { key: string; label: string; weight: number; normalizedScore: number | null; value: number | null; explanation: string; };
/** Deterministic weighted score. Normalize metrics by sector before calling. Missing metrics lower coverage. */
export function calculateScore(metrics: MetricInput[], version = "v1.0.0", now = new Date().toISOString()): ScoreResult {
  if (!metrics.length) return { score: null, confidence: "insufficient_data", coverage: 0, components: [], version, calculatedAt: now };
  const totalWeight = metrics.reduce((s, m) => s + m.weight, 0);
  if (totalWeight <= 0 || metrics.some(m => !Number.isFinite(m.weight) || m.weight < 0)) throw new Error("Metric weights must be finite, non-negative, and have a positive total.");
  for (const m of metrics) if (m.normalizedScore !== null && (!Number.isFinite(m.normalizedScore) || m.normalizedScore < 0 || m.normalizedScore > 100)) throw new Error(`Normalized score for ${m.key} must be between 0 and 100.`);
  const available = metrics.filter(m => m.normalizedScore !== null);
  const availableWeight = available.reduce((s, m) => s + m.weight, 0);
  const coverage = availableWeight / totalWeight;
  const weighted = availableWeight ? available.reduce((s, m) => s + (m.normalizedScore as number) * m.weight, 0) / availableWeight : null;
  const confidence: ScoreResult["confidence"] = weighted === null ? "insufficient_data" : coverage >= .85 ? "high" : coverage >= .6 ? "medium" : "low";
  const components: ScoreComponent[] = metrics.map(m => ({ key:m.key,label:m.label,weight:m.weight,value:m.value,points:m.normalizedScore === null ? null : Math.round(m.normalizedScore * m.weight) / 100,explanation:m.explanation }));
  return { score: weighted === null ? null : Math.round(weighted * 10) / 10, confidence, coverage: Math.round(coverage * 1000) / 1000, components, version, calculatedAt: now };
}
