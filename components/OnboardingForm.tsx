"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import ConfirmationScreen from "./ConfirmationScreen";

export type FormData = {
  // Section 1
  q1_name: string;
  q2_messaging_app: string;
  q2_messaging_other: string;
  q3_phone: string;
  q4_timezone: string;
  q5_active_hours: string[];
  // Section 2
  q6_work: string;
  q7_projects: string;
  q8_weekday: string;
  q9_goal1: string;
  q9_goal2: string;
  q9_goal3: string;
  // Section 3
  q10_capabilities: string[];
  q10_other_text: string;
  q11_top_priority: string;
  // Section 4
  q12_communication: string;
  q12_depends_text: string;
  q13_never_do: string;
  q14_tone: string;
  q15_agent_name: string;
  // Section 5
  q16_integrations: string[];
  q16_integrations_other: string;
  q17_monitoring: string;
  // Section 6
  q18_private: string;
  q19_access: string;
  q19_other_text: string;
  q20_proactive: string;
  // Section 7
  q21_word1: string;
  q21_word2: string;
  q21_word3: string;
  q22_motivation: string;
  q23_time_waster: string;
  q24_anything_else: string;
};

const TOTAL_STEPS = 7;

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, getValues, trigger, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      q5_active_hours: [],
      q10_capabilities: [],
      q16_integrations: [],
      q2_messaging_app: "",
      q12_communication: "",
      q19_access: "",
      q20_proactive: "",
    },
  });

  const watchedValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["q1_name", "q2_messaging_app", "q3_phone", "q4_timezone"];
        break;
      case 2:
        fieldsToValidate = ["q6_work", "q9_goal1", "q9_goal2", "q9_goal3"];
        break;
      case 3:
        fieldsToValidate = ["q11_top_priority"];
        break;
      case 4:
        fieldsToValidate = ["q12_communication", "q13_never_do", "q14_tone"];
        break;
      case 5:
        fieldsToValidate = [];
        break;
      case 6:
        fieldsToValidate = ["q19_access", "q20_proactive"];
        break;
      case 7:
        fieldsToValidate = ["q21_word1", "q21_word2", "q21_word3", "q22_motivation", "q23_time_waster"];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmittedData(data);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && submittedData) {
    return <ConfirmationScreen data={submittedData} />;
  }

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  const sectionTitles = [
    "The Basics",
    "Your Life & Work",
    "What You Want Your Agent To Do",
    "Communication Style",
    "Integrations & Access",
    "Privacy & Boundaries",
    "Personality Snapshot",
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,10,15,0.95)" }} className="sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="AILevelUp" style={{ height: "72px", width: "auto", objectFit: "contain" }} />
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", fontWeight: 500 }}>
                Personal AI Onboarding
              </div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "9999px", height: "4px", overflow: "hidden" }}>
            <div
              style={{
                background: "linear-gradient(90deg, #7c3aed, #8b5cf6)",
                borderRadius: "9999px",
                height: "100%",
                width: `${progressPercent}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "6px" }}>
            {sectionTitles[currentStep - 1]}
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <Section1 register={register} errors={errors} watch={watchedValues} setValue={setValue} control={control} />
          )}
          {currentStep === 2 && (
            <Section2 register={register} errors={errors} />
          )}
          {currentStep === 3 && (
            <Section3 register={register} errors={errors} watch={watchedValues} setValue={setValue} control={control} />
          )}
          {currentStep === 4 && (
            <Section4 register={register} errors={errors} watch={watchedValues} setValue={setValue} control={control} />
          )}
          {currentStep === 5 && (
            <Section5 register={register} errors={errors} watch={watchedValues} setValue={setValue} control={control} />
          )}
          {currentStep === 6 && (
            <Section6 register={register} errors={errors} watch={watchedValues} setValue={setValue} control={control} />
          )}
          {currentStep === 7 && (
            <Section7 register={register} errors={errors} />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  border: "none",
                  color: "white",
                  padding: "12px 32px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                  transition: "all 0.2s",
                }}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting
                    ? "rgba(124,58,237,0.5)"
                    : "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  border: "none",
                  color: "white",
                  padding: "12px 32px",
                  borderRadius: "10px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                  transition: "all 0.2s",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit →"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
