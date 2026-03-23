import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";

type Step = "phone" | "otp" | "name";

// TODO: backendchi bu konstantalarni o'chiradi
const MOCK_OTP = "123456";

export function useAuth() {
  const { setUser, setToken } = useAuthStore();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const sendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: POST /auth/send-otp { phone: phoneNumber }
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
      // TODO: POST /auth/verify-otp { phone, code }
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (code !== MOCK_OTP) {
        setError("Kod noto'g'ri. Qaytadan urinib ko'ring.");
        return;
      }

      // TODO: backenddan { token, user, isNewUser } qaytadi
      const mockIsNewUser = true;
      setIsNewUser(mockIsNewUser);

      if (mockIsNewUser) {
        setStep("name");
      } else {
        setToken("mock-token-123");
        setUser({ id: "1", phone, name: "Foydalanuvchi" });
      }
    } catch {
      setError("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitName = async (name: string) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: POST /auth/set-name { name }
      await new Promise((resolve) => setTimeout(resolve, 800));

      setToken("mock-token-123");
      setUser({ id: "1", phone, name });
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
    isNewUser,
    error,
    sendOtp,
    verifyOtp,
    submitName,
    back,
  };
}
