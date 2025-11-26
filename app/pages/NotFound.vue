<template>
  <div class="flex items-center justify-center h-52 text-center">
    <UCard
      class="bg-transparent border border-white/10 text-surface-50 w-full max-w-xl"
      :ui="{ body: 'p-6' }"
    >
      {{ $t("page.not_found.not_found_description") }}
    </UCard>
  </div>
</template>
