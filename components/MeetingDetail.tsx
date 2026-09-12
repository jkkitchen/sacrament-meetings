import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article>
      <h1>{meeting.date}</h1>
      <p>Meeting Type: {meeting.meetingType}</p>
      <p>Presiding: {meeting.presiding}</p>
      <p>Conducting: {meeting.conducting}</p>

      <h2>Opening</h2>
      <p>Hymn: #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
      <p>Prayer: {meeting.openingPrayer}</p>

      <h2>Ward Business</h2>
      {meeting.wardBusiness.map((item, index) => (
        <p key={index}>{item.description}</p>
      ))}

      <p>Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}</p>

      <h2>Sacrament</h2>
      <p>Hymn: #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>

      <h2>Speakers</h2>
      {meeting.speakers.map((item, index) => (
        <p key={index}>
          {item.name}
          {item.topic && ` - ${item.topic}`}
        </p>
      ))}

      <h2>Closing</h2>
      <p>Hymn: #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
      <p>Prayer: {meeting.closingPrayer}</p>

      <h2>Announcements</h2>
      {meeting.announcements?.map((announcement, index) => (
        <p key={index}>{announcement}</p>
      ))}
    </article>
  );
}
