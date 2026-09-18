import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="container mx-auto flex justify-around items-center bg-gray-100 text-grove-green p-4">
        <Link href="/meetings" className="hover:underline">All Meetings</Link>
        <Link href="/meetings/current" className="hover:underline">Current Meeting</Link>
      </nav>

      {children}
    </section>
  );
}