<template>
  <div class="flex flex-col gap-1.5 border-t border-white/5 px-2 py-2">
    <NuxtLink
      to="/settings"
      class="flex items-center justify-between rounded px-2 py-1 text-xs transition-colors hover:bg-white/5"
    >
      <span class="text-white/60">
        {{ t('navigation_drawer.edition_label', 'Edition') }}
      </span>
      <span class="font-medium text-white/80">{{ currentEditionName }}</span>
    </NuxtLink>
    <div
      class="flex w-full overflow-hidden rounded-md border border-white/10"
      role="group"
      aria-label="Toggle game mode"
    >
      <button
        type="button"
        class="focus:ring-pvp-400 flex flex-1 items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold uppercase transition-colors focus:z-10 focus:ring-2 focus:outline-none"
        :class="pvpClasses"
        :disabled="dataLoading"
        @click="switchMode(GAME_MODES.PVP)"
      >
        <UIcon name="i-mdi-sword-cross" class="h-3.5 w-3.5" />
        PvP
      </button>
      <div class="w-px bg-white/15" aria-hidden="true" />
      <button
        type="button"
        class="focus:ring-pve-400 flex flex-1 items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold uppercase transition-colors focus:z-10 focus:ring-2 focus:outline-none"
        :class="pveClasses"
        :disabled="dataLoading"
        @click="switchMode(GAME_MODES.PVE)"
      >
        <UIcon name="i-mdi-account-group" class="h-3.5 w-3.5" />
        PvE
      </button>
    </div>
    <div class="flex w-full overflow-hidden rounded-md border border-white/10">
      <button
        v-for="faction in factions"
        :key="faction"
        class="flex-1 px-2 py-1 text-xs font-semibold uppercase transition-colors"
        :class="
          faction === currentFaction
            ? 'bg-primary-700 text-white'
            : 'bg-transparent text-white/65 hover:bg-white/5 hover:text-white'
        "
        @click="setFaction(faction)"
      >
        {{ faction }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { useTarkovStore } from '@/stores/useTarkov';
  import { GAME_MODES, PMC_FACTIONS, type GameMode, type PMCFaction } from '@/utils/constants';
  import { logger } from '@/utils/logger';
  const { t } = useI18n({ useScope: 'global' });
  const metadataStore = useMetadataStore();
  const tarkovStore = useTarkovStore();
  const factions = PMC_FACTIONS;
  const currentFaction = computed<PMCFaction>(() => tarkovStore.getPMCFaction());
  const currentEditionName = computed(() =>
    metadataStore.getEditionName(tarkovStore.getGameEdition())
  );
  function setFaction(faction: PMCFaction) {
    if (faction !== currentFaction.value) {
      tarkovStore.setPMCFaction(faction);
    }
  }
  const currentGameMode = computed(() => tarkovStore.getCurrentGameMode());
  const pveClasses = computed(() =>
    currentGameMode.value === GAME_MODES.PVE
      ? 'bg-pve-500 hover:bg-pve-600 text-white shadow-[0_0_0_2px_rgba(0,0,0,0.45)] ring-1 ring-white/60 ring-inset outline outline-1 outline-white/40'
      : 'bg-pve-950/80 text-pve-400 hover:bg-pve-900/90'
  );
  const pvpClasses = computed(() =>
    currentGameMode.value === GAME_MODES.PVP
      ? 'bg-pvp-800 hover:bg-pvp-700 text-pvp-100 shadow-[0_0_0_2px_rgba(0,0,0,0.45)] ring-1 ring-white/60 ring-inset outline outline-1 outline-white/40'
      : 'bg-pvp-950/80 text-pvp-400 hover:bg-pvp-900/90'
  );
  const { loading: dataLoading } = storeToRefs(metadataStore);
  async function switchMode(mode: GameMode) {
    if (mode !== currentGameMode.value && !dataLoading.value) {
      dataLoading.value = true;
      try {
        await tarkovStore.switchGameMode(mode);
        metadataStore.updateLanguageAndGameMode();
        await metadataStore.fetchAllData();
      } catch (err) {
        logger.error('[DrawerGameSettings] Error switching mode:', err);
      } finally {
        dataLoading.value = false;
      }
    }
  }
</script>
