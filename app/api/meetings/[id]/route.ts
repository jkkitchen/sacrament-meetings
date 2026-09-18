import { getMeetingById } from "@/lib/meetings-db";

// GET /api/meetings/[id] route
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    return Response.json({ error: "Invalid meeting id." }, { status: 400 });
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { error: "No meeting with that id exists." },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}