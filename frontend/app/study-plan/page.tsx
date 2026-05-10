"use client";
import { useState } from "react";
import { generatePlan } from "@/lib/api";
import Sidebar from "../components/Sidebar";

export default function StudyPlanPage() {
  const [days, setDays] = useState("");
  const [plan, setPlan] = useState<string[]>([]);
  //generate plan
  const handleGeneratePlan = async () => {
    const res = await generatePlan(Number(days));
    setPlan(res.plan);
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

          {/* Study Plan */}
          <div className="bg-white rounded-xl text-gray-700 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Study Plan
            </h2>

            <div className="flex gap-3 mb-4">
              <input
                className="border border-gray-300 rounded-lg p-3 flex-1"
                placeholder="Enter number of study days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />

              <button
                onClick={handleGeneratePlan}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
              >
                Generate
              </button>
            </div>

            <ul className="space-y-2">
              {Array.isArray(plan) &&
                plan.map((p, i) => (
                  <li key={i} className="bg-gray-100 rounded-lg p-3">
                    {p}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
