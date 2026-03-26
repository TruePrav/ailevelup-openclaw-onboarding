"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Controller, Control } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import {
  Field, SectionHeader, inputStyle, textareaStyle, cardStyle,
  RadioGroup, errorStyle
} from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: Partial<FormData>;
  setValue: UseFormSetValue<FormData>;
  control: Control<FormData>;
}

const ACCESS_OPTIONS = [
  { value: "only_me", label: "Only me" },
  { value: "my_assistant", label: "My assistant" },
  { value: "other", label: "Other (specify below)" },
];

const PROACTIVE_OPTIONS = [
  { value: "proactive", label: "I want my agent to reach out when something needs attention" },
  { value: "reactive", label: "I prefer to message first — agent responds but doesn't initiate" },
  { value: "mix", label: "Mix: reach out for urgent things, otherwise wait for me" },
];

export default function Section6({ register, errors, watch, setValue, control }: Props) {
  const selectedAccess = watch.q19_access || "";
  const selectedProactive = watch.q20_proactive || "";

  return (
    <div>
      <SectionHeader
        title="Privacy & Boundaries"
        subtitle="Your agent should respect your privacy. Tell us what's off-limits."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q18"
          label="Is there anything you want kept strictly private?"
          hint="Optional but important — e.g. specific people, financial details, health matters"
        >
          <div style={{ marginBottom: "6px" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              padding: "2px 8px",
              borderRadius: "4px",
              marginBottom: "8px",
            }}>
              Optional but important
            </span>
          </div>
          <textarea
            {...register("q18_private")}
            placeholder="e.g. 'Never mention my health issues', 'Keep my financial details private'..."
            style={textareaStyle}
          />
        </Field>

        <Field
          qNum="Q19"
          label="Who else (if anyone) should have access to your agent?"
          error={errors.q19_access?.message}
        >
          <Controller
            name="q19_access"
            control={control}
            rules={{ required: "Please select an access option" }}
            render={({ field }) => (
              <RadioGroup
                options={ACCESS_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.q19_access && <p style={errorStyle}>{errors.q19_access.message}</p>}

          {selectedAccess === "other" && (
            <div style={{ marginTop: "12px" }}>
              <input
                {...register("q19_other_text")}
                placeholder="Who else should have access?"
                style={inputStyle}
              />
            </div>
          )}
        </Field>

        <Field
          qNum="Q20"
          label="Are you comfortable with your agent proactively reaching out?"
          error={errors.q20_proactive?.message}
        >
          <Controller
            name="q20_proactive"
            control={control}
            rules={{ required: "Please select a preference" }}
            render={({ field }) => (
              <RadioGroup
                options={PROACTIVE_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.q20_proactive && <p style={errorStyle}>{errors.q20_proactive.message}</p>}
        </Field>
      </div>
    </div>
  );
}
