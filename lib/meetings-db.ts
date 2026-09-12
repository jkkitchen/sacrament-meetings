import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-08-16",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { 
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker"
        },
        {
        name: "Youth Choir",
        topic: "",
        type: "musical-number"
        },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-08-23",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 1001, title: "Come, Thou Fount of Every Blessing" },
    openingPrayer: "Sister Smith",
    wardBusiness: [{ description: "Sustaining new primary teacher" }],
    stakeBusiness: true,
    sacramentHymn: { number: 1007, title: "As Bread is Broken" },
    speakers: [
      {
        name: "Sister Curtis",
        topic: "Importance of Temple Worship",
        type: "speaker",
      },
      {
        name: "Sister Mae",
        topic: "Staying on the Covenant Path",
        type: "speaker",
      },
    ],
    closingHymn: { number: 1004, title: "I Will Walk With Jesus" },
    closingPrayer: "Brother Day",
    announcements: ["Youth registration for FSY"],
  },
  {
    id: 3,
    date: "2026-08-30",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sister Moon",
    wardBusiness: [{ description: "Sustaining new YW counselor" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      {
        name: "Sister Stitch",
        topic: "Patience in Affliction- Job",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "Peace",
        type: "musical-number",
      },
      {
        name: "Sister Poole",
        topic: "Finding Peace through the Atonement",
        type: "speaker",
      },
    ],
    closingHymn: { number: 1016, title: "Behold the Wounds in Jesus' Hands" },
    closingPrayer: "Brother Knight",
    announcements: ["Youth registration for FSY"],
  },
  {
    id: 4,
    date: "2026-09-06",
    meetingType: "regular",
    presiding: "President Clux",
    conducting: "Brother Jones",
    openingHymn: { number: 1018, title: "Come, Lord Jesus" },
    openingPrayer: "Sister Speare",
    wardBusiness: [{ description: "Releasing Sunday School Teacher" }],
    stakeBusiness: false,
    sacramentHymn: { number: 1008, title: "Bread of Life, Living Water" },
    speakers: [
      {
        name: "Sister Lilo",
        topic: "Repentance",
        type: "speaker",
      },
      {
        name: "Jones Family",
        topic: "Jesus the Christ",
        type: "musical-number",
      },
      {
        name: "Brother Moon",
        topic: "Forgiveness",
        type: "speaker",
      },
    ],
    closingHymn: { number: 1026, title: "Holy Places" },
    closingPrayer: "Brother Davies",
    announcements: ["Upcoming YW and YM Camp Dates"],
  },
  {
    id: 5,
    date: "2026-09-13",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Poole",
    openingHymn: { number: 1027, title: "Welcome Home" },
    openingPrayer: "Sister Shields",
    wardBusiness: [{ description: "Calling new Sunday School Teacher" }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      {
        name: "Testimonies",
        topic: "Testimonies",
        type: "speaker",
      },
    ],
    closingHymn: { number: 1052, title: "Joyfully Bound" },
    closingPrayer: "Brother Sail",
    announcements: ["Upcoming YW and YM Camp Dates"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
