import { Bounce, ToastPosition } from "react-toastify";

export const BASE_API = 'http://localhost:8000';

export interface IUser { 
    id: string;
    email: string;
    password: string;
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
    data: ITask | OmitedITask | null,
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

export const FORMAT = 'MM/dd/yyyy';

export const INITIAL_TASK: OmitedITask = { name: '', due_date: MIN_DATE.toISOString(), priority: PRIORITIES[0] };

export const FILTERS_NAMES = ['name', 'completed', 'priority', 'from', 'to'];
export type FilterNamesKeys = typeof FILTERS_NAMES[number];
export type IFilters = {
    [key: FilterNamesKeys & string]: boolean | string | number;
};


export const toastCofig = {
        position: "bottom-left" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
}

export const API_DELAY = 1000;


export const INITIAL_AUTH: Omit<IUser, 'id'> = { email: '', password: '' };

export interface IAuthState { 
    data: Omit<IUser, 'password'> | null,
    error: string | null
}

export const PUBLIC_ROUTES = ['/auth/login', '/auth/signup'];

