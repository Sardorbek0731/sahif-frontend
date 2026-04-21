"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Input, OTPInput } from "@/components/ui/Input";
import Spinner from "../ui/Spinner";
import { type Step, useAuth } from "@/hooks/useAuth";

// ─── Phone Step ──────────────────────────────────────────────────────────────
function PhoneStep({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (phone: string) => void;
  isLoading: boolean;
  error: string;
}) {
  const t = useTranslations("auth.login.phone");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 9) onSubmit(`+998${digits}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("description")}</p>

      <label htmlFor="phone-input" className="text-muted-foreground mb-2 block">
        {t("label")}:
      </label>
      <Input
        id="phone-input"
        type="tel"
        inputMode="numeric"
        maxLength={9}
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
        placeholder="__ ___ __ __"
        prefix="+998"
        autoFocus
      />

      {error && <p className="text-rose-500 text-sm mt-3">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={value.replace(/\D/g, "").length !== 9 || isLoading}
        className="w-full justify-center py-3 mt-6"
      >
        {isLoading ? <Spinner className="w-6 h-6 border-2" /> : t("submit")}
      </Button>
    </form>
  );
}

// ─── OTP Step ────────────────────────────────────────────────────────────────
function OtpStep({
  phone,
  onSubmit,
  onBack,
  isLoading,
  error,
}: {
  phone: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string;
}) {
  const t = useTranslations("auth.login.otp");

  // "invalidCode" key bo'lsa tarjima qilamiz, boshqa xatolar to'g'ridan-to'g'ri
  const errorMessage = error === "invalidCode" ? t("invalidCode") : error;

  return (
    <div>
      <Button
        onClick={onBack}
        leftIcon="chevronLeft"
        iconSize={18}
        className="justify-center h-8 px-2 bg-card hover:bg-card-hover mb-6"
      >
        {t("back")}
      </Button>

      <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("description")} <span className="text-foreground">{phone}</span>
      </p>

      <OTPInput onComplete={onSubmit} isLoading={isLoading} />

      {errorMessage && (
        <p className="text-rose-500 text-sm mt-3">{errorMessage}</p>
      )}
    </div>
  );
}

// ─── Name Step ───────────────────────────────────────────────────────────────
function NameStep({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (firstName: string, lastName: string) => void;
  isLoading: boolean;
  error: string;
}) {
  const t = useTranslations("auth.login.name");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isValid = firstName.trim().length >= 2 && lastName.trim().length >= 2;

  const handleSubmit = () => {
    if (isValid) onSubmit(firstName.trim(), lastName.trim());
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("description")}</p>

      <label
        htmlFor="first-name-input"
        className="text-muted-foreground mb-2 block"
      >
        {t("firstNameLabel")}:
      </label>
      <Input
        id="first-name-input"
        type="text"
        value={firstName}
        maxLength={20}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={t("firstNamePlaceholder")}
        wrapperClassName="mb-6"
        autoFocus
      />

      <label
        htmlFor="last-name-input"
        className="text-muted-foreground mb-2 block"
      >
        {t("lastNameLabel")}:
      </label>
      <Input
        id="last-name-input"
        type="text"
        value={lastName}
        maxLength={20}
        onChange={(e) => setLastName(e.target.value)}
        placeholder={t("lastNamePlaceholder")}
        wrapperClassName="mb-6"
      />

      {error && <p className="text-rose-500 text-sm mt-1 mb-3">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || isLoading}
        className="w-full justify-center py-3"
      >
        {isLoading ? <Spinner className="w-6 h-6 border-2" /> : t("submit")}
      </Button>
    </form>
  );
}

// ─── LoginForm ───────────────────────────────────────────────────────────────
export default function LoginForm({
  onSuccess,
  onStepChange,
  initialStep = "phone",
  initialPhone = "",
  ignoreSession = false,
}: {
  onSuccess?: () => void;
  onStepChange?: (step: Step) => void;
  initialStep?: Step;
  initialPhone?: string;
  ignoreSession?: boolean;
}) {
  const {
    step,
    phone,
    isLoading,
    error,
    sendOtp,
    verifyOtp,
    submitName,
    back,
  } = useAuth(initialStep, initialPhone, ignoreSession);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("auth-step");
      sessionStorage.removeItem("auth-phone");
    };
  }, []);

  const handleSubmitName = async (firstName: string, lastName: string) => {
    await submitName(firstName, lastName);
    onSuccess?.();
  };

  return (
    <div className="w-full">
      {step === "phone" && (
        <PhoneStep onSubmit={sendOtp} isLoading={isLoading} error={error} />
      )}
      {step === "otp" && (
        <OtpStep
          phone={phone}
          onSubmit={async (code) => {
            const success = await verifyOtp(code);
            if (success) onSuccess?.();
          }}
          onBack={back}
          isLoading={isLoading}
          error={error}
        />
      )}
      {step === "name" && (
        <NameStep
          onSubmit={handleSubmitName}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}
