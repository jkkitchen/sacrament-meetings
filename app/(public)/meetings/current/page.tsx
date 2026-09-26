import { redirect } from "next/navigation";
import { getMeetingByDate } from "@/lib/meetings-db"; //added getMeetingByDate function to db to be used on this page

export const dynamic = "force-dynamic";

export default async function CurrentMeeting() {
  const today = new Date();
  const dayOfWeek = today.getDay(); //0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); //roll back to Sunday

  // Format the local date as YYYY-MM-DD (prevents error during the hours of 8PM and 12PM for me when UTC date is different from local date)
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const day = String(sunday.getDate()).padStart(2, "0");
  const sundayString = `${year}-${month}-${day}`;

  //Query meetings database for this date uisng getMeetingByDate
  const meeting = await getMeetingByDate(sundayString);

  console.log("Meeting found:", meeting);

  if (!meeting) {
    //if no matching meeting exists
    redirect("/meetings"); //use redirect to go to the meeting detail page once we've found the current meeting
  }

  redirect(`/meetings/${meeting.id}`); //go to meeting page
}
