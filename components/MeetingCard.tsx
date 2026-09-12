import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article>
      <h2>{meeting.date}</h2>
      <p>{meeting.meetingType}</p>

      <Link href={`/meetings/${meeting.id}`}>View Meeting</Link>
    </article>
  );
}
