import { describe, it, expect } from 'vitest';
import { fuzzyMatch, fuzzyMatchScore } from '@/utils/fuzzySearch';
describe('fuzzySearch', () => {
  describe('fuzzyMatch', () => {
    it('returns true for exact match', () => {
      expect(fuzzyMatch('Hello World', 'Hello')).toBe(true);
    });
    it('returns true for case-insensitive match', () => {
      expect(fuzzyMatch('Hello World', 'hello')).toBe(true);
    });
    it('returns true for multi-word match (AND logic)', () => {
      expect(fuzzyMatch('AK-74M assault rifle', 'ak 74m')).toBe(true);
    });
    it('returns true for subsequence match', () => {
      expect(fuzzyMatch('Salewa First Aid Kit', 'salewa')).toBe(true);
      expect(fuzzyMatch('Salewa First Aid Kit', 'sfak')).toBe(true); // s-f-a-k
    });
    it('returns false when words are missing', () => {
      expect(fuzzyMatch('AK-74M', 'ak 47')).toBe(false);
    });
    it('handles empty query', () => {
      expect(fuzzyMatch('Anything', '')).toBe(true);
    });
    it('handles empty text', () => {
      expect(fuzzyMatch('', 'query')).toBe(false);
    });
    it('handles diacritics', () => {
      expect(fuzzyMatch('café', 'cafe')).toBe(true);
      expect(fuzzyMatch('Crème Brûlée', 'creme brulee')).toBe(true);
    });
  });
  describe('fuzzyMatchScore', () => {
    it('scores exact match highest', () => {
      expect(fuzzyMatchScore('test', 'test')).toBe(1);
    });
    it('scores startsWith high', () => {
      expect(fuzzyMatchScore('testing', 'test')).toBe(0.9);
    });
    it('scores includes high', () => {
      expect(fuzzyMatchScore('my testing', 'test')).toBe(0.8);
    });
    it('scores partial word matches', () => {
      // "ak" matches, "47" does not match "AK-74"
      const score = fuzzyMatchScore('AK-74', 'ak 47');
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThan(0.8);
    });
  });
});
