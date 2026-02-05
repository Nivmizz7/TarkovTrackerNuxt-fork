type DropdownMenuUIConfig = {
  content: string;
  group: string;
  item: string;
  itemLeadingIcon: string;
};
export const DROPDOWN_MENU_UI_CONFIG: DropdownMenuUIConfig = {
  content:
    'bg-surface-800 border border-surface-600 border-t-0 rounded-t-none rounded-b-md min-w-[var(--reka-dropdown-menu-trigger-width)] ring-0 outline-none shadow-none',
  group: 'p-1',
  item: 'px-3 py-1.5 text-sm cursor-pointer rounded text-surface-200 data-[highlighted]:bg-surface-700 data-[highlighted]:text-white',
  itemLeadingIcon: 'size-4 text-surface-400',
};
