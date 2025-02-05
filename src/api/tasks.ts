'use server'
import { revalidatePath } from "next/cache";
import { BASE_API, INITIAL_TASK, ITask, ITaskState, OmitedITask } from "./dictioneries";
import { v4 as uuidv4 } from 'uuid';
import { ERROR_FEEDBACK_DATA, ERROR_INVALID_FORM_DATA, taskIdSchema, taskSchema } from "./validation";
import { SafeParseReturnType } from "zod";

const DELAY = 1000;

export async function getAllTasksApi () {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, DELAY));

    const res: ITask[] = await fetch(`${BASE_API}/tasks`).then(res => res.json());

    return res;
}

export async function addTaskApi (prevState: ITaskState, formData: FormData): Promise<ITaskState> {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, DELAY));

    if (!(formData instanceof FormData)) {
        return { error: ERROR_INVALID_FORM_DATA, data: prevState.data };
    }

    const data = Object.fromEntries(formData.entries());
    console.log('data', data);
    console.log('server due_date : ', data.due_date);
    const validated: SafeParseReturnType<OmitedITask, OmitedITask> = taskSchema.safeParse(data);

    if (!validated.success) {
        console.log('error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: {
            ...prevState.data,
            name: (data as OmitedITask)?.name as string || prevState.data.name,
            priority: (data as OmitedITask)?.priority as string || prevState.data.priority,
            due_date: (data as OmitedITask)?.due_date || prevState.data.due_date,
        }};
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
        return { error: (error as Error).message, data: {
            ...prevState.data,
            name: (validated.data as unknown as OmitedITask)?.name as string || prevState.data.name,
            priority: (validated.data as unknown as OmitedITask)?.priority as string || prevState.data.priority,
            due_date: (validated.data as unknown as OmitedITask)?.due_date as string || prevState.data.due_date,
        }};
    }

    await revalidatePath('/tasks')

    return { resetKey: uuidv4(), data: INITIAL_TASK as ITask, error: null };
}

export async function editTaskApi (prevState: ITaskState, formData: FormData): Promise<ITaskState> {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, DELAY));

    if (!(formData instanceof FormData)) {
        return { error: ERROR_INVALID_FORM_DATA, data: prevState.data };
    }

    const data = Object.fromEntries(formData.entries());
    console.log('data', data.due_date);
    const validated = taskSchema.safeParse(data);

    if (!validated.success) {
        console.log('error', validated?.error);
        console.log('---- > ', {
            ...prevState.data,
            name: (data as OmitedITask)?.name as string || prevState.data.name,
            priority: (data as unknown as OmitedITask)?.priority as string || prevState.data.priority,
            due_date: (data as unknown as OmitedITask)?.due_date || prevState.data.due_date,
        });
        return { error: ERROR_FEEDBACK_DATA, data: {
            ...prevState.data,
            name: (data as OmitedITask)?.name as string || prevState.data.name,
            priority: (data as OmitedITask)?.priority as string || prevState.data.priority,
            due_date: (data as OmitedITask)?.due_date || prevState.data.due_date,
        } };
    }

    const task: ITask = {
        id: prevState.data.id,
        name: validated.data.name,
        priority: validated.data.priority,
        due_date: new Date(validated.data?.due_date),
        completed: prevState.data.completed,
        created: prevState.data.created,
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
        return { error: (error as Error).message, data: {
            ...prevState.data,
            name: (validated.data as unknown as OmitedITask)?.name as string || prevState.data.name,
            priority: (validated.data as unknown as OmitedITask)?.priority as string || prevState.data.priority,
            due_date: (validated.data as unknown as OmitedITask)?.due_date || prevState.data.due_date,
        }};
    }

    await revalidatePath('/tasks')

    return { resetKey: uuidv4(), data: task, error: null };
}

export async function completeTaskApi (task: ITask) {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, DELAY));

    const validated = taskSchema.safeParse(task);

    if (!validated.success) {
        console.log('error', validated.error);
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
        console.log('error', error);
        return { error: (error as Error).message, data: null };
    }

    await revalidatePath('/tasks')

    return res;
}


export async function deleteTaskApi (id: string) {
    // TODO: remove for prod
    await new Promise(resolve => setTimeout(resolve, DELAY));

    const validated = taskIdSchema.safeParse(id);

    if (!validated.success) {
        console.log('error', validated.error);
        return { error: ERROR_FEEDBACK_DATA, data: null };
    }

    try {
        await fetch(`${BASE_API}/tasks/${id}`, {
            method: 'DELETE',
        });
    } catch (error: unknown) {
        return { error: (error as Error).message, data: null };
    }

    await revalidatePath('/tasks')

    return true;
}