<template>
  <GenericCard
    icon="mdi-account-edit"
    icon-color="info"
    highlight-color="info"
    :fill-height="false"
    :title="$t('settings.display_name.title', 'Display Name')"
    title-classes="text-lg font-semibold"
  >
    <template #content>
      <div class="space-y-4 px-4 py-4">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <label class="text-surface-200 text-sm font-semibold">
              {{ $t('settings.display_name.label', 'Display Name') }}
            </label>
            <UTooltip
              :text="
                $t(
                  'settings.display_name.explanation',
                  'Your display name is shown to teammates and in the navigation. Each game mode (PVP/PVE) has a separate display name.'
                )
              "
            >
              <UIcon name="i-mdi-information" class="text-surface-400 h-4 w-4" />
            </UTooltip>
          </div>
          <span
            class="rounded px-2 py-1 text-xs font-bold uppercase"
            :class="currentMode === 'pvp' ? 'bg-pvp-700 text-pvp-100' : 'bg-pve-700 text-pve-100'"
          >
            {{ currentMode }}
          </span>
        </div>
        <div class="flex max-w-sm items-center gap-2">
          <UInput
            v-model="localDisplayName"
            :maxlength="displayNameMaxLength"
            :placeholder="$t('settings.display_name.placeholder', 'Enter your display name...')"
            class="flex-1"
            @keyup.enter="saveDisplayName"
          />
          <UButton
            icon="i-mdi-check"
            color="primary"
            variant="soft"
            size="sm"
            :disabled="!hasChanges || isSaving"
            :loading="isSaving"
            @click="saveDisplayName"
          >
            {{ $t('settings.display_name.save', 'Save') }}
          </UButton>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-surface-400">
            {{ localDisplayName?.length || 0 }} / {{ displayNameMaxLength }}
          </span>
          <UButton
            v-if="displayName"
            icon="i-mdi-close"
            variant="ghost"
            size="xs"
            color="neutral"
            @click="clearDisplayName"
          >
            {{ $t('settings.display_name.clear', 'Clear') }}
          </UButton>
        </div>
      </div>
    </template>
  </GenericCard>
</template>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import GenericCard from '@/components/ui/GenericCard.vue';
  import { useTarkovStore } from '@/stores/useTarkov';
  import { LIMITS } from '@/utils/constants';
  import { logger } from '@/utils/logger';
  const tarkovStore = useTarkovStore();
  const { t } = useI18n({ useScope: 'global' });
  const toast = useToast();
  const displayNameMaxLength = LIMITS.DISPLAY_NAME_MAX_LENGTH;
  const currentMode = computed(() => tarkovStore.getCurrentGameMode());
  const localDisplayName = ref(tarkovStore.getDisplayName() || '');
  const isSaving = ref(false);
  const displayName = computed(() => tarkovStore.getDisplayName());
  const hasChanges = computed(() => {
    const trimmed = localDisplayName.value.trim();
    const initial = displayName.value || '';
    return trimmed !== initial && trimmed.length > 0;
  });
  watch(displayName, (newName) => {
    localDisplayName.value = newName || '';
  });
  const saveDisplayName = async () => {
    const trimmed = localDisplayName.value.trim();
    if (!trimmed) {
      toast.add({
        title: t('settings.display_name.validation_error', 'Validation Error'),
        description: t('settings.display_name.empty_error', 'Display name cannot be empty'),
        color: 'error',
      });
      return;
    }
    if (trimmed.length > displayNameMaxLength) {
      toast.add({
        title: t('settings.display_name.validation_error', 'Validation Error'),
        description: t('settings.display_name.max_error', { max: displayNameMaxLength }),
        color: 'error',
      });
      return;
    }
    isSaving.value = true;
    try {
      const sanitized = trimmed.substring(0, displayNameMaxLength);
      tarkovStore.setDisplayName(sanitized);
      localDisplayName.value = sanitized;
      toast.add({
        title: t('settings.display_name.saved_title', 'Display Name Saved'),
        description: t('settings.display_name.saved_description', {
          mode: currentMode.value.toUpperCase(),
        }),
        color: 'success',
      });
    } catch (error) {
      logger.error('[DisplayNameCard] Error saving display name:', error);
      toast.add({
        title: t('settings.display_name.save_failed_title', 'Save Failed'),
        description: t(
          'settings.display_name.save_failed_description',
          'Failed to save display name. Please try again.'
        ),
        color: 'error',
      });
    } finally {
      isSaving.value = false;
    }
  };
  const clearDisplayName = () => {
    localDisplayName.value = '';
    tarkovStore.setDisplayName(null);
    toast.add({
      title: t('settings.display_name.cleared_title', 'Display Name Cleared'),
      description: t('settings.display_name.cleared_description', {
        mode: currentMode.value.toUpperCase(),
      }),
      color: 'success',
    });
  };
</script>
