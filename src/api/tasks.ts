'use server'
import { revalidateTag } from "next/cache";
import { BASE_API, API_DELAY, INITIAL_TASK, ITask, ITaskState, OmitedITask } from "./dictioneries";
import { v4 as uuidv4 } from 'uuid';
import { ERROR_FEEDBACK_DATA, taskIdSchema, taskSchema } from "./validation";
import { SafeParseReturnType } from "zod";

export async function getAllTasksApi () {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const res: ITask[] = await fetch(`${BASE_API}/tasks`, { 
        cache: 'force-cache', 
        next: { 
            tags: ['/tasks'],
            revalidate: 600
        } 
    }).then(res => res.json());

    return res;
}

export async function addTaskApi (data: OmitedITask): Promise<ITaskState> {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated: SafeParseReturnType<OmitedITask, OmitedITask> = taskSchema.safeParse(data);

    if (!validated.success) {
        console.info('addTaskApi 1 error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: null};
    }

    const task: ITask = {
        id: uuidv4(),
        name: validated.data?.name as string,
        priority: validated.data?.priority as string,
        due_date: new Date(validated.data?.due_date as string),
        completed: false,
        created: new Date(),
    }

    try {
        await fetch(`${BASE_API}/tasks`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(res => res.json());
    } catch (error: unknown) {
        return { error: (error as Error).message, data: null};
    }

    await revalidateTag('/tasks')

    return { data: INITIAL_TASK as ITask, error: null };
}

export async function editTaskApi (data: ITask): Promise<ITaskState> {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated: SafeParseReturnType<OmitedITask, OmitedITask> = taskSchema.safeParse(data);

    if (!validated.success) {
        console.info('editTaskApi 1 error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: null};
    }

    const task: ITask = {
        id: data.id as string,
        name: validated.data.name,
        priority: validated.data.priority,
        due_date: new Date(validated.data?.due_date),
        completed: data.completed,
        created: data.created,
    }

    try {
        await fetch(`${BASE_API}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(res => res.json());
    } catch (error: unknown) {
        return { error: (error as Error).message, data: null };
    }

    await revalidateTag('/tasks')

    return { data: task, error: null };
}

export async function completeTaskApi (task: ITask) {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated = taskSchema.safeParse(task);

    if (!validated.success) {
        console.info('completeTaskApi 1 error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: null };
    }

    let res: ITask[] | null = null;
    try {
         res = await fetch(`${BASE_API}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...task,
                completed: true,
            })
        }).then(res => res.json());
    } catch (error: unknown) {
        console.info('completeTaskApi 2 error', error);
        return { error: (error as Error).message, data: null };
    }

    await revalidateTag('/tasks')

    return res;
}


export async function deleteTaskApi (id: string) {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, API_DELAY));

    const validated = taskIdSchema.safeParse(id);

    if (!validated.success) {
        console.info('deleteTaskApi error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: null };
    }

    try {
        await fetch(`${BASE_API}/tasks/${id}`, {
            method: 'DELETE',
        });
    } catch (error: unknown) {
        return { error: (error as Error).message, data: null };
    }

    await revalidateTag('/tasks')

    return true;
}