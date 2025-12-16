<template>
  <UContainer class="px-4 py-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header class="text-center">
        <h1 class="text-4xl font-bold text-white sm:text-5xl">
          {{ t('page.credits.title') }}
        </h1>
      </header>
      <div class="grid gap-6 md:grid-cols-2">
        <section
          v-for="section in creditSections"
          :key="section.key"
          :class="[
            'rounded-2xl border border-white/10 bg-surface-900/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]',
            section.fullWidth ? 'md:col-span-2' : '',
          ]"
        >
          <div class="mb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300/80">
              {{ section.pretitle }}
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-white">
              {{ t(`page.credits.sections.${section.key}`) }}
            </h2>
          </div>
          <ul class="space-y-3">
            <li
              v-for="member in section.members"
              :key="member.name"
              class="rounded-xl bg-white/5 px-4 py-3 text-lg font-medium text-white"
            >
              <a
                v-if="member.link"
                :href="member.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 transition-colors hover:text-primary-200"
              >
                <NuxtImg
                  v-if="member.avatar"
                  :src="member.avatar"
                  :alt="member.name"
                  class="h-12 w-12 rounded-full border border-white/20 object-cover"
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <span>{{ member.name }}</span>
              </a>
              <div v-else class="flex items-center gap-3">
                <NuxtImg
                  v-if="member.avatar"
                  :src="member.avatar"
                  :alt="member.name"
                  class="h-12 w-12 rounded-full border border-white/20 object-cover"
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <span>{{ member.name }}</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n({ useScope: 'global' });
  const githubAvatar = (username: string) => `https://github.com/${username}.png?size=120`;
  const githubProfile = (username: string) => `https://github.com/${username}`;
  const creditSections = computed(() => [
    {
      key: 'original_creator',
      pretitle: t('page.credits.labels.creators'),
      members: [
        {
          name: 'Thaddeus',
          avatar: githubAvatar('thaddeus'),
          link: githubProfile('thaddeus'),
        },
      ],
    },
    {
      key: 'staff',
      pretitle: t('page.credits.labels.staff'),
      members: [
        { name: 'DysektAI', avatar: githubAvatar('dysektai'), link: githubProfile('dysektai') },
        { name: 'Niv', avatar: githubAvatar('nivmizz7'), link: githubProfile('nivmizz7') },
        { name: 'Chica', avatar: githubAvatar('chica999'), link: githubProfile('chica999') },
      ],
    },
    {
      key: 'beta_testers',
      pretitle: t('page.credits.labels.testers'),
      members: [
        { name: 'Adelia' },
        { name: 'Dio' },
        { name: 'Giribaldi_TTV' },
        { name: 'Makujo' },
        { name: 'Medivha' },
        { name: 'mike' },
      ],
      fullWidth: true,
    },
  ]);
</script>
