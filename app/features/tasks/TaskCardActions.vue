<template>
  <div v-if="state !== 'none'" class="ml-2 shrink-0">
    <UButton
      v-if="state === 'locked'"
      :size="size"
      color="neutral"
      variant="soft"
      @click.stop="emit('available')"
    >
      {{ t('page.tasks.questcard.availablebutton', 'Mark Available') }}
    </UButton>
    <UButton
      v-else-if="state === 'complete'"
      :size="size"
      color="neutral"
      variant="soft"
      @click.stop="emit('uncomplete')"
    >
      {{
        isFailed
          ? t('page.tasks.questcard.resetfailed', 'Reset Failed')
          : t('page.tasks.questcard.uncompletebutton', 'Mark Uncompleted')
      }}
    </UButton>
    <div v-else-if="state === 'hotwheels'" class="flex flex-col gap-1">
      <UButton
        :size="size"
        color="success"
        variant="soft"
        class="px-3 font-semibold"
        @click.stop="emit('complete')"
      >
        {{ t('page.tasks.questcard.completebutton', 'Complete') }}
      </UButton>
      <UButton :size="size" color="error" variant="soft" @click.stop="emit('failed')">
        {{ t('page.tasks.questcard.failbutton', 'Fail') }}
      </UButton>
    </div>
    <UButton
      v-else-if="state === 'available'"
      :size="size"
      color="success"
      variant="soft"
      class="px-3 font-semibold"
      @click.stop="emit('complete')"
    >
      {{ t('page.tasks.questcard.completebutton', 'Complete') }}
    </UButton>
  </div>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  export type ActionButtonState = 'locked' | 'complete' | 'hotwheels' | 'available' | 'none';
  defineProps<{
    state: ActionButtonState;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    isFailed?: boolean;
  }>();
  const emit = defineEmits<{
    complete: [];
    uncomplete: [];
    available: [];
    failed: [];
  }>();
  const { t } = useI18n({ useScope: 'global' });
</script>
