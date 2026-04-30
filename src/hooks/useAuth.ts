import { useState } from "react";
import { sendOTP, verifyOTP, register } from "@/app/actions/auth";

export type Step = "phone" | "otp" | "name";

/**
 * Authentication hook
 * Server Actions bilan ishlaydi - client-side validation yo'q
 */
export function useAuth(
  initialStep: Step = "phone",
  initialPhone = "",
  ignoreSession = false,
) {
  const [step, setStep] = useState<Step>(() => {
    if (typeof window === "undefined" || ignoreSession) return initialStep;
    const saved = sessionStorage.getItem("auth-step") as Step;
    return saved === "name" ? "name" : initialStep;
  });

  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined" || ignoreSession) return initialPhone;
    return sessionStorage.getItem("auth-phone") || initialPhone;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateStep = (s: Step, p = phone) => {
    if (s === "name") {
      sessionStorage.setItem("auth-step", "name");
      sessionStorage.setItem("auth-phone", p);
    } else {
      sessionStorage.removeItem("auth-step");
      sessionStorage.removeItem("auth-phone");
    }
    setStep(s);
  };

  const handleSendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    setError("");

    // ✅ Server Action - xavfsiz
    const result = await sendOTP(phoneNumber);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setPhone(phoneNumber);
    updateStep("otp", phoneNumber);
    setIsLoading(false);
  };

  const handleVerifyOtp = async (code: string) => {
    setIsLoading(true);
    setError("");

    // ✅ Server Action - xavfsiz
    const result = await verifyOTP(phone, code);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return false;
    }

    if (result.data?.needsRegistration) {
      updateStep("name");
      setIsLoading(false);
      return false;
    } else {
      // Login successful
      sessionStorage.removeItem("auth-step");
      sessionStorage.removeItem("auth-phone");
      setIsLoading(false);
      return true;
    }
  };

  const handleSubmitName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    setError("");

    // ✅ Server Action - xavfsiz
    const result = await register(phone, firstName, lastName);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    sessionStorage.removeItem("auth-step");
    sessionStorage.removeItem("auth-phone");
    setIsLoading(false);
  };

  const back = () => {
    setError("");
    if (step === "otp") updateStep("phone");
  };

  return {
    step,
    phone,
    isLoading,
    error,
    sendOtp: handleSendOtp,
    verifyOtp: handleVerifyOtp,
    submitName: handleSubmitName,
    back,
  };
}
