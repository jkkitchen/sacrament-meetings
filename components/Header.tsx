import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";
import NavLinks from "./NavLinks";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white text-black pt-4 px-4">
      <div id="header-title" className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Ward name and date */}
          <div>
            <h1 className="text-grove-green text-4xl">Green Grove Ward</h1>
            <p>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Login / Logout */}
          <div className="text-grove-green">
            {session?.user ? (
              <SignOutButton />
            ) : (
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}
