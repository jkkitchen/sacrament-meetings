"use client";

import { useActionState } from "react";
import { createMeeting, type State } from "@/lib/actions";

const initialState: State = { message: null, errors: {} };

export default function NewMeeting() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState,
  );

  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col py-16 px-6 md:px-16 bg-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create New Meeting
        </h1>

        <form action={formAction} className="w-full space-y-8">
          {/* Meeting Information */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold mb-4">
              Meeting Information
            </legend>

            <div>
              <label htmlFor="date" className="block font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                aria-describedby="date-error"
                className="w-full border rounded p-2"
              />
              <div id="date-error" aria-live="polite">
                {state.errors?.date?.map((error) => (
                  <p key={error} className="text-red-600 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="meetingType" className="block font-medium mb-1">
                Meeting Type
              </label>
              <select
                id="meetingType"
                name="meetingType"
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
                  <p key={error} className="text-red-600 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="presiding" className="block font-medium mb-1">
                Presiding
              </label>
              <input
                type="text"
                id="presiding"
                name="presiding"
                required
                aria-describedby="presiding-error"
                className="w-full border rounded p-2"
              />
              <div id="presiding-error" aria-live="polite">
                {state.errors?.presiding?.map((error) => (
                  <p key={error} className="text-red-600 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="conducting" className="block font-medium mb-1">
                Conducting
              </label>
              <input
                type="text"
                id="conducting"
                name="conducting"
                required
                aria-describedby="conducting-error"
                className="w-full border rounded p-2"
              />
              <div id="conducting-error" aria-live="polite">
                {state.errors?.conducting?.map((error) => (
                  <p key={error} className="text-red-600 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Announcements */}
          <fieldset className="space-y-3">
            <legend className="text-xl font-semibold mb-4">
              Announcements
            </legend>

            <label htmlFor="announcement1" className="block font-medium">
              Announcement
            </label>
            <input
              type="text"
              id="announcement1"
              name="announcements"
              className="w-full border rounded p-2"
            />

            <label htmlFor="announcement2" className="block font-medium">
              Additional Announcement
            </label>
            <input
              type="text"
              id="announcement2"
              name="announcements"
              className="w-full border rounded p-2"
            />
          </fieldset>

          {/* Opening */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold mb-4">Opening</legend>

            <div>
              <label
                htmlFor="openingHymnNumber"
                className="block font-medium mb-1"
              >
                Opening Hymn Number
              </label>
              <input
                type="number"
                id="openingHymnNumber"
                name="openingHymnNumber"
                min="1"
                required
                aria-describedby="openingHymn-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label
                htmlFor="openingHymnTitle"
                className="block font-medium mb-1"
              >
                Opening Hymn Title
              </label>
              <input
                type="text"
                id="openingHymnTitle"
                name="openingHymnTitle"
                required
                aria-describedby="openingHymn-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div id="openingHymn-error" aria-live="polite">
              {state.errors?.openingHymn?.map((error) => (
                <p key={error} className="text-red-600 text-sm mt-1">
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
                required
                aria-describedby="openingPrayer-error"
                className="w-full border rounded p-2"
              />
              <div id="openingPrayer-error" aria-live="polite">
                {state.errors?.openingPrayer?.map((error) => (
                  <p key={error} className="text-red-600 text-sm mt-1">
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
                aria-describedby="wardBusiness-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div id="wardBusiness-error" aria-live="polite">
              {state.errors?.wardBusiness?.map((error) => (
                <p key={error} className="text-red-600 text-sm mt-1">
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
                className="h-4 w-4"
              />
              <label htmlFor="stakeBusiness" className="font-medium">
                Stake business included
              </label>
            </div>
          </fieldset>

          {/* Sacrament Hymn */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold mb-4">
              Sacrament Hymn
            </legend>

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
                required
                aria-describedby="sacramentHymn-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div id="sacramentHymn-error" aria-live="polite">
              {state.errors?.sacramentHymn?.map((error) => (
                <p key={error} className="text-red-600 text-sm mt-1">
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

            {[1, 2, 3].map((number) => (
              <div key={number} className="space-y-3 border rounded p-4">
                <p className="font-semibold">Item {number}</p>

                <div>
                  <label
                    htmlFor={`speakerName${number}`}
                    className="block font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`speakerName${number}`}
                    name="speakerName"
                    aria-describedby="speakers-error"
                    className="w-full border rounded p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`speakerTopic${number}`}
                    className="block font-medium mb-1"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    id={`speakerTopic${number}`}
                    name="speakerTopic"
                    aria-describedby="speakers-error"
                    className="w-full border rounded p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`speakerType${number}`}
                    className="block font-medium mb-1"
                  >
                    Type
                  </label>
                  <select
                    id={`speakerType${number}`}
                    name="speakerType"
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
              <label
                htmlFor="closingHymnNumber"
                className="block font-medium mb-1"
              >
                Closing Hymn Number
              </label>
              <input
                type="number"
                id="closingHymnNumber"
                name="closingHymnNumber"
                min="1"
                required
                aria-describedby="closingHymn-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label
                htmlFor="closingHymnTitle"
                className="block font-medium mb-1"
              >
                Closing Hymn Title
              </label>
              <input
                type="text"
                id="closingHymnTitle"
                name="closingHymnTitle"
                required
                aria-describedby="closingHymn-error"
                className="w-full border rounded p-2"
              />
            </div>

            <div id="closingHymn-error" aria-live="polite">
              {state.errors?.closingHymn?.map((error) => (
                <p key={error} className="text-red-600 text-sm mt-1">
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
                required
                aria-describedby="closingPrayer-error"
                className="w-full border rounded p-2"
              />
              <div id="closingPrayer-error" aria-live="polite">
                {state.errors?.closingPrayer?.map((error) => (
                  <p key={error} className="text-red-600 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </fieldset>

          {/* General server error */}
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
            {isPending ? "Creating Meeting..." : "Create Meeting"}
          </button>
        </form>
      </main>
    </div>
  );
}
