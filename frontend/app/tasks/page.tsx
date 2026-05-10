"use client";
import { useEffect, useState } from "react";
import {
  getTasks,
  createTasks,
  deleteTask,
  completeTask,
  editTask,
} from "../../lib/api";
import Sidebar from "../components/Sidebar";
type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  //fetch tasks
  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  //create tasks
  const handleAdd = async () => {
    if (!title) return;

    await createTasks({ title, description });

    setTitle("");
    setDescription("");
    loadTasks();
  };
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };
  const confirmDelete = async () => {
    if (selectedTaskId !== null) {
      await handleDelete(selectedTaskId);
    }

    setShowDialog(false);
    setSelectedTaskId(null);
  };

  const handleComplete = async (id: number) => {
    await completeTask(id);
    loadTasks();
  };

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async () => {
    if (editingTaskId === null) return;

    await editTask(editingTaskId, editTitle, editDescription);

    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");

    loadTasks();
  };
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Delete Task</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {editingTaskId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Edit Task
            </h2>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full mb-3 text-gray-500"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-gray-500"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTaskId(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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

            {/* Add Task Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl text-gray-700 font-semibold mb-4">
                Add Task
              </h2>

              <div className="flex flex-col md:flex-row gap-3 text-black">
                <input
                  className="border border-gray-300 rounded-lg p-3 flex-1"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  className="border border-gray-300 rounded-lg p-3 flex-1"
                  placeholder="Task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <button
                  onClick={handleAdd}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-gray-500">Total Tasks</p>
                <h2 className="text-3xl font-bold mt-2">{tasks.length}</h2>
              </div>

              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-gray-500">Completed</p>
                <h2 className="text-3xl font-bold mt-2 text-green-600">
                  {tasks.filter((task) => task.status === "completed").length}
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-md p-5">
                <p className="text-gray-500">Pending</p>
                <h2 className="text-3xl font-bold mt-2 text-yellow-600">
                  {tasks.filter((task) => task.status !== "completed").length}
                </h2>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl text-gray-700 font-semibold mb-4">
                Tasks
              </h2>

              <div className="space-y-3">
                {Array.isArray(tasks) &&
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-50 hover:bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-xl text-gray-800">
                              {task.title}
                            </h3>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                task.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>

                          <p className="text-gray-600 leading-relaxed">
                            {task.description}
                          </p>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-wrap gap-2 md:flex-col">
                          {task.status !== "completed" && (
                            <button
                              onClick={() => handleComplete(task.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                            >
                              Complete
                            </button>
                          )}

                          <button
                            onClick={() => startEdit(task)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setSelectedTaskId(task.id);
                              setShowDialog(true);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
