"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue, Controller, Control } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import {
  Field, SectionHeader, inputStyle, cardStyle,
  CheckboxGroup, RadioGroup, errorStyle
} from "../ui";
import TimezoneSelect from "../TimezoneSelect";
import PhoneInput from "../PhoneInput";

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
  { value: "Discord", label: "Discord" },
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
      {/* Intro banner — only shown on step 1 */}
      <div style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(139,92,246,0.08))",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: "14px",
        padding: "20px 24px",
        marginBottom: "28px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: "white" }}>We're excited to be building your Personalized AI assistant!</strong>
          {" "}Everything you fill out here can be edited or added to later — but the more details you give us now, the better your agent will be on launch!
        </p>
      </div>

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
          label="What's your phone number?"
          hint="For connecting your agent to your messaging app"
          error={errors.q3_phone?.message}
        >
          <Controller
            name="q3_phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput
                value={field.value || ""}
                onChange={field.onChange}
                hasError={!!errors.q3_phone}
              />
            )}
          />
        </Field>

        <Field
          qNum="Q4"
          label="What timezone are you in?"
          error={errors.q4_timezone?.message}
        >
          <Controller
            name="q4_timezone"
            control={control}
            rules={{ required: "Please select your timezone" }}
            render={({ field }) => (
              <TimezoneSelect
                value={field.value || ""}
                onChange={field.onChange}
                hasError={!!errors.q4_timezone}
              />
            )}
          />
        </Field>

        <Field
          qNum="Q5"
          label="What hours are you most active?"
        >
          <Controller
            name="q5_active_hours"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <CheckboxGroup
                options={ACTIVE_HOURS_OPTIONS}
                selected={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </Field>
      </div>
    </div>
  );
}
