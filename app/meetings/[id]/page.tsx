// import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic"; //Tells Vercel not to pre-render this page (was making the build fail)

type PageProps = {
  params: Promise<{ id: string }>; //gets id from url
};

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;

    //Switched to fetching data from API
    //   const meeting = getMeetingById(Number(id));
   
   //If on Vercel, use Vercel URL, otherwise use localhost
    const baseUrl = process.env.VERCEL_URL
     ? `https://${process.env.VERCEL_URL}`
     : "http://localhost:3000";

   const response = await fetch(`${baseUrl}/api/meetings/${id}`);
    
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
