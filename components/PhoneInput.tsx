"use client";

import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import { inputStyle } from "./ui";

const countryOptions = [
  { label: "Barbados", code: "+1 (246)", iso: "BB", placeholder: "123-4567" },
  { label: "US/Canada", code: "+1", iso: "US", placeholder: "(555) 123-4567" },
  { label: "United Kingdom", code: "+44", iso: "GB", placeholder: "7400 123 456" },
  { label: "India", code: "+91", iso: "IN", placeholder: "98765 43210" },
  { label: "China", code: "+86", iso: "CN", placeholder: "138 0013 8000" },
  { label: "Japan", code: "+81", iso: "JP", placeholder: "90-1234-5678" },
  { label: "Germany", code: "+49", iso: "DE", placeholder: "1512 3456789" },
  { label: "France", code: "+33", iso: "FR", placeholder: "6 12 34 56 78" },
  { label: "Australia", code: "+61", iso: "AU", placeholder: "412 345 678" },
  { label: "Brazil", code: "+55", iso: "BR", placeholder: "11 91234-5678" },
  { label: "Other", code: "other", iso: "", placeholder: "+1 246 555 1234" },
];

const formatPhoneLocal = (digitsOnly: string, countryCode: string) => {
  if (countryCode === "+1 (246)") {
    const digits = digitsOnly.replace(/^1?246?/, "").slice(0, 7);
    if (digits.length > 3) return digits.slice(0, 3) + "-" + digits.slice(3, 7);
    return digits;
  }
  if (countryCode === "+1") {
    const digits = digitsOnly.replace(/^1/, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return "(" + digits;
    if (digits.length <= 6) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6, 10);
  }
  return digitsOnly.slice(0, 15);
};

interface Props {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

export default function PhoneInput({ value, onChange, hasError }: Props) {
  const [countryCode, setCountryCode] = useState("+1 (246)");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry = countryOptions.find((o) => o.code === countryCode) ?? countryOptions[0];

  // Sync assembled value upward
  useEffect(() => {
    const fullPhone =
      countryCode === "other"
        ? phoneLocal
        : phoneLocal
        ? `${countryCode} ${phoneLocal}`
        : "";
    onChange(fullPhone);
  }, [countryCode, phoneLocal]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePhoneChange = (val: string) => {
    if (countryCode === "other") {
      setPhoneLocal(val.replace(/[^\d\s+().-]/g, ""));
      return;
    }
    const digitsOnly = val.replace(/\D/g, "");
    setPhoneLocal(formatPhoneLocal(digitsOnly, countryCode));
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Flag + dial code */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255,255,255,0.07)",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "8px 0 0 8px",
          pointerEvents: "none",
          minWidth: "90px",
          zIndex: 1,
        }}
      >
        {selectedCountry.iso ? (
          <ReactCountryFlag svg countryCode={selectedCountry.iso} style={{ width: "1.2em", height: "1.2em" }} />
        ) : (
          <span style={{ fontSize: "1.2em", lineHeight: 1 }}>🌐</span>
        )}
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          {selectedCountry.code === "other" ? "Other" : selectedCountry.code}
        </span>
      </div>

      {/* Invisible click target for country selector */}
      <button
        type="button"
        onClick={() => setIsCountryOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isCountryOpen}
        aria-label="Select country code"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100px",
          background: "transparent",
          border: "none",
          zIndex: 2,
          cursor: "pointer",
        }}
      />

      {/* Country dropdown */}
      {isCountryOpen && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            width: "260px",
            maxHeight: "220px",
            overflowY: "auto",
            background: "#141420",
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: "10px",
            zIndex: 50,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {countryOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => {
                setCountryCode(option.code);
                setPhoneLocal(option.code === "other" ? "+" : "");
                setIsCountryOpen(false);
              }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "8px",
                padding: "9px 14px",
                background: countryCode === option.code ? "rgba(124,58,237,0.2)" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "0.875rem",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (countryCode !== option.code)
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (countryCode !== option.code)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {option.iso ? (
                <ReactCountryFlag svg countryCode={option.iso} style={{ width: "1.2em", height: "1.2em" }} />
              ) : (
                <span style={{ fontSize: "1.2em", lineHeight: 1 }}>🌐</span>
              )}
              <span>{option.code === "other" ? "Other" : option.code}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>({option.label})</span>
            </button>
          ))}
        </div>
      )}

      {/* Phone input */}
      <input
        type="tel"
        value={phoneLocal}
        onChange={(e) => handlePhoneChange(e.target.value)}
        autoComplete="tel"
        placeholder={countryCode === "other" ? "+1 246 555 1234" : selectedCountry.placeholder}
        style={{
          ...inputStyle,
          paddingLeft: "108px",
          borderColor: hasError ? "#f87171" : "rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}
