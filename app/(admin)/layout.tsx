import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="container mx-auto flex justify-around items-center bg-gray-100 text-grove-green p-4">
        <Link href="/meetings/new" className="hover:underline">
          Create Meeting
        </Link>
      </nav>

      {children}
    </section>
  );
}
