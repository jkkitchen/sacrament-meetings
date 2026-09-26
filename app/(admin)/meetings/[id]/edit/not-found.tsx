import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col items-center py-16 px-6 md:px-16 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Meeting Not Found
        </h1>

        <p className="text-center mb-6">
          The meeting you are trying to edit could not be found.
        </p>

        <Link
          href="/meetings"
          className="rounded bg-grove-green px-4 py-2 font-semibold text-white hover:underline"
        >
          Go Back to Meetings
        </Link>
      </main>
    </div>
  );
}
