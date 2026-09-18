"use client";

import { groupDigits } from "@/lib/format";

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate";

/** Money and unit-count inputs: digit-grouped as you type, numeric keypad on mobile. */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  placeholder,
  grouped = true,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
  grouped?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <span className="mt-1 flex items-baseline gap-1 border-b border-gold/25 focus-within:border-b-2 focus-within:border-gold">
        {prefix && <span className="font-mono text-sm text-slate">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(grouped ? groupDigits(e.target.value) : e.target.value.replace(/[^\d.]/g, ""))}
          className="w-full min-w-0 bg-transparent py-2 font-mono text-lg tabular-nums text-obsidian placeholder:text-slate/50 focus:outline-none"
        />
        {suffix && <span className="font-mono text-sm text-slate">{suffix}</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-slate">{hint}</span>}
    </label>
  );
}

/** A single figure. `formula` is always shown — operators don't trust black boxes. */
export function Tile({
  label,
  value,
  formula,
  tone = "light",
  emphasis = false,
}: {
  label: string;
  value: string;
  formula?: string;
  tone?: "light" | "dark";
  emphasis?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`border-t p-4 ${dark ? "border-gold/30 bg-obsidian/40" : "border-gold/30 bg-white"}`}
    >
      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-champagne" : "text-slate"}`}>
        {label}
      </p>
      <p
        className={`mt-2 font-mono tabular-nums ${emphasis ? "text-3xl sm:text-4xl" : "text-2xl"} ${
          dark ? "text-white" : "text-obsidian"
        }`}
      >
        {value}
      </p>
      {formula && (
        <p className={`mt-2 text-xs leading-snug ${dark ? "text-slate" : "text-slate"}`}>{formula}</p>
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
        {title}
      </h2>
      {children && <div className="mt-3 text-slate">{children}</div>}
    </div>
  );
}

/** Used for the exposure findings, which are warnings rather than metrics. */
export function Finding({
  title,
  headline,
  body,
}: {
  title: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="border-l-2 border-gold bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{title}</p>
      <p className="mt-2 font-mono text-xl tabular-nums text-obsidian">{headline}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate">{body}</p>
    </div>
  );
}
