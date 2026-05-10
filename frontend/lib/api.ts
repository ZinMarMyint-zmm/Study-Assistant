const API_URL = "https://study-assistant-api-m78y.onrender.com";

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`)
    return res.json()
}

export async function createTasks(data: {
    title: string,
    description: string
}) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json()
}

export async function generatePlan(days: number) {
    const res = await fetch(`${API_URL}/ai/suggest-plan?days=${days}`, {
        method: "POST",
    })
    return res.json();
}

export async function summarizeNotes(text: string) {
  const res = await fetch(
    `${API_URL}/ai/summarize?text=${encodeURIComponent(text)}`,
    {
      method: "POST",
    }
  );

  return res.json();
}

export async function deleteTask(taskId: number) {
  const res = await fetch(
    `${API_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

export async function completeTask(taskId: number) {
  const res = await fetch(
    `${API_URL}/tasks/${taskId}/complete`,
    {
      method: "PUT",
    }
  );

  return res.json();
}

export async function editTask(
  taskId: number,
  title: string,
  description: string
) {
  const res = await fetch(
    `${API_URL}/tasks/${taskId}/edit`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    }
  );

  return res.json();
}