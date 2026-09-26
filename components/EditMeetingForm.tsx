"use client";

import { useActionState } from "react";
import { updateMeeting, type State } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: State = {
  message: null,
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  return (
    <form action={formAction} className="w-full space-y-8">
      {/* Meeting Information */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold mb-4">
          Meeting Information
        </legend>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={meeting.date}
            required
            aria-describedby="date-error"
            className="w-full border rounded p-2"
          />
          <div id="date-error" aria-live="polite">
            {state.errors?.date?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Meeting Type */}
        <div>
          <label htmlFor="meetingType" className="block font-medium mb-1">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            required
            aria-describedby="meetingType-error"
            className="w-full border rounded p-2"
          >
            <option value="">Select a meeting type</option>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <div id="meetingType-error" aria-live="polite">
            {state.errors?.meetingType?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Presiding */}
        <div>
          <label htmlFor="presiding" className="block font-medium mb-1">
            Presiding
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            defaultValue={meeting.presiding}
            required
            aria-describedby="presiding-error"
            className="w-full border rounded p-2"
          />
          <div id="presiding-error" aria-live="polite">
            {state.errors?.presiding?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Conducting */}
        <div>
          <label htmlFor="conducting" className="block font-medium mb-1">
            Conducting
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            defaultValue={meeting.conducting}
            required
            aria-describedby="conducting-error"
            className="w-full border rounded p-2"
          />
          <div id="conducting-error" aria-live="polite">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Announcements */}
      <fieldset className="space-y-3">
        <legend className="text-xl font-semibold mb-4">Announcements</legend>

        <div>
          <label htmlFor="announcement1" className="block font-medium mb-1">
            Announcement
          </label>
          <input
            type="text"
            id="announcement1"
            name="announcements"
            defaultValue={meeting.announcements?.[0] ?? ""}
            aria-describedby="announcements-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="announcement2" className="block font-medium mb-1">
            Additional Announcement
          </label>
          <input
            type="text"
            id="announcement2"
            name="announcements"
            defaultValue={meeting.announcements?.[1] ?? ""}
            aria-describedby="announcements-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div id="announcements-error" aria-live="polite">
          {state.errors?.announcements?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Opening */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold mb-4">Opening</legend>

        <div>
          <label htmlFor="openingHymnNumber" className="block font-medium mb-1">
            Opening Hymn Number
          </label>
          <input
            type="number"
            id="openingHymnNumber"
            name="openingHymnNumber"
            defaultValue={meeting.openingHymn.number}
            min="1"
            required
            aria-describedby="openingHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block font-medium mb-1">
            Opening Hymn Title
          </label>
          <input
            type="text"
            id="openingHymnTitle"
            name="openingHymnTitle"
            defaultValue={meeting.openingHymn.title}
            required
            aria-describedby="openingHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div id="openingHymn-error" aria-live="polite">
          {state.errors?.openingHymn?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="openingPrayer" className="block font-medium mb-1">
            Opening Prayer
          </label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting.openingPrayer}
            required
            aria-describedby="openingPrayer-error"
            className="w-full border rounded p-2"
          />
          <div id="openingPrayer-error" aria-live="polite">
            {state.errors?.openingPrayer?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Business */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold mb-4">Business</legend>

        <div>
          <label htmlFor="wardBusiness1" className="block font-medium mb-1">
            Ward Business
          </label>
          <input
            type="text"
            id="wardBusiness1"
            name="wardBusiness"
            defaultValue={meeting.wardBusiness?.[0]?.description ?? ""}
            aria-describedby="wardBusiness-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="wardBusiness2" className="block font-medium mb-1">
            Additional Ward Business
          </label>
          <input
            type="text"
            id="wardBusiness2"
            name="wardBusiness"
            defaultValue={meeting.wardBusiness?.[1]?.description ?? ""}
            aria-describedby="wardBusiness-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div id="wardBusiness-error" aria-live="polite">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            value="true"
            defaultChecked={meeting.stakeBusiness}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4"
          />
          <label htmlFor="stakeBusiness" className="font-medium">
            Stake business included
          </label>
        </div>

        <div id="stakeBusiness-error" aria-live="polite">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Sacrament Hymn */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold mb-4">Sacrament Hymn</legend>

        <div>
          <label
            htmlFor="sacramentHymnNumber"
            className="block font-medium mb-1"
          >
            Hymn Number
          </label>
          <input
            type="number"
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            defaultValue={meeting.sacramentHymn.number}
            min="1"
            required
            aria-describedby="sacramentHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label
            htmlFor="sacramentHymnTitle"
            className="block font-medium mb-1"
          >
            Hymn Title
          </label>
          <input
            type="text"
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            defaultValue={meeting.sacramentHymn.title}
            required
            aria-describedby="sacramentHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div id="sacramentHymn-error" aria-live="polite">
          {state.errors?.sacramentHymn?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Speakers */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-semibold mb-4">
          Speakers / Musical Numbers
        </legend>

        {[0, 1, 2].map((index) => (
          <div key={index} className="space-y-3 border rounded p-4">
            <p className="font-semibold">Item {index + 1}</p>

            <div>
              <label
                htmlFor={`speakerName${index}`}
                className="block font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id={`speakerName${index}`}
                name="speakerName"
                defaultValue={meeting.speakers?.[index]?.name ?? ""}
                aria-describedby="speakers-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label
                htmlFor={`speakerTopic${index}`}
                className="block font-medium mb-1"
              >
                Topic
              </label>
              <input
                type="text"
                id={`speakerTopic${index}`}
                name="speakerTopic"
                defaultValue={meeting.speakers?.[index]?.topic ?? ""}
                aria-describedby="speakers-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label
                htmlFor={`speakerType${index}`}
                className="block font-medium mb-1"
              >
                Type
              </label>
              <select
                id={`speakerType${index}`}
                name="speakerType"
                defaultValue={meeting.speakers?.[index]?.type ?? "speaker"}
                aria-describedby="speakers-error"
                className="w-full border rounded p-2"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>
            </div>
          </div>
        ))}

        <div id="speakers-error" aria-live="polite">
          {state.errors?.speakers?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Closing */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold mb-4">Closing</legend>

        <div>
          <label htmlFor="closingHymnNumber" className="block font-medium mb-1">
            Closing Hymn Number
          </label>
          <input
            type="number"
            id="closingHymnNumber"
            name="closingHymnNumber"
            defaultValue={meeting.closingHymn.number}
            min="1"
            required
            aria-describedby="closingHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block font-medium mb-1">
            Closing Hymn Title
          </label>
          <input
            type="text"
            id="closingHymnTitle"
            name="closingHymnTitle"
            defaultValue={meeting.closingHymn.title}
            required
            aria-describedby="closingHymn-error"
            className="w-full border rounded p-2"
          />
        </div>

        <div id="closingHymn-error" aria-live="polite">
          {state.errors?.closingHymn?.map((error) => (
            <p key={error} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>

        <div>
          <label htmlFor="closingPrayer" className="block font-medium mb-1">
            Closing Prayer
          </label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting.closingPrayer}
            required
            aria-describedby="closingPrayer-error"
            className="w-full border rounded p-2"
          />
          <div id="closingPrayer-error" aria-live="polite">
            {state.errors?.closingPrayer?.map((error) => (
              <p key={error} className="text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        </div>
      </fieldset>

      {/* General form error */}
      {state.message && (
        <p aria-live="polite" className="text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-green-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Updating Meeting..." : "Update Meeting"}
      </button>
    </form>
  );
}