import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";

type PageProps = {
  params: Promise<{ id: string }>; //gets id from url
};

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;

  const meeting = getMeetingById(Number(id));

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

return (
  <main className="container mx-auto bg-white py-16 px-4 sm:px-8">
    <MeetingDetail meeting={meeting} />
  </main>
);
}
