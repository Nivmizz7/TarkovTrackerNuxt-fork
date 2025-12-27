<script setup lang="ts">
  import { useSystemStoreWithSupabase } from '@/stores/useSystemStore';
  definePageMeta({
    middleware: ['admin'],
  });
  useHead({
    title: 'Admin Panel',
  });
  const { $supabase } = useNuxtApp();
  const router = useRouter();
  const { systemStore, hasInitiallyLoaded, loadError } = useSystemStoreWithSupabase();
  // Safe computed for admin status that uses the getter for proper reactivity
  const isAdmin = computed(() => {
    // Use the isAdmin getter which properly handles state reactivity
    return systemStore.isAdmin;
  });
  // Generate error reference ID and log full error details for debugging
  const errorReference = computed(() => {
    if (!loadError.value) return null;
    const errorId = `ERR-${Date.now().toString(36).toUpperCase()}`;
    // Log full error details for debugging (only visible in console)
    console.error(`[Admin Page Error ${errorId}]:`, loadError.value);
    return errorId;
  });
  // Watch for data load - redirect if user is confirmed not admin or data is missing
  watch(
    () => [hasInitiallyLoaded.value, isAdmin.value, loadError.value],
    ([loaded, adminStatus, error]) => {
      // If loaded, NOT admin, and NO error, redirect
      if (loaded && !adminStatus && !error) {
        router.push('/');
      }
    },
    { immediate: true }
  );
</script>
<template>
  <!-- Loading State -->
  <div v-if="!hasInitiallyLoaded" class="flex min-h-[50vh] items-center justify-center">
    <div class="text-center">
      <UIcon name="i-mdi-loading" class="text-primary-400 h-12 w-12 animate-spin" />
      <p class="text-surface-400 mt-4">Verifying admin access...</p>
    </div>
  </div>
  <!-- Error State -->
  <div v-else-if="loadError" class="flex min-h-[50vh] items-center justify-center px-4">
    <UAlert
      icon="i-mdi-alert-circle"
      color="error"
      variant="soft"
      title="Connection Error"
      :description="`Failed to load admin data. Please refresh or contact support. Reference: ${errorReference}`"
    />
  </div>
  <!-- Admin Content (only shown when confirmed admin) -->
  <div v-else-if="isAdmin" class="container mx-auto space-y-6 px-4 py-6">
    <!-- Warning Banner -->
    <UAlert icon="i-mdi-alert" color="warning" variant="soft" title="Admin Access">
      <template #description>
        Actions performed here affect all users. Logged in as
        <span class="font-medium">{{ $supabase.user.email || $supabase.user.displayName }}</span>
      </template>
    </UAlert>
    <!-- Admin Cards Grid -->
    <div class="grid gap-6 lg:grid-cols-2">
      <AdminCacheCard />
      <AdminAuditLog />
    </div>
  </div>
</template>
