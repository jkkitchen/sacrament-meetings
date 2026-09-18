//Print Button is a component because it requires the browser's window.print() function which only exists on the client--
// so this must be a component that is called onto the meetings page.
"use client";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded-lg bg-grove-green px-6 py-3 text-white hover:underline"
    >
      Print
    </button>
  );
}