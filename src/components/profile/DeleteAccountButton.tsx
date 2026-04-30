"use client";

import { useState } from "react";
import { deleteAccount } from "@/app/actions/auth";
import { useRouter } from "@/i18n/navigation";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    const result = await deleteAccount();

    if (!result.success) {
      setError(result.error);
      setIsDeleting(false);
      return;
    }

    // Account deleted successfully - redirect to home
    router.push("/");
    router.refresh();
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Delete Account
      </button>
    );
  }

  return (
    <div className="border border-red-500 rounded p-4 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-red-600">
          ⚠️ Delete Account Permanently?
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          This action cannot be undone. All your data will be permanently
          deleted:
        </p>
        <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
          <li>Personal information (name, phone)</li>
          <li>Order history</li>
          <li>Reviews and ratings</li>
          <li>Wishlist and cart</li>
        </ul>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          Error: {error}. Please try again.
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
