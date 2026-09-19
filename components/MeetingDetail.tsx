import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="w-full">
      <h1 className="text-center text-2xl font-bold mb-6">
        {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h1>
      <p className="capitalize">Meeting Type: {meeting.meetingType}</p>
      <p>Presiding: {meeting.presiding}</p>
      <p className="mb-4">Conducting: {meeting.conducting}</p>

      <p>
        Opening Hymn: #{meeting.openingHymn.number} -{" "}
        {meeting.openingHymn.title}
      </p>
      <p className="mb-4">Opening Prayer: {meeting.openingPrayer}</p>

      <p>Ward Business:</p>

      {meeting.wardBusiness.map((item, index) => (
        <p key={index} className="mb-4">{item.description}</p>
      ))}

      <p className="mb-4">Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}</p>

      <p>
        Sacrament Hymn: #{meeting.sacramentHymn.number} -{" "}
        {meeting.sacramentHymn.title}
      </p>

      <h2 className="mt-4">Speakers:</h2>
      {meeting.speakers.map((item, index) => (
        <p key={index}>
          {item.name}
          {item.topic && ` - ${item.topic}`}
        </p>
      ))}

      <p className="mt-4">
        Closing Hymn: #{meeting.closingHymn.number} -{" "}
        {meeting.closingHymn.title}
      </p>
      <p className="mb-4">Closing Prayer: {meeting.closingPrayer}</p>

      <h2>Announcements:</h2>
      {meeting.announcements?.map((announcement, index) => (
        <p key={index}>{announcement}</p>
      ))}
    </article>
  );
}
