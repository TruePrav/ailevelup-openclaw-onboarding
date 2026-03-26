"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import { Field, SectionHeader, textareaStyle, cardStyle, CheckboxGroup } from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: Partial<FormData>;
  setValue: UseFormSetValue<FormData>;
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

export default function Section5({ register, errors, watch, setValue }: Props) {
  const selectedIntegrations = watch.q16_integrations || [];

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
          <CheckboxGroup
            options={INTEGRATION_OPTIONS}
            selected={selectedIntegrations}
            onChange={(val) => setValue("q16_integrations", val)}
          />
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
