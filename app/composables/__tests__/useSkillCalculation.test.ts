/**
 * Test file for useSkillCalculation composable
 */
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSkillCalculation } from '@/composables/useSkillCalculation';
import { useMetadataStore } from '@/stores/useMetadata';
import { MAX_SKILL_LEVEL } from '@/utils/constants';
import { logger } from '@/utils/logger';
// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));
describe('useSkillCalculation', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const metadataStore = useMetadataStore();
    metadataStore.tasks = [];
    vi.clearAllMocks();
  });
  it('sets total skill level correctly', () => {
    const { setTotalSkillLevel, totalSkills } = useSkillCalculation();
    const skillName = 'Strength';
    expect(setTotalSkillLevel(skillName, 10)).toBe(true);
    expect(totalSkills.value[skillName]).toBe(10);
  });
  it('validates and clamps totalLevel input', () => {
    const { setTotalSkillLevel, totalSkills } = useSkillCalculation();
    const skillName = 'Strength';
    expect(setTotalSkillLevel(skillName, -5)).toBe(true);
    expect(totalSkills.value[skillName] || 0).toBe(0);
    expect(setTotalSkillLevel(skillName, 100)).toBe(true);
    expect(totalSkills.value[skillName]).toBe(MAX_SKILL_LEVEL);
    expect(setTotalSkillLevel(skillName, NaN)).toBe(false);
    expect(totalSkills.value[skillName]).toBe(MAX_SKILL_LEVEL);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid totalLevel "NaN" for skill "Strength"')
    );
    const previousValue = totalSkills.value[skillName];
    expect(setTotalSkillLevel(skillName, Infinity)).toBe(false);
    expect(totalSkills.value[skillName]).toBe(previousValue);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid totalLevel "Infinity" for skill "Strength"')
    );
  });
  it('coerces totalLevel to integer', () => {
    const { setTotalSkillLevel, totalSkills } = useSkillCalculation();
    const skillName = 'Strength';
    expect(setTotalSkillLevel(skillName, 10.7)).toBe(true);
    expect(totalSkills.value[skillName]).toBe(10);
  });
});
