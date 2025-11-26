<template>
  <div
    v-if="tokenDataRef && !tokenDataRef.error"
    class="p-2 bg-primary-500 rounded-lg"
  >
    <div class="flex items-center mb-2">
      <div class="mr-2">
        <b>{{ $t("page.settings.card.apitokens.note_column") }}:</b>
        {{ tokenDataRef?.note }}
      </div>
      <div class="grow"></div>
      <UBadge
        :color="gameModeChipColor"
        size="xs"
        variant="subtle"
        class="ml-2"
      >
        <UIcon
          :name="
            gameModeIcon.startsWith('mdi-') ? `i-${gameModeIcon}` : gameModeIcon
          "
          class="mr-1 w-4 h-4"
        />
        {{ gameModeDisplay }}
      </UBadge>
    </div>
    <div>
      <b>{{ $t("page.settings.card.apitokens.token_column") }}:</b>
      <span
        :class="{
          'token-visible': tokenVisible,
          'token-hidden': !tokenVisible,
        }"
        :title="tokenVisible ? 'Click to hide token' : 'Click to reveal token'"
        class="token-display"
        @click="toggleTokenVisibility"
      >
        {{ tokenVisible ? props.token : tokenHidden }}
      </span>
    </div>
    <div>
      <b>{{ $t("page.settings.card.apitokens.permissions_column") }}: </b>
      <span v-for="(permission, index) in tokenPermissions" :key="index">
        {{ $t("page.settings.card.apitokens.permission." + permission)
        }}<span v-if="index < tokenPermissions.length - 1">, </span>
      </span>
    </div>
    <div>
      {{ $t("page.settings.card.apitokens.created_column") }} {{ relativeDays }}
    </div>
    <div v-show="showQR">
      <template v-if="userStore.getStreamerMode">
        {{ $t("page.settings.card.apitokens.streamer_mode_qr") }}
      </template>
      <template v-else>
        <canvas :id="props.token + '-tc'"></canvas>
      </template>
    </div>
    <div class="mt-1 flex gap-1">
      <UButton
        variant="ghost"
        :icon="copied ? 'i-mdi-check' : 'i-mdi-content-copy'"
        :color="copied ? 'green' : 'white'"
        size="xs"
        @click="copyToken"
      />
      <UButton
        variant="ghost"
        icon="i-mdi-qrcode"
        color="white"
        size="xs"
        @click="toggleQR"
      />
      <UButton
        variant="ghost"
        icon="i-mdi-delete"
        color="white"
        :disabled="deleting"
        :loading="deleting"
        size="xs"
        @click="deleteToken"
      />
    </div>
  </div>
  <div
    v-else-if="tokenDataRef && tokenDataRef.error"
    class="p-2 bg-red-500 rounded-lg"
  >
    <div>Error loading token: {{ tokenDataRef.error }}</div>
    <div>Token ID: {{ props.token }}</div>
  </div>
  <div v-else class="p-2 bg-primary-500 rounded-lg">
    <USkeleton class="h-20 w-full bg-primary-400" />
  </div>
