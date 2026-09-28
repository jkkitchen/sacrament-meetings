// import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "@/components/PrintButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic"; //Tells Next.js not to pre-render this page (was making the build fail)

type PageProps = {
  params: Promise<{ id: string }>; //gets id from url
};

//Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings/${id}`,
  );

  if (!response.ok) {
    return {
      title: "Meeting Not Found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  const meeting: SacramentMeeting = await response.json();

  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const meetingType =
    meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1);

  return {
    title: `${meetingType} Meeting - ${formattedDate}`,
    description: `View the sacrament meeting agenda for ${formattedDate}.`,
    openGraph: {
      title: `${meetingType} Meeting - ${formattedDate}`,
      description: `View the sacrament meeting agenda for ${formattedDate}.`,
    },
  };
}

//Page
export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;

    //Switched to fetching data from API
    //   const meeting = getMeetingById(Number(id));
 
   const response = await fetch(
     `${process.env.NEXT_PUBLIC_BASE_URL}/api/meetings/${id}`,
   );
    
      if (!response.ok) {
        return <p>Meeting not found.</p>;
      }
    
    const meeting: SacramentMeeting = await response.json();

return (
  <main className="container mx-auto bg-white py-16 px-4 sm:px-8">
    <MeetingDetail meeting={meeting} />
    <div className="mt-8 flex justify-center">
      <PrintButton />
    </div>
  </main>
);
}
