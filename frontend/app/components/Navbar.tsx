import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-6">
      <div className="max-w-5xl mx-auto flex gap-6">
        <Link
          href="/tasks"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Tasks
        </Link>
        <Link
          href="/study-plan"
          className="font-medium text-gray-700 hover:text-green-600"
        >
          AI Study Plan
        </Link>
        <Link
          href="/summarizer"
          className="font-medium text-gray-700 hover:text-purple-600"
        >
          Summarizer
        </Link>
      </div>
    </nav>
  );
}
