import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password — AlmiCV",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="rounded-2xl border border-peach/30 bg-white p-8 shadow-warm-card-hover">
      <h1 className="text-3xl text-plum">Forgot your password?</h1>
      <p className="mt-2 text-sm text-plum-soft">
        Enter your email and we&apos;ll send you a link to set a new one.
      </p>

      <ForgotPasswordForm />

      <p className="mt-6 text-center text-sm text-plum-soft">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-coral hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
