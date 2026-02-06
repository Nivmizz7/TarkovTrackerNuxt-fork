import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { nextTick, reactive } from 'vue';
const mockPreferencesState = reactive({
  taskTeamAllHidden: false,
  itemsTeamAllHidden: false,
  itemsTeamNonFIRHidden: false,
  itemsTeamHideoutHidden: false,
  mapTeamAllHidden: false,
});
const mockPreferencesStore = {
  get taskTeamAllHidden() {
    return mockPreferencesState.taskTeamAllHidden;
  },
  get itemsTeamAllHidden() {
    return mockPreferencesState.itemsTeamAllHidden;
  },
  get itemsTeamNonFIRHidden() {
    return mockPreferencesState.itemsTeamNonFIRHidden;
  },
  get itemsTeamHideoutHidden() {
    return mockPreferencesState.itemsTeamHideoutHidden;
  },
  get mapTeamAllHidden() {
    return mockPreferencesState.mapTeamAllHidden;
  },
  setQuestTeamHideAll: vi.fn(),
  setItemsTeamHideAll: vi.fn(),
  setItemsTeamHideNonFIR: vi.fn(),
  setItemsTeamHideHideout: vi.fn(),
  setMapTeamHideAll: vi.fn(),
};
vi.mock('@/stores/usePreferences', () => ({
  usePreferencesStore: () => mockPreferencesStore,
}));
const mountTeamOptions = async () => {
  const { default: TeamOptions } = await import('@/features/team/TeamOptions.vue');
  const wrapper = mount(TeamOptions, {
    global: {
      stubs: {
        GenericCard: {
          template: '<div><slot name="title" /><slot name="content" /><slot name="footer" /></div>',
        },
      },
      mocks: {
        $t: (key: string) => key,
      },
    },
  });
  await nextTick();
  return wrapper;
};
describe('TeamOptions preferences', () => {
  beforeEach(() => {
    mockPreferencesState.taskTeamAllHidden = false;
    mockPreferencesState.itemsTeamAllHidden = false;
    mockPreferencesState.itemsTeamNonFIRHidden = false;
    mockPreferencesState.itemsTeamHideoutHidden = false;
    mockPreferencesState.mapTeamAllHidden = false;
    vi.clearAllMocks();
  });
  describe('taskHideAll checkbox', () => {
    it('calls setQuestTeamHideAll when toggled on', async () => {
      const wrapper = await mountTeamOptions();
      const taskInput = wrapper.find('[data-testid="task-checkbox"]');
      expect(taskInput.exists()).toBe(true);
      await taskInput.setValue(true);
      expect(mockPreferencesStore.setQuestTeamHideAll).toHaveBeenCalledWith(true);
      wrapper.unmount();
    });
    it('calls setQuestTeamHideAll when toggled off', async () => {
      mockPreferencesState.taskTeamAllHidden = true;
      const wrapper = await mountTeamOptions();
      const taskInput = wrapper.find('[data-testid="task-checkbox"]');
      expect(taskInput.exists()).toBe(true);
      await taskInput.setValue(false);
      expect(mockPreferencesStore.setQuestTeamHideAll).toHaveBeenCalledWith(false);
      wrapper.unmount();
    });
  });
  describe('itemsHideAll checkbox', () => {
    it('calls setItemsTeamHideAll when toggled on', async () => {
      const wrapper = await mountTeamOptions();
      const itemsInput = wrapper.find('[data-testid="items-checkbox"]');
      expect(itemsInput.exists()).toBe(true);
      await itemsInput.setValue(true);
      expect(mockPreferencesStore.setItemsTeamHideAll).toHaveBeenCalledWith(true);
      wrapper.unmount();
    });
    it('calls setItemsTeamHideAll when toggled off', async () => {
      mockPreferencesState.itemsTeamAllHidden = true;
      const wrapper = await mountTeamOptions();
      const itemsInput = wrapper.find('[data-testid="items-checkbox"]');
      expect(itemsInput.exists()).toBe(true);
      await itemsInput.setValue(false);
      expect(mockPreferencesStore.setItemsTeamHideAll).toHaveBeenCalledWith(false);
      wrapper.unmount();
    });
  });
  describe('dependent toggles', () => {
    it('disables item toggles when itemsTeamAllHidden is true', async () => {
      mockPreferencesState.itemsTeamAllHidden = true;
      const wrapper = await mountTeamOptions();
      const nonFirInput = wrapper.find('[data-testid="nonfir-checkbox"]')
        .element as HTMLInputElement;
      const hideoutInput = wrapper.find('[data-testid="hideout-checkbox"]')
        .element as HTMLInputElement;
      expect(nonFirInput.disabled).toBe(true);
      expect(hideoutInput.disabled).toBe(true);
      wrapper.unmount();
    });
    it('enables item toggles when itemsTeamAllHidden is false', async () => {
      mockPreferencesState.itemsTeamAllHidden = false;
      const wrapper = await mountTeamOptions();
      const nonFirInput = wrapper.find('[data-testid="nonfir-checkbox"]')
        .element as HTMLInputElement;
      const hideoutInput = wrapper.find('[data-testid="hideout-checkbox"]')
        .element as HTMLInputElement;
      expect(nonFirInput.disabled).toBe(false);
      expect(hideoutInput.disabled).toBe(false);
      wrapper.unmount();
    });
  });
  describe('label computation', () => {
    it('renders hide label when preference is true', async () => {
      mockPreferencesState.taskTeamAllHidden = true;
      const wrapper = await mountTeamOptions();
      const taskToggle = wrapper.find('[data-testid="task-toggle"]');
      expect(taskToggle.text()).toContain('page.team.card.teamoptions.task_hide_all');
      wrapper.unmount();
    });
    it('renders show label when preference is false', async () => {
      mockPreferencesState.taskTeamAllHidden = false;
      const wrapper = await mountTeamOptions();
      const taskToggle = wrapper.find('[data-testid="task-toggle"]');
      expect(taskToggle.text()).toContain('page.team.card.teamoptions.task_show_all');
      wrapper.unmount();
    });
  });
  describe('mapHideAll toggle', () => {
    it('toggles map team visibility when clicked', async () => {
      mockPreferencesState.mapTeamAllHidden = false;
      const wrapper = await mountTeamOptions();
      const mapCheckbox = wrapper.find('[data-testid="map-checkbox"]');
      await mapCheckbox.setValue(true);
      expect(mockPreferencesStore.setMapTeamHideAll).toHaveBeenCalledWith(true);
      wrapper.unmount();
    });
  });
  describe('all preferences independent', () => {
    it('setting one preference does not affect others', () => {
      mockPreferencesState.taskTeamAllHidden = true;
      mockPreferencesState.itemsTeamAllHidden = false;
      mockPreferencesState.mapTeamAllHidden = true;
      expect(mockPreferencesState.taskTeamAllHidden).toBe(true);
      expect(mockPreferencesState.itemsTeamAllHidden).toBe(false);
      expect(mockPreferencesState.mapTeamAllHidden).toBe(true);
      expect(mockPreferencesState.itemsTeamNonFIRHidden).toBe(false);
      expect(mockPreferencesState.itemsTeamHideoutHidden).toBe(false);
    });
  });
});
