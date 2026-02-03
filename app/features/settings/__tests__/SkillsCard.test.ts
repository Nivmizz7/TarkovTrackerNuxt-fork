import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';
import { createI18n } from 'vue-i18n';
import { useSkillCalculation } from '@/composables/useSkillCalculation';
import SkillsCard from '@/features/settings/SkillsCard.vue';
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {},
    de: {},
    es: {},
    fr: {},
    ru: {},
    uk: {},
    zh: {},
  },
});
// Mock dependencies
vi.mock('@/composables/useSkillCalculation');
vi.mock('@/stores/usePreferences', () => ({
  usePreferencesStore: () => ({
    getSkillSortMode: 'priority',
    setSkillSortMode: vi.fn(),
  }),
}));
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@vueuse/core')>();
  return {
    ...actual,
    useBreakpoints: () => ({
      greaterOrEqual: () => ref(true),
    }),
    breakpointsTailwind: {},
  };
});
// Mock Nuxt UI useToast (placeholder to prevent errors if invoked, though we don't verify call due to auto-import mocking complexity)
vi.stubGlobal('useToast', () => ({
  add: vi.fn(),
}));
// Mock components
const _GenericCard = { template: '<div><slot name="content" /></div>' };
const UInput = {
  template:
    '<input type="text" @keydown="$emit(\'keydown\', $event)" @input="$emit(\'update:model-value\', $event.target.value)" />',
  props: ['modelValue'],
};
const _UButton = { template: '<button />' };
const _UIcon = { template: '<div />' };
const _UTooltip = { template: '<div><slot /></div>' };
const _UBadge = { template: '<div />' };
describe('SkillsCard', () => {
  it('prevents invalid characters on keydown', async () => {
    // Setup mock
    vi.mocked(useSkillCalculation).mockReturnValue({
      calculatedQuestSkills: computed(() => ({})),
      totalSkills: computed(() => ({})),
      allSkillNames: computed(() => []),
      allGameSkills: computed(() => [
        {
          name: 'Strength',
          requiredByTasks: [],
          requiredLevels: [],
          rewardedByTasks: [],
        },
      ]),
      getSkillLevel: () => 10,
      getQuestSkillLevel: () => 5,
      getSkillOffset: () => 5,
      getSkillMetadata: () => null,
      setSkillOffset: vi.fn(),
      setTotalSkillLevel: vi.fn(),
      resetSkillOffset: vi.fn(),
    });
    const wrapper = mount(SkillsCard, {
      global: {
        plugins: [i18n],
        stubs: {
          GenericCard: _GenericCard, // We want to render GenericCard's slots
          UInput: UInput,
          UButton: _UButton,
          UIcon: _UIcon,
          UTooltip: _UTooltip,
          UBadge: _UBadge,
          // Stub any other Nuxt UI components that might cause issues
          ULink: true,
          NuxtLink: true,
          Icon: true,
        },
        mocks: {
          $t: (key: string, fallback: string) => fallback,
        },
      },
    });
    const input = wrapper.find('input');
    const customEvent = {
      key: '-',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', customEvent);
    expect(customEvent.preventDefault).toHaveBeenCalled();
    // Test 'e'
    const customEventE = {
      key: 'e',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', customEventE);
    expect(customEventE.preventDefault).toHaveBeenCalled();
    // Test '.'
    const customEventDot = {
      key: '.',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', customEventDot);
    expect(customEventDot.preventDefault).toHaveBeenCalled();
    // Test valid key (e.g., '1')
    const inputEl = input.element as HTMLInputElement;
    inputEl.value = '1';
    inputEl.selectionStart = 1;
    inputEl.selectionEnd = 1;
    const customEvent1 = {
      key: '1',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', customEvent1);
    expect(customEvent1.preventDefault).not.toHaveBeenCalled();
  });
  it('prevents input resulting in value > 51', async () => {
    vi.mocked(useSkillCalculation).mockReturnValue({
      calculatedQuestSkills: computed(() => ({})),
      totalSkills: computed(() => ({})),
      allSkillNames: computed(() => []),
      allGameSkills: computed(() => [
        { name: 'Strength', requiredByTasks: [], requiredLevels: [], rewardedByTasks: [] },
      ]),
      getSkillLevel: () => 5,
      getQuestSkillLevel: () => 0,
      getSkillOffset: () => 5,
      getSkillMetadata: () => null,
      setSkillOffset: vi.fn(),
      setTotalSkillLevel: vi.fn(),
      resetSkillOffset: vi.fn(),
    });
    const wrapper = mount(SkillsCard, {
      global: {
        plugins: [i18n],
        stubs: {
          GenericCard: _GenericCard,
          UInput: UInput,
          UButton: _UButton,
          UIcon: _UIcon,
          UTooltip: _UTooltip,
          UBadge: _UBadge,
          ULink: true,
          NuxtLink: true,
          Icon: true,
        },
        mocks: { $t: (k: string, f: string) => f },
      },
    });
    const input = wrapper.find('input');
    const inputEl = input.element as HTMLInputElement;
    // Case 1: Value is '5', typing '2' -> '52' (should block)
    inputEl.value = '5';
    inputEl.selectionStart = 1;
    inputEl.selectionEnd = 1;
    const eventBlock = {
      key: '2',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', eventBlock);
    expect(eventBlock.preventDefault).toHaveBeenCalled();
    // Case 2: Value is '5', typing '1' -> '51' (should allow)
    inputEl.value = '5';
    inputEl.selectionStart = 1;
    inputEl.selectionEnd = 1;
    const eventAllow = {
      key: '1',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', eventAllow);
    expect(eventAllow.preventDefault).not.toHaveBeenCalled();
    // Case 3: Value is '51', typing '0' -> '510' (should block)
    inputEl.value = '51';
    inputEl.selectionStart = 2;
    inputEl.selectionEnd = 2;
    const eventLength = {
      key: '0',
      preventDefault: vi.fn(),
    };
    await input.trigger('keydown', eventLength);
    expect(eventLength.preventDefault).toHaveBeenCalled();
  });
});
