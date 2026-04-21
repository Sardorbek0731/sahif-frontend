import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export type Step = "phone" | "otp" | "name";

const MOCK_OTP = "123456";

export function useAuth(
  initialStep: Step = "phone",
  initialPhone = "",
  ignoreSession = false,
) {
  const { users, addOrActivateUser, setToken } = useAuthStore();

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

  const sendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPhone(phoneNumber);
    updateStep("otp", phoneNumber);
    setIsLoading(false);
  };

  const verifyOtp = async (code: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (code !== MOCK_OTP) {
      setError("invalidCode");
      setIsLoading(false);
      return false;
    }

    const existingUser = users.find((u) => u.phone === phone);
    if (!existingUser) {
      updateStep("name");
      setIsLoading(false);
      return false;
    } else {
      sessionStorage.removeItem("auth-step");
      sessionStorage.removeItem("auth-phone");
      addOrActivateUser(existingUser);
      setToken("mock-token-123");
      setIsLoading(false);
      return true;
    }
  };

  const submitName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));
    sessionStorage.removeItem("auth-step");
    sessionStorage.removeItem("auth-phone");
    addOrActivateUser({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      phone,
      firstName,
      lastName,
    });
    setToken("mock-token-123");
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
    sendOtp,
    verifyOtp,
    submitName,
    back,
  };
}
