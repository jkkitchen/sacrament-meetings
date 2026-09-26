import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

//Added function getMeetingByDate to use on current/page.tsx
export async function getMeetingByDate(
  date: string,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE date = ${date}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

//SQL Query to add meeting to database
export async function addMeeting(
  data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  //Convert announcements to a PostgreSQL array format
  const announcements = `{${(data.announcements ?? [])
    .map((item) => `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",")}}`;

  //Create a new meeting in the database and return values entered
  //Use JSON.stringify for JSONB fields
  //Use CamelCase for variables within this code, but snake_case for interactions with database
  const rows = await sql`
    INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      )
      VALUES (
        ${data.date},
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${announcements}::text[],
        ${JSON.stringify(data.openingHymn)},
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness)},
        ${data.stakeBusiness},
        ${JSON.stringify(data.sacramentHymn)},
        ${JSON.stringify(data.speakers)},
        ${JSON.stringify(data.closingHymn)},
        ${data.closingPrayer}
      )
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type AS "meetingType",
        presiding,
        conducting,
        announcements,
        opening_hymn AS "openingHymn",
        opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness",
        stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn",
        speakers,
        closing_hymn AS "closingHymn",
        closing_prayer AS "closingPrayer"
    `;

  return rows[0] as unknown as SacramentMeeting;
}


export async function updateMeeting(
  id: number,
  updates: Omit<SacramentMeeting, "id">, //Changed this from partial to omit because every value in the database is being overwritten
): Promise<SacramentMeeting | null> {
  
  //Convert announcements to a PostgreSQL array format
  const announcements = `{${(updates.announcements ?? [])
    .map((item) => `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",")}}`;

  //Update meeting in the database and return values entered
  //Use JSON.stringify for JSONB fields
  //Use CamelCase for variables within this code, but snake_case for interactions with database
  const rows = await sql`
    UPDATE meetings
    SET date = ${updates.date},
      meeting_type = ${updates.meetingType},
      presiding = ${updates.presiding},
      conducting = ${updates.conducting},
      announcements = ${announcements}::text[],
      opening_hymn = ${JSON.stringify(updates.openingHymn)},
      opening_prayer = ${updates.openingPrayer},
      ward_business = ${JSON.stringify(updates.wardBusiness)},
      stake_business = ${updates.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)},
      speakers = ${JSON.stringify(updates.speakers)},
      closing_hymn = ${JSON.stringify(updates.closingHymn)},
      closing_prayer = ${updates.closingPrayer}            
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer";
  `;

  //Check if meeting exists, if not return null
  if (rows.length === 0) {
    return null;
  }

  //Otherwise return data
  return rows[0] as unknown as SacramentMeeting;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  //Delete meeting from database, return id to show whether or not there was a row with this id to delete
  const row = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  //If the id exists in the database, row.length > 0 and true will be returned, if it doesn't exist then false will be returned
  return row.length > 0;
}