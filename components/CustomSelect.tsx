"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function CustomSelect({
  label,
  name,
  options,
  required,
  placeholder = "Select…",
  value: controlledValue,
  onChange,
}: CustomSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const value = controlledValue ?? internalValue;
  const selected = options.find((o) => o.value === value);
  const display = selected?.label ?? placeholder;

  const commit = useCallback(
    (next: string) => {
      setInternalValue(next);
      onChange?.(next);
      setOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (!open) return;
    const selectedIdx = options.findIndex((o) => o.value === value);
    setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);

    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, options, value]);

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) commit(opt.value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label
        htmlFor={`${name}-trigger`}
        className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink"
      >
        {label}
      </label>

      {/* Native select for form state + HTML required validation; UI is fully custom. */}
      <select
        name={name}
        required={required}
        value={value}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => commit(e.target.value)}
        onInvalid={(e) => {
          e.preventDefault();
          setOpen(true);
          document.getElementById(`${name}-trigger`)?.focus();
        }}
        className="pointer-events-none absolute h-px w-px opacity-0"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        id={`${name}-trigger`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={`group relative flex w-full items-center border-2 border-ink bg-paper py-3 pl-3.5 pr-12 text-left outline-none transition-all focus:bg-white focus:shadow-punch ${
          open ? "bg-white shadow-punch" : "hover:bg-white"
        }`}
      >
        <span
          className={`truncate text-[15px] ${
            selected ? "font-semibold text-ink" : "text-ink-mute"
          }`}
        >
          {display}
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center border-l-2 border-ink bg-mist"
          aria-hidden
        >
          <ChevronDown
            className={`h-4 w-4 text-ink transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          onKeyDown={onListKeyDown}
          className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-auto border-2 border-ink bg-paper shadow-punch animate-pop"
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(opt.value)}
                className={`flex cursor-pointer items-center justify-between gap-3 border-b-2 border-ink/10 px-3.5 py-3 text-[15px] last:border-b-0 ${
                  isActive || isSelected
                    ? "bg-lime font-extrabold text-ink"
                    : "bg-paper font-semibold text-ink hover:bg-lime-soft"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
