import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Study Assistant like AI</h1>

        <p className="text-gray-600 mb-8">
          Organize tasks, generate study plans, and summarize notes.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/tasks"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Go to Tasks
          </Link>

          <Link
            href="/study-plan"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            Study Plan
          </Link>

          <Link
            href="/summarizer"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
          >
            Notes Summarizer
          </Link>
        </div>
      </div>
    </main>
  );
}
