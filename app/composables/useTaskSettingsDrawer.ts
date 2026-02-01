import { ref, type Ref } from 'vue';
const isOpen = ref(false);
export function useTaskSettingsDrawer(): {
  isOpen: Ref<boolean>;
  open: () => void;
  close: () => void;
  toggle: () => void;
} {
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
