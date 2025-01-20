
import { getAllTasksApi } from "@/api/tasks";

export async function TaskCompleted() {
    const tasks = await getAllTasksApi();

    const taskCompleted = tasks?.reduce((sum, item) => item.completed ? sum + 1 : sum, 0)
  

    return (
      <p> { `tasks completed ${taskCompleted}/${tasks.length} `}</p>
    );
  }
  