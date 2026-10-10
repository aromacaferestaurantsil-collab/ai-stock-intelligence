export type Market = "IN" | "US";
export type AssetType = "equity" | "etf" | "mutual_fund" | "commodity" | "future" | "index";
export type Category = "metals" | "consumer_goods" | "manufacturing" | "energy" | "technology" | "banking" | "healthcare" | "infrastructure" | "other";
export interface Instrument { id: string; symbol: string; name: string; market: Market; assetType: AssetType; category: Category; currency: "INR" | "USD"; exchange?: string; }
export interface ScoreComponent { key: string; label: string; weight: number; value: number | null; points: number | null; explanation: string; }
export interface ScoreResult { score: number | null; confidence: "high" | "medium" | "low" | "insufficient_data"; coverage: number; components: ScoreComponent[]; version: string; calculatedAt: string; }
export interface MarketDataStamp { source: string; observedAt: string; receivedAt: string; delayed: boolean; currency: "INR" | "USD"; }
