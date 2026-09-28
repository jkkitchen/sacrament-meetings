// components/login-form.tsx
"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="w-full space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full border rounded p-2"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="w-full border rounded p-2"
        />
      </div>

      {/* Login error */}
      {errorMessage && (
        <p role="alert" className="text-red-600 text-sm">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded bg-green-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
