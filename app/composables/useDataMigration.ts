import { markDataMigrated } from '@/plugins/store-initializer';
import DataMigrationService from '@/utils/dataMigrationService';
import { logger } from '@/utils/logger';
export type MigrationStatus = 'idle' | 'migrating' | 'success' | 'error';
export type DataMigrationComposable = {
  migrationStatus: ComputedRef<MigrationStatus>;
  migrationMessage: ComputedRef<string>;
  migrationError: ComputedRef<Error | null>;
  isMigrating: ComputedRef<boolean>;
  hasMigrated: ComputedRef<boolean>;
  hasError: ComputedRef<boolean>;
  migrateLocalData: (userId: string) => Promise<boolean>;
  resetMigrationState: () => void;
};
export function useDataMigration(): DataMigrationComposable {
  const migrationStatus = ref<MigrationStatus>('idle');
  const migrationMessage = ref('');
  const migrationError = ref<Error | null>(null);
  const isMigrating = computed(() => migrationStatus.value === 'migrating');
  const hasMigrated = computed(() => migrationStatus.value === 'success');
  const hasError = computed(() => migrationStatus.value === 'error');
  const migrateLocalData = async (userId: string): Promise<boolean> => {
    if (!userId) {
      logger.warn('[useDataMigration] No user ID provided for migration');
      return false;
    }
    try {
      migrationStatus.value = 'migrating';
      migrationMessage.value = 'Checking for local data to migrate...';
      migrationError.value = null;
      if (!DataMigrationService.hasLocalData()) {
        migrationStatus.value = 'success';
        migrationMessage.value = 'No local data to migrate.';
        return true;
      }
      const hasRemoteData = await DataMigrationService.hasUserData(userId);
      if (hasRemoteData) {
        migrationStatus.value = 'success';
        migrationMessage.value = 'User already has data in the cloud. Skipping migration.';
        markDataMigrated();
        return true;
      }
      migrationMessage.value = 'Migrating your progress data...';
      const migrationSuccess = await DataMigrationService.migrateDataToUser(userId);
      if (migrationSuccess) {
        migrationStatus.value = 'success';
        migrationMessage.value = 'Your local progress has been successfully saved to the cloud!';
        markDataMigrated();
        return true;
      } else {
        throw new Error('Migration process reported failure');
      }
    } catch (error) {
      logger.error('[useDataMigration] Migration failed:', error);
      migrationStatus.value = 'error';
      migrationError.value = error as Error;
      migrationMessage.value =
        error instanceof Error ? error.message : 'An unknown error occurred during migration.';
      return false;
    }
  };
  const resetMigrationState = () => {
    migrationStatus.value = 'idle';
    migrationMessage.value = '';
    migrationError.value = null;
  };
  return {
    migrationStatus: computed(() => migrationStatus.value),
    migrationMessage: computed(() => migrationMessage.value),
    migrationError: computed(() => migrationError.value),
    isMigrating,
    hasMigrated,
    hasError,
    migrateLocalData,
    resetMigrationState,
  };
}
