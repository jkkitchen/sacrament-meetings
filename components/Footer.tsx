export default function Footer() {
  return (
    <footer className="bg-white text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-grove-green">
          &copy; {new Date().getFullYear()} | Jessica Kitchen | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
