"use client";
import { useState } from "react";
import { summarizeNotes } from "@/lib/api";
import Sidebar from "../components/Sidebar";

export default function SummarizerPage() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  //summary notes
  const handleSummarize = async () => {
    const res = await summarizeNotes(notes);
    setSummary(res.summary);
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="p-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Study Assistant
            </h1>
            <p className="text-gray-500 mt-2">
              Organize tasks, Study Plan and Summarize like an AI Tool
            </p>
          </div>

          {/* Summarizer */}
          <div className="bg-white rounded-xl shadow-md p-6 text-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Notes Summarizer
            </h2>

            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4"
              placeholder="Paste your study notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              onClick={handleSummarize}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg mb-4"
            >
              Summarize
            </button>

            <div className="bg-gray-100 rounded-lg p-4 text-gray-700">
              {summary || "Summary will appear here..."}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
