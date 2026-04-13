"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
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
    <div>
      <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("description")}</p>

      <label className="text-muted-foreground mb-2 block">{t("label")}:</label>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 focus-within:border-primary transition-all">
        <span className="text-foreground select-none">+998</span>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={9}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="__ ___ __ __"
          className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          autoFocus
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={value.replace(/\D/g, "").length !== 9 || isLoading}
        className="w-full justify-center bg-primary text-foreground py-3 mt-6 hover:bg-primary/90 disabled:bg-primary/40 disabled:text-foreground/40 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner className="w-6 h-6 border-2" /> : t("submit")}
      </Button>
    </div>
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
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, val: string) => {
    if (isLoading) return;
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);

    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (next.every((v) => v !== "") && val) {
      onSubmit(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setValues(pasted.split(""));
      onSubmit(pasted);
    }
  };

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

      <div className="flex gap-2" onPaste={handlePaste}>
        {values.map((v, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-full aspect-square text-center text-lg font-bold text-foreground bg-card border border-border rounded-lg outline-none focus:border-primary transition-colors"
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      {isLoading && <Spinner className="w-8 h-8 border-2 mt-6" />}
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
    <div>
      <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("description")}</p>

      <label className="text-muted-foreground mb-2 block">
        {t("firstNameLabel")}:
      </label>
      <input
        type="text"
        value={firstName}
        maxLength={20}
        onChange={(e) => setFirstName(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          document.getElementById("last-name-input")?.focus()
        }
        placeholder={t("firstNamePlaceholder")}
        className="w-full text-foreground outline-none placeholder:text-muted-foreground rounded-lg border border-border bg-card px-4 py-3 focus-within:border-primary transition-all mb-6"
        autoFocus
      />

      <label className="text-muted-foreground mb-2 block">
        {t("lastNameLabel")}:
      </label>
      <input
        id="last-name-input"
        type="text"
        value={lastName}
        maxLength={20}
        onChange={(e) => setLastName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder={t("lastNamePlaceholder")}
        className="w-full text-foreground outline-none placeholder:text-muted-foreground rounded-lg border border-border bg-card px-4 py-3 focus-within:border-primary transition-all mb-6"
      />

      <Button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="w-full justify-center bg-primary text-foreground py-3 hover:bg-primary/90 disabled:bg-primary/40 disabled:text-foreground/40 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner className="w-6 h-6 border-2" /> : t("submit")}
      </Button>
    </div>
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
