import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export default function Meetings() {
  const meetings = getMeetings();

  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col items-center py-16 px-16 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">All Meetings</h1>

        <div className="flex flex-col gap-4">
          {meetings.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/meetings/${meeting.id}`}
              className="rounded-lg bg-grove-green px-6 py-3 text-white"
            >
              {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US")}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
