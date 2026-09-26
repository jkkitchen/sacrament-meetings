"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    console.error("An uncaught error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col items-center py-16 px-6 md:px-16 bg-white">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-center mb-6">
            Something went wrong!
          </h1>

          <p className="mb-8">
            An unexpected error occurred. Please try again later.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={reset}
              className="rounded bg-grove-green px-4 py-2 font-semibold text-white hover:underline cursor-pointer"
            >
              Try Again
            </button>

            <Link
              href="/meetings"
              className="rounded bg-grove-green px-4 py-2 font-semibold text-white hover:underline"
            >
              Go Back to Meetings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
