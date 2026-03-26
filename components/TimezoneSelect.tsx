"use client";

import { useState, useMemo } from "react";
import { inputStyle } from "./ui";

interface Props {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

function getTimezones(): string[] {
  try {
    return (Intl as any).supportedValuesOf("timeZone") as string[];
  } catch {
    // Fallback list for older browsers
    return [
      "America/Toronto", "America/New_York", "America/Chicago", "America/Denver",
      "America/Los_Angeles", "America/Vancouver", "America/Edmonton", "America/Winnipeg",
      "America/Halifax", "America/St_Johns", "America/Sao_Paulo", "America/Mexico_City",
      "America/Bogota", "America/Lima", "America/Buenos_Aires", "America/Santiago",
      "Europe/London", "Europe/Dublin", "Europe/Lisbon", "Europe/Paris", "Europe/Berlin",
      "Europe/Rome", "Europe/Madrid", "Europe/Amsterdam", "Europe/Brussels", "Europe/Zurich",
      "Europe/Stockholm", "Europe/Oslo", "Europe/Copenhagen", "Europe/Helsinki",
      "Europe/Warsaw", "Europe/Prague", "Europe/Vienna", "Europe/Budapest", "Europe/Bucharest",
      "Europe/Athens", "Europe/Istanbul", "Europe/Moscow", "Europe/Kiev",
      "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos", "Africa/Nairobi",
      "Asia/Dubai", "Asia/Riyadh", "Asia/Kuwait", "Asia/Baghdad", "Asia/Tehran",
      "Asia/Karachi", "Asia/Kolkata", "Asia/Colombo", "Asia/Dhaka", "Asia/Kathmandu",
      "Asia/Almaty", "Asia/Tashkent", "Asia/Bangkok", "Asia/Ho_Chi_Minh", "Asia/Jakarta",
      "Asia/Singapore", "Asia/Kuala_Lumpur", "Asia/Manila", "Asia/Shanghai", "Asia/Hong_Kong",
      "Asia/Taipei", "Asia/Seoul", "Asia/Tokyo", "Asia/Vladivostok",
      "Australia/Perth", "Australia/Darwin", "Australia/Adelaide", "Australia/Brisbane",
      "Australia/Sydney", "Australia/Melbourne", "Pacific/Auckland", "Pacific/Fiji",
      "Pacific/Honolulu", "Pacific/Guam",
    ];
  }
}

// Format timezone for display: "America/Toronto → Toronto (America)"
function formatTz(tz: string): string {
  const parts = tz.split("/");
  if (parts.length === 1) return tz;
  const city = parts[parts.length - 1].replace(/_/g, " ");
  const region = parts[0].replace(/_/g, " ");
  return parts.length > 2
    ? `${city} (${parts[1].replace(/_/g, " ")}, ${region})`
    : `${city} (${region})`;
}

// Get UTC offset for a timezone
function getOffset(tz: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const offset = parts.find((p) => p.type === "timeZoneName")?.value || "";
    return offset;
  } catch {
    return "";
  }
}

export default function TimezoneSelect({ value, onChange, hasError }: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const allTimezones = useMemo(() => getTimezones(), []);

  const filtered = useMemo(() => {
    if (!search) return allTimezones.slice(0, 80); // show top 80 by default
    const q = search.toLowerCase().replace(/\s/g, "_");
    return allTimezones.filter(
      (tz) =>
        tz.toLowerCase().includes(q) ||
        formatTz(tz).toLowerCase().includes(search.toLowerCase())
    ).slice(0, 60);
  }, [search, allTimezones]);

  const displayValue = value ? `${formatTz(value)} — ${getOffset(value)}` : "";

  return (
    <div style={{ position: "relative" }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          ...inputStyle,
          borderColor: hasError ? "#f87171" : open ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.12)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span style={{ color: value ? "white" : "rgba(255,255,255,0.35)" }}>
          {displayValue || "Select your timezone..."}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#141420",
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: "10px",
            zIndex: 50,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Search */}
          <div style={{ padding: "10px" }}>
            <input
              autoFocus
              placeholder="Search timezone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                ...inputStyle,
                border: "1px solid rgba(124,58,237,0.3)",
                padding: "8px 12px",
                fontSize: "0.875rem",
              }}
            />
          </div>

          {/* Options */}
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "12px 16px", color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}>
                No timezones found
              </div>
            ) : (
              filtered.map((tz) => {
                const selected = tz === value;
                return (
                  <div
                    key={tz}
                    onClick={() => {
                      onChange(tz);
                      setOpen(false);
                      setSearch("");
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: selected ? "rgba(124,58,237,0.2)" : "transparent",
                      borderLeft: selected ? "2px solid #7c3aed" : "2px solid transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!selected) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    <span style={{ color: selected ? "white" : "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}>
                      {formatTz(tz)}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginLeft: "12px", flexShrink: 0 }}>
                      {getOffset(tz)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
