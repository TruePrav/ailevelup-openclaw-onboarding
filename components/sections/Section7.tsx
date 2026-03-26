"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import { Field, SectionHeader, inputStyle, textareaStyle, cardStyle } from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function Section7({ register, errors }: Props) {
  return (
    <div>
      <SectionHeader
        title="Personality Snapshot"
        subtitle="These help us make your agent feel like it actually knows you. Almost done!"
      />

      <div style={cardStyle}>
        <Field
          qNum="Q21"
          label="Three words that describe how you work best"
          hint="e.g. 'Fast, focused, systems-driven' or 'Flexible, creative, detail-oriented'"
          error={errors.q21_word1?.message || errors.q21_word2?.message || errors.q21_word3?.message}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              {...register("q21_word1", { required: "Enter your first word" })}
              placeholder="Word 1"
              style={{
                ...inputStyle,
                flex: "1",
                minWidth: "100px",
                borderColor: errors.q21_word1 ? "#f87171" : "rgba(255,255,255,0.12)",
              }}
            />
            <input
              {...register("q21_word2", { required: "Enter your second word" })}
              placeholder="Word 2"
              style={{
                ...inputStyle,
                flex: "1",
                minWidth: "100px",
                borderColor: errors.q21_word2 ? "#f87171" : "rgba(255,255,255,0.12)",
              }}
            />
            <input
              {...register("q21_word3", { required: "Enter your third word" })}
              placeholder="Word 3"
              style={{
                ...inputStyle,
                flex: "1",
                minWidth: "100px",
                borderColor: errors.q21_word3 ? "#f87171" : "rgba(255,255,255,0.12)",
              }}
            />
          </div>
        </Field>

        <Field
          qNum="Q22"
          label="What motivates you most?"
          hint="e.g. 'Building something that lasts', 'Financial freedom', 'Helping my family'"
          error={errors.q22_motivation?.message}
        >
          <textarea
            {...register("q22_motivation", { required: "Please share what motivates you" })}
            placeholder="What gets you out of bed in the morning?"
            style={{
              ...textareaStyle,
              borderColor: errors.q22_motivation ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q23"
          label="What's your biggest time waster right now?"
          hint="e.g. 'Checking email 20 times a day', 'Forgetting follow-ups'"
          error={errors.q23_time_waster?.message}
        >
          <textarea
            {...register("q23_time_waster", { required: "Please share your biggest time waster" })}
            placeholder="What's eating your time that shouldn't be?"
            style={{
              ...textareaStyle,
              borderColor: errors.q23_time_waster ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q24"
          label="Anything else you want us to know before we build your agent?"
          hint="Optional — the more context the better"
        >
          <textarea
            {...register("q24_anything_else")}
            placeholder="Anything that would help us build the perfect agent for you..."
            style={{ ...textareaStyle, minHeight: "100px" }}
          />
        </Field>
      </div>
    </div>
  );
}
