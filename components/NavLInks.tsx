"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center bg-grove-green text-white p-4 mt-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/"
            className={pathname === "/" ? "active" : ""}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/meetings"
            className={pathname === "/meetings" ? "active" : ""}
            aria-current={pathname === "/meetings" ? "page" : undefined}
          >
            Meetings
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/current"
            className={pathname === "/meetings/current" ? "active" : ""}
            aria-current={pathname === "/meetings/current" ? "page" : undefined}
          >
            Current Meeting
          </Link>
        </li>
      </ul>
    </nav>
  );
}
