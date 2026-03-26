"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Controller, Control } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import {
  Field, SectionHeader, inputStyle, cardStyle,
  CheckboxGroup, RadioGroup, errorStyle
} from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: Partial<FormData>;
  setValue: UseFormSetValue<FormData>;
  control: Control<FormData>;
}

const MESSAGING_OPTIONS = [
  { value: "Telegram", label: "Telegram (recommended)" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "iMessage", label: "iMessage" },
  { value: "Signal", label: "Signal" },
  { value: "Other", label: "Other" },
];

const ACTIVE_HOURS_OPTIONS = [
  "Early morning (before 9 AM)",
  "Morning (9 AM–12 PM)",
  "Afternoon (12–5 PM)",
  "Evening (5–10 PM)",
  "Late night (after 10 PM)",
];

export default function Section1({ register, errors, watch, setValue, control }: Props) {
  const selectedMessaging = watch.q2_messaging_app || "";
  const selectedHours = watch.q5_active_hours || [];

  return (
    <div>
      <SectionHeader
        title="The Basics"
        subtitle="Let's start with the essentials. This helps us connect you to your agent."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q1"
          label="What's your name?"
          hint="First name is fine — this is what your agent will call you"
          error={errors.q1_name?.message}
        >
          <input
            {...register("q1_name", { required: "Name is required" })}
            placeholder="Your first name"
            style={{
              ...inputStyle,
              borderColor: errors.q1_name ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q2"
          label="What's your preferred messaging app?"
          error={errors.q2_messaging_app?.message}
        >
          <Controller
            name="q2_messaging_app"
            control={control}
            rules={{ required: "Please select a messaging app" }}
            render={({ field }) => (
              <RadioGroup
                options={MESSAGING_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.q2_messaging_app && <p style={errorStyle}>{errors.q2_messaging_app.message}</p>}
          {selectedMessaging === "Other" && (
            <input
              {...register("q2_messaging_other")}
              placeholder="Please specify..."
              style={{ ...inputStyle, marginTop: "10px" }}
            />
          )}
        </Field>

        <Field
          qNum="Q3"
          label="What's your phone number (with country code)?"
          hint="For connecting your agent to your messaging app"
          error={errors.q3_phone?.message}
        >
          <input
            {...register("q3_phone", { required: "Phone number is required" })}
            placeholder="+1 416 555 0000"
            style={{
              ...inputStyle,
              borderColor: errors.q3_phone ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q4"
          label="What timezone are you in?"
          hint="e.g. EST, GMT+1, Asia/Kolkata"
          error={errors.q4_timezone?.message}
        >
          <input
            {...register("q4_timezone", { required: "Timezone is required" })}
            placeholder="e.g. EST, GMT-5, America/Toronto"
            style={{
              ...inputStyle,
              borderColor: errors.q4_timezone ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q5"
          label="What hours are you most active?"
        >
          <CheckboxGroup
            options={ACTIVE_HOURS_OPTIONS}
            selected={selectedHours}
            onChange={(val) => setValue("q5_active_hours", val)}
          />
        </Field>
      </div>
    </div>
  );
}
