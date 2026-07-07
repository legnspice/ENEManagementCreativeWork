import type { ModAction } from "../engine/types";

/** Shared action theming used across the action bar, feedback, and policy chips. */
export const ACTION_THEME: Record<
  ModAction,
  { label: string; text: string; bg: string; border: string; ring: string; key: string }
> = {
  delete: {
    label: "Delete",
    text: "text-danger",
    bg: "bg-danger/12",
    border: "border-danger/40",
    ring: "focus-visible:ring-danger/50",
    key: "1",
  },
  ignore: {
    label: "Ignore",
    text: "text-success",
    bg: "bg-success/12",
    border: "border-success/40",
    ring: "focus-visible:ring-success/50",
    key: "2",
  },
};

export function ActionChip({ action }: { action: ModAction }) {
  const t = ACTION_THEME[action];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${t.text} ${t.bg} ${t.border}`}
    >
      {t.label}
    </span>
  );
}
