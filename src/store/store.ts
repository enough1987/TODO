import { IUser } from '@/api/dictioneries';
import { create, StoreApi } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface iFilters {
    [key: string]: boolean | string | number;
}

interface IFiltersState {
    filters: iFilters;
    setFiltes: (key: string, value: boolean | string | number) => void;
    resetFiltes: () => void;
}

export const filters = (set: StoreApi<IFiltersState>['setState']) => ({
        filters: {},
        setFiltes: (key: string, value: boolean | string | number) => set((state) => ({ ...state, filters: { ...state.filters, [key]: value } })),
        resetFiltes: () => set(() => ({ filters: {} })),
    });

interface IEditableTaskState {
    editable: { [key: string]: boolean };
    setEditableOne: (key: string, value: boolean) => void;
    setEditableMultiple: (key: string, value: boolean) => void;
    resetEditable: () => void;
}

export const editableTask = (set: StoreApi<IEditableTaskState>['setState']) => ({
        editable: {},
        setEditableOne: (key: string, value: boolean) => set(() => ({ editable: { [key]: value } })),
        setEditableMultiple: (key: string, value: boolean) => set((state) => ({ editable: { ...state.editable, [key]: value } })),
        resetEditable: () => set(() => ({ editable: {} })),
    });

interface IStateState {
    pendingGlocal: boolean;
    setPendingGlocal: (value: boolean) => void;
}

export const state = (set: StoreApi<IStateState>['setState']) => ({
        pendingGlocal: false,
        setPendingGlocal: (value: boolean) => set((state) => ({ ...state, pendingGlocal: value })),
    });

    interface IUserState {
        user: IUser | null,
        setUser: (user: IUser) => void
    }
    
    export const user = persist<IUserState>(
        (set) => ({
            user: null,
            setUser: (user: IUser) => set((state) => ({ ...state, user })),
        }), {
            name: 'count-store',
            storage: createJSONStorage(() => localStorage),
        });
        
export interface IStoreState extends IFiltersState, IEditableTaskState, IStateState, IUserState {};

export const createStoreLocal = (set: StoreApi<IStoreState>['setState'], 
    get: StoreApi<IStoreState>['getState'], 
    api: StoreApi<IStoreState>) => ({
    ...filters(set),
    ...editableTask(set),
    ...state(set),
    ...user(set, get, api),
});

export const useStore = create<IStoreState>()(devtools(createStoreLocal));