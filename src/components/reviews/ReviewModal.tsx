"use client";

import { Modal } from "@/components/ui/modal";
import { ReviewForm } from "./ReviewForm";

export function ReviewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Share your experience"
      size="lg"
    >
      <div className="space-y-5">
        <p className="text-sm text-plum-soft">
          Help us improve AlmiCV. Your feedback shapes what we build next.
        </p>
        <ReviewForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}
