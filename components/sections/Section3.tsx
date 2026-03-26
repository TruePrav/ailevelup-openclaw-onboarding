"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import {
  Field, SectionHeader, textareaStyle, cardStyle,
  CheckboxGroup, CategoryLabel, errorStyle, inputStyle
} from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: Partial<FormData>;
  setValue: UseFormSetValue<FormData>;
}

const DAILY_OPS = [
  "Morning briefing (weather, calendar, top tasks)",
  "Evening summary (what got done, what's tomorrow)",
  "Reminders and follow-ups",
  "Email triage and drafts",
  "Calendar management",
];

const RESEARCH = [
  "Look up anything on demand (news, prices, facts)",
  "Summarize articles/videos I send",
  "Track topics I care about (crypto, tech, sports, etc.)",
];

const PERSONAL = [
  "Track habits or goals",
  "Fitness / workout tracking",
  "Food and meal planning",
  "Relationship reminders (birthdays, check-ins)",
  "Journal prompts / reflection",
];

const WORK_BUSINESS = [
  "Manage tasks and project notes",
  "Draft messages and emails",
  "Research competitors or market trends",
  "Summarize documents or meetings",
];

export default function Section3({ register, errors, watch, setValue }: Props) {
  const selectedCaps = watch.q10_capabilities || [];

  const allOptions = [...DAILY_OPS, ...RESEARCH, ...PERSONAL, ...WORK_BUSINESS];
  const selectedFromAll = selectedCaps.filter((c) => allOptions.includes(c));

  return (
    <div>
      <SectionHeader
        title="What You Want Your Agent To Do"
        subtitle="Select everything you'd like your agent to help with — be generous, you can always adjust later."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q10"
          label="Which of these would you want your agent to help with?"
          hint="Select all that apply"
        >
          <CategoryLabel label="Daily Ops" />
          <CheckboxGroup
            options={DAILY_OPS}
            selected={selectedCaps}
            onChange={(val) => setValue("q10_capabilities", val)}
          />

          <CategoryLabel label="Research & Information" />
          <CheckboxGroup
            options={RESEARCH}
            selected={selectedCaps}
            onChange={(val) => setValue("q10_capabilities", val)}
          />

          <CategoryLabel label="Personal" />
          <CheckboxGroup
            options={PERSONAL}
            selected={selectedCaps}
            onChange={(val) => setValue("q10_capabilities", val)}
          />

          <CategoryLabel label="Work & Business" />
          <CheckboxGroup
            options={WORK_BUSINESS}
            selected={selectedCaps}
            onChange={(val) => setValue("q10_capabilities", val)}
          />

          <CategoryLabel label="Other" />
          <input
            {...register("q10_other_text")}
            placeholder="Something specific — describe it here..."
            style={{ ...inputStyle, marginTop: "4px" }}
          />
        </Field>
      </div>

      <div style={{
        ...cardStyle,
        background: "rgba(124,58,237,0.08)",
        border: "1px solid rgba(124,58,237,0.3)",
      }}>
        <Field
          qNum="Q11"
          label="What's the ONE thing you wish someone could handle for you every single day?"
          hint="This becomes your agent's top priority"
          error={errors.q11_top_priority?.message}
        >
          <textarea
            {...register("q11_top_priority", {
              required: "This is important — what's the one thing that would change your day?",
            })}
            placeholder="e.g. 'Handle my emails so I don't have to check them constantly' or 'Keep me on track with my goals every morning'..."
            style={{
              ...textareaStyle,
              minHeight: "100px",
              fontSize: "1rem",
              borderColor: errors.q11_top_priority ? "#f87171" : "rgba(124,58,237,0.3)",
            }}
          />
        </Field>
      </div>
    </div>
  );
}
