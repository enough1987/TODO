import { FilterNamesKeys, IFilters, IUser } from '@/api/dictioneries';
import { create, StoreApi } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { searchParamsStorage } from './searchParamsStorage';

export interface IEditableTaskState {
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

export interface IStateState {
    pendingGlocal: boolean;
    setPendingGlocal: (value: boolean) => void;
}

export const state = (set: StoreApi<IStateState>['setState']) => ({
        pendingGlocal: false,
        setPendingGlocal: (value: boolean) => set((state) => ({ ...state, pendingGlocal: value })),
    });

export interface IUserState {
    user: IUser | null,
    setUser: (user: IUser) => void
}
    
export const user = persist<IUserState>(
        (set) => ({
            user: null,
            setUser: (user: IUser) => set((state) => ({ ...state, user })),
        }), {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
});

export interface IFiltersState {
            filters: IFilters,
            changeFilter: (key: FilterNamesKeys, value: string) => void,
            resetFilters: () => void,
}

const initiaFiltersState = { } as IFilters;
        
export const filters = persist<IFiltersState>(
            (set) => ({
                filters: initiaFiltersState,
                changeFilter: (key: FilterNamesKeys, value: string) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
                resetFilters: () => set(() => {
                    return { filters: initiaFiltersState };
                }),
            }), {
                name: 'filters',
                partialize: (state) => ({ filters: state.filters } as IFiltersState),
                storage: createJSONStorage(() => ({
                    getItem: async (name: string) => {
                        const value = await searchParamsStorage.getItem(name);
                        return value ? JSON.stringify(value) : null;
                    },
                    setItem: (name: string, value: string) => searchParamsStorage.setItem(name, JSON.parse(value)),
                    removeItem: searchParamsStorage.removeItem,
                }), {
                    replacer: (_key, value) => {
                        return value;
                    },
                    reviver: (_key, value) => {
                        return value;
                    },
                }),
});
        
export interface IStoreState extends IEditableTaskState, IStateState, IUserState, IFiltersState {};

export const createStoreLocal = (set: StoreApi<IStoreState>['setState'], 
    get: StoreApi<IStoreState>['getState'], 
    api: StoreApi<IStoreState>) => ({
    ...editableTask(set),
    ...state(set),
    ...filters(set, get, api),
    ...user(set, get, api),
});

export const useStore = create<IStoreState>()(devtools(createStoreLocal));