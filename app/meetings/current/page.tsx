import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeeting() {
  const today = new Date();
  const dayOfWeek = today.getDay(); //0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); //roll back to Sunday

  const sundayString = sunday.toISOString().split("T")[0];

  const meetings = getMeetings(sundayString); //query meetings data for this date

  if (meetings.length === 0) { //if no matching meeting exists
    redirect("/meetings"); //use redirect to go to the meeting detail page once we've found the current meeting
  }

  redirect(`/meetings/${meetings[0].id}`);
}
