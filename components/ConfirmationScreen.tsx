"use client";

import { FormData } from "./OnboardingForm";

interface Props {
  data: FormData;
}

const messagingLabels: Record<string, string> = {
  Telegram: "Telegram",
  WhatsApp: "WhatsApp",
  iMessage: "iMessage",
  Signal: "Signal",
  Other: "your preferred app",
};

export default function ConfirmationScreen({ data }: Props) {
  const name = data.q1_name || "there";
  const messagingApp = data.q2_messaging_app === "Other"
    ? (data.q2_messaging_other || "your preferred app")
    : (messagingLabels[data.q2_messaging_app] || data.q2_messaging_app || "your messaging app");
  const topPriority = data.q11_top_priority || "Helping you every day";
  const agentName = data.q15_agent_name?.trim() || "Nova";

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ color: "#7c3aed", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ailevelup.ca
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "64px 24px 48px" }}>
        {/* Success icon */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(139,92,246,0.3))",
            border: "2px solid rgba(124,58,237,0.5)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L12 22L26 8" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 style={{
            color: "white",
            fontWeight: 700,
            fontSize: "1.75rem",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}>
            You&apos;re all set, {name}!
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}>
            Your agent is being built. We&apos;ll be in touch within <strong style={{ color: "rgba(255,255,255,0.85)" }}>48 hours</strong> via {messagingApp}.
          </p>
        </div>

        {/* Summary card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <div style={{
            color: "#7c3aed",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            Your Setup Summary
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SummaryRow
              label="Your name"
              value={name}
            />
            <SummaryRow
              label="Contact via"
              value={messagingApp}
            />
            <SummaryRow
              label="Agent name"
              value={agentName}
            />
            <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px" }}>
                Top priority
              </div>
              <div style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}>
                &ldquo;{topPriority}&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* What's next */}
        <div style={{
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "32px",
        }}>
          <div style={{
            color: "#8b5cf6",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            What Happens Next
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Our team reviews your responses",
              `We build and configure ${agentName} based on your preferences`,
              `You get a message on ${messagingApp} to connect`,
              "Your agent goes live — ready to help",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(124,58,237,0.3)",
                  border: "1px solid rgba(124,58,237,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "0.75rem",
                  color: "#8b5cf6",
                  fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", paddingTop: "2px" }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to calendar button (placeholder) */}
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            disabled
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.4)",
              padding: "12px 28px",
              borderRadius: "10px",
              cursor: "not-allowed",
              fontSize: "0.9rem",
            }}
          >
            📅 Add Follow-up to Calendar (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", minWidth: "120px" }}>{label}</div>
      <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", fontWeight: 500, textAlign: "right" }}>
        {value}
      </div>
    </div>
  );
}
