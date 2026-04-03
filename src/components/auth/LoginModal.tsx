"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/auth/LoginForm";
import { type Step } from "@/hooks/useAuth";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) {
  const [step, setStep] = useState<Step>("phone");

  const handleClose = () => {
    if (step === "name") return;
    setStep("phone");
    onClose();
  };

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={step !== "name"}
      maxWidth="max-w-90"
    >
      <LoginForm
        onSuccess={handleSuccess}
        onStepChange={setStep}
        ignoreSession
      />
    </Modal>
  );
}
