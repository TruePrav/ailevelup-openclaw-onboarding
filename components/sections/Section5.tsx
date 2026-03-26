"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Controller, Control } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import { Field, SectionHeader, textareaStyle, inputStyle, cardStyle, CheckboxGroup, CategoryLabel } from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: Partial<FormData>;
  setValue: UseFormSetValue<FormData>;
  control: Control<FormData>;
}

const INTEGRATION_OPTIONS = [
  "Gmail / Google Workspace",
  "Google Calendar",
  "Google Drive / Docs",
  "Outlook / Microsoft 365",
  "Notion",
  "Slack",
  "Shopify / e-commerce",
  "WhatsApp (for your business)",
  "Instagram / TikTok (content monitoring)",
  "None yet — start basic and add later",
];

const OTHER_INTEGRATIONS_KEY = "__other__";

export default function Section5({ register, errors, watch, setValue, control }: Props) {
  const selectedIntegrations = watch.q16_integrations || [];
  const showOtherInput = selectedIntegrations.includes(OTHER_INTEGRATIONS_KEY);

  return (
    <div>
      <SectionHeader
        title="Integrations & Access"
        subtitle="Your agent becomes much more powerful when it's connected to the tools you already use."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q16"
          label="Which of these do you use and would want your agent to access?"
          hint="Select all that apply — you'll connect these after setup"
        >
          <Controller
            name="q16_integrations"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <CheckboxGroup
                options={[...INTEGRATION_OPTIONS, "Other (specify below)"]}
                selected={(field.value || []).map((v: string) => v === OTHER_INTEGRATIONS_KEY ? "Other (specify below)" : v)}
                onChange={(vals) => field.onChange(vals.map((v: string) => v === "Other (specify below)" ? OTHER_INTEGRATIONS_KEY : v))}
              />
            )}
          />
          {showOtherInput && (
            <div style={{ marginTop: "12px" }}>
              <input
                {...register("q16_integrations_other")}
                placeholder="e.g. Airtable, HubSpot, Xero, Discord..."
                style={{ ...inputStyle, borderColor: "rgba(124,58,237,0.4)" }}
              />
            </div>
          )}
        </Field>

        <Field
          qNum="Q17"
          label="Do you have any accounts or tools you'd want your agent to monitor?"
          hint="e.g. 'Check my Shopify orders daily', 'Monitor my crypto portfolio', 'Watch my email for anything urgent'"
        >
          <textarea
            {...register("q17_monitoring")}
            placeholder="Describe any specific monitoring tasks..."
            style={textareaStyle}
          />
        </Field>
      </div>
    </div>
  );
}
