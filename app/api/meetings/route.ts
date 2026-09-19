import { getMeetings, getMeetingsTotalPages, getMeetingByDate } from "@/lib/meetings-db";

// GET /api/meetings route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  //If a date is provided, return the meeting for that date
  const date = searchParams.get("date");
  
  if (date) {
    const meeting = await getMeetingByDate(date);
    return Response.json(meeting);
  }

  //Otherwise use Query or Page
  const query = searchParams.get("query") || ""; //default is no query so all results will be displayed
  const currentPage = Number(searchParams.get("page")) || 1; //default is page 1--or the first 5 meetings

  const [meetings, totalPages] = await Promise.all([
    //get total pages here in API route rather than directly from the server
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return Response.json({
    meetings,
    totalPages,
  });
}
