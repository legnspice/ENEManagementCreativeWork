import { POLICY } from "../policy";
import { ACTION_THEME } from "./ui";

export function PolicyPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "rounded-xl border border-hairline bg-panel p-3"}>
      {!compact && (
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          Policy reference
        </div>
      )}
      <ul className="space-y-2.5">
        {POLICY.filter((p) => p.category !== "Benign").map((p) => (
          <li key={p.category} className="text-xs leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-panel-2 text-[11px] text-text-muted">
                {p.glyph}
              </span>
              <span className="font-semibold text-text">{p.label}</span>
              <span className="ml-auto flex gap-1">
                {p.actions.map((a) => (
                  <span
                    key={a}
                    className={`rounded px-1 py-px text-[9px] font-bold uppercase ${ACTION_THEME[a].text} ${ACTION_THEME[a].bg}`}
                  >
                    {ACTION_THEME[a].label}
                  </span>
                ))}
              </span>
            </div>
            <p className="mt-1 pl-7 text-text-muted">{p.rule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
