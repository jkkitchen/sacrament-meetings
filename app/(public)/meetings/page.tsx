import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { deleteMeeting } from "@/lib/actions";

//Fetching data from the API rather than calling the database function directly so commented out this line.
// import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic"; //Tells Next.js not to pre-render the page, wait for the API request

export default async function Meetings(props: {
  //made async when using api fetch--left everything pulling data from API routes rather than back to using server functions on W03
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  //Add search option
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? ""; //Get the query from the URL, if there isn't one, make the query an empty string
  const currentPage = Number(searchParams?.page) || 1; //Get the page from the URL, if there isn't one, make the page 1

  //Sends an API request to /api/meetings.
  //The response contains the status, headers, and a body containing the meetings and totalPages.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings?query=${encodeURIComponent(query)}&page=${currentPage}`, //encodeURIComponent makes a piece of text into a URL-safe form (ex. "Bishop Smith" => "Bishop%20Smith")
  );

  if (!response.ok) {
    //tells us if the http request succeeded
    return <p>Unable to load meetings.</p>;
  }

  //Updated to be "data" rather than just "meetings" because the API route for this now provides both meeting data and totalPages from db
  const data = await response.json();
  const meetings: SacramentMeeting[] = data.meetings;
  const totalPages: number = data.totalPages;  

  //Render meeting links
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col items-center py-8 px-16 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">All Meetings</h1>

        <div className="mb-6 w-full max-w-md mx-auto">
          <MeetingSearch />
        </div>

        <div className="flex flex-col gap-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-lg bg-grove-green px-6 py-4 text-white"
            >
              <h2 className="text-lg font-semibold text-center">
                {meeting.meetingType.charAt(0).toUpperCase() +
                  meeting.meetingType.slice(1)}{" "}
                Meeting
              </h2>

              <p className="text-center mb-3">
                {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
                  "en-US",
                )}
              </p>

              <div className="flex items-center justify-center gap-3">
                <Link
                  href={`/meetings/${meeting.id}`}
                  className="rounded bg-white/15 px-3 py-1 font-semibold hover:bg-white/25"
                >
                  View
                </Link>

                <Link
                  href={`/meetings/${meeting.id}/edit`}
                  className="rounded bg-white/15 px-3 py-1 font-semibold hover:bg-white/25"
                >
                  Edit
                </Link>

                <form action={deleteMeeting.bind(null, meeting.id)}>
                  <button
                    type="submit"
                    className="rounded bg-white/15 px-3 py-1 font-semibold hover:bg-white/25 cursor-pointer"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalPages} />
      </main>
    </div>
  );
}
