import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export type Step = "phone" | "otp" | "name";

const MOCK_OTP = "123456";

export function useAuth() {
  const { setUser, setToken, user } = useAuthStore();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPhone(phoneNumber);
    setStep("otp");
    setIsLoading(false);
  };

  const verifyOtp = async (code: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (code !== MOCK_OTP) {
      setError("Kod noto'g'ri. Qaytadan urinib ko'ring.");
      setIsLoading(false);
      return;
    }

    if (!user) {
      setStep("name");
    } else {
      setToken("mock-token-123");
      setUser({ id: "1", phone, firstName: "Foydalanuvchi", lastName: "" });
    }
    setIsLoading(false);
  };

  const submitName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setToken("mock-token-123");
    setUser({ id: "1", phone, firstName, lastName });
    setIsLoading(false);
  };

  const back = () => {
    setError("");
    if (step === "otp") setStep("phone");
    if (step === "name") setStep("otp");
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
