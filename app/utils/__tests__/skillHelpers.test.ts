import { describe, expect, it } from 'vitest';
import {
  collapseSkillOffsets,
  getCanonicalSkillKey,
  normalizeSkillToken,
} from '@/utils/skillHelpers';
describe('normalizeSkillToken', () => {
  it('returns null for null', () => {
    expect(normalizeSkillToken(null)).toBeNull();
  });
  it('returns null for undefined', () => {
    expect(normalizeSkillToken(undefined)).toBeNull();
  });
  it('returns null for empty string', () => {
    expect(normalizeSkillToken('')).toBeNull();
  });
  it('returns null for whitespace-only string', () => {
    expect(normalizeSkillToken('   ')).toBeNull();
  });
  it('trims and returns valid string', () => {
    expect(normalizeSkillToken('  Strength  ')).toBe('Strength');
  });
  it('returns valid string unchanged', () => {
    expect(normalizeSkillToken('Endurance')).toBe('Endurance');
  });
});
describe('getCanonicalSkillKey', () => {
  it('prefers skillId over skillName', () => {
    expect(getCanonicalSkillKey('Starke', 'Strength')).toBe('Strength');
  });
  it('falls back to skillName when skillId is null', () => {
    expect(getCanonicalSkillKey('Starke', null)).toBe('Starke');
  });
  it('falls back to skillName when skillId is undefined', () => {
    expect(getCanonicalSkillKey('Starke')).toBe('Starke');
  });
  it('falls back to skillName when skillId is empty', () => {
    expect(getCanonicalSkillKey('Starke', '')).toBe('Starke');
  });
  it('falls back to skillName when skillId is whitespace', () => {
    expect(getCanonicalSkillKey('Starke', '   ')).toBe('Starke');
  });
  it('returns null when both are null', () => {
    expect(getCanonicalSkillKey(null, null)).toBeNull();
  });
  it('returns null when both are empty', () => {
    expect(getCanonicalSkillKey('', '')).toBeNull();
  });
});
describe('collapseSkillOffsets', () => {
  const identity = (key: string) => key;
  it('returns empty map for null offsets', () => {
    expect(collapseSkillOffsets(null, identity).size).toBe(0);
  });
  it('returns empty map for undefined offsets', () => {
    expect(collapseSkillOffsets(undefined, identity).size).toBe(0);
  });
  it('returns empty map for empty offsets', () => {
    expect(collapseSkillOffsets({}, identity).size).toBe(0);
  });
  it('passes through a single offset unchanged', () => {
    const result = collapseSkillOffsets({ Strength: 5 }, identity);
    expect(result.size).toBe(1);
    expect(result.get('Strength')?.offset).toBe(5);
    expect(result.get('Strength')?.isCanonical).toBe(true);
  });
  it('rounds offsets to two decimal places', () => {
    const result = collapseSkillOffsets({ Strength: 5.556 }, identity);
    expect(result.get('Strength')?.offset).toBe(5.56);
  });
  it('replaces non-finite offsets with 0', () => {
    const result = collapseSkillOffsets({ A: NaN, B: Infinity, C: -Infinity }, identity);
    expect(result.get('A')?.offset).toBe(0);
    expect(result.get('B')?.offset).toBe(0);
    expect(result.get('C')?.offset).toBe(0);
  });
  it('canonical entry wins over non-canonical alias', () => {
    const resolve = (key: string) => (key === 'Starke' ? 'Strength' : key);
    const result = collapseSkillOffsets({ Starke: 12, Strength: 5 }, resolve);
    expect(result.size).toBe(1);
    expect(result.get('Strength')?.offset).toBe(5);
    expect(result.get('Strength')?.sourceKey).toBe('Strength');
    expect(result.get('Strength')?.isCanonical).toBe(true);
  });
  it('canonical entry wins regardless of iteration order', () => {
    const resolve = (key: string) => (key === 'Starke' ? 'Strength' : key);
    const result = collapseSkillOffsets({ Strength: 5, Starke: 12 }, resolve);
    expect(result.size).toBe(1);
    expect(result.get('Strength')?.offset).toBe(5);
    expect(result.get('Strength')?.isCanonical).toBe(true);
  });
  it('keeps larger absolute offset when two non-canonical aliases collide', () => {
    const resolve = (key: string) => (key === 'Starke' || key === 'Kraft' ? 'Strength' : key);
    const result = collapseSkillOffsets({ Starke: 5, Kraft: 12 }, resolve);
    expect(result.size).toBe(1);
    expect(result.get('Strength')?.offset).toBe(12);
    expect(result.get('Strength')?.sourceKey).toBe('Kraft');
  });
  it('keeps larger absolute offset with negative values', () => {
    const resolve = (key: string) => (key === 'A' || key === 'B' ? 'Canonical' : key);
    const result = collapseSkillOffsets({ A: -10, B: 3 }, resolve);
    expect(result.size).toBe(1);
    expect(result.get('Canonical')?.offset).toBe(-10);
  });
  it('handles multiple independent skills', () => {
    const result = collapseSkillOffsets({ Strength: 5, Endurance: 3, Vitality: 7 }, identity);
    expect(result.size).toBe(3);
    expect(result.get('Strength')?.offset).toBe(5);
    expect(result.get('Endurance')?.offset).toBe(3);
    expect(result.get('Vitality')?.offset).toBe(7);
  });
  it('handles mix of colliding and independent skills', () => {
    const resolve = (key: string) => (key === 'Starke' ? 'Strength' : key);
    const result = collapseSkillOffsets({ Starke: 12, Strength: 5, Endurance: 3 }, resolve);
    expect(result.size).toBe(2);
    expect(result.get('Strength')?.offset).toBe(5);
    expect(result.get('Endurance')?.offset).toBe(3);
  });
});
