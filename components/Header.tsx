import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-white text-black pt-4 px-4">
      <div id="header-title" className="container mx-auto">
        <h1 className="text-grove-green text-4xl">Green Grove Ward</h1>
        <p>
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <NavLinks />
      </div>
    </header>
  );
}
