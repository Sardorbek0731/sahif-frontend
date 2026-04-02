"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { useAuth, type Step } from "@/hooks/useAuth";

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
      <h2 className="text-xl font-bold text-foreground mb-1">{t("title")}</h2>
      <p className="text-sm text-foreground/50 mb-6">{t("description")}</p>

      <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
        {t("label")}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-foreground/15 bg-card px-4 py-3 mb-2 focus-within:border-primary transition-colors">
        <span className="text-sm text-foreground/50 select-none">+998</span>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={9}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="__ ___ __ __"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/25"
          autoFocus
        />
      </div>

      {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={value.replace(/\D/g, "").length !== 9 || isLoading}
        className="w-full justify-center bg-primary text-white py-3 mt-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t("loading") : t("submit")}
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
      <button
        onClick={onBack}
        className="text-sm text-foreground/50 hover:text-foreground transition-colors mb-4 flex items-center gap-1"
      >
        ← {t("back")}
      </button>

      <h2 className="text-xl font-bold text-foreground mb-1">{t("title")}</h2>
      <p className="text-sm text-foreground/50 mb-6">
        {t("description")}{" "}
        <span className="text-foreground font-medium">{phone}</span>
      </p>

      <div className="flex gap-2 mb-2" onPaste={handlePaste}>
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
            className="w-full aspect-square text-center text-lg font-bold text-foreground bg-card border border-foreground/15 rounded-lg outline-none focus:border-primary transition-colors"
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && <p className="text-xs text-rose-500 mt-2">{error}</p>}

      {isLoading && (
        <p className="text-xs text-foreground/40 mt-3 text-center">
          {t("loading")}
        </p>
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
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">{t("title")}</h2>
      <p className="text-sm text-foreground/50 mb-6">{t("description")}</p>

      <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
        {t("firstNameLabel")}
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
        className="w-full rounded-lg border border-foreground/15 bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/25 focus:border-primary transition-colors mb-3"
        autoFocus
      />

      <label className="text-sm font-medium text-foreground/70 mb-1.5 block">
        {t("lastNameLabel")}
      </label>
      <input
        id="last-name-input"
        type="text"
        value={lastName}
        maxLength={20}
        onChange={(e) => setLastName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder={t("lastNamePlaceholder")}
        className="w-full rounded-lg border border-foreground/15 bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/25 focus:border-primary transition-colors mb-2"
      />

      {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="w-full justify-center bg-primary text-white py-3 mt-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t("loading") : t("submit")}
      </Button>
    </div>
  );
}

// ─── LoginForm ───────────────────────────────────────────────────────────────
export default function LoginForm({
  onSuccess,
  onStepChange,
}: {
  onSuccess?: () => void;
  onStepChange?: (step: Step) => void;
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
  } = useAuth();

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const handleSubmitName = async (firstName: string, lastName: string) => {
    await submitName(firstName, lastName);
    onSuccess?.();
  };

  return (
    <div className="w-full max-w-sm">
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
