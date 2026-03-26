"use client";

import React from "react";

export const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "14px",
  padding: "24px",
  marginBottom: "20px",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  color: "rgba(255,255,255,0.9)",
  fontWeight: 600,
  fontSize: "0.95rem",
  marginBottom: "6px",
};

export const hintStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.8rem",
  marginBottom: "10px",
  fontStyle: "italic",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  color: "white",
  padding: "10px 14px",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
};

export const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical" as const,
  minHeight: "80px",
  fontFamily: "inherit",
};

export const errorStyle: React.CSSProperties = {
  color: "#f87171",
  fontSize: "0.8rem",
  marginTop: "4px",
};

export const sectionHeadingStyle: React.CSSProperties = {
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
  marginBottom: "6px",
};

export const sectionSubtitleStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.5)",
  fontSize: "0.9rem",
  marginBottom: "28px",
};

export const questionNumStyle: React.CSSProperties = {
  color: "#7c3aed",
  fontWeight: 700,
  fontSize: "0.75rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginBottom: "4px",
};

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  qNum?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, error, qNum, children }: FieldProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {qNum && <div style={questionNumStyle}>{qNum}</div>}
      <label style={labelStyle}>{label}</label>
      {hint && <p style={hintStyle}>{hint}</p>}
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  name?: string;
}

export function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: "8px",
              background: checked ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
              border: checked ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.15s",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                border: checked ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.3)",
                background: checked ? "#7c3aed" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ color: checked ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: "8px",
              background: checked ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
              border: checked ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.15s",
            }}
            onClick={() => onChange(opt.value)}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: checked ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              {checked && (
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7c3aed" }} />
              )}
            </div>
            <span style={{ color: checked ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h1 style={sectionHeadingStyle}>{title}</h1>
      {subtitle && <p style={sectionSubtitleStyle}>{subtitle}</p>}
    </div>
  );
}

export function CategoryLabel({ label }: { label: string }) {
  return (
    <div style={{
      color: "#7c3aed",
      fontWeight: 600,
      fontSize: "0.8rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "8px",
      marginTop: "16px",
      paddingBottom: "6px",
      borderBottom: "1px solid rgba(124,58,237,0.3)",
    }}>
      {label}
    </div>
  );
}
