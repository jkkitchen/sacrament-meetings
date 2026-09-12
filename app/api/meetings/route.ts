import { getMeetings } from "@/lib/meetings-db";

// GET /api/meetings route
export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date"); //optional--also get date from the url so you can display a specific meeting by date

  const meetings = getMeetings(date);

  return Response.json(meetings);
}
