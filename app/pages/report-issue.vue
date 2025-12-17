<template>
  <div class="bg-surface-950 min-h-screen px-4 py-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section
        class="border-white/10 bg-surface-900/80 rounded-3xl border p-8 shadow-2xl shadow-black/40 backdrop-blur"
      >
        <div class="flex flex-col gap-6 md:flex-row md:items-start">
          <div class="bg-primary-500/10 flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-primary-500/30">
            <NuxtImg
              src="/img/icons/report-bug.png"
              alt="Bug report icon"
              class="h-10 w-10"
              width="40"
              height="40"
            />
          </div>
          <div class="flex-1">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">
              {{ $t('page.report_issue.hero_tagline') }}
            </p>
            <h1 class="mt-3 text-4xl font-semibold text-white">
              {{ $t('page.report_issue.title') }}
            </h1>
            <p class="mt-4 text-base text-white/70">
              {{ $t('page.report_issue.subtitle') }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <UBadge
                v-for="highlight in heroHighlights"
                :key="highlight"
                size="sm"
                color="primary"
                variant="soft"
                class="text-[11px] uppercase tracking-widest"
              >
                {{ highlight }}
              </UBadge>
            </div>
          </div>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div
            v-for="step in workflowSteps"
            :key="step.title"
            class="bg-white/5 rounded-2xl border border-white/10 p-4"
          >
            <div class="flex items-center gap-3">
              <div class="bg-primary-500/10 text-primary-200 flex h-10 w-10 items-center justify-center rounded-full">
                <UIcon :name="step.icon" class="h-5 w-5" />
              </div>
              <p class="text-sm font-semibold text-white/90">{{ step.title }}</p>
            </div>
            <p class="mt-3 text-sm text-white/60">
              {{ step.description }}
            </p>
          </div>
        </div>
      </section>
      <div class="space-y-4">
        <UAlert
          v-if="successMessage"
          color="success"
          variant="soft"
          :title="$t('page.report_issue.form.success_title')"
        >
          <template #description>
            <p class="text-sm text-white/80">
              {{ $t('page.report_issue.form.success_body') }}
            </p>
            <div v-if="createdIssueUrl" class="mt-3">
              <UButton
                :href="createdIssueUrl"
                target="_blank"
                icon="i-heroicons-arrow-top-right-on-square-20-solid"
                color="success"
                variant="solid"
              >
                {{ $t('page.report_issue.form.view_issue') }}
              </UButton>
            </div>
          </template>
        </UAlert>
        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="$t('page.report_issue.form.error_title')"
          :description="errorMessage"
        />
        <form class="space-y-6" @submit.prevent="submitIssue">
          <div class="border-white/10 bg-surface-900/40 rounded-3xl border p-6 shadow-xl shadow-black/20">
            <div class="grid gap-6 xl:grid-cols-[2fr,1fr]">
              <div class="space-y-6">
                <div class="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <p class="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    {{ $t('page.report_issue.form.details_heading') }}
                  </p>
                  <div class="mt-4 grid gap-4 md:grid-cols-3">
                    <div class="md:col-span-3">
                    <label class="text-sm font-medium text-white/80">
                      {{ $t('page.report_issue.form.title') }} :
                    </label>
                      <UInput
                        v-model="form.title"
                        class="mt-2"
                        :disabled="submitting"
                        required
                        maxlength="200"
                      />
                    </div>
                    <div>
                    <label class="text-sm font-medium text-white/80">
                      {{ $t('page.report_issue.form.type') }} :
                    </label>
                      <USelectMenu
                        v-model="form.issueType"
                        :items="issueTypeOptions"
                        option-attribute="label"
                        value-attribute="value"
                        class="mt-2"
                        :disabled="submitting"
                      >
                        <template #leading>
                          <UIcon :name="issueTypeIcon" class="h-4 w-4 text-white/80" />
                        </template>
                        <template #item="{ item }">
                          <div class="flex items-center gap-2">
                            <UIcon :name="item.icon" class="h-4 w-4" />
                            <span>{{ item.label }}</span>
                          </div>
                        </template>
                      </USelectMenu>
                    </div>
                    <div>
                    <label class="text-sm font-medium text-white/80">
                      {{ $t('page.report_issue.form.severity') }} :
                    </label>
                      <USelectMenu
                        v-model="form.severity"
                        :items="severityOptions"
                        option-attribute="label"
                        value-attribute="value"
                        class="mt-2"
                        :disabled="submitting"
                      >
                        <template #leading>
                          <UIcon :name="severityIcon" class="h-4 w-4 text-white/80" />
                        </template>
                        <template #item="{ item }">
                          <div class="flex items-center gap-2">
                            <UIcon :name="item.icon" class="h-4 w-4" />
                            <span>{{ item.label }}</span>
                          </div>
                        </template>
                      </USelectMenu>
                    </div>
                    <div>
                    <label class="text-sm font-medium text-white/80">
                      {{ $t('page.report_issue.form.page_url') }} :
                    </label>
                      <UInput
                        v-model="form.pageUrl"
                        class="mt-2"
                        :disabled="submitting"
                        placeholder="https://tarkovtracker.org/page"
                      />
                      <UButton
                        variant="ghost"
                        color="neutral"
                        size="xs"
                        class="mt-2"
                        type="button"
                        @click="refreshPageUrl"
                      >
                        {{ $t('page.report_issue.form.refresh_url') }}
                      </UButton>
                    </div>
                  </div>
                </div>
                <div class="bg-white/5 rounded-2xl border border-white/10 p-4 xl:col-span-2">
                  <div class="flex flex-col gap-6 xl:flex-row">
                    <div class="space-y-2 xl:flex-1">
                    <label class="text-sm font-semibold text-white/80">
                      {{ $t('page.report_issue.form.description') }} :
                    </label>
                    <textarea
                      v-model="form.description"
                      rows="12"
                      :disabled="submitting"
                      required
                      :placeholder="$t('page.report_issue.form.context_subtitle')"
                      class="block w-full min-h-[360px] resize-y bg-transparent px-1 py-1 text-base leading-relaxed text-white placeholder:text-white/35 focus:outline-none focus-visible:outline-none disabled:opacity-60"
                    />
                  </div>
                    <div class="space-y-2 xl:flex-1">
                    <label class="text-sm font-semibold text-white/80">
                      {{ $t('page.report_issue.form.steps') }} :
                    </label>
                    <textarea
                      v-model="form.steps"
                      rows="12"
                      :disabled="submitting"
                      :placeholder="$t('page.report_issue.form.steps')"
                      class="block w-full min-h-[360px] resize-y bg-transparent px-1 py-1 text-base leading-relaxed text-white placeholder:text-white/35 focus:outline-none focus-visible:outline-none disabled:opacity-60"
                    />
                  </div>
                </div>
                </div>
                <div class="grid gap-6 md:grid-cols-2">
                  <div class="space-y-4">
                    <div class="flex flex-wrap items-center gap-3">
                      <label class="text-sm font-medium text-white/80">
                        {{ $t('page.report_issue.form.environment') }} :
                      </label>
                      <UCheckbox
                        v-model="includeEnvironment"
                        size="sm"
                        :label="$t('page.report_issue.form.environment_toggle_label')"
                      />
                    </div>
                    <UInput
                      v-model="form.environment"
                      class="mt-2"
                      :disabled="submitting || !includeEnvironment"
                      placeholder="Chrome 121 / Windows 11"
                    />
                    <p class="mt-1 text-xs text-white/40">
                      {{
                        includeEnvironment
                          ? $t('page.report_issue.form.environment_toggle_helper_on')
                          : $t('page.report_issue.form.environment_toggle_helper_off')
                      }}
                    </p>
                  </div>
                  <div class="space-y-4">
                    <div>
                      <label class="text-sm font-medium text-white/80">
                        {{ $t('page.report_issue.form.contact') }} :
                      </label>
                      <UInput
                        v-model="form.contact"
                        class="mt-2"
                        :disabled="submitting"
                        :placeholder="$t('page.report_issue.form.contact_placeholder')"
                      />
                      <p class="mt-1 text-xs text-white/40">
                        {{ $t('page.report_issue.form.contact_helper') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <UCard class="bg-surface-900/60 border border-white/10" :ui="{ body: 'space-y-3' }">
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-sm font-semibold text-white">
                      {{ $t('page.report_issue.summary_card.title') }}
                    </p>
                    <UBadge size="xs" color="primary" variant="soft">
                      {{
                        issueSummary.hasContent
                          ? issueSummary.severityLabel
                          : $t('page.report_issue.summary_card.empty')
                      }}
                    </UBadge>
                  </div>
                  <p class="text-base font-semibold text-white">
                    {{ issueSummary.title }}
                  </p>
                  <p class="text-sm text-white/65">
                    {{ issueSummary.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
                    <UBadge size="xs" color="neutral" variant="soft">
                      {{ $t('page.report_issue.summary_card.type_label') }}: {{ issueSummary.typeLabel }}
                    </UBadge>
                    <UBadge
                      size="xs"
                      :color="issueSummary.environmentIncluded ? 'success' : 'warning'"
                      variant="soft"
                    >
                      {{
                        issueSummary.environmentIncluded
                          ? $t('page.report_issue.summary_card.environment_on')
                          : $t('page.report_issue.summary_card.environment_off')
                      }}
                    </UBadge>
                  </div>
                </UCard>
                <UCard
                  class="bg-surface-900/60 border border-white/10"
                  :ui="{ body: 'space-y-4', header: 'font-semibold text-white' }"
                >
                  <template #header>
                    {{ $t('page.report_issue.sidebar.title') }}
                  </template>
                  <ul class="space-y-3 text-sm text-white/65">
                    <li v-for="tip in sidebarTips" :key="tip" class="flex items-start gap-2">
                      <UIcon name="i-mdi-check-circle-outline" class="mt-0.5 h-4 w-4 text-primary-300" />
                      <span>{{ tip }}</span>
                    </li>
                  </ul>
                  <div class="pt-2">
                    <NuxtLink
                    to="https://discord.gg/PpdDwd2M6V"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary-300 text-xs uppercase tracking-widest"
                    >
                      {{ $t('page.report_issue.sidebar.discord_cta') }}
                    </NuxtLink>
                  </div>
                </UCard>
              </div>
            </div>
            <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <UButton type="submit" size="lg" color="primary" :loading="submitting" :disabled="!canSubmit">
                <template v-if="submitting">
                  {{ $t('page.report_issue.form.submitting') }}
                </template>
                <template v-else>
                  {{ $t('page.report_issue.form.submit') }}
                </template>
              </UButton>
              <p class="text-xs text-white/50">
                {{ $t('page.report_issue.form.disclaimer') }}
              </p>
            </div>
          </div>
        </form>
        <div class="space-y-3">
          <UAlert
            v-if="successMessage"
            color="success"
            variant="soft"
            :title="$t('page.report_issue.form.success_title')"
          >
            <template #description>
              <p class="text-sm text-white/80">
                {{ $t('page.report_issue.form.success_body') }}
              </p>
              <div v-if="createdIssueUrl" class="mt-3">
                <UButton
                  :href="createdIssueUrl"
                  target="_blank"
                  icon="i-heroicons-arrow-top-right-on-square-20-solid"
                  color="success"
                  variant="solid"
                >
                  {{ $t('page.report_issue.form.view_issue') }}
                </UButton>
              </div>
            </template>
          </UAlert>
          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            :title="$t('page.report_issue.form.error_title')"
            :description="errorMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { FetchError } from 'ofetch';
  interface IssueForm {
    title: string;
    issueType: 'bug' | 'feature' | 'feedback';
    severity: 'low' | 'medium' | 'high';
    description: string;
    steps: string;
    environment: string;
    contact: string;
    pageUrl: string;
  }
  const form = reactive<IssueForm>({
    title: '',
    issueType: 'bug',
    severity: 'low',
    description: '',
    steps: '',
    environment: '',
    contact: '',
    pageUrl: 'https://tarkovtracker.org/',
  });
  const includeEnvironment = ref(true);
  const pageIconPath = '/img/favicon-16x16.png';
  const { t } = useI18n({ useScope: 'global' });
  useHead(() => ({
    title: t('page.report_issue.title'),
    meta: [{ name: 'description', content: t('page.report_issue.subtitle') }],
    link: [{ rel: 'icon', type: 'image/png', href: pageIconPath }],
  }));
  const heroHighlights = computed(() => [
    t('page.report_issue.highlights.bot'),
    t('page.report_issue.highlights.fast_triage'),
    t('page.report_issue.highlights.follow_up'),
  ]);
  const workflowSteps = computed(() => [
    {
      title: t('page.report_issue.workflow.steps.context.title'),
      description: t('page.report_issue.workflow.steps.context.description'),
      icon: 'i-mdi-note-edit-outline',
    },
    {
      title: t('page.report_issue.workflow.steps.submit.title'),
      description: t('page.report_issue.workflow.steps.submit.description'),
      icon: 'i-mdi-share-variant',
    },
    {
      title: t('page.report_issue.workflow.steps.track.title'),
      description: t('page.report_issue.workflow.steps.track.description'),
      icon: 'i-mdi-github',
    },
  ]);
  const sidebarTips = computed(() => [
    t('page.report_issue.sidebar.tips.impact'),
    t('page.report_issue.sidebar.tips.steps'),
    t('page.report_issue.sidebar.tips.logs'),
  ]);
  const submitting = ref(false);
  const errorMessage = ref('');
  const successMessage = ref(false);
  const createdIssueUrl = ref('');
  const issueTypeOptions = computed(() => [
    { label: t('page.report_issue.type_options.bug'), value: 'bug', icon: 'i-mdi-bug-outline' },
    {
      label: t('page.report_issue.type_options.feature'),
      value: 'feature',
      icon: 'i-mdi-lightbulb-on-outline',
    },
    {
      label: t('page.report_issue.type_options.feedback'),
      value: 'feedback',
      icon: 'i-mdi-message-text-outline',
    },
  ]);
  const severityOptions = computed(() => [
    {
      label: t('page.report_issue.severity_options.low'),
      value: 'low',
      icon: 'i-mdi-thermometer-low',
    },
    {
      label: t('page.report_issue.severity_options.medium'),
      value: 'medium',
      icon: 'i-mdi-thermometer',
    },
    {
      label: t('page.report_issue.severity_options.high'),
      value: 'high',
      icon: 'i-mdi-thermometer-high',
    },
  ]);
  const issueTypeIcon = computed(() => {
    const match = issueTypeOptions.value.find((option) => option.value === form.issueType);
    return match?.icon ?? 'i-mdi-bug-outline';
  });
  const severityIcon = computed(() => {
    const match = severityOptions.value.find((option) => option.value === form.severity);
    return match?.icon ?? 'i-mdi-thermometer';
  });
  const canSubmit = computed(() => {
    return Boolean(form.title?.trim() && form.description?.trim()) && !submitting.value;
  });
  const issueSummary = computed(() => {
    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();
    const severityLabel =
      severityOptions.value.find((option) => option.value === form.severity)?.label ?? form.severity;
    const typeLabel =
      issueTypeOptions.value.find((option) => option.value === form.issueType)?.label ??
      form.issueType;
    const truncatedDescription =
      trimmedDescription.length > 220 ? `${trimmedDescription.slice(0, 220)}…` : trimmedDescription;
    const fallback = t('page.report_issue.summary_card.empty');
    return {
      hasContent: Boolean(trimmedTitle || trimmedDescription),
      title: trimmedTitle || fallback,
      description: trimmedDescription ? truncatedDescription : fallback,
      severityLabel,
      typeLabel,
      environmentIncluded: includeEnvironment.value && Boolean(form.environment.trim()),
    };
  });
  const refreshPageUrl = () => {
    if (!import.meta.client) return;
    const referrer = document.referrer?.trim();
    if (referrer && referrer !== window.location.href) {
      form.pageUrl = referrer;
    }
  };
  const setDefaultEnvironment = () => {
    if (!includeEnvironment.value) {
      form.environment = '';
      return;
    }
    if (import.meta.client) {
      form.environment = navigator.userAgent;
    } else {
      form.environment = '';
    }
  };
  watch(includeEnvironment, () => {
    setDefaultEnvironment();
  });
  onMounted(() => {
    setDefaultEnvironment();
  });
  const resetForm = () => {
    form.title = '';
    form.issueType = 'bug';
    form.severity = 'low';
    form.description = '';
    form.steps = '';
    form.contact = '';
    form.pageUrl = 'https://tarkovtracker.org/';
    setDefaultEnvironment();
  };
  const submitIssue = async () => {
    if (!canSubmit.value) {
      return;
    }
    submitting.value = true;
    errorMessage.value = '';
    successMessage.value = false;
    createdIssueUrl.value = '';
    try {
      const response = await $fetch<{ url: string } | null>('/api/github/issues', {
        method: 'POST',
        body: {
          ...form,
        },
      });
      if (response?.url) {
        successMessage.value = true;
        createdIssueUrl.value = response.url;
        resetForm();
      } else {
        errorMessage.value = t('page.report_issue.form.error_generic');
      }
    } catch (err) {
      const fetchError = err as FetchError<{ statusMessage?: string }>;
      errorMessage.value =
        fetchError?.data?.statusMessage ??
        fetchError?.message ??
        t('page.report_issue.form.error_generic');
    } finally {
      submitting.value = false;
    }
  };
</script>