</template>
<script setup>
// Token functions moved to Cloudflare Workers - TODO: Implement replacement
import { computed, nextTick, ref } from "vue";
import QRCode from "qrcode";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import { GAME_MODES } from "@/utils/constants";
import { useEdgeFunctions } from "@/composables/api/useEdgeFunctions";
const { $supabase } = useNuxtApp();
// Get locale for use in calculating relative time
const { locale } = useI18n({ useScope: "global" });
// Define props for component
const props = defineProps({
  token: {
    type: String,
    required: true,
  },
});
// Define emits for component
const emit = defineEmits(["tokenRevoked"]);
const userStore = useUserStore();
// Ref to store tokenData when retrieved from Supabase
const tokenDataRef = ref(null);
// Retrieve data from Supabase then store it in tokenDataRef
const loadTokenData = async () => {
  try {
    const { data, error } = await $supabase.client
      .from("tokens")
      .select("*")
      .eq("token_id", props.token)
      .single();

    if (error) {
      console.error("Error loading token data:", error);
      tokenDataRef.value = { error: "Failed to load token data" };
    } else if (data) {
      tokenDataRef.value = data;
    } else {
      tokenDataRef.value = { error: "Document not found" };
    }
  } catch (_error) {
    console.error("Error loading token data:", _error);
    tokenDataRef.value = { error: "Failed to load token data" };
  }
};
// Load token data when component mounts
loadTokenData();
// Computed property to retrieve timestamp of token creation
const tokenCreated = computed(() => {
  if (!tokenDataRef.value?.created_at) return Date.now();
  // Handle Supabase timestamp format (ISO string)
  return new Date(tokenDataRef.value.created_at).getTime() || Date.now();
});
// Computed property to display permissions of token
const tokenPermissions = computed(() => {
  if (!tokenDataRef.value?.permissions) {
    return [];
  }
  return tokenDataRef.value.permissions;
});
// Get game mode from database or default to PvP for legacy tokens
const tokenGameMode = computed(() => {
  // Use stored gameMode field or default to 'pvp' for backward compatibility
  return tokenDataRef.value?.gameMode || GAME_MODES.PVP;
});
// Game mode display properties
const gameModeDisplay = computed(() => {
  switch (tokenGameMode.value) {
    case GAME_MODES.PVP:
      return "PvP Only";
    case GAME_MODES.PVE:
      return "PvE Only";
    default:
      return "PvP Only";
  }
});
const gameModeChipColor = computed(() => {
  switch (tokenGameMode.value) {
    case GAME_MODES.PVP:
      return "blue";
    case GAME_MODES.PVE:
      return "green";
    default:
      return "blue";
  }
});
const gameModeIcon = computed(() => {
  switch (tokenGameMode.value) {
    case GAME_MODES.PVP:
      return "mdi-sword-cross";
    case GAME_MODES.PVE:
      return "mdi-shield-account";
    default:
      return "mdi-sword-cross";
  }
});
// Calculate relative days since token was created using Intl.RelativeTimeFormat
const relativeDays = computed(() => {
  if (!tokenDataRef.value?.createdAt) {
    return "N/A";
  }
  const relativeTimeFormat = new Intl.RelativeTimeFormat(locale.value, {
    numeric: "auto",
  });
  const days = Math.floor((Date.now() - tokenCreated.value) / 86400000);
  const formattedDays = relativeTimeFormat.format(-days, "day");
  return formattedDays;
});
const tokenHidden = computed(() => {
  if (userStore.getStreamerMode) {
    return props.token.replace(/.(?=.{0})/g, "*");
  } else {
    return props.token.replace(/.(?=.{5})/g, "*");
  }
});
const copied = ref(false);
const copyToken = async () => {
  try {
    await navigator.clipboard.writeText(props.token);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // Ignore clipboard errors
  }
};
const deleting = ref(false);
const { revokeToken } = useEdgeFunctions();
const deleteToken = async () => {
  deleting.value = true;
  try {
    // Call edge function to revoke token
    const data = await revokeToken(props.token);
    console.log("Token revoked successfully:", data);
    // Emit event to parent to refresh token list
    emit("tokenRevoked", props.token);
  } catch (error) {
    console.error("Failed to revoke token:", error);
    throw error;
  } finally {
    deleting.value = false;
  }
};
const showQR = ref(false);
const qrGenerated = ref(false);
const tokenVisible = ref(false);
const generateQR = () => {
  const canvasId = props.token + "-tc";
  const canvasElement = document.getElementById(canvasId);
  if (canvasElement && !qrGenerated.value) {
    QRCode.toCanvas(canvasElement, props.token, {}, function (_error) {
      if (_error) {
        console.error("QR code generation failed");
      } else {
        qrGenerated.value = true;
      }
    });
  }
};
const toggleQR = () => {
  showQR.value = !showQR.value;
  if (showQR.value) {
    nextTick(() => {
      generateQR();
    });
  }
};
const toggleTokenVisibility = () => {
  tokenVisible.value = !tokenVisible.value;
};
</script>
<style lang="scss" scoped>
.token-display {
  cursor: pointer;
  user-select: none;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-family: "Courier New", monospace;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.token-hidden {
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
  &.token-visible {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    &:hover {
      background-color: rgba(76, 175, 80, 0.2);
    }
  }
}
</style>
