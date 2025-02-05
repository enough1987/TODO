export const BASE_API = 'http://localhost:8000';

export interface IUser { 
    id: string;
    name: string;
}

export interface ITask {
    id: string;
    name: string;
    priority: string;
    due_date: string | Date;
    completed: boolean;
    created: Date;
}

export type OmitedITask = Omit<ITask, 'id' | 'completed' | 'created'>

export interface ITaskState { 
    resetKey?: string, 
    data: ITask,
    error: string | null
}


export const COMPLETNES = ['completed', 'pending']; 
export const POST_EDIT_LIST_HEADERS = [
    {
        label: 'Name',
        width: '250px',
    }, 
    {
        label: 'Due Date',
        width: '190px',
    },
    {
        label: 'Priority',
        width: '190px',
    }];

export const PRIORITIES = ['low', 'medium', 'high'];

export const MIN_DATE = new Date();

export const FORMAT = 'DD/MM/YYYY';

export const INITIAL_TASK: OmitedITask = { name: '', due_date: null as unknown as Date, priority: PRIORITIES[0] };

export const FILTERS_NAMES = ['name', 'completed', 'priority'];
export type filterNames = typeof FILTERS_NAMES[number];
export interface IFilters {
    [key: filterNames]: boolean | string | number;
}

