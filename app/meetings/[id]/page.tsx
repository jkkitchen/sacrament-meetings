// import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

type PageProps = {
  params: Promise<{ id: string }>; //gets id from url
};

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;

    //Switched to fetching data from API
    //   const meeting = getMeetingById(Number(id));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings/${id}`);
    
      if (!response.ok) {
        return <p>Meeting not found.</p>;
      }
    
    const meeting: SacramentMeeting = await response.json();

return (
  <main className="container mx-auto bg-white py-16 px-4 sm:px-8">
    <MeetingDetail meeting={meeting} />
  </main>
);
}
