import { useSafeToast } from '@/composables/useSafeToast';
import { logger } from '@/utils/logger';
export type LocalIgnoredReason = 'other_account' | 'unsaved' | 'guest';
export type ToastTranslate = (key: string, params?: Record<string, unknown>) => string;
const LOAD_FAILED_TOAST_DURATION = 10000;
export interface UseToastI18nReturn {
  showHideoutUpdated: (removedCount: number) => void;
  showLocalIgnored: (reason: LocalIgnoredReason) => void;
  showLoadFailed: () => void;
}
export const useToastI18n = (translate?: ToastTranslate): UseToastI18nReturn => {
  const toast = useSafeToast();
  const getGlobalT = (): ToastTranslate => {
    try {
      const { $i18n } = useNuxtApp();
      if (typeof $i18n?.t === 'function') {
        return $i18n.t.bind($i18n) as ToastTranslate;
      }
    } catch (err) {
      logger.warn('[useToastI18n] Failed to resolve global i18n translator. Using fallback.', err);
    }
    logger.warn('[useToastI18n] Global i18n translator unavailable. Using fallback.');
    return (key: string) => key;
  };
  const t = translate ?? getGlobalT();
  const showHideoutUpdated = (removedCount: number) => {
    toast?.add({
      title: t('toast.hideout_updated.title'),
      description: t('toast.hideout_updated.description', { count: removedCount }),
      color: 'warning',
    });
  };
  const showLocalIgnored = (reason: LocalIgnoredReason) => {
    toast?.add({
      title: t('toast.local_ignored.title'),
      description: t(`toast.local_ignored.${reason}`),
      color: 'warning',
    });
  };
  const showLoadFailed = () => {
    toast?.add({
      title: t('toast.load_failed.title'),
      description: t('toast.load_failed.description'),
      color: 'error',
      duration: LOAD_FAILED_TOAST_DURATION,
    });
  };
  return { showHideoutUpdated, showLocalIgnored, showLoadFailed };
};
