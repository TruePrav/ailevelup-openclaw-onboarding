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

const COMM_STYLE_OPTIONS = [
  { value: "short_direct", label: "Short and direct — just tell me what I need to know" },
  { value: "friendly_conversational", label: "Friendly and conversational — I like a bit of personality" },
  { value: "detailed_thorough", label: "Detailed and thorough — give me the full picture" },
  { value: "depends", label: "Depends on the situation" },
];

export default function Section4({ register, errors, watch, setValue, control }: Props) {
  const selectedComm = watch.q12_communication || "";

  return (
    <div>
      <SectionHeader
        title="Communication Style"
        subtitle="Help your agent communicate in a way that works for you."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q12"
          label="How do you prefer your agent to communicate?"
          error={errors.q12_communication?.message}
        >
          <Controller
            name="q12_communication"
            control={control}
            rules={{ required: "Please select a communication style" }}
            render={({ field }) => (
              <RadioGroup
                options={COMM_STYLE_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.q12_communication && <p style={errorStyle}>{errors.q12_communication.message}</p>}

          {selectedComm === "depends" && (
            <div style={{ marginTop: "12px" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "4px" }}>
                Explain briefly...
              </div>
              <input
                {...register("q12_depends_text")}
                placeholder="e.g. 'Quick for reminders, detailed for research'"
                style={inputStyle}
              />
            </div>
          )}
        </Field>

        <Field
          qNum="Q13"
          label="What should your agent NEVER do?"
          hint="e.g. 'Don't message me after 10 PM', 'Don't give me unsolicited advice'"
          error={errors.q13_never_do?.message}
        >
          <textarea
            {...register("q13_never_do", { required: "Please set at least one boundary for your agent" })}
            placeholder="List any hard rules your agent should follow..."
            style={{
              ...textareaStyle,
              borderColor: errors.q13_never_do ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q14"
          label="What tone do you want your agent to have?"
          hint="e.g. 'Professional', 'Casual like a friend', 'Motivating', 'Straightforward, no fluff'"
          error={errors.q14_tone?.message}
        >
          <input
            {...register("q14_tone", { required: "Please describe the tone you want" })}
            placeholder="e.g. Casual but professional, like a trusted friend"
            style={{
              ...inputStyle,
              borderColor: errors.q14_tone ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q15"
          label="Give your agent a name (optional)"
          hint="Default is 'Nova' — but you can choose anything"
        >
          <input
            {...register("q15_agent_name")}
            placeholder="Nova"
            style={inputStyle}
          />
        </Field>
      </div>
    </div>
  );
}
