<template>
  <div
    class="relative w-full h-full group cursor-default"
    @mouseenter="linkHover = true"
    @mouseleave="linkHover = false"
  >
    <div
      class="flex items-center justify-center transition-all duration-200"
      :class="{ 'blur-[1px] opacity-50': linkHover }"
    >
      <div class="flex items-center justify-center mr-2">
        <img
          width="32"
          height="32"
          :src="itemIconUrl"
          class="rounded"
          alt="Item Icon"
          @error="handleImgError"
        />
      </div>
      <div v-if="props.count" class="mr-2 text-sm font-medium text-gray-300">
        {{ props.count.toLocaleString() }}
      </div>
      <div
        class="flex items-center justify-center text-sm font-bold text-white text-center leading-tight"
      >
        {{ props.itemName }}
      </div>
    </div>
    <div
      v-show="linkHover"
      class="absolute inset-0 flex items-center justify-center z-10 gap-2"
    >
      <UButton
        v-if="props.wikiLink"
        color="primary"
        variant="solid"
        size="xs"
        class="rounded-full p-1"
        title="Show item on EFT Wiki"
        @click.stop="openWikiLink()"
      >
        <img
          src="/img/logos/wikilogo.png"
          class="w-5 h-5 object-contain"
          alt="Wiki"
        />
      </UButton>
      <UButton
        v-if="props.devLink"
        color="primary"
        variant="solid"
        size="xs"
        class="rounded-full p-1"
        title="Show item on Tarkov.dev"
        @click.stop="openTarkovDevLink()"
      >
        <img
          src="/img/logos/tarkovdevlogo.png"
          class="w-5 h-5 object-contain"
          alt="Tarkov.dev"
        />
      </UButton>
      <UButton
        color="primary"
        variant="solid"
        size="xs"
        class="rounded-full p-1"
        title="Copy Item Name"
        @click.stop="copyItemName()"
      >
        <UIcon name="i-mdi-content-copy" class="w-4 h-4 text-white" />
      </UButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps<{
  itemId: string;
  itemName: string | null;
  devLink: string | null;
  wikiLink: string | null;
  count: number | null;
}>();
const linkHover = ref(false);
const itemIconUrl = ref(`https://assets.tarkov.dev/${props.itemId}-icon.jpg`);
function handleImgError() {
  // If .jpg fails, try .webp
  if (itemIconUrl.value.endsWith(".jpg")) {
    itemIconUrl.value = `https://assets.tarkov.dev/${props.itemId}-icon.webp`;
  }
}
watch(
  () => props.itemId,
  () => {
    itemIconUrl.value = `https://assets.tarkov.dev/${props.itemId}-icon.jpg`;
  }
);
const openTarkovDevLink = () => {
  if (props.devLink) {
    window.open(props.devLink, "_blank");
  }
};
const openWikiLink = () => {
  if (props.wikiLink) {
    window.open(props.wikiLink, "_blank");
  }
};
const copyItemName = () => {
  if (props.itemName) {
    navigator.clipboard.writeText(props.itemName);
  }
};
</script>
