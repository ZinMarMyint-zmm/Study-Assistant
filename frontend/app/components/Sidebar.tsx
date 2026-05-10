"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Tasks",
      path: "/tasks",
      color: "blue",
    },
    {
      name: "Study Plan",
      path: "/study-plan",
      color: "green",
    },
    {
      name: "Summarizer",
      path: "/summarizer",
      color: "purple",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">Features</h1>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`p-3 rounded-xl transition font-medium ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
