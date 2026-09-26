import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import EditMeetingForm from "@/components/EditMeetingForm";



export default async function EditMeeting(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id); //Converted to a number because it's defined as a number in types.ts

  //Get meeting from db
  const meeting = await getMeetingById(id);

  //Check if meeting is in db
  if (!meeting) {
    notFound();
  }

  //Render edit meeting form component
 return (
   <div className="flex flex-col flex-1">
     <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col py-16 px-6 md:px-16 bg-white">
       <h1 className="text-3xl font-bold text-center mb-8">Edit Meeting</h1>
       <EditMeetingForm meeting={meeting} />       
     </main>
   </div>
 );}
