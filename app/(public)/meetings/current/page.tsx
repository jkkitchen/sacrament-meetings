import { redirect } from "next/navigation";
import { getMeetingByDate } from "@/lib/meetings-db"; //added getMeetingByDate function to db to be used on this page

export const dynamic = "force-dynamic";

export default async function CurrentMeeting() {
  const today = new Date();
  const dayOfWeek = today.getDay(); //0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); //roll back to Sunday

  const sundayString = sunday.toISOString().split("T")[0];

  const meeting = await getMeetingByDate(sundayString); //query meetings database for this date uisng getMeetingByDate

  if (!meeting) { //if no matching meeting exists
    redirect("/meetings"); //use redirect to go to the meeting detail page once we've found the current meeting
  }

  redirect(`/meetings/${meeting.id}`); //go to meeting page
}
