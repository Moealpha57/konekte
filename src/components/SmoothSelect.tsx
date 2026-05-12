"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type SmoothSelectOption = {
  value: string;
  label: string;
};

type SmoothSelectProps = {
  name: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SmoothSelectOption[];
  required?: boolean;
  className?: string;
};

export function SmoothSelect({
  name,
  label,
  value,
  defaultValue = "",
  placeholder,
  options,
  required = false,
  className = "",
}: SmoothSelectProps) {
  const id = useId();
  const initialValue = value ?? defaultValue;
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => {
    if (!selectedValue) return placeholder ?? "";
    return options.find((option) => option.value === selectedValue)?.label ?? selectedValue;
  }, [options, placeholder, selectedValue]);

  useEffect(() => {
    setSelectedValue(value ?? defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onReset(event: Event) {
      if (rootRef.current?.closest("form") === event.target) {
        window.setTimeout(() => setSelectedValue(defaultValue), 0);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("reset", onReset, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("reset", onReset, true);
    };
  }, [defaultValue]);

  function choose(nextValue: string) {
    setSelectedValue(nextValue);
    setOpen(false);
  }

  return (
    <div className={`smooth-select relative grid gap-2 ${open ? "z-[120]" : "z-10"} ${className}`} ref={rootRef}>
      {label ? <label className="label" id={`${id}-label`}>{label}</label> : null}
      <input name={name} value={selectedValue} required={required} readOnly className="sr-only" tabIndex={-1} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label ${id}-button` : `${id}-button`}
        id={`${id}-button`}
        className={`input smooth-select-trigger flex items-center justify-between gap-3 text-left ${selectedValue ? "" : "smooth-select-placeholder"}`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">{selectedLabel}</span>
        <span className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      <div
        role="listbox"
        aria-labelledby={label ? `${id}-label` : undefined}
        className={`smooth-select-menu absolute left-0 right-0 top-full z-[999] mt-2 max-h-64 overflow-auto rounded-2xl border p-1 shadow-xl backdrop-blur transition-all duration-200 ease-out ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"}`}
        style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}
      >
        {placeholder ? (
          <button
            type="button"
            role="option"
            aria-selected={selectedValue === ""}
            className={`smooth-select-option ${selectedValue === "" ? "smooth-select-active" : "smooth-select-muted"}`}
            onClick={() => choose("")}
          >
            <span>{placeholder}</span>
            {selectedValue === "" ? <span>✓</span> : null}
          </button>
        ) : null}
        {options.map((option) => (
          <button
            type="button"
            role="option"
            aria-selected={selectedValue === option.value}
            key={option.value}
            className={`smooth-select-option ${selectedValue === option.value ? "smooth-select-active" : "smooth-select-normal"}`}
            onClick={() => choose(option.value)}
          >
            <span className="truncate">{option.label}</span>
            {selectedValue === option.value ? <span>✓</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
