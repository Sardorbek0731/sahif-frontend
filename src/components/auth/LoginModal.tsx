"use client";

import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/auth/LoginForm";

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
  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm onSuccess={handleSuccess} />
    </Modal>
  );
}
