"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "../OnboardingForm";
import { Field, SectionHeader, inputStyle, textareaStyle, cardStyle } from "../ui";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function Section2({ register, errors }: Props) {
  return (
    <div>
      <SectionHeader
        title="Your Life & Work"
        subtitle="Help us understand your world — this shapes how your agent supports you."
      />

      <div style={cardStyle}>
        <Field
          qNum="Q6"
          label="What do you do for work?"
          hint="Job title, industry, or a quick description — e.g. 'I run a clothing store in Toronto' or 'I'm a freelance designer'"
          error={errors.q6_work?.message}
        >
          <textarea
            {...register("q6_work", { required: "Please tell us what you do for work" })}
            placeholder="Describe your work in a few sentences..."
            style={{
              ...textareaStyle,
              borderColor: errors.q6_work ? "#f87171" : "rgba(255,255,255,0.12)",
            }}
          />
        </Field>

        <Field
          qNum="Q7"
          label="Do you run any businesses or side projects?"
          hint="List them briefly — e.g. 'Online store', 'YouTube channel', 'Consulting'"
        >
          <textarea
            {...register("q7_projects")}
            placeholder="e.g. Dropshipping store, newsletter, local services..."
            style={textareaStyle}
          />
        </Field>

        <Field
          qNum="Q8"
          label="What does a typical weekday look like for you?"
          hint="Rough schedule — helps your agent know when to check in, when to stay quiet"
        >
          <textarea
            {...register("q8_weekday")}
            placeholder="e.g. 9 AM meetings, lunch break at 1, gym at 6 PM..."
            style={textareaStyle}
          />
        </Field>

        <Field
          qNum="Q9"
          label="What are your top 3 goals right now?"
          hint="Personal, professional, or both — whatever's on your mind"
          error={errors.q9_goal1?.message || errors.q9_goal2?.message || errors.q9_goal3?.message}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "4px" }}>Goal 1</div>
              <input
                {...register("q9_goal1", { required: "Please enter at least your first goal" })}
                placeholder="Your #1 goal right now..."
                style={{
                  ...inputStyle,
                  borderColor: errors.q9_goal1 ? "#f87171" : "rgba(255,255,255,0.12)",
                }}
              />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "4px" }}>Goal 2</div>
              <input
                {...register("q9_goal2", { required: "Please enter your second goal" })}
                placeholder="Your #2 goal..."
                style={{
                  ...inputStyle,
                  borderColor: errors.q9_goal2 ? "#f87171" : "rgba(255,255,255,0.12)",
                }}
              />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "4px" }}>Goal 3</div>
              <input
                {...register("q9_goal3", { required: "Please enter your third goal" })}
                placeholder="Your #3 goal..."
                style={{
                  ...inputStyle,
                  borderColor: errors.q9_goal3 ? "#f87171" : "rgba(255,255,255,0.12)",
                }}
              />
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
}
