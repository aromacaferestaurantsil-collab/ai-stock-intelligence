import { describe, expect, it } from "vitest";
import { calculateScore } from "./scoring";
describe("calculateScore", () => {
 it("calculates a weighted score", () => { const r=calculateScore([{key:"a",label:"A",weight:75,normalizedScore:80,value:80,explanation:"test"},{key:"b",label:"B",weight:25,normalizedScore:40,value:40,explanation:"test"}],"test","2026-01-01T00:00:00.000Z"); expect(r.score).toBe(70); expect(r.coverage).toBe(1); expect(r.confidence).toBe("high"); });
 it("tracks missing data coverage", () => { const r=calculateScore([{key:"a",label:"A",weight:50,normalizedScore:90,value:90,explanation:"present"},{key:"b",label:"B",weight:50,normalizedScore:null,value:null,explanation:"missing"}]); expect(r.score).toBe(90); expect(r.coverage).toBe(.5); expect(r.confidence).toBe("low"); });
 it("handles all-missing metrics", () => { expect(calculateScore([{key:"x",label:"X",weight:100,normalizedScore:null,value:null,explanation:"missing"}]).score).toBeNull(); });
 it("rejects invalid scores", () => { expect(() => calculateScore([{key:"x",label:"X",weight:100,normalizedScore:120,value:120,explanation:"bad"}])).toThrow(); });
});
