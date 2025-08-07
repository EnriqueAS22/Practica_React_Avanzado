import React from "react";
import Button from "./button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 text-center shadow-xl">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <div className="flex justify-center gap-4">
          <Button $variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button $variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
