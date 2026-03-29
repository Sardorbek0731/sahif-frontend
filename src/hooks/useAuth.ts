import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

type Step = "phone" | "otp" | "name";

const MOCK_OTP = "123456";

export function useAuth() {
  const { setUser, setToken } = useAuthStore();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPhone(phoneNumber);
      setStep("otp");
    } catch {
      setError("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (code !== MOCK_OTP) {
        setError("Kod noto'g'ri. Qaytadan urinib ko'ring.");
        return;
      }

      const mockIsNewUser = true;

      if (mockIsNewUser) {
        setStep("name");
      } else {
        setToken("mock-token-123");
        setUser({ id: "1", phone, firstName: "Foydalanuvchi", lastName: "" });
      }
    } catch {
      setError("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitName = async (firstName: string, lastName: string) => {
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setToken("mock-token-123");
      setUser({ id: "1", phone, firstName, lastName });
    } catch {
      setError("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
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
