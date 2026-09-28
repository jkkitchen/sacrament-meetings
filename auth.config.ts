import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // use your own login page instead of the Auth.js default
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;

        // Protect all admin meeting routes
        const isNewMeeting = nextUrl.pathname === "/meetings/new";
        const isEditMeeting = /^\/meetings\/[^/]+\/edit$/.test(
          nextUrl.pathname,
        ); //more complicated because [id] isn't in the URL, this gives something like this: meetings/2/edit
        const isProtected = isNewMeeting || isEditMeeting;

        if (isProtected) {
            if (isLoggedIn) return true;
            return false; // redirects to /login
        }

        // Redirect already-logged-in users away from the login page
        if (isLoggedIn && nextUrl.pathname === "/login") {
            return Response.redirect(new URL("/", nextUrl));
        }

        return true;
        },
    },
    providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;
