<template>
  <div class="mb-4">
    <div v-if="preferencesStore.birthdayBannerDismissed" class="flex justify-center">
      <UButton
        icon="i-mdi-party-popper"
        color="neutral"
        variant="ghost"
        size="xs"
        :label="t('page.dashboard.birthday_banner.show')"
        @click="restore"
      />
    </div>
    <div
      v-else
      class="birthday-banner relative overflow-hidden rounded-xl px-4 py-3 sm:px-5 sm:py-4"
    >
      <div class="birthday-confetti pointer-events-none absolute inset-0" aria-hidden="true">
        <span v-for="i in 20" :key="i" class="confetti-piece" :style="confettiStyle(i)" />
      </div>
      <div class="birthday-shimmer pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div class="flex min-w-0 flex-1 items-start gap-3">
          <UIcon
            name="i-mdi-party-popper"
            class="birthday-bounce text-warning-300 mt-0.5 h-6 w-6 shrink-0 drop-shadow-[0_0_6px_var(--color-warning-400)]"
          />
          <div class="min-w-0 flex-1">
            <div class="text-warning-200 mb-1 text-sm font-bold tracking-wide">
              {{ t('page.dashboard.birthday_banner.title') }}
            </div>
            <p class="text-surface-300 text-xs leading-relaxed sm:text-sm">
              {{ t('page.dashboard.birthday_banner.message') }}
            </p>
            <p class="text-surface-400 mt-1.5 text-xs leading-relaxed">
              {{ t('page.dashboard.birthday_banner.shoutout') }}
              <NuxtLink
                to="/credits"
                class="text-primary-400 hover:text-primary-300 ml-1 font-semibold underline underline-offset-2 transition-colors"
              >
                {{ t('page.dashboard.birthday_banner.credits_link') }}
              </NuxtLink>
            </p>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2 pl-9 sm:pl-0">
          <a
            href="https://ko-fi.com/dysektai"
            target="_blank"
            rel="noopener noreferrer"
            class="birthday-cta inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md sm:text-sm"
          >
            <UIcon name="i-mdi-heart" class="birthday-heart h-4 w-4" />
            {{ t('page.dashboard.birthday_banner.support_button') }}
          </a>
          <UButton
            icon="i-mdi-close"
            color="neutral"
            variant="ghost"
            size="xs"
            class="relative z-10"
            :aria-label="t('page.dashboard.birthday_banner.dismiss')"
            :title="t('page.dashboard.birthday_banner.dismiss')"
            @click="dismiss"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { usePreferencesStore } from '@/stores/usePreferences';
  const { t } = useI18n({ useScope: 'global' });
  const preferencesStore = usePreferencesStore();
  const dismiss = () => {
    preferencesStore.setBirthdayBannerDismissed(true);
  };
  const restore = () => {
    preferencesStore.setBirthdayBannerDismissed(false);
  };
  const CONFETTI_COLORS = [
    'var(--color-warning-300)',
    'var(--color-warning-400)',
    'var(--color-primary-400)',
    'var(--color-error-300)',
    'var(--color-info-300)',
    'var(--color-success-300)',
  ];
  const confettiStyle = (i: number) => {
    const left = ((i * 37 + 13) % 100).toFixed(1);
    const delay = ((i * 0.7) % 5).toFixed(2);
    const duration = (3 + (i % 4)).toFixed(1);
    const size = 4 + (i % 4);
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const rotation = (i * 47) % 360;
    return {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      '--rotation': `${rotation}deg`,
    } as Record<string, string>;
  };
</script>
