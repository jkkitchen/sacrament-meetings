import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

//Fetching data from the API rather than calling the database function directly so commented out this line.
// import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic"; //Tells Vercel not to pre-render the page, wait for the API request

export default async function Meetings() { //made async when using api fetch
    //Commented out when switched to API fetch
    //const meetings = getMeetings();

    //If on Vercel, use Vercel URL, otherwise use localhost
    const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/meetings`);
    
    const meetings: SacramentMeeting[] = await response.json();

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
