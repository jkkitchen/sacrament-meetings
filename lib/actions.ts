"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "@/lib/meetings-db"; //using aliases so the functions here don't have the same names as the functions being imported


//Create Meeting
//....Create Meeting Schema using Zod
const MeetingFormSchema = z.object({
    date: z.string().min(1, "Date is required."),
    meetingType: z.enum(["testimony", "regular", "stake", "general"]),
    presiding: z.string().min(1, "Presiding officer is required."),
    conducting: z.string().min(1, "Conducting officer is required."),
    announcements: z.array(z.string()).optional(),
    openingHymn: z.object({
        number: z.coerce
        .number()
        .int("Hymn number must be a whole number.")
        .positive("Hymn number is required."),
        title: z.string().min(1, "Opening hymn title is required."),
    }),
    openingPrayer: z.string().min(1, "Opening prayer is required."),
    wardBusiness: z.array(
        z.object({
        description: z.string().min(1, "Ward business description is required."),
        }),
    ),
    stakeBusiness: z.boolean(),
    sacramentHymn: z.object({
        number: z.coerce
        .number()
        .int("Hymn number must be a whole number.")
        .positive("Hymn number is required."),
        title: z.string().min(1, "Sacrament hymn title is required."),
    }),
    speakers: z.array(
        z.object({
        name: z.string().min(1, "Name is required."),
        topic: z.string().min(1, "Topic is required."),
        type: z.enum(["speaker", "musical-number"]),
        }),
    ),
    closingHymn: z.object({
        number: z.coerce
        .number()
        .int("Hymn number must be a whole number.")
        .positive("Hymn number is required."),
        title: z.string().min(1, "Closing hymn title is required."),
    }),
    closingPrayer: z.string().min(1, "Closing prayer is required."),
});

//....Define State for Error Handling on Form
export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

//....Create Meeting
export async function createMeeting(
    _prevState: State,
    formData: FormData,
): Promise<State> {
    
    //Get data from the form
    //...Get speakers first because there are three parts that need to be combined into one
    const speakerNames = formData.getAll("speakerName");
    const speakerTopics = formData.getAll("speakerTopic");
    const speakerTypes = formData.getAll("speakerType");

    //...Build rawSpeakers object then filter out blank rows
    const rawSpeakers = speakerNames
    .map((name, index) => ({
        name,
        topic: speakerTopics[index],
        type: speakerTypes[index],
    }))
    .filter(
        (speaker) =>
        speaker.name.toString().trim() !== "" ||
        speaker.topic.toString().trim() !== "",
    );
    
    const raw = {
        date: formData.get("date"),
        meetingType: formData.get("meetingType"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),

        //Filter announcements for empty rows
            announcements: formData
            .getAll("announcements")
            .filter((item) => item.toString().trim() !== ""),

        openingHymn: {
            number: formData.get("openingHymnNumber"),
            title: formData.get("openingHymnTitle"),
        },

        openingPrayer: formData.get("openingPrayer"),

        //Filtering optional blank rows
        wardBusiness: formData
            .getAll("wardBusiness")
            .filter((item) => item.toString().trim() !== "")
            .map((item) => ({
            description: item,
            })),

        stakeBusiness: formData.get("stakeBusiness") === "true",

        sacramentHymn: {
            number: formData.get("sacramentHymnNumber"),
            title: formData.get("sacramentHymnTitle"),
        },

        speakers: rawSpeakers,

        closingHymn: {
            number: formData.get("closingHymnNumber"),
            title: formData.get("closingHymnTitle"),
        },

        closingPrayer: formData.get("closingPrayer"),
    };

    //Check that values entered are valid, otherwise return error message.
    const validatedFields = MeetingFormSchema.safeParse(raw);
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing or invalid fields. Failed to create meeting.",
        };
    }
    
    //Call function from meetings-db.ts to enter data in database
    try {
        await addMeeting(validatedFields.data);
    } catch (error) {
        console.error("Error creating meeting:", error);
        throw new Error("Database Error: Failed to create meeting.");
    }

    //Refresh the cached version of meetings page and reload
    revalidatePath("/meetings");
    redirect("/meetings");
}


//Update Meeting
export async function updateMeeting(
    id: number,
    _prevState: State,
    formData: FormData
): Promise<State> {
    //Get data from the form
    //...Get speakers first because you need all three parts combined into one
    const speakerNames = formData.getAll("speakerName");
    const speakerTopics = formData.getAll("speakerTopic");
    const speakerTypes = formData.getAll("speakerType");

    //...Build rawSpeakers object then filter out blank rows
    const rawSpeakers = speakerNames
        .map((name, index) => ({
        name,
        topic: speakerTopics[index],
        type: speakerTypes[index],
        }))
        .filter(
        (speaker) =>
            speaker.name.toString().trim() !== "" ||
            speaker.topic.toString().trim() !== "",
        );

    const raw = {
        date: formData.get("date"),
        meetingType: formData.get("meetingType"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),

        //Filter announcements for empty rows
        announcements: formData
            .getAll("announcements")
            .filter((item) => item.toString().trim() !== ""),

        openingHymn: {
            number: formData.get("openingHymnNumber"),
            title: formData.get("openingHymnTitle"),
        },

        openingPrayer: formData.get("openingPrayer"),

        //Filtering optional blank rows
        wardBusiness: formData
            .getAll("wardBusiness")
            .filter((item) => item.toString().trim() !== "")
            .map((item) => ({
            description: item,
            })),

        stakeBusiness: formData.get("stakeBusiness") === "true",

        sacramentHymn: {
            number: formData.get("sacramentHymnNumber"),
            title: formData.get("sacramentHymnTitle"),
        },

        speakers: rawSpeakers,

        closingHymn: {
            number: formData.get("closingHymnNumber"),
            title: formData.get("closingHymnTitle"),
        },

        closingPrayer: formData.get("closingPrayer"),
    };

    //Check form entries to ensure they are valid, if not, return error
    const validatedFields = MeetingFormSchema.safeParse(raw);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to update meeting."
        };
    }

    //Call function from meetings-db.ts to update meeting in the database
    try {
        await updateMeetingInDb(id, validatedFields.data);
    } catch (error) {
        console.error("Error updating meeting:", error);
        throw new Error("Database Error: Failed to update meeting.");
    }

    //Refresh the cached version of meetings page and reload
    revalidatePath("/meetings");
    redirect("/meetings");
}


//Delete Meeting
export async function deleteMeeting(id: number) {
    //Call function from meetings-db.ts to delete meeting in the database
    try {
        const deleted = await deleteMeetingFromDb(id);
        if (!deleted) {
          throw new Error("Meeting not found.");
        }

    } catch (error) {
        console.error("Error deleting meeting:", error);
        throw new Error("Failed to delete meeting. Please try again later.");
    }

    //Refresh the cached version of meetings page and return to meetings page
    revalidatePath("/meetings");
    redirect("/meetings");
}
